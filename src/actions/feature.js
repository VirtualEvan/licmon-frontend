export const SELECT_FEATURE = 'Feature selected'

export function selectFeature(feature) {
  return {type: SELECT_FEATURE, feature}
}