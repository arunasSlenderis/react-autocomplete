import React, { Component } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';

class App extends Component {
  setCurrentItem(item) {
    console.log(item);
  }
  render() {
    const options = { 
      clearable: true,
      placeholder: 'Search...',
      searchBy: 'name', 
      uniqueKey: 'id', 
      searchRoute: 'https://jsonplaceholder.typicode.com/users' 
    };
    // const currentItem = { id: 1, name: 'First user' };
    return (
      <div className='App'>
        <Autocomplete options={options} setCurrentItem={this.setCurrentItem.bind(this)} />
      </div>
    );
  }
}

export default App;
