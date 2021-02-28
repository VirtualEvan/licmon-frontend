import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {isAdminViewEnabled, getUserInfo} from '../../core/selectors';
import {switchAdminView} from '../../actions/auth'
import {Checkbox} from 'semantic-ui-react'

export default function ViewSwitcher() {
  const dispatch = useDispatch()
  const adminViewEnabled = useSelector(isAdminViewEnabled);
  const user = useSelector(getUserInfo);

  if(!user || !user.roles.includes('licmon-admins')) {
    return null
  }

  return (
    <Checkbox
      slider
      fitted
      checked={adminViewEnabled}
      onClick={() => dispatch(switchAdminView(!adminViewEnabled))}
    />
  )
}