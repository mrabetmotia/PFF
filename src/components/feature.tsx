import React from 'react'
import Featurebox from './featurebox';
function feature() {
  return (
    <div id='features'>
        <h1>FEATURE</h1>
        <div className="a-container">
            <Featurebox image='/images/1.svg' title="weightLifting"/>
            <Featurebox image='/images/1.svg' title=""/>
            <Featurebox image='/images/3.svg' title=""/>
            <Featurebox image='/images/4.svg' title=""/>
        </div>
    </div>
  )
}

export default feature