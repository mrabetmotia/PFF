import React from 'react';
import Contact from '@/components/Contact';

function ContactPage() {
  return (
    <>
      <main>
        <div id='ContactMain'>
          <div className="header-heading">
            <h2>Contact Us</h2>
            <h1> <span> Get in Touch </span></h1>
          </div>
        </div>
        <Contact />
      </main>
    </>
  );
}

export default ContactPage;
