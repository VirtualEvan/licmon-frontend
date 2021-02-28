import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { getUserRoles } from '../../core/selectors';

export default function AdminRequired({component: Component, ...props}) {
  const userRoles = useSelector(getUserRoles);

  if(!userRoles.includes('licmon-admins')) {
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
