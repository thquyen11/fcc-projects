import * as React from 'react';
import { Redirect } from 'react-router';


interface Props {
    isRegistered: boolean;
    onRegistered: any;
}

export class Register extends React.Component<Props> {
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

    private handleRegister=(user:any, e:any)=>{
        e.preventDefault();

        fetch('/api/fcc-projects/register',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.userName,
                userPassword: user.userPassword
            })
        })
        .then((resp:any)=> resp.json())
        .then((data:any)=>{
            if(data.status===200){
                alert('user registered successful');
                this.props.onRegistered();
            }else if(data.status===400){
                alert('userName already exist');
                this.props.onRegistered();
            }
        })
        .catch((err:any)=> console.log(err));
    }

    render() {
        return this.props.isRegistered ? <Redirect to='/fcc-projects/signin' /> :
            <div id="wrapper-register" className="container col-md-6">
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
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleRegister(this.state, e)}>Register</button>
                </form>
            </div>
    }
}