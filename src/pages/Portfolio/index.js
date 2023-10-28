import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Row, Col} from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {isMobile} from 'react-device-detect';

import LAFoodListPhoto from './photos/LAFoodList.PNG'
import RxMinderPhoto from './photos/RxMinder.PNG'
import WordlePhoto from './photos/Wordle.PNG'
import CompostPhoto from './photos/Compost.PNG'
import ApolloPhoto from './photos/Apollo.PNG'
import ShowcasePhoto from './photos/Showcase.PNG'

import RxMinderPDF from "./files/RxMinder.pdf";
import WordleBotPDF from "./files/WordleBot.pdf";

const photos = [LAFoodListPhoto, RxMinderPhoto, WordlePhoto, CompostPhoto, ApolloPhoto, ShowcasePhoto];
const links = ["https://lafoodlist.com",RxMinderPDF, WordleBotPDF, "https://www.youtube.com/watch?v=aSSw4oRwNZk", "https://devpost.com/software/apollo-a31ibk","https://www.youtube.com/watch?v=vPM-rD34ycs"];
const names = ["lafoodlist.com","RxMinder","Wordle Bot(s)","Compost-O-Matic","Apollo","Makers Showcase 2021"]

// links:
// lafoodlist.com
// RX: pdf
// Wordle: pdf
// compost: https://www.youtube.com/watch?v=aSSw4oRwNZk
// apollo: https://devpost.com/software/apollo-a31ibk
// spring showcase: https://www.youtube.com/watch?v=vPM-rD34ycs

const imageButtonTextColor = "#FFFFFF";

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: .8,
    backgroundSize: 'cover',
    borderRadius:'10px',
    backgroundPosition: 'center 40%',
  });
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    borderRadius:'10px',
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: imageButtonTextColor,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    borderRadius:'10px',
    transition: theme.transitions.create('opacity'),
  }));

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:'10px',
    color: theme.palette.common.white,
  }));
  

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}


function createPhotoButton(ImageButton, photoWidth, photoHeight, photo, link, name){ 
    return(
        <a href={link}
            target="_blank"
            rel="noreferrer">
            <ImageButton
                focusRipple
                key={name}
                style={{
                width: photoWidth.toString()+'px',
                height: photoHeight.toString()+'px',
                borderRadius: '10px',
                boxShadow: '5px 5px 2.5px rgba(120, 134, 138, .4)'
                }}
            >
                <ImageSrc style={{ backgroundImage: `url(${photo})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                    style={{fontFamily:"PatrickHand"}}
                >
                {name}
                <ImageMarked className="MuiImageMarked-root" />
                </Typography>
            </Image>
            </ImageButton>
        </a>
    );
}



function Portfolio() {

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



    let photoWidth = windowSize.innerWidth/4.5;
    let photoHeight = photoWidth/16*9;

    
    let ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: photoHeight.toString()+'px',
        [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        },
        borderRadius:'10px',
        '& .MuiTypography-root': {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        color:imageButtonTextColor,
        fontSize:photoWidth/12,
        borderRadius:'10px'
        },
        '&:hover, &.Mui-focusVisible': {
        zIndex: 2,
        '& .MuiImageBackdrop-root': {
            opacity: 0.05,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
            backgroundColor: 'rgba(0, 0, 0, .12)',
        },
        '& .css-utcns5':{
            opacity: 1
        }
        },
    }));

    let cols1 = [];
    let cols2 = [];
    let mobileRows = [];
    
    if (isMobile){
        for (let i = 0; i < photos.length; i++){
            let photo = photos[i]
            let link = links[i]
            let name = names[i]
               
            mobileRows.push(
                <Row className='expRow'>
                    <Col style={{maxwidth:"20%"}}>
                        <motion.div  className='expCol'
                        exit={{opacity: 0, x:100, transition: {delay: i*.13, duration: 1} }}
                        initial={{opacity: 0, x:-100}}
                        animate={{opacity: 1, x:0, transition: {delay: i*.13, duration: 1}}}>
                            <a href={link} target="_blank" rel="noreferrer" ><p className = "mobilePortfolioText">{name}</p></a>
                        </motion.div>
                    </Col>
                    <Col style={{maxwidth:"20%"}}>
                        <motion.div  className='expCol'
                            exit={{opacity: 0, x:100, transition: {delay: i*.13, duration: 1} }}
                            initial={{opacity: 0, x:-100}}
                            animate={{opacity: 1, x:0, transition: {delay: i*.13, duration: 1}}}>
                                <a href={link} target="_blank" rel="noreferrer"><img  src={photo} style={{height:windowSize.innerHeight*(2/3)/6.0.toString()+'px',borderRadius:'10px'}} alt="AccentureLogo"/></a>
                        </motion.div>
                    </Col>
                </Row>
            )
        }
    }
    else{
            for (let i = 0; i < photos.length; i++){
            let photo = photos[i]
            let link = links[i]
            let name = names[i]
            
            
            if (i < 3){
                cols1.push(
                    <Col className='expCol'>
                        <motion.div  className='expCol'
                        exit={{opacity: 0, y:100, transition: {delay: i*.1, duration: 1} }}
                        initial={{opacity: 0, y:100}}
                        animate={{opacity: 1, y:0, transition: {delay: i*.1, duration: 1}}}>
                            {createPhotoButton(ImageButton, photoWidth, photoHeight, photo, link, name)}
                        </motion.div>
                    </Col>
                )
            }
            else{
                cols2.push(
                    <Col className='expCol'>
                        <motion.div  className='expCol'
                        exit={{opacity: 0, y:100, transition: {delay: i*.1, duration: 1} }}
                        initial={{opacity: 0, y:100}}
                        animate={{opacity: 1, y:0, transition: {delay: i*.1, duration: 1}}}>
                            {createPhotoButton(ImageButton, photoWidth, photoHeight, photo, link, name)}
                        </motion.div>
                    </Col>
                )
            }
        }
    }
    

    if (isMobile){
        return (
            <motion.div className="PortfolioContainerMobile"
            exit={{opacity: 0, transition: {duration: 1.6}}}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 1}}}>
                <Col>
                    {mobileRows}
                </Col>
            </motion.div>
        )
    }
    else{
        return (
            <motion.div className="PortfolioContainer" style={{paddingTop:"5%", height:"95%"}}
            exit={{opacity: 0, transition: {duration: 1.6}}}
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {duration: 1}}}>
                <Row style={{width:'100%', height:'50%'}}>
                    {cols1}
                </Row>
                <Row style={{width:'100%', height:'50%'}}>
                    {cols2}
                </Row>
            </motion.div>
        )
    }
    
}

//  <img  src={LAFoodListPhoto} style={{height:'200px'}}/>
// <h1  style={{color:'#000000'}}>lafoodlist.com</h1>

export default Portfolio