import React, { useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import seattleSpursLogo from '../seattle-spurs-logo.png'
import spursLogo from '../spursLogo.png'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luc3kzMDAwIiwiYSI6ImNsb2Frc2llajAxMDMyamxpcTV4M2twaTAifQ.4EwOW1iEmaH8bpj1fB0kVg'

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Home() {

    const [show, setShow] = useState(true);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(47.676340);
    const [lng, setLng] = useState(-122.354010);
    const [zoom, setZoom] = useState(12);

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

        const marker = new mapboxgl.Marker(el)
        .setLngLat([-122.354010,47.676340])
        .addTo(map.current)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<a href="https://www.google.com/maps/place/The+Whit's+End/@47.6763205,-122.3539848,15z/data=!4m2!3m1!1s0x0:0x4e7c15c4fabfefa2?sa=X&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAhbEAA&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAh1EAg" target="_blank"><p className='markerText' style="margin-bottom: 0;">The Whit's End</p></a>`
              )
          );

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    });

    const opacityVariants = {
    nothing: {opacity: 0, transition: {duration: 1}},
    filled: {opacity: 1, transition: {duration: 1.4}}
    }
    
    return (
        <motion.div
        exit={{opacity: 0, transition: {duration: 1}}}
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 1}}}
        >
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.005}px`, backgroundColor:'#ffffff'}}>

            </Row>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.99}px`, backgroundColor:'#132257'}}>
                <Col className='homeCol'>
                    <div style={{height:'50%', width:'80%', textAlign:'center', alignContent:'center',alignItems:'center'}}>
                        <p className='homeText'>Welcome to the home of Seattle Spurs, the Official Tottenham Hotspur Supporters Club in the Puget Sound region since 2014!
Whether you're a seasoned Spurs supporter or are just now falling in love with Lilywhite - we'd love to welcome you to our club.
You'll find us at the Whit's End Bar in Seattle's Phinney Ridge neighborhood for all live match viewings - no matter the hour. All ages, all people, and all dogs allowed!
Be sure to follow us on Twitter and Facebook for all the latest updates!</p>
                    </div>
                </Col>
                <Col className='homeCol'>
                    <a href="https://www.google.com/maps/place/The+Whit's+End/@47.6763205,-122.3539848,15z/data=!4m2!3m1!1s0x0:0x4e7c15c4fabfefa2?sa=X&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAhbEAA&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAh1EAg" target="_blank" style={{textDecorationColor:"#ffffff"}}>
                        <p className='whitsText'>Our Home: The Whit's End</p>
                    </a>
                    <div ref={mapContainer} style={{height:'50%', width:'80%'}}/>
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


            