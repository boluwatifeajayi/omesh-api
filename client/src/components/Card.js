import React from "react"
import { Link } from "react-router-dom";


export default function Card(props){  
    return(
    <div className="cards_item">
    <div className="card" style={{"backgroundColor":props.cardColor}} >
       <h2 className="credit-header">{props.cardTitle}</h2>
       <p className="credit-text">{props.cardSub}</p> 
       <Link to={props.buttonLink}><button className="credit-btn">Visit {"      >"}</button> </Link> 
    </div>
    </div>
    
        )
}