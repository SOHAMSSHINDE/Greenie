import {Link } from "react-router-dom";

export default function Navbar(){
    return(
        <>
        <center>
        <div className="nav">
            <Link to="/">Signup</Link>
            <Link to="login">View Details</Link>
            {/* <Link to="Signup">Signup</Link> */}

        </div>
        </center>
        </>
    );
}