import React from 'react';
import {Card, Progress, Label} from 'semantic-ui-react';

export default function Feature({
  name,
  licenses_issued,
  licenses_in_use,
  message,
  selectFeature,
}) {
  // TODO: All the features are re-rendered when a feature is selected

  return (
    <Card link onClick={() => selectFeature(name)}>
      {message ? <Label color="yellow" corner="right" icon="warning" /> : null}
      <Card.Content>
        <Card.Header>
          {/* TODO: The name should be cut if it is to long */}
          {name}
        </Card.Header>

        <Card.Meta>
          {licenses_in_use}/{licenses_issued}
        </Card.Meta>

        <Card.Description>
          <Progress
            total={licenses_issued}
            value={licenses_in_use}
            color="blue"
            size="tiny"
            style={{barMinWidth: '0'}}
          />
        </Card.Description>
      </Card.Content>
    </Card>
  );

  /*return (
    <Segment onClick={() => selectFeature(name)}>
      {
      message 
        ? <Label as='a' color='yellow' ribbon='right' icon='warning'/>
        : null
      }
      
        {name}

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
  );*/
}
