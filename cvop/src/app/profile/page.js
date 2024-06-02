"use client"
import React, { useEffect,useRef, useState } from 'react';
import "../../app/nav.css";
import "./page.css"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


export default function Profile() {
    // State for personal details
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [kaggle, setKaggle] = useState('');
    const [leetcode, setLeetcode] = useState('');

    // State for academic info
    const [collegeName, setCollegeName] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [degree, setDegree] = useState('');

    // State for skills
    const [programmingLanguages, setProgrammingLanguages] = useState('');
    const [otherSkills, setOtherSkills] = useState('');

    // State for work experience
    const [workItems, setWorkItems] = useState([{
        position: '',
        company: '',
        workDesc: '',
        jobType: '',
        wdate: ''
    }]);

    // State for projects
    const [projectItems, setProjectItems] = useState([{
        projectName: '',
        projectDesc: '',
        techStack: '',
        pdate: ''
    }]);

    // Function to add a new work item
    const addWorkItem = () => {
        setWorkItems([
            ...workItems,
            { position: '', company: '', workDesc: '', jobType: '', wdate: '' }
        ]);
    };

    // Function to add a new project item
    const addProjectItem = () => {
        setProjectItems([
            ...projectItems,
            { projectName: '', projectDesc: '', techStack: '', pdate: '' }
        ]);
    };

    const handleChange = (index, field, value, type) => {
        
        if (type === 'work') {
            const updatedWorkItems = [...workItems];
            updatedWorkItems[index][field] = value;
            setWorkItems(updatedWorkItems);
        } else if (type === 'project') {
            const updatedProjectItems = [...projectItems];
            updatedProjectItems[index][field] = value;
            setProjectItems(updatedProjectItems);
        } else {
            switch (field) {
                case 'name':
                    setName(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'linkedin':
                    setLinkedin(value);
                    break;
                case 'github':
                    setGithub(value);
                    break;
                case 'kaggle':
                    setKaggle(value);
                    break;
                case 'leetcode':
                    setLeetcode(value);
                    break;
                case 'collegeName':
                    setCollegeName(value);
                    break;
                case 'startYear':
                    setStartYear(value);
                    break;
                case 'endYear':
                    setEndYear(value);
                    break;
                case 'cgpa':
                    setCgpa(value);
                    break;
                case 'degree':
                    setDegree(value);
                    break;
                case 'programmingLanguages':
                    setProgrammingLanguages(value);
                    break;
                case 'otherSkills':
                    setOtherSkills(value);
                    break;
                default:
                    break;
            }
        }
    };

    // Toggle side nav state
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const sideNavRef = useRef(null);
    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen);
    };

    // Effect for handling resize and click outside
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setSideNavOpen(false);
            }
        };

        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setSideNavOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const postData = () => {
        // Collect all data here
        const formData = {
            personalDetails: {
                name,
                email,
                linkedin,
                github,
                kaggle,
                leetcode,
            },
            academicInfo: {
                collegeName,
                startYear,
                endYear,
                cgpa,
                degree,
            },
            skills: {
                programmingLanguages,
                otherSkills,
            },
            workExperience: workItems,
            projects: projectItems,
        };

        alert(JSON.stringify(formData));

        fetch('http://127.0.0.1:1000/get-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                alert('success');
                console.log('Success:', data);
            })
            .catch((error) => {
                alert('error : ' + error);
                console.error('Error:', error);
            });
    };


    const getData = () => {
        fetch('http://127.0.0.1:1000/get-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email':'hello@gmail.com'}),
        })
            .then(response => response.json())
            .then(data => {
                // alert('data : '+JSON.stringify(data));
                // Personal Details                
                setName(data['personalDetails']['name'])
                setEmail(data['personalDetails']['email'])
                setGithub(data['personalDetails']['github'])
                setKaggle(data['personalDetails']['kaggle'])
                setLeetcode(data['personalDetails']['leetcode'])
                setLinkedin(data['personalDetails']['linkedin'])

                //Acadmeic Details
                setCollegeName(data['academicInfo']['collegeName'])
                setStartYear(data['academicInfo']['startYear'])
                setEndYear(data['academicInfo']['endYear'])
                setCgpa(data['academicInfo']['cgpa'])
                setDegree(data['academicInfo']['degree'])
                //Skills
                setProgrammingLanguages(data['skills']['programmingLanguages'])
                setOtherSkills(data['skills']['otherSkills'])
                //Work Experience
                setWorkItems(data['workExperience']);

                //Projects
                setProjectItems(data['projects']);

            })
            .catch((error) => {
                alert('error : ' + error);
                console.error('Error:', error);
            });
    }


    useEffect(()=>{
        getData();
    })






    return (
        <>
            <div>
                <div>
                    <nav className="nav">
                        <div className="hamburger" onClick={toggleSideNav}>
                            <FontAwesomeIcon icon={faBars} color="white" />
                        </div>
                        <ul className="bg-blue-900">
                            <li>Profile</li>
                            <li>Create Resume</li>
                        </ul>
                        <div>AI Resume Builder</div>
                    </nav>

                    <div className={`side-nav ${sideNavOpen ? 'active' : ''}`}>
                        <ul>
                            <li>Profile</li>
                            <li>Create Resume</li>
                            <li>AI Resume Builder</li>
                        </ul>
                    </div>
                </div>

                <div class='m-10'>
                    <h2 class='text-white my-5'>Personal Details</h2>

                    <div class='flex flex-col flex-wrap profile-personal'>
                        <div class='flex flex-col'>
                            <label class='profile-label'>Name</label>
                            <input class="profile-input" placeholder='Name' value={name} onChange={(e) => handleChange(null, 'name', e.target.value)} />
                        </div>
                        <div class='profile-label'>Social Links</div>
                        <div class='flex flex-wrap'>
                            <input class="profile-input" placeholder='email' value={email} onChange={(e) => handleChange(null, 'email', e.target.value)} />
                            <input class="profile-input" placeholder='linkedin' value={linkedin} onChange={(e) => handleChange(null, 'linkedin', e.target.value)} />
                            <input class="profile-input" placeholder='github' value={github} onChange={(e) => handleChange(null, 'github', e.target.value)} />
                            <input class="profile-input" placeholder='kaggle' value={kaggle} onChange={(e) => handleChange(null, 'kaggle', e.target.value)} />
                            <input class="profile-input" placeholder='leetcode' value={leetcode} onChange={(e) => handleChange(null, 'leetcode', e.target.value)} />
                        </div>
                        <div class='profile-label'>Academic info</div>
                        <div class='flex flex-wrap'>
                            <input class="profile-input" placeholder='College Name' value={collegeName} onChange={(e) => handleChange(null, 'collegeName', e.target.value)} />
                            <div>
                                <p>Start Year</p>
                                <input class="profile-input" type='date' value={startYear} onChange={(e) => handleChange(null, 'startYear', e.target.value)} />
                            </div>
                            <div>
                                <p>End Year</p>
                                <input class="profile-input" type='date' value={endYear} onChange={(e) => handleChange(null, 'endYear', e.target.value)} />
                            </div>
                            <input class="profile-input" placeholder='CGPA' value={cgpa} onChange={(e) => handleChange(null, 'cgpa', e.target.value)} />
                            <input class="profile-input" placeholder='Degree' value={degree} onChange={(e) => handleChange(null, 'degree', e.target.value)} />
                        </div>

                        <div class='profile-label'>Skills</div>

                        <div class='flex flex-wrap'>
                            <input class="profile-input" placeholder='Programming Languages' value={programmingLanguages} onChange={(e) => setProgrammingLanguages(e.target.value)} />
                            <input class="profile-input" placeholder='Other Skills' value={otherSkills} onChange={(e) => setOtherSkills(e.target.value)} />
                        </div>

                        <div class='profile-label'>Work Experience</div>

                        <div class='flex flex-wrap'>
                            <div class="profile-work">
                                {workItems.map((item, index) => (
                                    <div key={index} class="profile-work-item">
                                        <h3>Experience {index + 1}</h3>
                                        <div>
                                            <input class="profile-input" placeholder="Position" value={item.position} onChange={(e) => handleChange(index, 'position', e.target.value, 'work')} />
                                            <input class="profile-input" placeholder="Company" value={item.company} onChange={(e) => handleChange(index, 'company', e.target.value, 'work')} />
                                            <input class="profile-input" placeholder="Description" value={item.workDesc} onChange={(e) => handleChange(index, 'workDesc', e.target.value, 'work')} />
                                            <input class="profile-input" placeholder="Job Type" value={item.jobType} onChange={(e) => handleChange(index, 'jobType', e.target.value, 'work')} />
                                            <input class="profile-input" type="date" value={item.wdate} onChange={(e) => handleChange(index, 'wdate', e.target.value, 'work')} />
                                        </div>
                                    </div>
                                ))}
                                <button class="bg-slate-500 p-2 text-white float-right" onClick={addWorkItem}>Add More</button>
                            </div>
                        </div>

                        <div class='profile-label'>Projects</div>

                        <div class='flex flex-wrap'>
                            <div class="profile-project">
                                {projectItems.map((item, index) => (
                                    <div key={index} class="profile-project-item">
                                        <h3>Project {index + 1}</h3>
                                        <div>
                                            <input class="profile-input" placeholder="Project Name" value={item.projectName} onChange={(e) => handleChange(index, 'projectName', e.target.value, 'project')} />
                                            <input class="profile-input" placeholder="Description" value={item.projectDesc} onChange={(e) => handleChange(index, 'projectDesc', e.target.value, 'project')} />
                                            <input class="profile-input" placeholder="Tech Stack" value={item.techStack} onChange={(e) => handleChange(index, 'techStack', e.target.value, 'project')} />
                                            <input class="profile-input" type="date" value={item.pdate} onChange={(e) => handleChange(index, 'pdate', e.target.value, 'project')} />
                                        </div>
                                    </div>
                                ))}
                                <button class="bg-slate-500 p-2 text-white float-right" onClick={addProjectItem}>Add More</button>
                            </div>
                        </div>

                    </div>
                    <button class='my-5 bg-slate-500 p-2 text-white float-right' onClick={postData}>Submit</button>
                </div>

            </div>
        </>
    );
}
