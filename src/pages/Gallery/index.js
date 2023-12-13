import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
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
import loading from '../../photos/loading.gif';

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Gallery() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [social, setSocial] = useState("Facebook");
    const [fbLinks, setFBLinks] = useState([]);
    const [instaLinks, setInstaLinks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [postIndex, setPostIndex] = useState(0);
    const [reloadInsta, setReloadInsta] = useState(false);
    


    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://rn7s6gam3f57ze7fi7dtfrv5by0uqsvy.lambda-url.us-west-2.on.aws/')
            .then(function(response) {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
              return response.json();
            }).then(function(data) {
                setInstaLinks(data["Instagram"])
                setFBLinks(data["Facebook"])
            }).then(function() {
                setLoaded(true);
                console.log("Loaded Successfully")
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const intervalId = setInterval(() => {
          // Increment seconds every 5 seconds
          setReloadInsta(true);
          setPostIndex((prevCount) => prevCount + 1);
          setReloadInsta(false);
        }, 10000);
    
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);

      const changeSocial = (event, newSocial) => {
        setSocial(newSocial);
      };

    const ThemedToggleButton = styled(ToggleButton) ({
        color: '#132257',
        backgroundColor: '#ffffff',
        fontFamily:'totReg'
      });

    if (loaded){
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
                                    <iframe src={fbLinks[postIndex%fbLinks.length]} height={windowSize.innerHeight*.7} width={windowSize.innerWidth/1.2} style={{"border":"none","overflow":"hidden",paddingTop:"10%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                </motion.div>
                                ) : (
                                    <motion.div
                                    exit={{opacity: 0, x:300, transition: {duration: 1}}}
                                    initial={{opacity: 0, x:300}}
                                    animate={{opacity: 1, x:0, transition: {duration: 1}}}
                                    style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                        {reloadInsta ? (
                                            <p>Loading Instagram...</p>
                                        ) : (
                                            <InstagramEmbed url={instaLinks[postIndex%instaLinks.length]} width={328} height={windowSize.innerHeight*.6}/>
                                        )}
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
                            animate={{opacity: 1, x:0, transition: {duration: 1}}}
                            style={{display:'flex',justifyContent:'center',alignItems:'center', height:'100%', width:'100%'}}>
                                <iframe src={fbLinks[postIndex%fbLinks.length]} width={windowSize.innerWidth/3} height={windowSize.innerHeight/1.5} style={{"border":"none","overflow":"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                            </motion.div>
                        </Col>
                        <Col style={{height:'80%',width:'40%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <motion.div
                            exit={{opacity: 0, x:300, transition: {duration: 1}}}
                            initial={{opacity: 0, x:300}}
                            animate={{opacity: 1, x:0, transition: {duration: 1}}}
                            style={{display:'flex',justifyContent:'center',alignItems:'center', height:'100%', width:'100%'}}>
                                {reloadInsta ? (
                                    <p>Loading Instagram...</p>
                                ) : (
                                    <InstagramEmbed url={instaLinks[postIndex%instaLinks.length]}/>
                                )}
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
    else{
        return (
            <div style={{zIndex:'1',minHeight:'100%',minWidth:'100%'}}>
                <Row style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', height:'100%', width:'100%'}}>
                    <Col  style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', height:'100%', width:'100%'}}>
                        <img src={loading} alt="Loading..." />
                    </Col>
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


            