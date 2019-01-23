import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Input from './Input';
import Results from './Results';
import '../styles/autocomplete.css';

export class Autocomplete extends Component {
  constructor(props) {
    super(props);
    if (!props.options.searchRoute) throw new Error('searchRoute must be provided in options');
    if (!props.options.searchBy) throw new Error('searchBy must be provided in options');
    if (!props.options.uniqueKey) throw new Error('uniqueKey must be provided in options');
    
    this.state = { listItems: [], selectedItem: {} };
  }

  componentWillMount() {
    const { currentItem } = this.props;
    if (currentItem) this.resultSelected(currentItem);
  }

  resultSelected(result) {
    this.setState(prevState => ({
      selectedItem: { ...prevState.selectedItem, ...result },
      listItems: []
    }));
  }

  searchItem(value) {
    const { searchRoute } = this.props.options;
    // axios.get(`${searchRoute}/${value}`).then(response => {
    axios.get(searchRoute).then(response => {
      const results = [
        { id: 1, name: 'Leanne Graham' },
        { id: 2, name: 'Ervin Howell' }
      ]
      // const results = response.data.filter(
      //   item =>
      //     value && item[searchBy].toLowerCase().includes(value.toLowerCase())
      // );
      this.formatResults(results);
    });
  }

  formatResults(results = []) {
    const { uniqueKey, searchBy } = this.props.options;
    const resultItems = results.map(result => (
      <li
        onClick={this.resultSelected.bind(this, result)}
        key={result[uniqueKey]}
        className='results-list-item'
      >
        {result[searchBy]}
      </li>
    ));

    this.setState(() => ({ listItems: resultItems }));
  }

  removeSelectedItem() {
    this.setState(() => ({ selectedItem: {} }));
  }

  render() {
    let results;
    if (this.state.listItems && this.state.listItems.length) {
      results = <Results results={this.state.listItems} />;
    }
    return (
      <div className='container'>
        <Input
          options={this.props.options}
          removeSelectedItem={this.removeSelectedItem.bind(this)}
          selectedItem={this.state.selectedItem}
          searchItem={this.searchItem.bind(this)}
          setCurrentItem={this.props.setCurrentItem}
        />
        {results}
      </div>
    );
  }
}

Autocomplete.propTypes = {
  options: PropTypes.object
};

export default Autocomplete;
