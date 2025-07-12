import '../css/bgCustom.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const BgCustom = ({ setBgChoose, bgImages })=> {
    const [navBarOpen, setNavBarOpen] = useState(false); //toggle nav bar


    function toggleNavBar(e) {
        e.preventDefault();
        setNavBarOpen((prev) => !prev);
    }


    return (
        <>
        <button className='navBarBtn' onClick={toggleNavBar}>
            <FontAwesomeIcon icon={navBarOpen ?  faXmark :faBars} />
        </button>

        {navBarOpen && (
            <div className='navBarContainer'>
                <p>Change Background</p>
                <div className="bgOptions">
                    {bgImages.map((src, index) => (
                        <img 
                            key={index}
                            src={src}
                            alt={`bg${index}`}
                            className='bgThumb'
                            onClick={()=> {
                                setBgChoose(src)
                                setNavBarOpen(false)
                            }}
                        />
                    ))}
                    
                </div>
            </div>
        )}
        </>
        
    )
}

export default BgCustom