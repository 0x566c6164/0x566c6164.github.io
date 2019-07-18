import React, { Component } from 'react'

import JSONTreeView from './components/JSONTreeView.js'

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: 'https://swapi.co/api/people/',
      json: {},
      loaded: ''
    }

    this.updateAPIURL = this.updateAPIURL.bind(this);
    this.loadAPI = this.loadAPI.bind(this);
  }

  updateAPIURL(event) {
    this.setState({ input: event.target.value })
  }

  loadAPI() {
    this.setState({loaded: 'loading'})

    fetch(this.state.input)
    .then(res => res.json())
    .then((data) => {
      this.setState({json: data, loaded: 'loaded'})
    })
    .catch((error) => this.setState({loaded: 'fail'}));
  }

  render () {
    return (
      <div className='App'>
        <div className='container'>
          <div className='input-wrapper'>
            <h1>JSON Public API TreeViewer</h1>
            <div className='input-wrapper-inner'>
              <span className='input-span'>JSON URL</span>
              <input className='input-url' type='text' value={this.state.input} onChange={this.updateAPIURL}/>
              <button className='input-btn' onClick={this.loadAPI}>View JSON</button>
            </div>
          </div>
          <div className='json-wrapper'>
            {this.state.loaded === 'loading' ? <h2>Fetching Data</h2> :
             this.state.loaded === 'loaded' ? <JSONTreeView obj={this.state.json}/>
             : this.state.loaded === 'fail' ? <h2>Error</h2> : <h2>No JSON loaded</h2>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
