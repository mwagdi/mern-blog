import React,{ Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            avatar: null,
            submitted: false
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const { name,email,password,password2,avatar } = this.state;
        const data = {
            name,
            email,
            password,
            password2
        }
        let formData = new FormData();

        for (var key in data) {
            formData.append(key,data[key]);
        }
        formData.append('avatar', avatar, `${name.toLowerCase().split(" ").join("_")}${Date.now()}`);

        axios.post("api/users/register",formData,{headers: {'content-type': 'multipart/form-data'}})
        .then(response => this.setState({ submitted: true }));
    }
    render(){
        if(this.state.submitted){
            return <Redirect to="/login" />
        }
        return(
            <div className="register">
                <form onSubmit={this.handleSubmit} className="register__form">
                    <input
                    onChange={e => this.setState({ name: e.target.value })}
                    type="text" />
                    <input
                    onChange={e => this.setState({ email: e.target.value })}
                    type="email" />
                    <input
                    onChange={e => this.setState({ avatar: e.target.files[0] })}
                    type="file" />
                    <input
                    onChange={e => this.setState({ password: e.target.value })}
                    type="password" />
                    <input
                    onChange={e => this.setState({ password2: e.target.value })}
                    type="password" />
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        )
    }
}