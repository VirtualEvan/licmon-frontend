import {Grid} from 'semantic-ui-react'
import Feature from './Feature'

export default function FeatureList({
  features,
  featureSelectionHandler
}) {
  return (
    // TODO: Check cardgroups
    features.map(
      (feature, key) =>
        // TODO: Check if it is better (more performant) to filter adding a "hidden" property
        // The hidden property only works if the Grid is wrapped inside a div
        (
          <Grid.Column
            key={key}
            mobile={8}
            tablet={4}
            computer={9}
            style={{minWidth: '200pt', maxWidth: '200pt'}}
          >
            <Feature
              name={feature.name}
              // TODO: Change this "|| 0"
              licenses_issued={feature.licenses_issued || 0}
              licenses_in_use={feature.licenses_in_use || 0}
              users={feature.users}
              message={feature.message}
              featureSelectionHandler = {featureSelectionHandler}
            />
          </Grid.Column>
        )
    )
  )
}