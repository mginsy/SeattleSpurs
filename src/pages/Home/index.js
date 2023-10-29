import React, { useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import sonny from '../../photos/Sonny.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luc3kzMDAwIiwiYSI6ImNsb2Frc2llajAxMDMyamxpcTV4M2twaTAifQ.4EwOW1iEmaH8bpj1fB0kVg'

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Home() {

    const [show, setShow] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());


    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

    const opacityVariants = {
    nothing: {opacity: 0, transition: {duration: 1}},
    filled: {opacity: 1, transition: {duration: 1.4}}
    }

    const ThemedButton = styled(Button) ({
        color: '#132257',
        backgroundColor: '#ffffff',
        fontFamily:'totReg',
        '&:hover': {
          backgroundColor: '#756A61',
          color: '#ffffff'
        },
      });
    
    return (
        <motion.div>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.005}px`, backgroundColor:'#ffffff'}}>

            </Row>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.99}px`, backgroundColor:'#132257'}}>
                <Col className='homeCol'>
                    <motion.div
                    exit={{opacity: 1, x: -1000, y:200, transition: {duration: 1}}}
                    initial={{opacity: 1, x: windowSize.innerWidth*1.5,y: windowSize.innerHeight*-.2}}
                    animate={{opacity: 1, x: 0, y:0, transition: {duration: 1, ease: 'easeOut'}}}
                    >
                        <img src={sonny} height={windowSize.innerHeight*.8} alt="Sonny"></img>
                    </motion.div>
                </Col>
                <Col className='homeCol homeColRight'>
                    <Row>
                        <p>
                            <motion.div
                            exit={{opacity: 1, x: 200, transition: {duration: 1}}}
                            initial={{opacity: 0, y: 200}}
                            animate={{opacity: 1, y: 0, transition: {duration: .7, ease: 'easeOut',delay: .3}}}>
                                <span className="welcomeTo" style={{fontSize:windowSize.innerWidth/35}}>Welcome To:</span>
                            </motion.div>
                            <motion.div
                            exit={{opacity: 1, x: 200, transition: {duration: 1}}}
                            initial={{opacity: 0, y: 200}}
                            animate={{opacity: 1, y: 0, transition: {duration: .6, ease: 'easeOut',delay: .6}}}>
                                <span className="homeName" style={{fontSize:windowSize.innerWidth/16}}>Seattle Spurs</span>
                            </motion.div>
                        </p>
                    </Row>
                    <motion.Row style={{width: '100%',justifyContent: 'space-between',display: 'flex', paddingTop:'5%'}}
                    exit={{opacity: 1, x: 200, transition: {duration: 1}}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {duration: 1,delay: 1.2}}}>
                        <Col style={{alignItems:'center', justifyContent: 'center',display:'flex'}}>
                            <Link to="/about">
                                <ThemedButton variant="contained" style={{fontSize:windowSize.innerWidth/70}}>Learn More</ThemedButton>
                            </Link>
                        </Col>
                        <Col style={{alignItems:'center', justifyContent: 'center',display:'flex'}}>
                            <Link to="/matches">
                                <ThemedButton variant="contained" style={{fontSize:windowSize.innerWidth/70}}>Match Schedule</ThemedButton> 
                            </Link>
                        </Col>
                    </motion.Row>
                </Col>
            </Row>
        </motion.div>
       
    )
}

export default Home;


/*
 <motion.div className="homeContainer"
            exit={{opacity: 0, transition: {duration: 1}}}
            initial={{opacity: 0}}
            animate={show ? "filled" : "nothing"}
            variants={opacityVariants}>
                <h1 style={isMobile ?  {fontSize:windowSize.innerWidth/25} : {fontSize:windowSize.innerWidth/40}}>{hello ? "Hello" : img ? "I'm Max Ginsberg, a software developer" : desc ? "builder, cook, plant lover, and more..." : "Feel free to explore. Thank you for visiting."}</h1>
            </motion.div>

            */


            