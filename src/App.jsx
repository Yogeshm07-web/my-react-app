import { useRef } from 'react';
import './index.css';
import { Form } from 'react-bootstrap';

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos?page=1&query=office";


const App = () => {
  const searchInput = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value)
  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
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
  </div>;
};

export default App;