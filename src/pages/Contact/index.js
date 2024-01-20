import React, { useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import axios from 'axios';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {isMobile} from 'react-device-detect';
//import 'react-calendar/dist/Calendar.css';

const formColor = 'rgba(256, 256, 256, .7)'
const StyledText = styled(TextField)({
  '& .MuiInputBase-formControl': {
    backgroundColor: formColor,
    color:"#132257",
    fontFamily: ['totReg'].join(',')
  },
  '& .MuiInputLabel-formControl': {
    color:"#132257",
    fontFamily: ['totReg'].join(',')
  },
});


function Contact() {

    const [nameVal, setNameValue] = useState("");
    const [emailVal, setEmailValue] = useState("");
    const [commentsVal, setCommentsValue] = useState("");
    const [isFilled, setFilled] = useState(false);

    

    const onNameChange = (e) => {
        setNameValue(e.target.value);
        if (e.target.value.length > 0 && 
            emailVal.length > 0 && 
            emailVal.includes("@") && 
            emailVal.includes(".") && 
            commentsVal.length > 0){
            setFilled(true);
        }
        else{
            setFilled(false);
        }
    }
    const onEmailChange = (e) => {
        setEmailValue(e.target.value);
        if (nameVal.length > 0 && 
            e.target.value.length > 0 && 
            emailVal.includes("@") && 
            emailVal.includes(".") && 
            commentsVal.length > 0){
            setFilled(true);
        }
        else{
            setFilled(false);
        }
    }
    const onCommentsChange = (e) => {
        setCommentsValue(e.target.value);
        if (nameVal.length > 0 && 
            emailVal.length > 0 && 
            emailVal.includes("@") && 
            emailVal.includes(".") && 
            e.target.value.length > 0){
            setFilled(true);
        }
        else{
            setFilled(false);
        }
    }

    const sendEmail = (e) => {

        const emailJSON = {"subject":"From Seattle Spurs Website","name":nameVal,"email":emailVal,"message":commentsVal}

        console.log(emailJSON)

        if (!(emailVal.includes("@") && emailVal.includes("."))){ //email wrong
        }
        else if (nameVal.length === 0 || commentsVal.length === 0){ //other thing wrong
        }
        else{ //everything right
            axios.post(`https://lsa5mlkwsp7x7q7c4nfeuk33im0raiaq.lambda-url.us-west-2.on.aws/`, {data:emailJSON},{
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res);
            })
        }
      };

      const StyledButton = styled(Button)({
        textTransform: 'none',
        color: '#132257',
        backgroundColor: "#ffffff",
        border: 'none',
        fontSize: 25,
        fontFamily:"totReg",
        '&:hover': {
          textTransform: 'none',
          color: '#132257',
          backgroundColor: '#d6d6d6',
          borderColor: '#d6d6d6',
          border: 'none'
        },
      });

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
            <motion.div className="bigNoScrollContainer homeContainer"
            exit={{opacity: 0, transition: {duration: 1}}}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 1}}}
            style={{width:'100%', height:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Col style={{width:'100%', height:'100%', display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
                    <Row className="contactRow firstContactRow" style={{width:'80%', height:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <StyledText error={nameVal.length === 0} id="outlined-basic" label="Name" variant="outlined" name="from_name" onChange={onNameChange} />
                    </Row>
                    <Row className="contactRow" style={{width:'80%', height:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <StyledText error={emailVal.length === 0 || !emailVal.includes("@") || !emailVal.includes(".")}  id="outlined-basic" label="Email" variant="outlined" name="from_email" onChange={onEmailChange} />
                    </Row>
                    <Row className="contactRow" style={{width:'80%', height:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <StyledText
                            label="Comments"
                            fullWidth
                            multiline
                            rows={7}
                            style={{textAlign: 'left'}}
                            name="message"
                            size="small"
                            onChange={onCommentsChange}
                            error={commentsVal.length === 0}
                        />
                    </Row>
                    <Row className="contactRow">
                        <Fade in={isFilled}
                            timeout={1000}
                        >
                            <StyledButton
                                component={Link}
                                onClick={sendEmail}
                                size="large"
                                to={{pathname: "/contactThanks"}}
                                
                                variant="outlined"
                                style={{width:'40%'}}>
                                Submit
                            </StyledButton>
                        </Fade>
                    </Row>
                </Col>
            </motion.div>
        )
    
    }
    else{
        return (
            <motion.div className="bigNoScrollContainer homeContainer"
            exit={{opacity: 0, transition: {duration: 1}}}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 1}}}>
                <Row className="contactRow firstContactRow">
                    <Col className="contactCol">
                        <StyledText error={nameVal.length === 0} id="outlined-basic" label="Name" variant="outlined" name="from_name" onChange={onNameChange} />
                    </Col>
                    <Col className="contactCol">
                        <StyledText error={emailVal.length === 0 || !emailVal.includes("@") || !emailVal.includes(".")}  id="outlined-basic" label="Email" variant="outlined" name="from_email" onChange={onEmailChange} />
                    </Col>
                </Row>  
                <Row className="contactRow">
                    <StyledText
                        label="Comments"
                        fullWidth
                        multiline
                        rows={5}
                        style={{textAlign: 'left'}}
                        name="message"
                        size="small"
                        onChange={onCommentsChange}
                        error={commentsVal.length === 0}
                    />
                </Row>
                <Row className="contactRow">
                    <Fade in={isFilled}
                        timeout={1000}
                    >
                        <StyledButton
                            component={Link}
                            onClick={sendEmail}
                            size="large"
                            to={{pathname: "/contactThanks"}}
                            
                            variant="outlined"
                            style={{width:'17%'}}>
                            Submit
                        </StyledButton>
                    </Fade>
                </Row>
            </motion.div>
        )
    
    }    
}

export { Contact}
