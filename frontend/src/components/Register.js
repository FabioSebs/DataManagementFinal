import React, { useState } from 'react'
import Navbar from './Navbar'
import '../styles/register.css'
import axios from 'axios'
import Blob from '../images/BlobDesign.PNG'
// import bcrypt from 'bcrypt'
import { hashPassword } from './PasswordHash'


const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [agree, setAgree] = useState(false)


    const handleRegister = async () => {
        if ((password === confirmPwd) && agree) {
            try {

                // const salt = crypto.randomBytes(16).toString('hex')
                const hash = hashPassword(password)

                const res = await axios.post("http://localhost:5000/api/create/user", {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: hash,
                })

                console.log(res)

            } catch (error) {
                console.log(error)
            }
        }
    }


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
                                <input className="regformInput" id='regnameInput' onChange={e => { setFirstName(e.currentTarget.value) }} ></input>
                            </div>

                            <div>
                                <label> Last Name : </label>
                                <input className="regformInput" id='reglastnameInput' onChange={e => { setLastName(e.currentTarget.value) }}></input>
                            </div>
                        </div>

                        <div className='emailSection'>
                            <label> Email </label>
                            <input className="regformInput" id='regemailInput' onChange={e => { setEmail(e.currentTarget.value) }}></input>
                        </div>

                        <div className='passwordSection'>
                            <div>
                                <label> Password :</label>
                                <input type="password" className="regformInput" id="regpasswordInput" onChange={e => { setPassword(e.currentTarget.value) }}></input>
                            </div>
                            <div>
                                <label> Confirm Password :</label>
                                <input type="password" className="regformInput" id="regpasswordConfirmInput" onChange={e => { setConfirmPwd(e.currentTarget.value) }}></input>
                            </div>
                        </div>

                        <div className='termsSection'>
                            <input type="checkbox" onClick={e => setAgree(true)}></input>
                            <label className='smallLabel'>Yes, i understand and agree to RadiantReseller Terms of service ,including the user agreement and privacy policy </label>
                        </div>

                        <button onClick={handleRegister}>Create Account</button>

                        <h4>Have an account? <a className="reglink" href="/login">  Login </a></h4>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
