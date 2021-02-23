import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Message, TransitionablePortal} from 'semantic-ui-react';
import {removeNotification} from '../actions/notification';
import styles from './Notification.module.scss';

export default function Notification({id, message, type}) {
  const dispatch = useDispatch();
  return (
    <TransitionablePortal
      closeOnDocumentClick={false}
      transition={{animation: 'fade down', duration: 300}}
      transitionOnMount
      open
    >
      <Message
        className={styles.notification}
        content={message}
        onDismiss={() => dispatch(removeNotification(id))}
        {...{
          success: () => ({success: true, header: 'Success!'}),
          warning: () => ({warning: true, header: 'Warning!'}),
          error: () => ({error: true, header: 'An error occurred!'}),
          info: () => ({info: true, header: 'Info'}),
        }[type]()}
      />
    </TransitionablePortal>
  );
}

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  message: PropTypes.string.isRequired,
};
