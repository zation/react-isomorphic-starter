import React from 'react';
import PropTypes from 'prop-types';
import history from 'client/history';
import { propEq } from 'lodash/fp';
import { compose, setDisplayName, setPropTypes, withHandlers } from 'recompose';

const isLeftClickEvent = propEq('button', 0);

const isModifiedEvent = ({ metaKey, altKey, ctrlKey, shiftKey }) =>
  !!(metaKey || altKey || ctrlKey || shiftKey);

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  }),
  withHandlers({
    handleClick: ({ onClick }) => (event) => {
      if (onClick) {
        onClick(event);
      }
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      history.push(this.props.to);
    },
  }),
)(({ to, children, handleClick, ...props }) => (
  <a href={to} {...props} onClick={handleClick}>{children}</a>
));
