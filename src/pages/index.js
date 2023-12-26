import React, { useState, useEffect, useRef} from 'react';
import { BrowserRouter as Switch, Link } from 'react-router-dom'
import _ from 'lodash'

import AnimatedRoutes from './AnimatedRoutes'
import {
    faFacebook,
    faTwitter,
    faInstagram
  } from '@fortawesome/free-brands-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Navbar as BSNavbar, Nav } from 'react-bootstrap'
import {isMobile} from 'react-device-detect';
import spursRainier from '../photos/spurs-rainier.png';
import spursRainierTaupe from '../photos/spurs-rainier-taupe.png';
import NET from 'vanta/dist/vanta.net.min.js'
import {Row, Col} from 'react-bootstrap';
import vantaStable from './VantaStable.png'

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

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

function Navbar(props) {

    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [expanded, setExpanded] = useState(false);


    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);
    
    if (isMobile){
        return (
            <BSNavbar expand="lg" {...props} style={{"--bs-navbar-padding-y":0, justifyContent:"space-evenly", paddingTop:'5%'}} expanded={expanded}>
                <Link to="/" className="navbar-brand" style={isMobile ? {"fontSize" : "50px", "marginLeft": "20px", "marginRight": "30px", display:'flex',height:'100%',alignItems:'end'} : {"fontSize" : "50px", "marginLeft": "60px", "marginRight": "80px", display:'flex',height:'100%',alignItems:'end'}}  onClick={() => setExpanded(false)}>
                    <img src={spursRainier} height={`${windowSize.innerHeight/15}px`}
                    onMouseOver={e => (e.currentTarget.src = spursRainierTaupe)}
                    onMouseOut={e => (e.currentTarget.src = spursRainier)}></img>
                </Link>
                <BSNavbar.Toggle aria-controls="navbar-nav" style={{borderColor:"#ffffff"}}  onClick={() => setExpanded(!expanded)}>
                    <FontAwesomeIcon icon={faBars} style={{color: "#ffffff"}} />
                </BSNavbar.Toggle>
                <BSNavbar.Collapse id="navbar-nav" style={{fontSize : `15px`}}>
                    <>
                        <Row style={{width:"100%",margin:'0'}}>
                            <Col>
                                <Nav className="mr-auto" style={{display:'flex',alignItems:'center',justifyContent:"center", textAlign:"center"}}>
                                    <NavbarLink style={{marginRight:'0'}} to="/about" onClick={() => setExpanded(expanded ? false : "expanded")}>About</NavbarLink>
                                    <NavbarLink to="/matches" onClick={() => setExpanded(expanded ? false : "expanded")}>Matches</NavbarLink>
                                    <NavbarLink to="/gallery" onClick={() => setExpanded(expanded ? false : "expanded")}>Gallery</NavbarLink>
                                    <NavbarLink to="/contact" onClick={() => setExpanded(expanded ? false : "expanded")}>Contact</NavbarLink>
                                </Nav>
                            </Col>
                            <Col>
                                <Nav style={{display:'flex',alignItems:'center',justifyContent:"center"}}>
                                    <a className="nav-item nav-link" href={"https://digitalspurs.com/collections/seattle-spurs"} target="_blank" rel="noreferrer">Shop</a>
                                    <a style={{display:'flex',alignItems:'center',justifyContent:"center", height:'33%'}} className="nav-item nav-link" href={"https://www.facebook.com/seattlespurs"} target="_blank" rel="noreferrer" onClick={() => setExpanded(expanded ? false : "expanded")}><FontAwesomeIcon icon={faFacebook} size="2x"/></a>
                                    <a style={{display:'flex',alignItems:'center',justifyContent:"center", height:'33%'}} className="nav-item nav-link" href={"https://twitter.com/seattlespurs"} target="_blank" rel="noreferrer" onClick={() => setExpanded(expanded ? false : "expanded")}><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
                                    <a style={{display:'flex',alignItems:'center',justifyContent:"center", height:'33%'}} className="nav-item nav-link" href={"https://www.instagram.com/seattle_spurs/"} target="_blank" rel="noreferrer" onClick={() => setExpanded(expanded ? false : "expanded")}><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Nav style={{display:'flex',alignItems:'center',justifyContent:"center"}}>
                                <a className="nav-item nav-link" style={{"fontSize" : "14px"}} href={"https://www.linkedin.com/in/max-ginsberg-729215159/"} target="_blank" rel="noreferrer" onClick={() => setExpanded(expanded ? false : "expanded")}>Website Made by Max Ginsberg</a>
                            </Nav>
                        </Row>
                    </>
                </BSNavbar.Collapse>
            </BSNavbar>
        )
    }
    else{
        return (
            <BSNavbar expand="lg" {...props} style={{"--bs-navbar-padding-y":0, height:`${windowSize.innerHeight/8.5}px`}}>
                <Link to="/" className="navbar-brand" style={isMobile ? {"fontSize" : "50px", "marginLeft": "20px", "marginRight": "30px", display:'flex',height:'100%',alignItems:'end'} : {"fontSize" : "50px", "marginLeft": "60px", "marginRight": "80px", display:'flex',height:'100%',alignItems:'end'}}>
                    <img src={spursRainier} height={`${windowSize.innerHeight/10.09}px`}
                    onMouseOver={e => (e.currentTarget.src = spursRainierTaupe)}
                    onMouseOut={e => (e.currentTarget.src = spursRainier)}></img>
                </Link>
                <BSNavbar.Toggle aria-controls="navbar-nav" />

                <BSNavbar.Collapse id="navbar-nav" style={{justifyContent: 'space-between',fontSize : `${windowSize.innerWidth/55}px`}}>
                    <>
                        <Nav className="mr-auto">
                            <NavbarLink to="/about">About</NavbarLink>
                            <NavbarLink to="/matches">Matches</NavbarLink>
                            <NavbarLink to="/gallery">Gallery</NavbarLink>
                            <NavbarLink to="/contact">Contact</NavbarLink>
                            <a className="nav-item nav-link" href={"https://digitalspurs.com/collections/seattle-spurs"} target="_blank" rel="noreferrer">Shop</a>
                        </Nav>
                        <Nav>
                            <a className="nav-item nav-link" href={"https://www.facebook.com/seattlespurs"} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></a>
                            <a className="nav-item nav-link" href={"https://twitter.com/seattlespurs"} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x"/></a>
                            <a className="nav-item nav-link" href={"https://www.instagram.com/seattle_spurs/"} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x"/></a>
                        </Nav>
                    </>
                </BSNavbar.Collapse>
            </BSNavbar>
        )
    }
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
    const [vantaEffect, setVantaEffect] = useState(null)
    const mobileRef = useRef(null)
    const desktopRef = useRef(null)

    useEffect(() => {
        if (!isMobile){
            if (!vantaEffect) {
                setVantaEffect(NET({
                    el: desktopRef.current,
                    color: '#756A61',
                    backgroundColor: '#132257',
                    mouseControls: false,
                    touchControls: false,
                    points: 13.00
                }))
                }
                return () => {
                if (vantaEffect) vantaEffect.destroy()
                }
        }
    }, [vantaEffect])
    
   

    const [windowSize, setWindowSize] = useState(getWindowSize())


    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    return (
        <div className ="App" style={myStyle}> 
            <Navbar className="primaryHome"/>
            <Row style={{minHeight:`${(windowSize.innerHeight- (isMobile ? windowSize.innerHeight/15 : windowSize.innerHeight/8.5))*.005}px`, backgroundColor:'#ffffff'}}>

            </Row>
            <Row style={{minHeight:`${(windowSize.innerHeight- (isMobile ? windowSize.innerHeight/15 : windowSize.innerHeight/8.5))*.995}px`, zIndex:'0', backgroundColor:'#132257', backgroundImage:`url(${vantaStable})`}} ref={isMobile ? mobileRef : desktopRef}>
                <AnimatedRoutes />
            </Row>
        </div>
    )
}

export default App
