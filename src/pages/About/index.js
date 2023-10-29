import React, { useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import seattleSpursLogo from '../../photos/seattle-spurs-logo.png'
import spursLogo from '../../photos/spursLogo.png'
import madders from '../../photos/Madders.png'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luc3kzMDAwIiwiYSI6ImNsb2Frc2llajAxMDMyamxpcTV4M2twaTAifQ.4EwOW1iEmaH8bpj1fB0kVg'

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function About() {

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
        <div>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.005}px`, backgroundColor:'#ffffff'}}>

            </Row>
            <Row style={{minHeight:`${(windowSize.innerHeight-102)*.99}px`, backgroundColor:'#132257'}}>
                <motion.Col style={{maxWidth:'17%'}}
                    exit={{opacity: 0, y:500, transition: {duration: 1}}}
                    initial={{opacity: 0, x:-300}}
                    animate={{opacity: 1, x:0, transition: {duration: 1}}}>
                    <img src={madders} height={windowSize.innerHeight*.6} alt="Madders" style={{position: 'absolute', bottom: '0px'}}></img>
                </motion.Col>
                <Col className='homeCol'>
                    <motion.div style={{height:'70%', width:'80%', textAlign:'center', alignContent:'center',alignItems:'center'}}
                    exit={{opacity: 0, y:-300, transition: {duration: 1}}}
                    initial={{opacity: 0, y:300}}
                    animate={{opacity: 1, y:0, transition: {duration: 1}}}>
                        <p className='homeText' style={{fontSize:windowSize.innerHeight/70+windowSize.innerWidth/100}}>Welcome to the home of Seattle Spurs, the Official Tottenham Hotspur Supporters Club in the Puget Sound region since 2014!
Whether you're a seasoned Spurs supporter or are just now falling in love with Lilywhite - we'd love to welcome you to our club.
You'll find us at the Whit's End Bar in Seattle's Phinney Ridge neighborhood for all live match viewings - no matter the hour. All ages, all people, and all dogs allowed!
Be sure to follow us on Twitter and Facebook for all the latest updates!</p>
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
                        <div ref={mapContainer} style={{height:'50%', width:'80%'}}/>
                    </motion.div>
                </Col>
            </Row>
        </div>
       
    )
}

export default About;


            