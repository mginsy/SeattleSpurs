import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import romero from '../../photos/Romero.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import {ToggleButton} from '@mui/material';
import ToggleButtonGroup  from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import { InstagramEmbed } from 'react-social-media-embed';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram
  } from '@fortawesome/free-brands-svg-icons';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luc3kzMDAwIiwiYSI6ImNsb2Frc2llajAxMDMyamxpcTV4M2twaTAifQ.4EwOW1iEmaH8bpj1fB0kVg'

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Gallery() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [social, setSocial] = useState("Facebook");


    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

      const changeSocial = (event, newSocial) => {
        setSocial(newSocial);
      };

    const ThemedToggleButton = styled(ToggleButton) ({
        color: '#132257',
        backgroundColor: '#ffffff',
        fontFamily:'totReg'
      });
    
    if (isMobile){
        return (
            <div style={{zIndex:'1'}}>
                <Col style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <Row style={{height:'10%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center', paddingTop:'5%'}}>
                        <motion.div
                            exit={{opacity: 0, x:0, transition: {duration: 1}}}
                            initial={{opacity: 0,  x:0}}
                            animate={{opacity: 1, x:0, transition: {duration: 1}}}
                            style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <ToggleButtonGroup  variant="contained" aria-label="outlined primary button group" style={{justifyContent:'center', width:'fit-content', paddingRight:'0', paddingLeft:'0'}}
                            exclusive="true"
                            >
                                <ThemedToggleButton variant="contained" value="Facebook" onChange={changeSocial} selected={social==="Facebook"} style={{width:window.innerWidth*.2}}><FontAwesomeIcon icon={faFacebook} size="2x"/></ThemedToggleButton>
                                <ThemedToggleButton variant="contained" value="Instagram" onChange={changeSocial} selected={social==="Instagram"} style={{width:window.innerWidth*.2}}><FontAwesomeIcon icon={faInstagram} size="2x"/></ThemedToggleButton>
                            </ToggleButtonGroup >        
                        </motion.div>
                    </Row>
                    <Row style={{height:'80%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {social==="Facebook" ? (
                            <motion.div
                            exit={{opacity: 0, x:0, transition: {duration: 1}}}
                            initial={{opacity: 0,  x:0}}
                            animate={{opacity: 1, x:0, transition: {duration: 1}}}
                            style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fseattlespurs%2Fposts%2Fpfbid02Mfwhe2QKJp8qc5bg5XAPFNJpMd8Pd2BeELVDJHGv8hkrDpWHEJzgPB8JNCNUeEidl&show_text=true&width=500" height={windowSize.innerHeight*.7} width={windowSize.innerWidth/1.2} style={{"border":"none","overflow":"hidden",paddingTop:"10%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                            </motion.div>
                            ) : (
                                <motion.div
                                exit={{opacity: 0, x:300, transition: {duration: 1}}}
                                initial={{opacity: 0, x:300}}
                                animate={{opacity: 1, x:0, transition: {duration: 1}}}
                                style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <InstagramEmbed url="https://www.instagram.com/p/Cz4eh2eycZ9/" width={328} height={windowSize.innerHeight*.6}/>
                                </motion.div>
                            )   
                        }
                    </Row>
                    <Row style={{height:'10%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <motion.div
                        exit={{opacity: 0, x:windowSize.innerWidth, transition: {duration: 1}}}
                        initial={{opacity: 1, x:-200}}
                        animate={{opacity: 1, x:windowSize.innerWidth-200, transition: {duration: 3}}}
                        style={{position: 'absolute', bottom: '0px'}}>
                            <img src={romero} height={windowSize.innerHeight*.1} alt="Romero" style={{position: 'absolute', bottom: '0px', marginBottom:'5%'}}></img>
                        </motion.div>
                    </Row>  
                </Col>
            </div>
           
        )
    }
    else{
        return (
            <div style={{zIndex:'1'}}>
                <Row style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Col style={{height:'80%',width:`${windowSize.innerWidth/3}px`,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <motion.div
                        exit={{opacity: 0, x:-300, transition: {duration: 1}}}
                        initial={{opacity: 0,  x:-300}}
                        animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                            <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fseattlespurs%2Fposts%2Fpfbid02Mfwhe2QKJp8qc5bg5XAPFNJpMd8Pd2BeELVDJHGv8hkrDpWHEJzgPB8JNCNUeEidl&show_text=true&width=500" width={windowSize.innerWidth/3} height={windowSize.innerWidth/3} style={{"border":"none","overflow":"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </motion.div>
                    </Col>
                    <Col style={{height:'80%',width:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <motion.div
                        exit={{opacity: 0, x:300, transition: {duration: 1}}}
                        initial={{opacity: 0, x:300}}
                        animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                            <InstagramEmbed url="https://www.instagram.com/p/Cz4eh2eycZ9/"/>
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
            </div>
           
        )
    }
    
}

export default Gallery;


/*
 <motion.div className="homeContainer"
            exit={{opacity: 0, transition: {duration: 1}}}
            initial={{opacity: 0}}
            animate={show ? "filled" : "nothing"}
            variants={opacityVariants}>
                <h1 style={isMobile ?  {fontSize:windowSize.innerWidth/25} : {fontSize:windowSize.innerWidth/40}}>{hello ? "Hello" : img ? "I'm Max Ginsberg, a software developer" : desc ? "builder, cook, plant lover, and more..." : "Feel free to explore. Thank you for visiting."}</h1>
            </motion.div>

            */


            