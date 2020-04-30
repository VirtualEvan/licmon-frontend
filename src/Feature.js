import React, { useState, useEffect,useCallback } from 'react';
import UsersTable from './UsersTable'
import { Icon, Header, Segment, Progress, Label, Button } from 'semantic-ui-react'

export default function Feature({
    name,
    licenses_issued,
    licenses_in_use,
    users,
    message,
    selectFeature
  }) {

  // TODO: All the features are re-rendered when a feature is selected

  return (
    <Segment onClick={() => selectFeature(name)}>
      <Header as='h6'>
        {name}
      </Header>

      <Label basic size="large">
        {licenses_in_use}/{licenses_issued}
      </Label>

      <Progress
        total={licenses_issued}
        value={licenses_in_use}
        color='blue' 
        size='tiny'
      />      
    </Segment>
  );
}