import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import romero from '../../photos/Romero.png'
import 'mapbox-gl/dist/mapbox-gl.css';
import loading from '../../photos/loading.gif';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Gallery() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [photoArr, setPhotoArr] = useState([]);
    const [loaded, setLoaded] = useState(false);
    


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
            const response = await fetch('https://3j6qqqo3o3wefw6teocmq6lwta0ugeph.lambda-url.us-west-2.on.aws/')
            .then(function(response) {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
              return response.json();
            }).then(function(data) {
                let newPhotoArr = []
                for (let i = 0; i < data.length; i++) {
                    newPhotoArr.push({
                        original: data[i],
                        thumbnail: data[i],
                    })
                }
                setPhotoArr(newPhotoArr)
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

    if (loaded){
        if (isMobile){
            return (
                <div style={{zIndex:'1'}}>
                    <Col style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Row style={{height:'90%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center', paddingTop:'5%'}}>
                        <motion.div
                                exit={{opacity: 0, x:0, transition: {duration: 1}}}
                                initial={{opacity: 0,  x:0}}
                                animate={{opacity: 1, x:0, transition: {duration: 1}}}
                                style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Row style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Col style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <ImageGallery items={photoArr} autoPlay={true}/>     
                                        </Col>   
                                    </Row>
                            </motion.div>
                        </Row>
                        <Row style={{height:'10%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <motion.div
                            exit={{opacity: 0, x:windowSize.innerWidth, transition: {duration: 1}}}
                            initial={{opacity: 1, x:-200}}
                            animate={{opacity: 1, x:windowSize.innerWidth-200, transition: {duration: 3}}}
                            style={{position: 'absolute', bottom: '0px'}}>
                                <img src={romero} height={windowSize.innerHeight*.1} alt="Romero" style={{position: 'absolute', bottom: '0px', marginBottom:'1%'}}></img>
                            </motion.div>
                        </Row>  
                    </Col>
                </div>
            
            )
        }
        else{
            return (
                <div style={{zIndex:'1'}}>
                    <Col style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Row style={{maxHeight:'90%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center', paddingTop:'5%'}}>
                            <motion.div
                                exit={{opacity: 0, x:0, transition: {duration: 1}}}
                                initial={{opacity: 0,  x:0}}
                                animate={{opacity: 1, x:0, transition: {duration: 1}}}
                                style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Row style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Col style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <ImageGallery items={photoArr} autoPlay={true}/>     
                                        </Col>   
                                    </Row>
                            </motion.div>
                        </Row>
                        <Row style={{height:'10%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <motion.div
                            exit={{opacity: 0, x:windowSize.innerWidth, transition: {duration: 1}}}
                            initial={{opacity: 1, x:-windowSize.innerWidth*.15}}
                            animate={{opacity: 1, x:windowSize.innerWidth*.85, transition: {duration: 3}}}
                            style={{position: 'absolute', bottom: '0px'}}>
                                <img src={romero} height={windowSize.innerHeight*.1} alt="Romero" style={{position: 'absolute', bottom: '0px', marginBottom:'2%'}}></img>
                            </motion.div>
                        </Row>  
                    </Col>
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


            