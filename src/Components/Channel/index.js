import React, { Component } from 'react';

class Channel extends Component {
  onJoinChannel = () => {
    this.props.handleJoinChannel(this.props.channel._id);
  }
  onLeaveChannel = () => {
    this.props.handleLeaveChannel(this.props.channel._id)
  }

  onChangeChannel = () => {
    this.props.handleChangeChannel(this.props.channel._id)
  }

  onDeleteChannel = () => {
    this.props.handleDeleteChannel(this.props.channel._id)
  }

  checkCurrentChannel = (channel, usersCurrentChannel) => {
    return channel.channelType === usersCurrentChannel.channelType && channel._id === usersCurrentChannel.channelId;
  }

  checkViewable = (channel, usersChannels, usersCurrentChannel) => {
    const isCurrentChannel = this.checkCurrentChannel(channel, usersCurrentChannel);
    return !isCurrentChannel && this.checkLeavable(channel, usersChannels);
  }

  checkJoinable = (channel, usersChannels) => {
    return !this.checkLeavable(channel, usersChannels);
  }

  checkLeavable = (channel, usersChannels) => {
    return usersChannels.some((userChannel) => channel.channelType === userChannel.channelType && channel._id === userChannel.channelId);
  }

  checkDeletable = (userId, channel) => {
    return userId === channel.userId;
  }

  render() {
    const { userId, channel, usersChannels, usersCurrentChannel } = this.props;
    const isCurrentChannel = this.checkCurrentChannel(channel, usersCurrentChannel);
    const isViewable = this.checkViewable(channel, usersChannels, usersCurrentChannel);
    const isJoinable = this.checkJoinable(channel, usersChannels);
    const isLeavable = this.checkLeavable(channel, usersChannels);
    const isDeletable = this.checkDeletable(userId, channel);

    return (
      <div>
        <p>{isCurrentChannel ? <span>Current Channel: </span> : ''}{channel.name}</p>
        {isViewable ? <button onClick={this.onChangeChannel}>View</button> : ''}
        {isJoinable ? <button onClick={this.onJoinChannel}>Join</button> : ''}
        {isLeavable ? <button onClick={this.onLeaveChannel}>Leave</button> : ''}
        {isDeletable ? <button onClick={this.onDeleteChannel}>Delete</button> : ''}
      </div>
    )
  }
}

export default Channel;