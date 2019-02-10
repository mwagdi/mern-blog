import React,{ Component } from 'react';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.sendAuth(this.state.email,this.state.password);
    }
    render(){
        return(
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login__form">
                    <input
                    onChange={e => this.setState({ email: e.target.value })}
                    type="email" />
                    <input
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password" />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}
