import { connect } from 'react-redux';

import Login from './../routes/Login';
import { sendAuth } from './../store/actions';

const mapStateToProps = state => {
    const { user,authenticated } = state.auth
    return {
        user,
        authenticated
    }
}

export default connect(mapStateToProps,{ sendAuth })(Login)