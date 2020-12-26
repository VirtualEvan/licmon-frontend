import React from 'react';
import {Card, Progress, Label} from 'semantic-ui-react';

export default function Feature({
  name,
  licenses_issued,
  licenses_in_use,
  message,
  featureSelectionHandler,
}) {
  // TODO: All the features are re-rendered when a feature is selected
  return (
    <Card link onClick={() => featureSelectionHandler(name)}>
      {message && <Label color="yellow" corner="right" icon="warning" />}
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
}
