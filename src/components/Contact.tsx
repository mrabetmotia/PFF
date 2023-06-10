import * as React from 'react';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

function Contact() {
  const router = useRouter();

  const schema = z.object({
    name: z.string().nonempty(' Name is required'),
    message: z.string().nonempty('Message is required'),
    email: z.string().email('Invalid Email').nonempty('Email is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const handleSaveClient = async (data:any) => {
    try {
      await axios.post('http://localhost:9000/new_contact', data);
      toast('Message Send');
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Message Filed');

    }
  };
  
  return (
    <div id='contact' className=''>
            <h1>CONTACT US</h1>
          <div className='box '>
              <form onSubmit={handleSubmit(handleSaveClient)}>
                  <input {...register('name')}  type="text" placeholder='Name' required />
                  <input {...register('email')}  type="email" placeholder='Your Email' required />
                  <textarea  {...register('message')}   placeholder='Write Your Message ....'  required></textarea>
                  <input type="submit" value='Send'/>
              </form>
            </div>
            <div className=''>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1604.6691316647943!2d10.7244028!3d36.4493808!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130299a2da4fe895%3A0x81375888b980e5d8!2sIMSET%20NABEUL!5e0!3m2!1sfr!2stn!4v1685543130005!5m2!1sfr!2stn"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
    </div>
  )
}

export default Contact