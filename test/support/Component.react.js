import React from "react";

export default class Component extends React.Component {
  constructor() {
    super();

    this.state = {
      status: false
    }
  }

  componentDidMount() {
    this.setState({ status: true });
  }

  render() {
    return (
      <div>
        <a href="" className="click-me" onClick={this._handleClick.bind(this)}>Click me</a>
        <input onChange={this.props.onChange} />
        <h1 id="content" className="text">Content</h1>
        {this.props.children}
      </div>
    );
  }

  _handleClick(event) {
    this.props.callMe();
  }
};
