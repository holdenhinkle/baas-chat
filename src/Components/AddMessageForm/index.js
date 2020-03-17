import React, { Component } from 'react';

class AddMessageForm extends Component {
  state = {
    messageText: '',
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props
      .onSubmit(this.state.messageText)
      .then(() => {
        this.setState({
          messageText: '',
        });
      });
  };

  render() {
    const { messageText } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="messageText"
          value={messageText}
          onChange={this.handleOnChange}
        />

        <button type="submit">Send!</button>
      </form>
    )
  }
};

export default AddMessageForm;