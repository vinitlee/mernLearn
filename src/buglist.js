import React from 'react'

class Buglist extends React.Component {
  constructor(props) {
    props.value = props.value || '';
    super(props);
    this.text = "Places have been held!";
  }
  render() {
    return <div>{{text}}</div>
  }
}

module.exports = Buglist;
