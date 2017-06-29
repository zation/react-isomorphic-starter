import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { compose, setDisplayName, setPropTypes, withContext } from 'recompose';
import { prop } from 'lodash/fp';

const childContextTypes = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  ...Provider.childContextTypes,
};

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    context: PropTypes.shape(childContextTypes).isRequired,
    children: PropTypes.element.isRequired,
  }),
  withContext(
    childContextTypes,
    prop('context'),
  ),
)(({ children }) => (
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  React.Children.only(children)
));
