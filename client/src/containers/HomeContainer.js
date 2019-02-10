import { connect } from 'react-redux';

import Home from '../routes/Home';
import { fetchPosts } from '../store/actions';

const mapStateToProps = state => {
    const { postIds,postsById } = state.posts
    return {
        postIds,
        postsById
    }
}

export default connect(mapStateToProps,{ fetchPosts })(Home);