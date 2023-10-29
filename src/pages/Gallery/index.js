import React, { useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import romero from '../../photos/Romero.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';

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
        <motion.div style={{overflow:'hidden'}}>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.005}px`, backgroundColor:'#ffffff'}}>

            </Row>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.99}px`, backgroundColor:'#132257',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Col style={{height:'80%',width:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <motion.div
                    exit={{opacity: 0, x:-300, transition: {duration: 1}}}
                    initial={{opacity: 0,  x:-300}}
                    animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                        <FacebookEmbed url="https://www.facebook.com/photo.php?fbid=710285324458193&set=pb.100064301965317.-2207520000&type=3"/>
                    </motion.div>
                </Col>
                <Col style={{height:'80%',width:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <motion.div
                    exit={{opacity: 0, x:300, transition: {duration: 1}}}
                    initial={{opacity: 0, x:300}}
                    animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                        <InstagramEmbed url="https://www.instagram.com/p/CyGNENjLauh/"/>
                    </motion.div>
                </Col>
                <motion.div
                    exit={{opacity: 0, x:windowSize.innerWidth, transition: {duration: 1}}}
                    initial={{opacity: 1, x:-300}}
                    animate={{opacity: 1, x:windowSize.innerWidth-300, transition: {duration: 3}}}
                    style={{position: 'absolute', bottom: '0px'}}>
                        <img src={romero} height={windowSize.innerHeight*.1} alt="Romero" style={{position: 'absolute', bottom: '0px'}}></img>
                </motion.div>
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


            