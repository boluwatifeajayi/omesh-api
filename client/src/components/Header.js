import React from "react"
import { Link } from "react-router-dom";


export default function Navbar(){  
    return(
        <div>
            <div class="header">
                <Link to="/" class="logo">Omesh</Link>
                <div class="header-right">
                  <Link to="about">About</Link>
                </div>
        </div>
    </div>
        )
}