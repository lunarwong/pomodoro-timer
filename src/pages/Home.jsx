import Timer from '../components/Timer.jsx'
import BgCustom from '../components/BgCustom.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';

import '../css/home.css'

const Home = () => {
    
    //images file 
    const imgFile = ["bg1.PNG"]
    const bgImages = imgFile.map(name => `${import.meta.env.BASE_URL}${name}`);
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