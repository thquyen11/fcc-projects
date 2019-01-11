import * as React from 'react';
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";

interface Props {
  isSignedIn: boolean,
  user: any,
  openProfile:any,
  updateProfile: any
}

export class Navbar extends React.Component<Props>{
  constructor(props:Props){
    super(props);
  }

  private onProfileRequest=()=>{
    fetch('/api/fcc-projects/profile', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: window.localStorage.getItem('token')
  })
  .then((resp:any)=> resp.json())
  .then((data:any)=> {
      if(data.status===200){
        this.props.openProfile();
        this.props.updateProfile(data.body);
        return <Redirect to="/fcc-projects/profile"></Redirect>
      } else{
        alert('Please sign in first');
        return <Redirect to="/"></Redirect>
      }
  })
  .catch((err:any)=> console.log(err));
  }
  
  render(){
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="navbar">
        <Link to="/"><a className="navbar-brand" href="">Home</a></Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
              FCC Projects
                </a>
            <div className="dropdown-menu">
              <Link to="/fcc-projects/quote-machine"><a className="dropdown-item" href="">Random Quote Machine</a></Link>
              <Link to="/fcc-projects/markdown-previewer"><a className="dropdown-item" href="">Markdown Previewer</a></Link>
              <Link to="/fcc-projects/drum-machine"><a className="dropdown-item" href="">Drum Machine</a></Link>
              <Link to="/fcc-projects/javascript-calculator"><a className="dropdown-item" href="">Calculator</a></Link>
              <Link to="/fcc-projects/pomodoro-clock"><a className="dropdown-item" href="">Promodo Clock</a></Link>
            </div>
          </li>
        </ul>
        <div className="navbar-nav">
          {this.props.isSignedIn ?
            <div>
              <div className="nav-item mr-4" style={{ display: 'inline-block', color: 'white' }}><p>Welcome Back {this.props.user.userName}</p></div>
              <button type="button" onClick={()=> this.onProfileRequest()}>Profile</button>
              <Link to="/fcc-projects/signout"><button type="button">Signout</button></Link>
            </div> :
            <div>
              <Link to="/fcc-projects/signin"><button type="button">Sign In</button></Link>
              <Link to="/fcc-projects/register"><button type="button">Register</button></Link>
            </div>
          }
        </div>
      </nav>
    )
  }
}

