import React from 'react';
import PropTypes from 'prop-types';
import { propEq, omit } from 'lodash/fp';
import { connect } from 'react-redux';
import { compose, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import { push as pushAction } from 'shared/redux/history/actions';

const isLeftClickEvent = propEq('button', 0);

const isModifiedEvent = ({ metaKey, altKey, ctrlKey, shiftKey }) =>
  !!(metaKey || altKey || ctrlKey || shiftKey);

export default compose(
  connect(null, { push: pushAction }),
  setDisplayName(__filename),
  setPropTypes({
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  }),
  withHandlers({
    handleClick: ({ onClick, to, push }) => (event) => {
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
      push(to);
    },
  }),
)(({ to, children, handleClick, ...props }) => (
  <a href={to} {...omit(['push'])(props)} onClick={handleClick}>{children}</a>
));
