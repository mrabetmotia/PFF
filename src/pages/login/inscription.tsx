import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { z } from 'zod';

const InscriptionSchema = z.object({
  first_name: z.string().nonempty('Le prénom est requis'),
  last_name: z.string().nonempty('Le nom est requis'),
  email: z.string().email('Adresse e-mail invalide').nonempty('L\'adresse e-mail est requise'),
  phone: z.number().refine(value => value > 0, {
    message: 'Le téléphone est requis et doit être supérieur à zéro',
  }),
  address: z.string().nonempty('L\'adresse est requise'),
  password: z.string().nonempty('Le mot de passe est requis'),
});

const InscriptionForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await InscriptionSchema.parseAsync({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: Number(phone),
        address,
        password,
      });
  
      await register(firstName, lastName, email, Number(phone), address, password);
    } catch (error) {
      setErrorMessage('Veuillez remplir tous les champs correctement.');
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
