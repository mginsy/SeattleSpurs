import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import _ from 'lodash'

import AnimatedRoutes from './AnimatedRoutes'
import {
    faFacebook,
    faTwitter,
    faInstagram
  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Navbar as BSNavbar, Nav } from 'react-bootstrap'
import {isMobile} from 'react-device-detect';
import spursRainier from '../photos/spurs-rainier.png';
import spursRainierTaupe from '../photos/spurs-rainier-taupe.png';

//this is what creates the app in full. It creates the navbar, which connects all the pages together then creates the app itself which has all the routes to all the pages.

function NavbarLink(props) {
    return (
        <li className="nav-item">
            <Link to={props.to} className="nav-link" onClick={props.onClick}>
                {props.children || ''}
            </Link>
        </li>
    )
}

function Navbar(props) {
    return (
        <BSNavbar expand="lg" {...props} style={{"--bs-navbar-padding-y":0, paddingTop:'1%'}}>
            <Link to="/" className="navbar-brand" style={isMobile ? {"fontSize" : "50px", "marginLeft": "20px", "marginRight": "30px"} : {"fontSize" : "50px", "marginLeft": "60px", "marginRight": "80px"}}>
                <img src={spursRainier} height='100 px' 
                onMouseOver={e => (e.currentTarget.src = spursRainierTaupe)}
                onMouseOut={e => (e.currentTarget.src = spursRainier)} ></img>
            </Link>
            <BSNavbar.Toggle aria-controls="navbar-nav" />

            <BSNavbar.Collapse id="navbar-nav" style={{justifyContent: 'space-between'}}>
                <>
                    <Nav className="mr-auto">
                        <NavbarLink to="/about">About</NavbarLink>
                        <NavbarLink to="/matches">Matches</NavbarLink>
                        <NavbarLink to="/gallery">Gallery</NavbarLink>
                        <NavbarLink to="/contact">Contact</NavbarLink>
                    </Nav>
                    <Nav>
                        <a className="nav-item nav-link" href={"https://www.facebook.com/seattlespurs"} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></a>
                        <a className="nav-item nav-link" href={"https://twitter.com/seattlespurs"} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
                        <a className="nav-item nav-link" href={"https://www.instagram.com/seattlespursofficial/"} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
                    </Nav>
                </>
            </BSNavbar.Collapse>
        </BSNavbar>
    )
}

const myStyle={
    //backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
};

function App() {
    return (
        <div className ="App" style={myStyle}> 
            <Navbar className="primaryHome"/>
            <AnimatedRoutes />
        </div>
    )
}

export default App
