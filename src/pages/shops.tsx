import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Panier from './panier';

const shops = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [shopList, setShopList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const itemsPerPage = 6;
  const showPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/shop');
        setShopList(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur est survenue lors de la récupération des magasins.');
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCurrentPage(0);
  };

  const addToCart = (product) => {
    setItems([...items, product]);
  };

  const filteredProducts = selectedCategory
    ? shopList.filter((product) => product.type === selectedCategory)
    : shopList;

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div id="main">
        <div className="header-heading">
          <h2>GET UP YOUR</h2>
          <h1>
            <span>FITNESS</span> WITH US
          </h1>
          <p className="details">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellat!
          </p>
          <div className="header-btns">
            <a href="" className="header-btn">
              LOGIN NOW
            </a>
          </div>
        </div>
      </div>
      <div className="shop-page">
        <h1 className="shop-title">Shop</h1>
        <div className="filter-container">
          <button
            className={`filter-btn ${selectedCategory === 'protein' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('protein')}
          >
            Protein
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'accessoire' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('accessoire')}
          >
            Accessories
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'equipment' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('equipment')}
          >
            Equipment
          </button>
          <button
            className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All
          </button>
        </div>
        <div className="products-container">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt="" />
              <h3>{product.name}</h3>
              <p>{product.price} TND</p>
              <button onClick={() => addToCart(product)} className="add-to-cart-button">
                ADD Panier
              </button>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination-container"
          activeClassName="Pagination-shop"
        />
      </div>
      {items.length > 0 && <Panier items={items} />}
    </>
  );
};

export default shops;
