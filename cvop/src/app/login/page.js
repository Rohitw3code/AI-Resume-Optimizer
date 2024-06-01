import "../../app/nav.css"
import "./page.css"

export default function Login() {

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
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-group">
                            <input type="password" required />
                            <label>password</label>
                        </div>
                        <div className="btn-group">
                            <button type="submit" class="create-account-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </>);
}