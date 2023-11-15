import { useRef, useState } from 'react';
import './index.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Button } from 'bootstrap';

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 5;


const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setpage] = useState(2);

  const [totalPages, setTotalPages] = useState(0);


  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  }

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`${UNSPLASH_API_URL}?query=${searchInput.current.value}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`);
      console.log(data);
      setImages(data.results);
      setTotalPages(data.total_pages);

    } catch (error) {
      console.log(error);
    }
  }

  return <div className='container'>
    <h1 className='title'>Image Search</h1>
    <div className="search-section">
      <Form onSubmit={handleSearch}>
        <Form.Control type="search" placeholder="Search images" className='search-input' ref={searchInput} />
      </Form>
    </div>

    <div className="filters">
      <div onClick={() => handleSelection("nature")}>Nature</div>
      <div onClick={() => handleSelection("birds")}>Birds</div>
      <div onClick={() => handleSelection("people")}>People</div>
      <div onClick={() => handleSelection("sea")}>Sea</div>
    </div>

    <div className="images">
      {
        images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.urls.regular} 
              alt={image.alt_description}
              className='image'
            />
          )
        })
      }
    </div>


    {/* <div className="buttons">
      {page > 1 && <Button>Previous</Button>}
      {page < totalPages && <Button>Next</Button>}
    </div> */}
  </div>;
};

export default App;