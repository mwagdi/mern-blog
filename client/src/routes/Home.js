import React,{ Component } from 'react';

export default class Home extends Component{
    componentDidMount(){
        this.props.fetchPosts();
    }
    render(){
        const { postIds,postsById } = this.props;
        return(
            <div></div>
        )
    }
}
