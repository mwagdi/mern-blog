import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      avatar: null,
      users: [],
      media: []
    }
  }
  componentDidMount(){
    axios.get('api/users')
    .then(response => this.setState({ users: response.data.users }))
  }
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('name',this.state.name);
    formData.append('email',this.state.email);
    formData.append('password',this.state.password);
    formData.append('password2',this.state.password2);
    formData.append('avatar', this.state.avatar, `${Date.now()}profile`);
      axios.post('api/users/register', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
      .then(response => {
        console.log(response);
    })
  }
  addFiles = e => {
    let formData = new FormData();
    Array.from(e.target.files).forEach(file => {
      formData.append('src',file,`${Date.now()}${file.name}`)
    })
    
    axios.post('api/media', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
      .then(response => {
        console.log(response);
    })
    
  }
  render() {
    const { name,email,password,password2,users } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          type="text" />
          <input
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          type="email" />
          <input
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password" />
          <input
          value={password2}
          onChange={e => this.setState({ password2: e.target.value })}
          type="password" />
          <input
          onChange={e => this.setState({ avatar: Array.from(e.target.files)[0]})}
          type="file" />
          <input type="submit" value="Submit"/>
        </form>
        <input
        onChange={this.addFiles}
        type="file" name="img" multiple></input>
        {users.map((user,i) => (
          <div key={i}>
            {user.avatar ? (<img src={user.avatar}/>) : ""}
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
