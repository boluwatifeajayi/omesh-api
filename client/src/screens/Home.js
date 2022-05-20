import React from "react"
import Header from '../components/Header';
import Sidebar from "../components/Sidebar";
import './Style.css';
import Card from "../components/Card";



export default function Home(){  
    return(
        <div>
            
            <Sidebar/>
            <div className="screen">
                <h1>Welcome Admin</h1>
                <p>What Would you Like to do ?</p>
                <div className="cards">
                    <Card cardTitle="Credits" cardSub="check various ongoing credits" buttonLink="/credits" cardColor="orange"/>
                    <Card cardTitle="Companies" cardSub="View Various companies" buttonLink="/companies" cardColor="#060b26"/>
                    <Card cardTitle="Approved" cardSub="View approved Credits" buttonLink="/appoved" cardColor="darkgrey"/>
                    {/* <Card cardTitle="Companies" cardSub="View Various companies" buttonLink="/companies" cardColor="darkgrey"/> */}
                </div>
                
            </div>    
        </div>
    )
}