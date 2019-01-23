import React from 'react';
import PropTypes from 'prop-types';
import '../styles/result.css';

export default function Results(props) {
  return <ul className='results-list'>{props.results}</ul>;
}

Results.propTypes = {
  results: PropTypes.array.isRequired
};
