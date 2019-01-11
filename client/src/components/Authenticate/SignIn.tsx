import * as React from 'react';
import { Redirect } from 'react-router';


interface Props {
    isSignedIn: boolean;
    onSignedIn:any;
}

export class SignIn extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
        }
    }

    private onInputChange = (e: any) => {
        switch (e.target.id) {
            case 'userName':
                this.setState({ userName: e.target.value });
            case 'userPassword':
                this.setState({ userPassword: e.target.value });
        }
    }

    private saveAuthTokenInSessions=(token:string)=>{
        window.localStorage.setItem('token', token);
    }

    private handleSignIn=(event:any, user:any)=>{
        event.preventDefault();

        fetch('/api/fcc-projects/signin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.userName,
                userPassword: user.userPassword
            })
        })
        .then((resp:any)=> resp.json())
        .then((data:any)=> {
            if(data.status===200){
                this.saveAuthTokenInSessions(data.token);
                this.props.onSignedIn();
            }else if(data.status===401){
                alert('username or password is not correct');
            }
        })
        .catch((err:any)=> console.log(err));
    }

    render() {
        return this.props.isSignedIn ? <Redirect to='/' />
            : <div id="wrapper-signin" className="container col-md-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <input onChange={(e) => this.onInputChange(e)} type="text" className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your user name with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input onChange={(e) => this.onInputChange(e)} type="password" className="form-control" id="userPassword" placeholder="Password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSignIn(e, this.state)}>Sign In</button>
                </form>
            </div>
    }
}