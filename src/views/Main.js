import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../Database';

class Main extends Component {
  constructor(prop){
      super(prop);
      Database.init();
      this.state ={
          name: "",
          description: "",
          resume: ""
      }
  }

  componentDidMount(){
    const rootRef= firebase.database().ref();
    rootRef.on('value',snapshot =>{
      var data =snapshot.child("/").val();
      console.log(JSON.stringify(data,null,' '));
      this.setState({
        name : data.name,
        description: data.description,
        resume: data.resume
      })
    });

  }
render(){
  return(
    <p className="App-intro">
        <img src="https://avatars1.githubusercontent.com/u/8135112?v=3&s=460" width="200" height="200"/>
        <p>{this.state.description}</p>
        <h4><a target="_blank" href={this.state.resume}>This is my Resume</a></h4>
        {this.props.children}
    </p>
  );
}
}

export default Main;