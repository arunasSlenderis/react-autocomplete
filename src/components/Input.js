import React, { Component } from 'react';
import '../styles/input.css';
import PropTypes from 'prop-types';

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentWillMount() {
    const { searchBy, uniqueKey } = this.props.options;
    if (this.props.selectedItem[uniqueKey]) this._changeValue(this.props.selectedItem[searchBy]);
  }

  componentWillReceiveProps(props) {
    const { searchBy, uniqueKey } = props.options;
    if (props.selectedItem[uniqueKey]) {
      this._changeValue(props.selectedItem[searchBy]);
      this.props.removeSelectedItem();
      this.props.setCurrentItem(props.selectedItem);
    }
  }

  _changeValue(val) {
    this.setState(() => ({ value: val }));
  }

  onValueChange(e) {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
    this.props.searchItem(e.target.value);
  }

  clearField() {
    this.props.removeSelectedItem();
    this._changeValue('');
    this.props.setCurrentItem(null);
  }

  render() {
    let close;
    if (this.state.value && this.props.options.clearable) {
      close = (
        <div onClick={this.clearField.bind(this)} className='close'>
          x
        </div>
      );
    }
    return (
      <React.Fragment>
        <input
          className='input'
          type='text'
          name='value'
          placeholder={this.props.options.placeholder}
          autoComplete='off'
          value={this.state.value}
          onChange={this.onValueChange.bind(this)}
        />
        {close}
      </React.Fragment>
    );
  }
}

Input.propTypes = {
  options: PropTypes.object,
  removeSelectedItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  searchItem: PropTypes.func.isRequired
};

export default Input;
