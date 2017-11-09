import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    // this.search = this.search.bind(this); //Do we have to bind here?
  
  }
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      data: , //Data just the term?
      //contentType: 'application/json',
      success : function(data) {  
        console.log('GET succeeded, data in get', data);
      },
      error : function() {
        console.log('POST failed');
      }
    })
  }
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //Needs to send a post request to server with the relevant user name
    //Server will then do a get request to the github api, and the response from that get will be posted to the database
    
    //Send an AJAX post request to the /repos route, with the username as the data
    $.ajax({
      type: 'POST',
      url: '/repos',
      data: JSON.stringify({'username':term}), //Data just the term?
      contentType: 'application/json',
      success : function() {  
        console.log('POST succeeded, data in post');
      },
      error : function() {
        console.log('POST failed');
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));