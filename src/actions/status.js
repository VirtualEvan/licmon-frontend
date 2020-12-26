export const SELECT_FEATURE = 'Feature selected'
export const FILTER_FEATURES = 'Feature filter modified'

export function selectFeature(feature) {
  return {type: SELECT_FEATURE, feature}
}

export function filterFeatures(filter) {
  return {type: FILTER_FEATURES, filter}
}
