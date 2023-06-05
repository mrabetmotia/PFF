import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { z } from 'zod';

const IncriptionSchema = z.object({
  first_name: z.string().nonempty('Prénom is required'),
  last_name: z.string().nonempty('Nom is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  phone: z.string().nonempty('Téléphone is required'),
  address: z.string().nonempty('Adresse is required'),
  password: z.string().nonempty('Password is required'),
});


const InscriptionForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const { register } = useAuth();


  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      IncriptionSchema.parse({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        password,
      });
  
      register(firstName, lastName, email, phone,address,password);
    } catch (error) {
      console.log("error submit");
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
