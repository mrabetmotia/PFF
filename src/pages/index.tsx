import React from 'react';
import Contact from '@/components/Contact';
import Coach from '@/components/Coach';
import Shop from '@/components/Shop';
import Exercice from '@/components/Exercice';

function Header() {
 
  return (

<main >
    <div id='main'>
        <div className="header-heading">
            <h2>STEP UP YOUR</h2>
            <h1><span>FITNESS</span> WITH US </h1>
            <div className="header-btns">
            </div>            
        </div>
    </div>
    <h1 className="aboutTitre">Liste of Coach</h1>
    <Coach/>
    <h1 className="aboutTitre">Shop</h1>
    <Shop/>
    <h1 className="aboutTitre">Exercice</h1>
    <Exercice/>
    <div id='presentaion'>
        <div className="pr-heading">
            <h1>A BIG <span>MOTIVATION</span> FOR THIS SUMMER</h1>

        </div>
    </div>
    <>
    <h1 className="aboutTitre"> LEARN MORE ABOUT US </h1>
    <div id='about'>
      
        <div className="aboout-image">
            <img src="/images/about.avif" alt="" />
        </div>
        <div className="about-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam vel est obcaecati soluta beatae. Perferendis eius in eligendi adipisci repellendus?</p>
        </div>

    </div>
    </>
    <Contact/>
    
</main>
  );
 
}

export default Header;
