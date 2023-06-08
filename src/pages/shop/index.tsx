import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Button } from '@mui/material';
import Link from 'next/link';

const Shops = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [shopList, setShopList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const itemsPerPage = 12;
  const [cartItems, setCartItems] = useState([]);

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
    setCartItems([...cartItems, product]);
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
      <div id="main-shop">
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
            className={`filter-btn ${selectedCategory === 'Accesoire' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('Accesoire')}
          >
            Accessories
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'Equipment' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('Equipment')}
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
              <div key={product._id} className="product-item">
                <Link href={`/shop/${product._id}`}>
                <img src={product.image} alt="" />
                </Link>

                <h3>{product.name}</h3>
                {product.type === 'protein' && <p style={{ margin: '0' }}>{product.kg} KG</p>}
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
    </>
  );
};

export default Shops;
