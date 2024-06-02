'use client'
import { useState } from "react";
import "../../app/nav.css"
import "./page.css"

export default function Login() {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const handleChange = (setValue,value) =>{
        setValue(value);
    }

    const login =()=>{
        fetch('http://127.0.0.1:1000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email':email,'password':password}),
        })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    alert('Login successful')
                }
                else{
                    alert(data.message);
                }
            })
            .catch((error) => {
                alert('error : '+error);
                console.error('Error:', error);
            });
    }


    return (<>
        <div className="flex flex-col">
            <nav className="nav">
                <ul>
                    <div>
                        <li className="nav-name">
                            Resume Optimizer
                        </li>
                    </div>
                    <div className="flex justify-center">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/signup">Signup</a>
                        </li>

                    </div>
                </ul>
            </nav>

            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">Login</h1>
                    <form>
                    <div className="input-group">
                            <input type="email" value={email}  onChange={(e) => handleChange(setEmail, e.target.value)} required />
                            <label>Email</label>
                        </div>
                        <div className="input-group">
                            <input type="password" value={password} onChange={(e) => handleChange(setPassword, e.target.value)} required />
                            <label>password</label>
                        </div>
                        <div className="btn-group">
                            <button type="submit" class="create-account-btn" onClick={login}>Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </>);
}