import React, { useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import axios from 'axios';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
//import 'react-calendar/dist/Calendar.css';

const formColor = 'rgba(215, 241, 236, .4)'
const StyledText = styled(TextField)({
  '& .MuiInputBase-formControl': {
    backgroundColor: formColor,
    fontFamily: ['PatrickHand'].join(',')
  },
  '& .MuiInputLabel-formControl': {
    fontFamily: ['PatrickHand'].join(',')
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

        const emailJSON = {"subject":"From Personal Website","name":nameVal,"email":emailVal,"message":commentsVal}

        console.log(emailJSON)

        if (!(emailVal.includes("@") && emailVal.includes("."))){ //email wrong
        }
        else if (nameVal.length === 0 || commentsVal.length === 0){ //other thing wrong
        }
        else{ //everything right
            axios.post(`https://lafoodemailserver.herokuapp.com/sendEmail`, emailJSON)
            .then(res => {
                console.log(res);
            })
        }
      };

      const StyledButton = styled(Button)({
        textTransform: 'none',
        color: '#3c5124',
        backgroundColor: formColor,
        border: 'none',
        fontSize: 25,
        fontFamily:"PatrickHand",
        '&:hover': {
          textTransform: 'none',
          color: '#3c5124',
          backgroundColor: 'rgba(215, 241, 236, .7)',
          borderColor: 'rgba(215, 241, 236, .7)',
          border: 'none'
        },
      });
    
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
                        to={{pathname: "/"}}
                        loadingIndicator="Loading…"
                        variant="outlined">
                        Submit
                    </StyledButton>
                </Fade>
            </Row>
        </motion.div>
    )

    
}

export { Contact}
