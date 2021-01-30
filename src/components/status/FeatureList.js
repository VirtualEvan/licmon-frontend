import styles from './FeatureList.module.scss';
import Feature from './Feature';

export default function FeatureList({features, featureSelectionHandler}) {
  return (
    // TODO: Check cardgroups
    <div className={styles['feature-list']}>
      {features.map((feature, key) => (
        // TODO: Check if it is better (more performant) to filter adding a "hidden" property
        // The hidden property only works if the Grid is wrapped inside a div
        <Feature
          key={key}
          name={feature.name}
          // TODO: Change this "|| 0"
          licenses_issued={feature.licenses_issued || 0}
          licenses_in_use={feature.licenses_in_use || 0}
          users={feature.users}
          message={feature.message}
          featureSelectionHandler={featureSelectionHandler}
        />
      ))}
    </div>
  );
}
