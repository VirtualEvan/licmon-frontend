import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { isAdminViewEnabled } from '../../core/selectors';

export default function AdminRequired({component: Component, ...props}) {
  const adminViewEnabled = useSelector(isAdminViewEnabled);

  if(!adminViewEnabled) {
    return null
  }

  return (
    <Component
      {...props}
    />
  );
}

AdminRequired.propTypes = {
  component: PropTypes.elementType.isRequired,
};
