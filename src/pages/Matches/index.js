import React, { useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {isMobile} from 'react-device-detect';
import {Row, Col} from 'react-bootstrap';
import loading from '../../photos/loading.gif';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}
function Matches() {

    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [loaded, setLoaded] = useState(false);
    const [months, setMonths] = useState([]);
    const [monthsByThirds, setMonthsByThirds] = useState({});
    const [monthsJSON, setMonthsJSON] = useState({});
    const [monthIndex, setMonth] = useState(0);


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
            const response = await fetch('https://kcqv36sn3gxaqlszkqb6yr63gi0fncvp.lambda-url.us-west-2.on.aws/')
            .then(function(response) {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
              return response.json();
            }).then(async function(data) {
                const reponse2 = await fetch('https://4vmq6evqfxwzajuq2wywdgoc5e0fzuib.lambda-url.us-west-2.on.aws/')
                .then(function(response) {
                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                return response.json();
                }).then(function(data2) {
                    const monthsUE = [];
                    let matchesAvailable = false;
                    const monthsJSONUE = data["data"]["months"];
                    const monthsByThirdsUE = {}
                    let firstMonthIndex = 0
                    let firstMonthFound = false;
                    for (let i = 0; i < monthsJSONUE.length; i++){
                        if (monthsJSONUE[i]["isShown"] && !firstMonthFound){
                            firstMonthIndex = i
                            firstMonthFound = true
                        }
                        monthsUE.push(monthsJSONUE[i]["month"]);
                        matchesAvailable = true;
                        monthsByThirdsUE[monthsJSONUE[i]["month"]] = []
                        for (let j = 0; j < monthsJSONUE[i]["items"].length; j++){
                            const item = monthsJSONUE[i]["items"][j]
                            console.log(data2)
                            console.log(item["fixture"]["kickOffShowingMatch"])
                            if (item["fixture"]["kickOffShowingMatch"] in data2){
                                item["fixture"]["showings"] = data2[item["fixture"]["kickOffShowingMatch"]]
                            }
                            else{
                                item["fixture"]["showings"] = []
                            }
                            if (!isMobile){
                                if (j%3===0){
                                    monthsByThirdsUE[monthsJSONUE[i]["month"]].push([item])
                                }
                                else{
                                    monthsByThirdsUE[monthsJSONUE[i]["month"]][(j-(j%3))/3].push(item)
                                }
                            }
                            else{
                                monthsByThirdsUE[monthsJSONUE[i]["month"]].push([item])
                            }
                            
                        }
                        monthsByThirdsUE[monthsJSONUE[i]["month"] + "Count"] = monthsJSONUE[i]["items"].length
                    }
        
                    setMonths(monthsUE);
                    setMonthsByThirds(monthsByThirdsUE);
                    setMonthsJSON(monthsJSONUE);
                    setMonth(firstMonthIndex);
                    }
                )
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
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor*1.1}px`
    }

    const awayMatchBoxStyle = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#aaaaaa', 'outline': '#756A61 solid 4px',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor*1.1}px`
    }

    const nextHomeMatchBoxStyle  = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#ffffff',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor*1.1}px`
    }

    const nextAwayMatchBoxStyle = {
        'color':"#132257", 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', 'backgroundColor':'#aaaaaa',
        'height':`${windowSize.innerHeight/divideFactor}px`,'width':`${windowSize.innerWidth/divideFactor*1.1}px`
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

    const currentDate = new Date();

    const whitsEndLink = "https://www.google.com/maps/place/The+Whit's+End/@47.6763205,-122.3539848,15z/data=!4m2!3m1!1s0x0:0x4e7c15c4fabfefa2?sa=X&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAhbEAA&ved=2ahUKEwjC5ffa6JmCAxVZEzQIHX6DB-YQ_BJ6BAh1EAg"
    const caskCadesLink = "https://www.google.com/maps/place/CaskCades/@47.1920227,-122.2939725,15z/data=!4m2!3m1!1s0x0:0xb46d807749ee634a?sa=X&ved=2ahUKEwiyycnPn5CDAxWsGjQIHeiWB34Q_BJ6BAhFEAA"

    if (loaded){
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
                             style={{display:"flex",flexDirection:'row', alignItems:"center", justifyContent:"center", margin:0}}>
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
                        <Col style={{height:'100%', width:'100%', display:"flex",justifyContent:"center", alignItems:'center',flexDirection:'column', paddingBottom:'5%',overflow:'auto'}}>
                            {monthsByThirds[months[monthIndex]].map(function(monthArr, i) {
                                return(
                                    <Row style={{height:'100%', width:'100%', display:"flex",justifyContent:"center", alignItems:'center'}}>
                                        {monthArr.map(function(match, j) {
                                            return (
                                                <div style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column', height:`${windowSize.innerHeight*.1}px`} : {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                                    <div style={{position:'absolute', width:'100%', height:'100%', display:'flex','justifyContent':"center", 'alignItems':'center', flexDirection:'column', zIndex:1}}>
                                                        {new Date(match.fixture.kickOff) >= currentDate && (
                                                            <motion.div key={`${i}+${j}+${monthIndex}text`} style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginTop:'5px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth*.8 + 12}px`, paddingBottom:'1%'}: {paddingTop:'.5%'}) : match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginTop:'16px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth*.8 + 12}px`, paddingBottom:'6%'}: {paddingTop:'2%'}}
                                                            exit={{opacity: 0, transition: {duration: 1, delay: (i*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}
                                                            initial={{opacity: 0, }}i
                                                            animate={{opacity: 1, transition: {duration: 1, delay: (i*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}>
                                                                <p className="matchShowingsText" style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {fontSize:`${windowSize.innerHeight/70}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, marginBottom:'0', paddingBottom:'3%'}) : (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/70)}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, marginBottom:'0', paddingBottom:'3%'})}>{match.fixture.showings.length > 0 ? (<span><span>Match Viewing Locations: </span>{match.fixture.showings.map(function(showing, k) {return(<span><a style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {fontSize:`${windowSize.innerHeight/70}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, color:'#ffffff', marginBottom:'0'}) : (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/70)}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, color:'#ffffff', marginBottom:'0'})} href={showing === "The Whit's End" ? (whitsEndLink) : (caskCadesLink)} target="_blank">{showing}</a>{k < match.fixture.showings.length - 1 ? (<span> ,</span>) : (<span></span>)}</span>)})}</span>) : (<span>No Match Viewing Locations Found</span>)}</p>
                                                            </motion.div>
                                                        )}
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
                                                    </div>
                                                    {match.isNextFixture && (
                                                    <motion.div
                                                    exit={{opacity: 0, transition: {duration: 1}}}
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1, transition: {duration: 1}}}
                                                    style={{position:'absolute', paddingTop:windowSize.innerHeight/80}}>
                                                        <motion.div style={{backgroundColor:'#ffffff', minWidth:`${windowSize.innerWidth*.8}px`,minHeight:`${windowSize.innerHeight*.08 + windowSize.innerHeight/39}px`,zIndex:2}}
                                                        exit={{opacity: 0, transition: {duration: 1}}}
                                                        initial={{opacity: 1}}
                                                        animate={{opacity: 0, scale: 1.25, transition: {duration: 3,repeat: Infinity,ease: 'linear'}}}>

                                                        </motion.div>
                                                    </motion.div>
                                                    )
                                                    }
                                                    {match.isNextFixture && (
                                                        <motion.div
                                                        exit={{opacity: 0, transition: {duration: 1}}}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1, transition: {duration: 1}}}
                                                        style={{position:'absolute', paddingTop:windowSize.innerHeight/80}}>
                                                            <motion.div style={{backgroundColor:'#ffffff', minWidth:`${windowSize.innerWidth*.8}px`,minHeight:`${windowSize.innerHeight*.08 + windowSize.innerHeight/39}px`,zIndex:2}}
                                                            exit={{opacity: 0, transition: {duration: 1}}}
                                                            initial={{opacity: 1}}
                                                            animate={{opacity: 0, scale: 1.25 ,transition: {duration: 3,repeat: Infinity,ease: 'linear',delay: 1}}}>

                                                            </motion.div>
                                                        </motion.div>
                                                    )
                                                    }
                                                    {match.isNextFixture && (
                                                        <motion.div
                                                        exit={{opacity: 0, transition: {duration: 1}}}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1, transition: {duration: 1}}}
                                                        style={{position:'absolute', paddingTop:windowSize.innerHeight/80}}>
                                                            <motion.div style={{backgroundColor:'#ffffff', minWidth:`${windowSize.innerWidth*.8}px`,minHeight:`${windowSize.innerHeight*.08 + windowSize.innerHeight/39}px`,zIndex:2}}
                                                            exit={{opacity: 0, transition: {duration: 1}}}
                                                            initial={{opacity: 1}}
                                                            animate={{opacity: 0, scale: 1.25 ,transition: {duration: 3,repeat: Infinity,ease: 'linear',delay: 2}}}>

                                                            </motion.div>
                                                        </motion.div>
                                                    )
                                                    }
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
                 <Row style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', height:'11%',paddingTop:'1%'}}>
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
                                 <h1 className="matchesMonthText" style={{color:"#ffffff",fontSize: windowSize.innerWidth/22, marginBottom: '0'}}>{months[monthIndex]}</h1>
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
                                        console.log(match)
                                         return (
                                             <Col style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column', height:`${windowSize.innerHeight*.2}px`, position:'relative'} : {'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', flexDirection:'column',  position:'relative'}}>
                                                 <div style={{position:'absolute', width:'100%', height:'100%', display:'flex','justifyContent':"center", 'alignItems':'center', flexDirection:'column'}}>
                                                    {new Date(match.fixture.kickOff) < currentDate ? (
                                                        <p className="matchShowingsText" style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? ({fontSize:`${windowSize.innerHeight/70}px`}) : ({fontSize:`${windowSize.innerHeight/53}px`})}> </p>
                                                    ) : (
                                                        <motion.div key={`${i}+${j}+${monthIndex}text`} style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth/divideFactor*1.1+12}px`, zIndex:3}: {paddingBottom:'.5%'}) : match.isNextFixture ? {color:'#132257 !important', backgroundColor:'#ffffff', textAlign:'center', justifyContent:'center', display:'flex',paddingRight:'1%',paddingLeft:'1%', marginBottom:'16px', height:`${windowSize.innerHeight/39}px`, width:`${windowSize.innerWidth/divideFactor+32}px`, zIndex:3}: {paddingBottom:windowSize.innerHeight/100}}
                                                        exit={{opacity: 0, transition: {duration: 1, delay: (i*2.8 + j*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}
                                                        initial={{opacity: 0, }}
                                                        animate={{opacity: 1, transition: {duration: 1, delay: (i*2.8 + j*.7)/monthsByThirds[months[monthIndex]+"Count"]}}}>
                                                            <p className="matchShowingsText" style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {fontSize:`${windowSize.innerHeight/70}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, marginBottom:'0'}) : (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/53)}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/53}px`, marginBottom:'0'})}>{match.fixture.showings.length > 0 ? (<span><span>Match Viewing Locations: </span>{match.fixture.showings.map(function(showing, k) {return(<span><a style={monthsByThirds[months[monthIndex]+"Count"] > 6 ? (match.isNextFixture ? {fontSize:`${windowSize.innerHeight/70}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, color:'#ffffff', marginBottom:'0'}) : (match.isNextFixture ? {fontSize:`${(windowSize.innerHeight/70)}px`, color:'#132257'} :{fontSize:`${windowSize.innerHeight/70}px`, color:'#ffffff', marginBottom:'0'})} href={showing === "The Whit's End" ? (whitsEndLink) : (caskCadesLink)} target="_blank">{showing}</a>{k < match.fixture.showings.length - 1 ? (<span> ,</span>) : (<span></span>)}</span>)})}</span>) : (<span>No Match Viewing Locations Found</span>)}</p>
                                                        </motion.div>
                                                    )}
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
                                                                    <Row style={{height:'30%', marginBottom:'60%', 'textAlign':"center",'display':"flex",'justifyContent':"center", 'alignItems':'center', marginTop:'20%'}}>
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
                                                 </div>
                                                 {match.isNextFixture && (
                                                    <motion.div
                                                    exit={{opacity: 0, transition: {duration: 1}}}
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1, transition: {duration: 1}}}
                                                    style={{position:'absolute', paddingTop:'2.5%'}}>
                                                        <motion.div style={{backgroundColor:'#ffffff', minWidth:`${windowSize.innerWidth/divideFactor*1.1}px`,minHeight:`${windowSize.innerHeight/divideFactor + windowSize.innerHeight/39}px`,zIndex:2}}
                                                        exit={{opacity: 0, transition: {duration: 1}}}
                                                        initial={{opacity: 1}}
                                                        animate={{opacity: 0, scale: 1.25, transition: {duration: 3,repeat: Infinity,ease: 'linear'}}}>

                                                        </motion.div>
                                                    </motion.div>
                                                 )
                                                 }
                                                 {match.isNextFixture && (
                                                    <motion.div
                                                    exit={{opacity: 0, transition: {duration: 1}}}
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1, transition: {duration: 1}}}
                                                    style={{position:'absolute', paddingTop:'2.5%'}}>
                                                        <motion.div style={{backgroundColor:'#ffffff', minWidth:`${windowSize.innerWidth/divideFactor*1.1}px`,minHeight:`${windowSize.innerHeight/divideFactor + windowSize.innerHeight/39}px`,zIndex:2}}
                                                        exit={{opacity: 0, transition: {duration: 1}}}
                                                        initial={{opacity: 1}}
                                                        animate={{opacity: 0, scale: 1.25 ,transition: {duration: 3,repeat: Infinity,ease: 'linear',delay: 1}}}>

                                                        </motion.div>
                                                    </motion.div>
                                                 )
                                                 }
                                                 {match.isNextFixture && (
                                                    <motion.div
                                                    exit={{opacity: 0, transition: {duration: 1}}}
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1, transition: {duration: 1}}}
                                                    style={{position:'absolute', paddingTop:'2.5%'}}>
                                                        <motion.div style={{backgroundColor:'#ffffff', minWidth:`${windowSize.innerWidth/divideFactor*1.1}px`,minHeight:`${windowSize.innerHeight/divideFactor + windowSize.innerHeight/39}px`,zIndex:2}}
                                                        exit={{opacity: 0, transition: {duration: 1}}}
                                                        initial={{opacity: 1}}
                                                        animate={{opacity: 0, scale: 1.25 ,transition: {duration: 3,repeat: Infinity,ease: 'linear',delay: 2}}}>

                                                        </motion.div>
                                                    </motion.div>
                                                 )
                                                 }
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
    else{
        return (
            <div style={{zIndex:'1',minHeight:'100%',minWidth:'100%'}}>
                <Row style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', height:'100%', width:'100%', margin:0}}>
                    <Col  style={{display:'flex',alignItems:'center',justifyContent:'center', textAlign:'center', height:'100%', width:'100%'}}>
                        <img src={loading} alt="Loading..." />
                    </Col>
                </Row>
            </div>
        )     
    }
    
}

export default Matches;


/*

{
    "Version": "2012-10-17",
    "Id": "WebsiteRefererPolicy",
    "Statement": [
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*",
            "Condition": {
                "StringNotLike": {
                    "aws:Referer": [
                        "http://www.example.com/*",
                        "https://www.example.com/*"
                    ]
                }
            }
        }
    ]
}
            */


            
