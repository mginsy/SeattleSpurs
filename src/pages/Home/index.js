import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
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

    const ThemedButton = styled(Button) ({
        color: '#132257',
        backgroundColor: '#ffffff',
        fontFamily:'totReg',
        '&:hover': {
          backgroundColor: '#756A61',
          color: '#ffffff'
        },
      });
    if (isMobile){
        return (
            <div style={{zIndex:'1'}}>
                <Col style={{width:"100%",height:'100%'}}>
                    <Row style={{width:'100%',height:"30%", margin:'0',padding:'0'}}>
                        <Col style={{width:'100%',height:"100%"}}>
                            <Row style={{textAlign:"center", paddingTop:'6%', width:'100%', margin:'0'}}>
                                <p>
                                    <motion.div
                                    exit={{opacity: 0, x: 200, transition: {duration: 1}}}
                                    initial={{opacity: 0, y: 200}}
                                    animate={{opacity: 1, y: 0, transition: {duration: .7, ease: 'easeOut',delay: .3}}}>
                                        <span className="welcomeTo" style={{fontSize:windowSize.innerWidth/13}}>Welcome To:</span>
                                    </motion.div>
                                    <motion.div
                                    exit={{opacity: 0, x: 200, transition: {duration: 1}}}
                                    initial={{opacity: 0, y: 200}}
                                    animate={{opacity: 1, y: 0, transition: {duration: .6, ease: 'easeOut',delay: .6}}}>
                                        <span className="homeName" style={{fontSize:windowSize.innerWidth/8}}>Seattle Spurs</span>
                                    </motion.div>
                                </p>
                            </Row>
                            <Row style={{width: '100%',justifyContent: 'space-between',display: 'flex', paddingTop:'5%', margin:'0'}}>
                                <motion.div
                                exit={{opacity: 0, x: 200, transition: {duration: 1}}}
                                initial={{opacity: 0}}
                                animate={{opacity: 1, transition: {duration: 1,delay: 1.2}}}>
                                    <Row>
                                        <Col style={{alignItems:'center', justifyContent: 'center',display:'flex'}}>
                                            <Link to="/about">
                                                <ThemedButton variant="contained" style={{fontSize:windowSize.innerWidth/29}}>Learn More</ThemedButton>
                                            </Link>
                                        </Col>
                                        <Col style={{alignItems:'center', justifyContent: 'center',display:'flex'}}>
                                            <Link to="/matches">
                                                <ThemedButton variant="contained" style={{fontSize:windowSize.innerWidth/29}}>Match Schedule</ThemedButton> 
                                            </Link>
                                        </Col>
                                    </Row>
                                </motion.div>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{height:"70%",  width:'100%', margin:'0', paddingLeft:'10%'}}>
                        <motion.div
                        exit={{opacity: 1, x: -windowSize.innerWidth*1, y:200, transition: {duration: 1}}}
                        initial={{opacity: 1, x: windowSize.innerWidth*1.5,y: windowSize.innerHeight*-.2}}
                        animate={{opacity: 1, x: 0, y:0, transition: {duration: 1, ease: 'easeOut'}}}
                        style={{alignItems:"center",justifyContent:"center",display:'flex'}}
                        >
                            <img src={sonny} height={windowSize.innerHeight*.6} alt="Sonny"></img>
                        </motion.div>
                    </Row>
                </Col>
            </div>
        )
    }
    else{
        return (
            <div style={{zIndex:'1'}}>
                <Row style={{paddingTop:'2.5%', textAlign:'right'}}>
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
                                exit={{opacity: 0, x: 200, transition: {duration: 1}}}
                                initial={{opacity: 0, y: 200}}
                                animate={{opacity: 1, y: 0, transition: {duration: .7, ease: 'easeOut',delay: .3}}}>
                                    <span className="welcomeTo" style={{fontSize:windowSize.innerWidth/35}}>Welcome To:</span>
                                </motion.div>
                                <motion.div
                                exit={{opacity: 0, x: 200, transition: {duration: 1}}}
                                initial={{opacity: 0, y: 200}}
                                animate={{opacity: 1, y: 0, transition: {duration: .6, ease: 'easeOut',delay: .6}}}>
                                    <span className="homeName" style={{fontSize:windowSize.innerWidth/16}}>Seattle Spurs</span>
                                </motion.div>
                            </p>
                        </Row>
                        <Row style={{width: '100%',justifyContent: 'space-between',display: 'flex', paddingTop:'5%'}}>
                            <motion.div
                            exit={{opacity: 0, x: 200, transition: {duration: 1}}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: {duration: 1,delay: 1.2}}}>
                                <Row>
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
                                </Row>
                            </motion.div>
                        </Row>
                    </Col>
                    <motion.div
                    exit={{opacity: 0, transition: {duration: 1}}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {duration: 1}}}>
                        <a className="welcomeTo" style={{fontSize:windowSize.innerWidth/90, textDecoration:"none", float:"right", paddingRight:'3%'}} href={"https://www.linkedin.com/in/max-ginsberg-729215159/"} target="_blank" rel="noreferrer">Website Made by Max Ginsberg</a>
                    </motion.div>
                </Row>
            </div>
           
        )
    }
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


            