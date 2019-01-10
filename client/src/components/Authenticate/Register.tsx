import * as React from 'react';
import { Redirect } from 'react-router';


interface Props {
    // handleRegister: any;
    isRegistered: boolean;
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
                    {/* <button type="submit" className="btn btn-primary" onClick={(e) => this.props.handleRegister(this.state, e)}>Submit</button> */}
                </form>
            </div>
    }
}