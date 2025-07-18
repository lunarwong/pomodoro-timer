import Timer from '../components/Timer.jsx'
import BgCustom from '../components/BgCustom.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';
import React from 'react';

import '../css/home.css'

const Home = () => {
    
    //images file 
    const baseUrl = import.meta.env.BASE_URL;
    const imageNames = ["bg1.png"];

    const bgImages = imageNames.map((name) => `${baseUrl}${name}`);


    //set background first image
    const [bgChoose, setBgChoose] = useState(bgImages[0]);

    

    return (
        <>
        <div 
            className='container'
            style={{
                backgroundImage: `url(${bgChoose})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}  
        >        
            <Timer />
        </div>
        <div className='customTab'>
            <BgCustom setBgChoose={setBgChoose} bgImages={bgImages}/>
            <p className='nameTag'>Illustration by <a href="https://www.instagram.com/lunar.wart" target='_blank'><FontAwesomeIcon icon={faInstagram} className='igIcon'/>Lunar.wart</a></p>
        </div>
        </>
        
    )
}

export default Home