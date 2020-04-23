import React, { useState, useEffect } from 'react';
import UsersTable from './UsersTable'
import { Icon, Accordion, Header, Segment, Progress, Message } from 'semantic-ui-react'



export default function feature({
    name,
    licenses_issued,
    licenses_in_use,
    users,
    message
  }) {

  return (
    <div>
      <Header as='h2' attached='top'>
        {name}
        <Progress value={licenses_in_use} total={licenses_issued} color='blue' progress />
      </Header>
      <Segment attached>
        {message
          ? <Message
              warning
              header='Server message'
              content={message}/>
          : null
        }
        <UsersTable usersData={users}/>
      </Segment>
    </div>
  );
}