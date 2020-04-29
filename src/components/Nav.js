import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
    
    return (
        <nav className="py-3">
            <div className="container d-flex">
                <div className="logo">
                    <h2>GetMeSomeNews</h2>
                </div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="search-news">Search For More News</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}