import React, { useState, useRef } from 'react'
// import Logo from "../images/fakeamazonlogo.jpg"
import '../styles/navbar.css'
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';


function Navbar() {
    let navElements = useRef()
    let navBar = useRef()
    let [page, setPage] = useState('')
    let hero = document.querySelector('#hero')
    let about = document.querySelector('#about')
    let projects = document.querySelector('#projects')
    let contact = document.querySelector('#contact')


    const handleClick = () => {
        navElements.current.classList.toggle('active')
        navBar.current.classList.toggle('active')
    }

    const handlePage = (e) => {
        setPage(e.target.href)
        e.scrollIntoView()
    }


    return (
        <nav className='nav'>
            {/* Logo */}
            {/* <img src={Logo} alt="Amazon Logo" className="logo" /> */}
            {/* Hamburger */}
            <button className="hamburger" onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            {/* Elements */}
            <div className="nav-elements" ref={navElements}>
                <a href="/" ><span></span> <HomeIcon /> Home</a>
                <a href="/reviews" ><span></span> <RateReviewIcon /> Reviews</a>
                <a href="/purchases" ><span></span> <PaidIcon />Purchases</a>
                <a href="/create" ><span></span>  <AddCircleOutlineIcon /> Create </a>
                <a href="/search" ><span></span>  <SearchIcon /> Search </a>
                <a href="/login" ><span></span>  <LoginIcon /> Login </a>
            </div>
        </nav>
    )
}

export default Navbar
