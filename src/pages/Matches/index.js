import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import matchData from "./matchData.json";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Matches() {

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

    const months = [];

    let matchesAvailable = false;
    const monthsJSON = matchData["data"]["months"];
    const monthsByThirds = {}
    let firstMonthIndex = 0
    let firstMonthFound = false;
    for (let i = 0; i < monthsJSON.length; i++){
        if (monthsJSON[i]["isShown"] && !firstMonthFound){
            firstMonthIndex = i
            firstMonthFound = true
        }
        months.push(monthsJSON[i]["month"]);
        matchesAvailable = true;
        monthsByThirds[monthsJSON[i]["month"]] = []
        for (let j = 0; j < monthsJSON[i]["items"].length; j++){
            if (!isMobile){
                if (j%3===0){
                    monthsByThirds[monthsJSON[i]["month"]].push([monthsJSON[i]["items"][j]])
                }
                else{
                    monthsByThirds[monthsJSON[i]["month"]][(j-(j%3))/3].push(monthsJSON[i]["items"][j])
                }
            }
            else{
                monthsByThirds[monthsJSON[i]["month"]].push([monthsJSON[i]["items"][j]])
            }
            
        }
        monthsByThirds[monthsJSON[i]["month"] + "Count"] = monthsJSON[i]["items"].length
    }

    const [monthIndex, setMonth] = useState(firstMonthIndex);
    
    const onForward = () => {
        setMonth((monthIndex+1)%monthsJSON.length)
    }
    const onBackward = () => {
        if (monthIndex === 0){
            setMonth(monthsJSON.length-1)
        }
        else{
            setMonth(monthIndex-1)
        } 
    }

    const divideFactor = monthsByThirds[months[monthIndex]+"Count"] > 6 ? 5.5 : 4;
    const multFactor = monthsByThirds[months[monthIndex]+"Count"] > 6 ? 1 : 1.25;

    const homeMatchBoxStyle  = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#ffffff', 'outline': ' #756A61 solid 4px',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor}px`
    }

    const awayMatchBoxStyle = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#aaaaaa', 'outline': '#756A61 solid 4px',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor}px`
    }

    const nextHomeMatchBoxStyle  = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#ffffff',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor}px`
    }

    const nextAwayMatchBoxStyle = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#aaaaaa',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor}px`
    } 

    const homeMatchBoxStyleMobile  = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#ffffff', 'outline': ' #756A61 solid 4px',
        'height':`${windowSize.innerHeight*.08}px`,'width':`${windowSize.innerWidth*.8}px`
    }

    const awayMatchBoxStyleMobile = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#aaaaaa', 'outline': '#756A61 solid 4px',
        'height':`${windowSize.innerHeight*.08}px`,'width':`${windowSize.innerWidth*.8}px`
    }

    const nextHomeMatchBoxStyleMobile  = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#ffffff',
        'height':`${windowSize.innerHeight*.08}px`,'width':`${windowSize.innerWidth*.8}px`
    }

    const nextAwayMatchBoxStyleMobile = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#aaaaaa',
        'height':`${windowSize.innerHeight*.08}px`,'width':`${windowSize.innerWidth*.8}px`
    } 

    if (isMobile){
        return (
            <div style={{zIndex:'1',minHeight:'100%',minWidth:'100%'}}>
             <Row style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', minHeight:'7%'}}>
                     <Col style={{justifyContent:'right',display:'flex'}}>
                         <motion.div
                         exit={{opacity: 0, y:windowSize.innerHeight*.4, transition: {duration: 1}}}
                         initial={{opacity: 0, y:-windowSize.innerHeight*.3}}
                         animate={{opacity: 1, y:0, transition: {duration: .5}}}>
                             <ArrowBackIosNewIcon className="arrowHover" sx={{ color: "#ffffff",fontSize: windowSize.innerWidth/22, cursor:'pointer', ":hover":'color: #756A61' }} onClick={onBackward}/>
                         </motion.div>
                     </Col>
                     <Col>
                         <motion.div
                         exit={{opacity: 0, y:windowSize.innerHeight*.4, transition: {duration: 1}}}
                         initial={{opacity: 0, y:-windowSize.innerHeight*.3}}
                         animate={{opacity: 1, y:0, transition: {duration: .5}}}
                         style={{display:"flex",flexDirection:'row', alignItems:"center", justifyContent:"center"}}>
                             <h1 className="matchesMonthText" style={{color:"#ffffff",fontSize: windowSize.innerWidth/22, marginBottom:"0"}}>{months[monthIndex]}</h1>
                         </motion.div>
                     </Col>
                     <Col style={{justifyContent:'left',display:'flex'}}>
                         <motion.div
                         exit={{opacity: 0, y:windowSize.innerHeight*.4, transition: {duration: 1}}}
                         initial={{opacity: 0, y:-windowSize.innerHeight*.3}}
                         animate={{opacity: 1, y:0, transition: {duration: .5}}}>    
                             <ArrowForwardIosIcon className="arrowHover" sx={{ color: "#ffffff",fontSize: windowSize.innerWidth/22, cursor:'pointer' }} onClick={onForward}/>
                         </motion.div>
                     </Col>
                 </Row>
                 <Row style={{height:'92%',display:"flex",justifyContent:"center", alignItems:'center'}}>
                    <Col style={{height:'100%', width:'100%', display:"flex",justifyContent:"center", alignItems:'center',flexDirection:'column'}}>
                        {monthsByThirds[months[monthIndex]].map(function(monthArr, i) {
                            return(
                                <Row style={{height:'100%', width:'100%', display:"flex",justifyContent:"center", alignItems:'center'}}>
                                    {monthArr.map(function(match, j) {
                                        return (
                                            <div style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column', height:`${windowSize.innerHeight*.1}px`} : {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                                <motion.div key={`${i}+${j}+${monthIndex}`} className={match.isNextFixture ? monthsByThirds[months[monthIndex]+"Count"] > 6 ? "smallNextMatch" : "nextMatch" : ""} style={match.isNextFixture ? (match.fixture.homeTeam.name === "Spurs" ? nextHomeMatchBoxStyleMobile : nextAwayMatchBoxStyleMobile) : (match.fixture.homeTeam.name === "Spurs" ? homeMatchBoxStyleMobile : awayMatchBoxStyleMobile) }
                                                exit={{opacity: 0, transition: {duration: 1, delay: (i*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}
                                                initial={{opacity: 0, }}
                                                animate={{opacity: 1, transition: {duration: 1, delay: (i*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}>
                                                    <Col style={{height:'100%', width:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                                        <Row style={{height:'95%', width:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', paddingTop:'5%'}}>
                                                            <Col style={{height:'100%', width:'20%', paddingLeft:'2%', paddingRight:'0', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center'}}>
                                                                <img className="fixtureImage"  style={{height:'100%', width:'100%'}} src={match.fixture.competition.darkCrest.url} alt="competitionCrest"></img>
                                                            </Col>
                                                            <Col style={{height:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', paddingRight:'0'}}>   
                                                                <h4 style={{fontSize:`${(windowSize.innerHeight/140+windowSize.innerHeight/100)*multFactor}px`, marginBottom:'0'}}>{match.fixture.homeTeam.shortName}</h4>
                                                            </Col>
                                                            <Col style={{height:'100%',objectFit:'contain','display':"flex",'justifyContent':"center", 'alignItems':'center', paddingLeft:'0'}}>
                                                                <img className="fixtureImage" style={{height:'90%', width:'90%'}} src={match.fixture.homeTeam.darkCrest.url} alt="homeTeam"></img>
                                                            </Col>
                                                            <Col style={{height:'100%', width:'26.6%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center'}}>
                                                                <h2 style={match.fixture.isFullTime ? {fontSize:`${(windowSize.innerHeight/100+windowSize.innerHeight/70)*multFactor}px`, whiteSpace: "nowrap"} : {fontSize:`${windowSize.innerHeight/100+windowSize.innerHeight/70}px`}}>{match.fixture.isFullTime ? `${match.fixture.homeScore} - ${match.fixture.awayScore}` : " VS "}  </h2>
                                                            </Col>
                                                            <Col style={{height:'100%',objectFit:'contain','display':"flex",'justifyContent':"center", 'alignItems':'center', paddingRight:'0'}}>
                                                                <img className="fixtureImage" style={{height:'90%', width:'90%'}} src={match.fixture.awayTeam.darkCrest.url} alt="awayTeam"></img>
                                                            </Col>
                                                            <Col style={{height:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', paddingLeft:'0'}}>   
                                                                <h4 style={{fontSize:`${(windowSize.innerHeight/140+windowSize.innerHeight/100)*multFactor}px`, marginBottom:'0'}}>{match.fixture.awayTeam.shortName}</h4>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{height:'5%', width:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', marginBottom:'3%', paddingBottom:'8%'}}>
                                                            <p  style={{fontSize:`${(windowSize.innerHeight/70)}px`}}>{match.fixture.kickOff}</p>
                                                        </Row>
                                                    </Col>
                                                </motion.div>
                                                <motion.div key={`${i}+${j}+${monthIndex}text`} style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginTop:'5px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth*.8 + 12}px`, paddingBottom:'1%'}: {paddingTop:'.5%'}) : match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginTop:'16px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth*.8 + 12}px`, paddingBottom:'6%'}: {paddingTop:'2%'}}
                                                exit={{opacity: 0, transition: {duration: 1, delay: (i*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}
                                                initial={{opacity: 0, }}i
                                                animate={{opacity: 1, transition: {duration: 1, delay: (i*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}>
                                                    <p className="matchShowingsText" style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {fontSize:`${windowSize.innerHeight/70}px`, color:'#132257', marginBottom:'0'} :{fontSize:`${windowSize.innerHeight/70}px`}) : (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/70)}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`})}>{match.isNextFixture ? "NEXT MATCH: Showings: Whit's End, Snoqualmie" : "Showings: Whit's End, Snoqualmie"}</p>
                                                </motion.div>
                                                <div style={match.isNextFixture ? {paddingBottom:'3%'}:{}}>

                                                </div>
                                            </div>
                                        )})
                                    }
                                </Row> 
                            )
                        })
                    }
                    </Col>
                 </Row>
            </div>
         )
    }
    else{
        return (
            <div style={{zIndex:'1',minHeight:'100%',minWidth:'100%'}}>
             <Row style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', minHeight:'15%'}}>
                     <Col style={{justifyContent:'right',display:'flex'}}>
                         <motion.div
                         exit={{opacity: 0, y:windowSize.innerHeight*.4, transition: {duration: 1}}}
                         initial={{opacity: 0, y:-windowSize.innerHeight*.3}}
                         animate={{opacity: 1, y:0, transition: {duration: .5}}}>
                             <ArrowBackIosNewIcon className="arrowHover" sx={{ color: "#ffffff",fontSize: windowSize.innerWidth/22, cursor:'pointer', ":hover":'color: #756A61' }} onClick={onBackward}/>
                         </motion.div>
                     </Col>
                     <Col>
                         <motion.div
                         exit={{opacity: 0, y:windowSize.innerHeight*.4, transition: {duration: 1}}}
                         initial={{opacity: 0, y:-windowSize.innerHeight*.3}}
                         animate={{opacity: 1, y:0, transition: {duration: .5}}}>
                             <h1 className="matchesMonthText" style={{color:"#ffffff",fontSize: windowSize.innerWidth/22}}>{months[monthIndex]}</h1>
                         </motion.div>
                     </Col>
                     <Col style={{justifyContent:'left',display:'flex'}}>
                         <motion.div
                         exit={{opacity: 0, y:windowSize.innerHeight*.4, transition: {duration: 1}}}
                         initial={{opacity: 0, y:-windowSize.innerHeight*.3}}
                         animate={{opacity: 1, y:0, transition: {duration: .5}}}>    
                             <ArrowForwardIosIcon className="arrowHover" sx={{ color: "#ffffff",fontSize: windowSize.innerWidth/22, cursor:'pointer' }} onClick={onForward}/>
                         </motion.div>
                     </Col>
                 </Row>
                 <Row style={{height:'85%',display:"flex",justifyContent:"center", alignItems:'center'}}>
                     {monthsByThirds[months[monthIndex]].map(function(monthArr, i) {
                         return(
                             <Row style={{display:"flex",justifyContent:"center", alignItems:'center'}}>
                                 {monthArr.map(function(match, j) {
                                     return (
                                         <Col style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column', height:`${windowSize.innerHeight*.2}px`} : {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                             <motion.div key={`${i}+${j}+${monthIndex}`} className={match.isNextFixture ? monthsByThirds[months[monthIndex]+"Count"] > 6 ? "smallNextMatch" : "nextMatch" : ""} style={match.isNextFixture ? (match.fixture.homeTeam.name === "Spurs" ? nextHomeMatchBoxStyle : nextAwayMatchBoxStyle) : (match.fixture.homeTeam.name === "Spurs" ? homeMatchBoxStyle : awayMatchBoxStyle) }
                                             exit={{opacity: 0, transition: {duration: 1, delay: (i*2.8 + j*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}
                                             initial={{opacity: 0, }}
                                             animate={{opacity: 1, transition: {duration: 1, delay: (i*2.8 + j*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}>
                                                 <Col style={{height:'100%', width:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                                     <Row style={{height:'90%', width:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center'}}>
                                                         <Col style={{height:'100%', width:'80%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column',paddingRight:'0%',paddingLeft:'0%', paddingTop:'4%'}}>
                                                             <Row style={{height:'100%', width:'100%',objectFit:'contain','display':"flex",'justifyContent':"center", 'alignItems':'center'}}>
                                                                 <img className="fixtureImage" style={{height:'90%', width:'90%'}} src={match.fixture.homeTeam.darkCrest.url} alt="homeTeam"></img>
                                                             </Row>
                                                             <Row>   
                                                                 <h4 style={{fontSize:`${(windowSize.innerHeight/70+windowSize.innerHeight/120)*multFactor}px`}}>{match.fixture.homeTeam.shortName}</h4>
                                                             </Row>
                                                         </Col>
                                                         <Col style={{height:'100%', maxWidth:'20%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                                             <Row style={{height:'30%', marginBottom:'60%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center'}}>
                                                                 <img className="fixtureImage"  style={{height:'100%', width:'100%'}} src={match.fixture.competition.darkCrest.url} alt="competitionCrest"></img>
                                                             </Row>
                                                             <Row style={{marginBottom:'60%'}}>
                                                                 <h2 style={match.fixture.isFullTime ? {fontSize:`${(windowSize.innerHeight/50+windowSize.innerHeight/80)*multFactor}px`, whiteSpace: "nowrap"} : {fontSize:`${windowSize.innerHeight/50+windowSize.innerHeight/80}px`}}>{match.fixture.isFullTime ? `${match.fixture.homeScore} - ${match.fixture.awayScore}` : " VS "}  </h2>
                                                             </Row>
                                                         </Col>
                                                         <Col style={{height:'100%', width:'80%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column',paddingRight:'0%',paddingLeft:'0%', paddingTop:'4%'}}>
                                                             <Row style={{height:'100%', width:'100%',objectFit:'contain','display':"flex",'justifyContent':"center", 'alignItems':'center'}}>
                                                                 <img className="fixtureImage" style={{height:'90%', width:'90%'}} src={match.fixture.awayTeam.darkCrest.url} alt="awayTeam"></img>
                                                             </Row>
                                                             <Row>   
                                                                 <h4 style={{fontSize:`${(windowSize.innerHeight/70+windowSize.innerHeight/120)*multFactor}px`}}>{match.fixture.awayTeam.shortName}</h4>
                                                             </Row>
                                                         </Col>
                                                     </Row>
                                                     <Row style={{height:'10%', width:'100%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', marginBottom:'0%', paddingBottom:'8%'}}>
                                                         <p  style={{fontSize:`${(windowSize.innerHeight/120+windowSize.innerHeight/160)*multFactor}px`}}>{match.fixture.kickOff}</p>
                                                     </Row>
                                                 </Col>
                                             </motion.div>
                                             <motion.div key={`${i}+${j}+${monthIndex}text`} style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginTop:'6px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth/divideFactor+12}px`, paddingBottom:'6%'}: {paddingTop:'.5%'}) : match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginTop:'16px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth/divideFactor+32}px`, paddingBottom:'6%'}: {paddingTop:'2%'}}
                                             exit={{opacity: 0, transition: {duration: 1, delay: (i*2.8 + j*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}
                                             initial={{opacity: 0, }}
                                             animate={{opacity: 1, transition: {duration: 1, delay: (i*2.8 + j*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}>
                                                 <p className="matchShowingsText" style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/120+windowSize.innerHeight/170)*multFactor}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/100+windowSize.innerHeight/140}px`}) : (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/100+windowSize.innerHeight/150)*multFactor}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/100+windowSize.innerHeight/140}px`})}>{match.isNextFixture ? "NEXT MATCH: Showings: Whit's End, Snoqualmie" : "Showings: Whit's End, Snoqualmie"}</p>
                                             </motion.div>
                                         </Col>
                                     )})
                                 }
                             </Row> 
                         )
                     })
                 }
                 </Row>
            </div>
         )
    }
}

export default Matches;


/*
 <motion.div className="homeContainer"
            exit={{opacity: 0, transition: {duration: 1}}}
            initial={{opacity: 0}}
            animate={show ? "filled" : "nothing"}
            variants={opacityVariants}>
                <h1 style={isMobile ?  {fontSize:windowSize.innerWidth/25} : {fontSize:windowSize.innerWidth/40}}>{hello ? "Hello" : img ? "I'm Max Ginsberg, a software developer" : desc ? "builder, cook, plant lover, and more..." : "Feel free to explore. Thank you for visiting."}</h1>
            </motion.div>

            {applicants.map(function(data) {
                return (
                    <div>
                    Applicant name:  {data.name}
                    </div>
                )
                })}
            */


            