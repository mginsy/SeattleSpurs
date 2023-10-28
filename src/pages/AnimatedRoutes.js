import React from 'react'
import {BrowserRouter as Router, Route, useLocation, Routes} from 'react-router-dom'
import _ from 'lodash'

import Home from './Home'
import About from './About'
import Portfolio from './Portfolio'
import {Contact} from './Contact'

import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes(){
    const location = useLocation();


    return(
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/portfolio" element={<Portfolio />}/>
                <Route path="/contact" element={<Contact />}/>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes