import React from 'react'
import {BrowserRouter as Router, Route, useLocation, Routes} from 'react-router-dom'
import _ from 'lodash'

import Home from './Home'
import About from './About'
import Gallery from './Gallery'
import Matches from './Matches'
import {Contact} from './Contact'
import {ContactThanks} from './ContactThanks'

import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes(){
    const location = useLocation();


    return(
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/matches" element={<Matches />}/>
                <Route path="/gallery" element={<Gallery />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/contactThanks" element={<ContactThanks />}/>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes