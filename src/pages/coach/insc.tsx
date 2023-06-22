import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

const CoachRegistrationForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: '',
    spesialite: '',
    description: '',
    image: '',
    experiance: '',
    email: '',
    phone: '',
    video: ''
});


  // Decode token and populate form data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: { email?: string; phone?: string; nom?: string;first_name?:string } = jwt_decode(token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: decoded.email || '',
          phone: decoded.phone || '',
          nom: decoded.first_name || ''
        }));
      } catch (error) {
        console.error('Invalid token', error); // Log the error to the console
      }
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        toast.success('Inscription réussie ! Please wait for validation!');
        router.push('/coach');
      } else {
        console.error('Coach registration failed');
        toast.error('Registration failed!');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form className="coach-registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nom" className='label'>Nom:</label>
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
        <label htmlFor="spesialite" className="label">Spécialité:</label>
        <input
          type="text"
          id="spesialite"
          name="spesialite"
          value={formData.spesialite}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className='label'>Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group" >
        <label htmlFor="image" className='label' >Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group" >
        <label htmlFor="video" className='label' >video:</label>
        <input
          type="text"
          id="video"
          name="video"
          value={formData.video}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="experiance" className='label'>Expérience:</label>
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
        <label htmlFor="email" className='label'>Email:</label>
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
        <label htmlFor="phone" className='label'>Phone:</label>
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
