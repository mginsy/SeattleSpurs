/* eslint import/no-webpack-loader-syntax: off */

import React, { useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import mapboxgl from '!mapbox-gl'
import spursLogo from '../../photos/spursLogo.png'
import members from '../../photos/seattleSpursMembers.jpg'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luc3kzMDAwIiwiYSI6ImNsb2Frc2llajAxMDMyamxpcTV4M2twaTAifQ.4EwOW1iEmaH8bpj1fB0kVg'
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function About() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    
    const mapContainer = useRef(null);
    const map = useRef(null);

    const description = "Our humble beginnings began in January 2014 when we were officially recognized by Tottenham Hotspur. Shortly afterwards, we learned of the friendly to be played by Spurs against the Seattle Sounders that summer. Our mark was made in the realm of football in the Puget Sound area. We are proud to represent the Puget Sound Area. We are proud to represent Tottenham Hotspur. We are the Seattle Spurs Supporters Club. Come On You Spurs!!"

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

      const lat = 47.448;
      const lng = -122.3;
      console.log(windowSize)
      const zoom = isMobile ? 7.8 : windowSize.innerHeight > 700 ? 9 : 8.5;

    useEffect(() => {
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        hash: true
        });


        const el = document.createElement('div');
        const width = 30
        const height = 62
        el.className = 'marker';
        el.style.backgroundImage = spursLogo;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        const marker1 = new mapboxgl.Marker(el)
        .setLngLat([-122.354010,47.676340])
        .addTo(map.current)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<a href="https://www.google.com/maps/place/The+Whit's+End/@47.6763205,-122.3539848,15z/data=!4m2!3m1!1s0x0:0x4e7c15c4fabfefa2?sa=X&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAhbEAA&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAh1EAg" target="_blank"><p className='markerText' style="margin-bottom: 0;">The Whit's End</p></a>`
              )
          );

          const el2 = document.createElement('div');
          el2.className = 'marker';
          el2.style.backgroundImage = spursLogo;
          el2.style.width = `${width}px`;
          el2.style.height = `${height}px`;
          el2.style.backgroundSize = '100%';

        const marker2 = new mapboxgl.Marker(el2)
        .setLngLat([-122.2939725,47.1920227])
        .addTo(map.current)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<a href="https://www.google.com/maps/place/CaskCades/@47.1920227,-122.2939725,15z/data=!4m2!3m1!1s0x0:0xb46d807749ee634a?sa=X&ved=2ahUKEwiyycnPn5CDAxWsGjQIHeiWB34Q_BJ6BAhFEAA" target="_blank"><p className='markerText' style="margin-bottom: 0;">CaskCades</p></a>`
              )
          );

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    });
    
    if (isMobile){
        return (
            <div style={{zIndex:'1',minHeight:'100%',minWidth:'100%', justifyContent:"center",alignItems:'center',display:"flex",flexDirection:"column"}}>
                <Row style={{height:'10%',width:'100%','--bs-gutter-x':'0', paddingTop:'2%'}}>
                    <div style={{width:'100%', textAlign:'center', justifyContent:'center'}}>
                        <h1 className='homeText' style={{fontSize:windowSize.innerHeight/30+windowSize.innerWidth/60}}>
                            <motion.span
                            exit={{opacity: 0, transition: {duration: .5,delay: .3}}}
                            initial={{opacity: 0, }}
                            animate={{opacity: 1, transition: {duration: 1,delay: 1}}}>
                                <span>TO </span>
                            </motion.span>
                            <motion.span
                            exit={{opacity: 0, transition: {duration: .5,delay: .2}}}
                            initial={{opacity: 0, }}
                            animate={{opacity: 1, transition: {duration: 1,delay: 1.4}}}>
                                <span>DARE </span>
                            </motion.span>
                            <motion.span
                            exit={{opacity: 0, transition: {duration: .5,delay: .1}}}
                            initial={{opacity: 0, }}
                            animate={{opacity: 1, transition: {duration: 1,delay: 1.8}}}>
                                <span>IS TO </span>
                            </motion.span>
                            <motion.span
                            exit={{opacity: 0, transition: {duration: .5,delay: 0}}}
                            initial={{opacity: 0, }}
                            animate={{opacity: 1, transition: {duration: 1,delay: 2.2}}}>
                                <span>DO</span>
                            </motion.span>   
                        </h1>
                    </div>
                </Row>
                <Row style={{height:'50%',width:'100%','--bs-gutter-x':'0', justifyContent:"center",alignItems:'center',display:"flex", marginTop:'2%'}}>
                    <Col style={{height:'100%',width:'50%','--bs-gutter-x':'0', justifyContent:"center",alignItems:'center',display:"flex"}}>
                        <motion.div style={{height:'100%',width:'100%'}}
                        exit={{opacity: 0, x:-windowSize.innerWidth/2, transition: {duration: 1}}}
                        initial={{opacity: 0, x:-windowSize.innerWidth/2}}
                        animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                            <div ref={mapContainer} style={{height:'100%', width:'100%'}}/>
                        </motion.div>
                    </Col>
                    <Col style={{height:'100%',width:'50%','--bs-gutter-x':'0', justifyContent:"center",alignItems:'center',display:"flex"}}>
                        <motion.div style={{height:'100%',width:'100%', textAlign:'center', justifyContent:"center",alignItems:'center',display:"flex"}}
                        exit={{opacity: 0, x:windowSize.innerWidth/2, transition: {duration: 1}}}
                        initial={{opacity: 0, x:windowSize.innerWidth/2}}
                        animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                            <p className='homeText' style={{fontSize:windowSize.innerHeight/90+windowSize.innerWidth/110, paddingRight:'2%', paddingLeft:'2%'}}>{description}</p>
                        </motion.div> 
                    </Col>
                </Row>
                <Row style={{height:'30%',width:'100%','--bs-gutter-x':'0', marginTop:'6%', justifyContent:"center",alignItems:'center',display:"flex",bottom:0}}>
                    <motion.div style={{height:'100%',width:'100%', display:'flex'}}
                    exit={{opacity: 0, y:windowSize.innerHeight/3, transition: {duration: 1}}}
                    initial={{opacity: 0, y:windowSize.innerHeight/3}}
                    animate={{opacity: 1, y:0, transition: {duration: 1}}}>
                        <img src={members} alt="members" style={{overflow:'hidden', objectFit:'cover', width:'100%'}}/> 
                    </motion.div>
                </Row>
            </div>
        )
    }
    else{
        return (
            <div style={{zIndex:'1',minHeight:'100%',minWidth:'100%'}}>
                 <Row style={{height:'100%',width:'100%','--bs-gutter-x':'0'}}>
                    <Col style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                        <Row style={{height:'70%', paddingRight:'4%', justifyContent:'center', alignItems:'center', display:'flex'}}>
                            <Col style={{width:'40%', textAlign:'center', justifyContent:'center', alignItems:'center', display:'flex'}}>
                                <div style={{width:'50%', textAlign:'center', justifyContent:'center'}}>
                                    <h1 className='homeText' style={{fontSize:windowSize.innerHeight/20+windowSize.innerWidth/40}}>
                                        <motion.div
                                        exit={{opacity: 0, transition: {duration: .5,delay: .3}}}
                                        initial={{opacity: 0, }}
                                        animate={{opacity: 1, transition: {duration: 1,delay: 1}}}>
                                            <span>TO</span>
                                        </motion.div>
                                        <motion.div
                                        exit={{opacity: 0, transition: {duration: .5,delay: .2}}}
                                        initial={{opacity: 0, }}
                                        animate={{opacity: 1, transition: {duration: 1,delay: 1.4}}}>
                                            <span>DARE</span>
                                        </motion.div>
                                        <motion.div
                                        exit={{opacity: 0, transition: {duration: .5,delay: .1}}}
                                        initial={{opacity: 0, }}
                                        animate={{opacity: 1, transition: {duration: 1,delay: 1.8}}}>
                                            <span>IS TO</span>
                                        </motion.div>
                                        <motion.div
                                        exit={{opacity: 0, transition: {duration: .5,delay: 0}}}
                                        initial={{opacity: 0, }}
                                        animate={{opacity: 1, transition: {duration: 1,delay: 2.2}}}>
                                            <span>DO</span>
                                        </motion.div>   
                                    </h1>
                                </div>
                            </Col>
                            <Col style={{width:'60%', height:'70%', justifyContent:'right', alignItems:'right', display:'flex'}}>
                                <motion.div style={{height:'100%',width:'100%', display:'flex'}}
                                exit={{opacity: 0, transition: {duration: 1}}}
                                initial={{opacity: 0, x:-windowSize.innerWidth*2/3}}
                                animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                                    <img src={members} alt="members" style={{overflow:'hidden', objectFit:'cover', width:'100%'}}/> 
                                </motion.div>
                            </Col>
                        </Row>
                        <Row style={{height:'30%', alignItems:'center', paddingLeft:'7%', paddingRight:'5%', paddingBottom:'5%'}}>
                        <motion.div style={{height:'100%',width:'100%'}}
                        exit={{opacity: 0, x:-windowSize.innerWidth*2/3, transition: {duration: 1}}}
                        initial={{opacity: 0, x:-windowSize.innerWidth*2/3}}
                        animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                            <p className='homeText' style={{fontSize:windowSize.innerHeight/120+windowSize.innerWidth/150, paddingRight:'2%', paddingLeft:'2%'}}>{description}</p>
                        </motion.div>        
                        </Row>
                    </Col>
                    <Col style={{height:'100%',maxWidth:'30%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <motion.div style={{height:'100%',width:'100%'}}
                            exit={{opacity: 0, x:windowSize.innerWidth/3, transition: {duration: 1}}}
                            initial={{opacity: 0, x:windowSize.innerWidth/3}}
                            animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                                <div ref={mapContainer} style={{height:'100%', width:'100%'}}/>
                            </motion.div>
                    </Col>
                </Row>
            </div>
           
        )
    }
}

export default About;

/*
<Col style={{maxWidth:'17%'}}>
                    <motion.div style={{height:'100%',width:'100%'}}
                    exit={{opacity: 0, y:500, transition: {duration: 1}}}
                    initial={{opacity: 0, x:-300}}
                    animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                        <img src={madders} height={windowSize.innerHeight*.6} alt="Madders" style={{position: 'absolute', bottom: '0px'}}/>
                    </motion.div>
                </Col>
                <Col className='homeCol'>
                    <motion.div style={{height:'70%', width:'80%', textAlign:'center', alignContent:'center',alignItems:'center'}}
                    exit={{opacity: 0, y:-300, transition: {duration: 1}}}
                    initial={{opacity: 0, y:300}}
                    animate={{opacity: 1, y:0, transition: {duration: 1}}}>
                    </motion.div>
                </Col>
                <Col className='homeCol'>
                    <motion.div
                    exit={{opacity: 0, y: -300, transition: {duration: 1}}}
                    initial={{opacity: 0, y:300}}
                    animate={{opacity: 1, y:0, transition: {duration: 1}}}
                    style={{minWidth:'100%',minHeight:'100%'}}
                    className='homeCol'>
                        <a href="https://www.google.com/maps/place/The+Whit's+End/@47.6763205,-122.3539848,15z/data=!4m2!3m1!1s0x0:0x4e7c15c4fabfefa2?sa=X&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAhbEAA&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAh1EAg" target="_blank" style={{textDecorationColor:"#ffffff"}}>
                            <p className='whitsText' style={{fontSize:windowSize.innerWidth/40}}>Our Home: The Whit's End</p>
                        </a>
                        
                    </motion.div>
                </Col>
                */

