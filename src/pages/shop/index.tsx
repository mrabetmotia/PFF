import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ShopList = () => {
  const router = useRouter();

  const [shopList, setShopList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddShopClick = () => {
    router.push('/shop/addshop');
  };

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/shops/${id}`);
      setShopList((prevList) => prevList.filter((shop) => shop._id !== id));
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de la suppression du magasin.');
    }
  };

  const handleEdit = (id) => {
    router.push(`/shop/put/${id}`);
  };

  return (
    <div className="shop-list-container">
      <h1>Liste des magasins</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Image</th>
            <th>Kg</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shopList.map((shop) => (
            <tr key={shop._id}>
              <td>{shop.name}</td>
              <td>
                <img src={shop.image} alt={shop.name} />
              </td>
              <td>{shop.kg}</td>
              <td>{shop.price}</td>
              <td>
                <button onClick={() => handleEdit(shop._id)}>Modifier</button>
                <button onClick={() => handleDelete(shop._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddShopClick}>Ajouter un magasin</button>

      <style jsx>{`
        .shop-list-container {
          max-width: 800px;
          margin: 10% auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th,
        td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ccc;
        }

        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
        }

        button {
          padding: 5px 10px;
          background-color: #ff5555;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 5px;
        }

        button:hover {
          background-color: #ff3333;
        }

        .error-message {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default ShopList;
