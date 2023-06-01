import React from 'react';
import Feature from '@/components/feature';
import Motivation from '@/components/Motivation';
import About from '@/components/About';
import Contact from '@/components/Contact';
function Header() {
 
  return (

<main >
    <div id='main'>
        <div className="header-heading">
            <h2>STEP UP YOUR</h2>
            <h1><span>FITNESS</span> WITH US </h1>
            <p className="details">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellat!</p>
            <div className="header-btns">
                <a href="" className="header-btn">LOGIN NOW</a>    
            </div>            
        </div>
    </div>
    <Feature/>
    <Motivation/>
    <About/>
    <Contact/>
    
</main>
  );
 
}

export default Header;
