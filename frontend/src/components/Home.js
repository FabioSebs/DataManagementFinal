import React, { useState } from 'react'
import HomeNav from './HomeNav'
import Footer from './Footer'
import heroFood from '../images/heroFoodBG.PNG'
import heroTech from '../images/TechHeroHome.PNG'
import orangeBlob from '../images/orangeBlob.png'
import heroCosmetic from '../images/CosmeticHeroHome.PNG'
import model1 from '../images/model1.PNG'
import model2 from '../images/model2.PNG'
import model3 from '../images/model3.PNG'
import logo1 from '../images/logo1.PNG'
import logo2 from '../images/logo2.png'
import logo3 from '../images/logo3.PNG'
import newsBg from '../images/newsBg.PNG'
import newsBlob from '../images/newsBlob.png'
import newsFood from '../images/newsFood.PNG'
import newsMakeup from '../images/newsMakeup.PNG'
import newsTech from '../images/newsTech.PNG'
import '../styles/homeNew.css'
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Home = () => {
    const [showSearch, setShowSearch] = useState(true)
    const [pic, setPic] = useState('1')

    const placeholder = () => {
        return (
            <div className='heroPlaceholder'>
                <SearchIcon />
                <p>search products</p>
            </div>
        )
    }

    const togglePlaceholder = () => {
        setShowSearch(!showSearch)
    }

    return (
        <>
            <HomeNav />
            <div className='heroGradient'>
                <div className='heroText'>
                    <p id='welcome'> WELCOME TO</p>
                    <p id='brand'> Radiant Reselling </p>
                    <p id='description'> Expanding your networking and product across the world. </p>


                    {showSearch && placeholder()}

                    <input type="text" className='heroSearch' onClick={togglePlaceholder} />

                    <div className='categories'>
                        <button className='groceryButton' onClick={e => setPic('1')}> Groceries </button>
                        <button className='techButton' onClick={e => setPic('2')}> Technology </button>
                        <button className='cosmeticButton' onClick={e => setPic('3')}> Cosmetics </button>
                    </div>
                </div>
                <div className='heroImgContainer'>
                    {pic === '1' && <img src={heroFood} alt="hero" className='heroLogo' />}
                    {pic === '2' && <img src={heroTech} alt="hero" className='heroLogo' />}
                    {pic === '3' && <img src={heroCosmetic} alt="hero" className='heroLogo' />}

                </div>
            </div>
            <div className='aboutus'>
                <div>
                    <span></span>
                    <h1>  About Us </h1>
                    <span></span>
                </div>
                <h2>Radiant is the leading online shopping platform in Southeast Asia.</h2>
                <p>Launched in 2022, Radiant is a platform tailored for each region and provides an easy, secure and fast online shopping experience for customers through strong payment and logistics support.</p>
                <p>We believe that online shopping should be affordable, easy and fun. This is the vision that Radiant wants to deliver through our platform, every day.</p>
            </div>

            <div className='visionMission'>
                <img className="blob" src={orangeBlob} alt="orangeBlob" />
                <h1>Vission Mission</h1>
                <div>
                    <div className='homeCard'>
                        <h2>Leadership Principles</h2>
                        <p>Our Leadership Principles are more than inspirational wall hangings. The 16 principles guide our discussions and decisions every day.</p>
                        <button type='button'>Learn More <ArrowForwardIcon /></button>
                    </div>
                    <div className='homeCard'>
                        <h2>Our Positions</h2>
                        <p>While our positions are carefully considered and deeply held, there is much room for healthy debate and differing opinions. </p>
                        <button type='button'>Learn More <ArrowForwardIcon /></button>
                    </div>
                    <div className='homeCard'>
                        <h2>Awards</h2>
                        <p>We are honored to be recognized for the work we do on behalf of our customers, employees, and communities every day. </p>
                        <button type='button'>Learn More <ArrowForwardIcon /></button>
                    </div>
                </div>
            </div>

            <div className='clientTestimony'>
                <h1>Our Client Testimonies</h1>
            </div>

            <div className='clientTestimonyContainer'>
                <div className='clientTestimonyCard'>
                    <img src={model1} className='circleImage' />
                    <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam “</p>
                </div>

                <div className='clientTestimonyCard'>
                    <img src={model2} className='circleImage' />
                    <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam “</p>
                </div>

                <div className='clientTestimonyCard'>
                    <img src={model3} className='circleImage' />
                    <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam “</p>
                </div>
            </div>

            <div className='topPartners'>
                <h1>OUR TOP PARTNERS </h1>
                <span></span>
            </div>

            <div className='logoContainer'>
                <div>
                    <img src={logo1} alt="logo" />
                </div>
                <div>
                    <img src={logo2} alt="logo" />
                </div>
                <div>
                    <img src={logo3} alt="logo" />
                </div>
            </div>

            <div className='newsEvents'>
                <span> </span>
                <h1>NEWS & EVENTS</h1>
            </div>

            <div className='newsEventsContainers'>
                <div className='newsLeft'>
                    <img src={newsBg} alt="bgNews" className='newsBg' />
                    <img src={newsBlob} alt="bgBlob" className='newsBlob' />
                    <div>
                        <h1>Giving Tuesday</h1>
                        <p> Whether it was making someone smile, helping a neighbor out, or showing up for an issue you care about, on Giving Tuesday you transformed the way we think about and act on giving all year long.</p>
                        <button> <PlayCircleFilledWhiteIcon /> Watch Now </button>
                    </div>

                </div>
                <div className='newsRight'>
                    <div>
                        <img src={newsMakeup} alt="newCardBg" />
                        <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <img src={newsFood} alt="newCardBg" />
                        <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <img src={newsTech} alt="newCardBg" />
                        <p>“ Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <button type="button"> <ArrowDropDownIcon /> </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
