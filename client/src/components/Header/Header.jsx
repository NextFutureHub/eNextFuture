import React, { useState, useEffect} from "react";
import './Header.css'
import { NavLink, useLocation } from 'react-router-dom';
import Hero from './Hero/Hero.jsx'
import Profile from "../Profile/Profile.jsx";

const Header = () => {

    const [showHero, setShowHero] = useState(true);
    const [showProfile, setShowProfile] = useState(true);
    const location = useLocation();


    useEffect(() => {
        if(location.pathname === '/profile'){
            setShowHero(false);
        }else{
            setShowHero(true);
        }
    }, [location]);

    useEffect(() =>{
        if(location.pathname === '/profile'){
            setShowProfile(true);
        }else{
            setShowProfile(false);
        }
    })

    return(
        <main className="background-svg">
            <header>
                <div className="header">
                    <div className="logo">
                        <p>eNextFuture</p>
                    </div>
                    <div className="menu">
                        <nav>
                            <ul>
                                <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active-link' : ""}>Home</NavLink></li>
                                <li><a href="#">About</a></li>
                                <li className={({ isActive }) => isActive ? 'active-link' : ""}><NavLink to="/shop" className={({ isActive }) => isActive ? 'active-link' : ""}>Shop</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="panel">
                        <button><a>Get In touch</a></button>
                        <div className="admin">
                            <NavLink to="/profile">Профиль</NavLink>
                            <NavLink to="/cart">Корзина</NavLink>
                            <a>KZT</a>
                        </div>
                    </div>
                </div>
                    {showHero && <Hero /> }
                    {showProfile && <Profile />}
            </header>
        </main>
    );
}

export default Header;