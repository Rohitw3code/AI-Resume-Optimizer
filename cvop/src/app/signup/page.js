import "../../app/nav.css"
import "./page.css"

export default function Signup() {

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
                            <a href="/login">Login</a>
                        </li>
                    </div>
                </ul>
            </nav>

            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">Sign-up</h1>
                    <form>
                        <div className="input-group">
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-group">
                            <input type="password" required />
                            <label>create password</label>
                        </div>
                        <div className="btn-group">
                            <button type="submit" class="create-account-btn">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </>);
}