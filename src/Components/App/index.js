import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import MessageDashboard from '../MessageDashboard';
import sdk from '../../lib';

class App extends Component {
  state = {
    loggedIn: false,
    userId: null,
  }

  handleLoginSubmit = async ({ email, password }) => {
    sdk.auth.login(email, password)
      .then((res) => {
        this.setUserId(res.id);
        this.toggleLoggedIn();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleRegisterSubmit = ({ email, password }) => {
    sdk.auth.register(email, password)
      .then((registerRes) => {
        return sdk.auth.login(email, password);
      })
      .then((loginRes) => {
        this.setUserId(loginRes.id);
        this.toggleLoggedIn();

        const data = {
          userdId: loginRes.id,
          name: null,
          online: false,
          channels: [],
          currentChannel: {},
        }

        return sdk.db.createResource('usersmeta', data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setUserId = (userId) => {
    this.setState({
      userId,
    });
  }

  toggleLoggedIn = () => {
    this.setState((prevState) => {
      return ({
        loggedIn: !prevState.loggedIn,
      });
    });
  }

  render() {
    return (
      <div className="App" >
        {
          this.state.loggedIn ?
            <MessageDashboard
              toggleLoggedIn={this.toggleLoggedIn}
              userId={this.state.userId}
            />
            :
            <div>
              <div>
                <Login
                  handleLoginSubmit={this.handleLoginSubmit}
                />
              </div>
              <div>
                <Register
                  handleRegisterSubmit={this.handleRegisterSubmit}
                />
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;
