import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";

const Shops = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shopList, setShopList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [types, setTypes] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/Product");
        setShopList(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "Une erreur est survenue lors de la récupération des magasins."
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:9000/type");
        setTypes(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "Une erreur est survenue lors de la récupération des types."
        );
      }
    };

    fetchTypes();
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setCurrentPage(0);
  };

  const filteredProducts = selectedCategory
    ? shopList.filter((product) => product.type._id === selectedCategory)
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
            repellat!
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
          {types.map((type) => (
            <button
              key={type._id}
              className={`filter-btn ${
                selectedCategory === type._id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(type._id)}
            >
              {type.name}
            </button>
          ))}
          <button
            className={`filter-btn ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => handleCategoryChange("")}
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
              {product.type.name === "protein" && (
                <p style={{ margin: "0" }}>{product.kg} KG</p>
              )}
              <p>{product.price} TND</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
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
