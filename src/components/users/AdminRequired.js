import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { adminView } from '../../core/selectors';

export default function AdminRequired({component: Component, ...props}) {
  const showAdminView = useSelector(adminView);

  if(!showAdminView) {
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
