import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const CoachRegistrationForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: '',
    specialite: '',
    description: '',
    image: '',
    experiance: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Inscription réussie ! Please white for validation !');
        router.push('/coach');

      } else {
        console.error('Coach registration failed');
        toast.error('registration failed!');

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="coach-registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="specialite">Spécialité:</label>
        <input
          type="text"
          id="specialite"
          name="specialite"
          value={formData.specialite}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="experiance">Expérience:</label>
        <input
          type="number"
          id="experiance"
          name="experiance"
          value={formData.experiance}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="number"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default CoachRegistrationForm;
