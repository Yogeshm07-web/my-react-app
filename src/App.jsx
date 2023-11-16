import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './index.css';

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 15;


const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const resetSearch = () => {
    fetchImages();
    setPage(1)
  }

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  }

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`${UNSPLASH_API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`);
      setImages(data.results);
      setTotalPages(data.total_pages);

    } catch (error) {
      console.log(error);
    }
  }

  return <div className='container'>
    <h1 className='title'>Unsplash Image Search</h1>
    <div className="search-section">
      <Form onSubmit={handleSearch}>
        <Form.Control type="search" placeholder="Search images" className='search-input' ref={searchInput} />
      </Form>
    </div>

    <div className="filters">
      <div onClick={() => handleSelection("travel")}>Travel</div>
      <div onClick={() => handleSelection("animals")}>Animals</div>
      <div onClick={() => handleSelection("people")}>People</div>
      <div onClick={() => handleSelection("patterns")}>Patterns</div>
    </div>

    <div className="images">
      {
        images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.urls.small} 
              alt={image.alt_description}
              className='image'
            />
          )
        })
      }
    </div>


    <div className="buttons">
      { page > 1 && <Button variant="warning" onClick={() => setPage(page - 1)}>Previous</Button> }
      { page < totalPages && <Button variant="warning" onClick={() => setPage(page + 1)}>Next</Button> }
    </div>
  </div>;
};

export default App;
