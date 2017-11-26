import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  const currentUser = state.session;
  return(
    currentUser
  );
};

const mapDispatchToProps = (dispatch) =>({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
