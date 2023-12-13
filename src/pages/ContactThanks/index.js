import React, { useState, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import {isMobile} from 'react-device-detect';
import ange from "../../photos/ange.png"
//import 'react-calendar/dist/Calendar.css';

const formColor = 'rgba(117, 106, 97, .7)'
const StyledText = styled(TextField)({
  '& .MuiInputBase-formControl': {
    backgroundColor: formColor,
    color:"#ffffff",
    fontFamily: ['totReg'].join(',')
  },
  '& .MuiInputLabel-formControl': {
    color:"#ffffff",
    fontFamily: ['totReg'].join(',')
  },
});

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

function ContactThanks() {

      const ThemedButton = styled(Button) ({
        color: '#132257',
        backgroundColor: '#ffffff',
        fontFamily:'totReg',
        '&:hover': {
          backgroundColor: '#756A61',
          color: '#ffffff'
        },
      });

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
    
    if (isMobile){
        return (
          <motion.div style={{minHeight:"100%",width:'100%', display:'flex', justifyContent:'center', alignItems:'center', paddingRight:0,paddingLeft:0}}
          exit={{opacity: 0, transition: {duration: 1}}}
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {duration: 1}}}>
            <Col style={{height:"100%",width:'100%'}}>
                <Row style={{height:"30%",width:'100%', display:'flex', justifyContent:'center', alignItems:'center',textAlign:'center', flexDirection:'column'}}>
                    <h3 className="welcomeTo" style={{fontSize:windowSize.innerWidth/15, zIndex:1}}>Thanks for submitting!</h3>
                    <Link to="/">
                        <ThemedButton variant="contained" style={{fontSize:windowSize.innerWidth/30}}>Back to Home</ThemedButton> 
                    </Link>
                </Row>
                <Row style={{height:"70%",width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img src={ange} height={windowSize.innerHeight*.6} alt="Ange" style={{bottom:0, right:0,position:'absolute',objectFit: 'cover', paddingRight:0,paddingLeft:0, width:'100%'}}></img>
                </Row>
            </Col>
        </motion.div>
        )
    
    }
    else{
        return (
            <motion.div style={{minHeight:"100%",width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}
                exit={{opacity: 0, transition: {duration: 1}}}
                initial={{opacity: 0}}
                animate={{opacity: 1, transition: {duration: 1}}}>
                <Row style={{height:"100%",width:'90%'}}>
                    <Col style={{height:"100%",width:'50%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <img src={ange} height={windowSize.innerHeight*.75} alt="Ange" style={{bottom:0, position:'absolute'}}></img>
                    </Col>
                    <Col style={{height:"100%",width:'50%', display:'flex', justifyContent:'center', alignItems:'center',textAlign:'center', flexDirection:'column'}}>
                        <h3 className="welcomeTo" style={{fontSize:windowSize.innerWidth/35, zIndex:1}}>Thanks for submitting!</h3>
                        <Link to="/">
                            <ThemedButton variant="contained" style={{fontSize:windowSize.innerWidth/70}}>Back to Home</ThemedButton> 
                        </Link>
                    </Col>
                </Row>
            </motion.div>
        )
    
    }    
}

export { ContactThanks}
