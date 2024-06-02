"use client"
import React, { useEffect, useRef, useState } from 'react';
import "../../app/nav.css";
import "./page.css"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import res from "../../assests/resume.pdf"


export default function create_resume() {
    // Toggle side nav state
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const sideNavRef = useRef(null);
    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen);
    };



    return (<>
        <div>
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
                    <textarea placeholder='Enter a Job Post' />
                    <button className='bg-blue-500 r-5 m-5 p-2'>Create Resume</button>
                </div>

                <div className='display-pdf'>
                   
                </div>


            </div>




        </div>
    </>)
}