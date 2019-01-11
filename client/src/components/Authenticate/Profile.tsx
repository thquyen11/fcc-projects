import * as React from 'react';
import { Redirect } from 'react-router';

interface Props{
    profile: any;
}

export class Profile extends React.Component<Props>{
    constructor(props:Props){
        super(props)
    }

    private closeProfile=(event:any)=>{
        event.preventDefault();
        return <Redirect to='/'/>
    }

    render(){
        return(
            <div id="wrapper-profile" className="container col-md-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="userName">User Id</label>
                        <h5 className="form-control" id="userId" aria-describedby="help-tip">{this.props.profile.userId}</h5>
                        <small id="help-tip" className="form-text text-muted">We'll never share your user name with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <h5 className="form-control" id="userName">{this.props.profile.userName}</h5>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(event:any) => this.closeProfile(event)}>Close</button>
                </form>
            </div>
        )
    }
}