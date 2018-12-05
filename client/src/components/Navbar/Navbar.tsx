import * as React from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



export class Navbar extends React.Component{

    render(){
        return(
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link to="/"><a className="navbar-brand" href="">Home</a></Link>
      
        <ul className="navbar-nav">  
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
              FCC Projects
            </a>
            <div className="dropdown-menu">
              <Link to="/fcc-projects/quote-machine"><a className="dropdown-item" href="">Random Quote Machine</a></Link>
              <Link to="/fcc-projects/quote-machine"><a className="dropdown-item" href="">TBA</a></Link>
              <Link to="/fcc-projects/quote-machine"><a className="dropdown-item" href="">TBA</a></Link>
            </div>
          </li>
        </ul>
      </nav>
        )
    }
}