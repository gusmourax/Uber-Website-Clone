import React from 'react'

import Logo from '../../assets/logo.svg';

import './style.css'

const Header: React.FC = () => {
    return (
        <header>
            <div className="menu-container">
                <img src={Logo} alt="Uber" height='56' width='64' />
                <div className="links-container" >
                    <ul>
                        <li><span>Ride</span></li>
                        <li><span>Drive</span></li>
                        <li><span>More</span></li>
                    </ul>
                </div>
            </div>
            <div className="subhelp-container" >
                <ul>
                    <li><span>Ajuda</span></li>
                    <li><span>Usuário</span></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;