import Image from "next/image";
import "./page.css"
import "../app/nav.css"
import Pointer from "./pointer/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <nav className="nav">
          <ul>
            <div>
              <li className="nav-name">
                Resume Optimizer
              </li>
            </div>
            <div className="flex">
              <li>
                <a href="/login">Login
                </a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
            </div>
          </ul>
        </nav>
        <Pointer />
        <div class="home-title">
          <div>
            <a class="home-title-sub-1 text-violet-300"><strong>AI Resume Builder</strong></a><br />
            <a class="home-title-sub-1">"<strong>Effortless ATS-Friendly Resume Builder</strong>"</a><br />
            <a class="home-title-sub-2">
              <span class="typed-text">Tailored Resume for your dream job</span>
            </a>
          </div>
        </div>

        <div className="home-start-btn">
          <div className="start-btn"><a href="/profile">Start</a></div>
        </div>







      </div>
    </>
  );
}
