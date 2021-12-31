import React from 'react'
import Navbar from './Navbar'
import '../styles/register.css'
import Blob from '../images/BlobDesign.PNG'

const Register = () => {
    return (
        <>
            <Navbar />
            <div className='registerContainer'>

                <img src={Blob} alt='Blob BG' />
                <div className='registerFormContainer'>
                    <form>

                        <h2 className='registerTitle'> Create Your Account </h2>

                        <div className='nameSection'>
                            <div>
                                <label> First Name : </label>
                                <input className="regformInput" id='regnameInput'></input>
                            </div>

                            <div>
                                <label> Last Name : </label>
                                <input className="regformInput" id='reglastnameInput'></input>
                            </div>
                        </div>

                        <div className='emailSection'>
                            <label> Email </label>
                            <input className="regformInput" id='regemailInput'></input>
                        </div>

                        <div className='passwordSection'>
                            <div>
                                <label> Password :</label>
                                <input className="regformInput" id="regpasswordInput"></input>
                            </div>
                            <div>
                                <label> Confirm Password :</label>
                                <input className="regformInput" id="regpasswordConfirmInput"></input>
                            </div>
                        </div>

                        <div className='termsSection'>
                            <input type="checkbox"></input>
                            <label className='smallLabel'>Yes, i understand and agree to RadiantReseller Terms of service ,including the user agreement and privacy policy </label>
                        </div>

                        <button>Create Account</button>

                        <h4>Have an account? <a className="reglink" href="/login">  Login </a></h4>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
