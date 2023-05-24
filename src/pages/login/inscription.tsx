import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const InscriptionForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !phone || !address) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/inscription', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        password,
      });
      console.log(response.data); // Afficher la réponse du serveur si nécessaire
      setIsRegistered(true);
      toast.success('Inscription réussie ! Bienvenue !');
      router.push('/login/login');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Adresse</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Envoyer</button>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
  
    </div>
  );
};

export default InscriptionForm;
