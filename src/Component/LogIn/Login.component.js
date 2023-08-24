import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import { useState } from 'react';
import './Login.css';
import LogIn from '../../Assets/login.jpg'

function Login( {onLogin}) {

    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

    const handleChange = ()=>{
        if(email === 'venky@gmail.com' && password === 'password'){
            onLogin(email);
            console.log(email)
        }else{
            console.log('Incorrect Credentials')
        }

    }

    return (
        <div className='Container'>

            <div className='Inner-Container'>
                <img src={LogIn} alt='loginpic'></img>
                <h4>Sign In</h4>

                <div>

                    <Form.Control
                        type="email"
                        id="email"
                        aria-describedby="email"
                        placeholder='Email'
                        onChange={(e)=>setEmail(e.target.value)}

                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        id="password"
                        aria-describedby="passwordHelpBlock"
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)}

                    />
                </div>


                <Button variant="primary" size="lg" onClick={handleChange}>
                    LogIn
                </Button>


            </div>



        </div>
    )
}
export default Login;
