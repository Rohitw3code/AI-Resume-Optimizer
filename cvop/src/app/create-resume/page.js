"use client"
import React, { useEffect, useRef, useState } from 'react';
import "../../app/nav.css";
import "./page.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function CreateResume() {
    const [jobDesc, setJobDesc] = useState(''); // Corrected the order of state variable and setter function
    // Toggle side nav state
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const sideNavRef = useRef(null);
    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen);
    };

    const handleChange = (setValue, value) => {
        setValue(value);
    }

    const createResume = () => {
        fetch('http://127.0.0.1:1000/create-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'job_desc': jobDesc }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            alert('Error: ' + error);
            console.error('Error:', error);
        });
    }

    return (
        <>
            <div>
                <nav className="nav">
                    <div className="hamburger" onClick={toggleSideNav}>
                        <FontAwesomeIcon icon={faBars} color="white" />
                    </div>
                    <li>
                        <a href="/profile" className='cursor-pointer'>Profile</a>
                    </li>
                    <li>
                        <a href="/create-resume" className='cursor-pointer'>Create Resume</a>
                    </li>
                    <li>AI Resume Builder</li>
                </nav>

                <div className={`side-nav ${sideNavOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <a href="/profile" className='cursor-pointer'>Profile</a>
                        </li>
                        <li>
                            <a href="/create-resume" className='cursor-pointer'>Create Resume</a>
                        </li>
                        <li>AI Resume Builder</li>
                    </ul>
                </div>
            </div>

            <div>
                <div className='flex flex-col'>
                    <textarea
                        className='p-2 m-5 text-black'
                        onChange={(e) => { handleChange(setJobDesc, e.target.value) }}
                        placeholder='Enter a Job Post'
                        value={jobDesc}
                    />
                    <button className='bg-blue-500 r-5 m-5 p-2' onClick={createResume}>Create Resume</button>
                </div>
            </div>
        </>
    );
}
