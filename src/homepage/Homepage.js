import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"; // Import the CSS file

const Homepage = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div className="Homepage">
            {currentUser ? (
                <>
                    <h1>Jobly</h1>
                    <p>All the jobs in one, convenient place</p>
                    <p>Welcome back, {currentUser.lastName}!</p>
                </>
            ) : (
                <>
                    <h1>Jobly</h1>
                    <p>All the jobs in one, convenient place</p>
                    <div>
                        <button onClick={() => navigate("/login")}>Log in</button>
                        <button onClick={() => navigate("/signup")}>Sign up</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Homepage;
