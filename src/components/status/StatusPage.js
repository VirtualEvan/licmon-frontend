import React, {useState, useEffect} from 'react';
import {Grid, Header, Dropdown, Message, Menu, Divider} from 'semantic-ui-react';

import FeatureList from './FeatureList';
import UsersTable from './UsersTable';
// TODO: Remove all interrogations
export default function StatusPage() {
  const [product, setProduct] = useState();
  const [filter, setFilter] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState();

  useEffect(() => {
    fetchServers();
  }, []);

  useEffect(() => {
    product &&
      // TODO: the features array is being iterated twice (here and in the return)
      setFilterOptions(
        product.features.map((feature, key) => ({
          key: key,
          text: feature.name,
          value: feature.name,
        }))
      );
  }, [product]);

  const fetchServers = () => {
    fetch('http://localhost:5000/api/servers')
      .then(res => res.json())
      .then(data =>
        setProductList(
          data.map(server => ({
            key: server.name,
            text: server.name,
            value: server.name,
          }))
        )
      )
      .catch(console.log);
  };

  // TODO: Improve this (await)
  const fetchProduct = productName => {
    fetch('http://localhost:5000/api/product/' + productName)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(console.log);
  };

  const handleProductSelection = (e, {value}) => fetchProduct(value);

  // TODO: Avoid re-rendering all the features by suing memoized stuff
  const handleFeatureSelection = featureName =>
    setSelectedFeature(product.features.find(f => f.name === featureName));

  // TODO: Use references instead of creating a new array
  const handleFilterChange = (e, {value}) =>
    setFilter(product.features.filter(f => value.includes(f.name)));

  return (
    // TODO: Dropdown issue (Seems to be related to semantic-ui)
    // Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of RefFindNode
    // which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn
    // more about using refs safely here:
    <Grid padded>
      <Grid.Row>
        <Menu>
          <Dropdown
            placeholder="Select Product"
            search
            selection
            options={productList}
            onChange={handleProductSelection}
            loading={productList.length === 0}
          />
          <Dropdown
            placeholder="Filter features"
            search
            selection
            multiple
            options={filterOptions}
            onChange={handleFilterChange}
          />
        </Menu>
      </Grid.Row>

      {
        // TODO: Create a component to render this??
        // so it can be checked if product is null in the new component
        product && (
          <>
            <Grid.Row>
              <Header as="h1">{product.name}</Header>
            </Grid.Row>

            <Grid.Row style={{overflowX: 'scroll', flexWrap: 'nowrap'}}>
              <FeatureList
                features={filter.length > 0 ? filter : product.features}
                featureSelectionHandler={handleFeatureSelection}
              />
            </Grid.Row>

            <Divider section />

            {
              // Header
              selectedFeature !== undefined && (
                <>
                  <Grid.Row>
                    <Header dividing size="huge" as="h2">
                      Users of {selectedFeature.name}
                    </Header>
                  </Grid.Row>
                  {selectedFeature.message && (
                    <Grid.Row>
                      <Message warning header="Feature message" content={selectedFeature.message} />
                    </Grid.Row>
                  )}
                  <Grid.Row>
                    <UsersTable userList={selectedFeature.licenses} />
                  </Grid.Row>
                </>
              )
            }
          </>
        )
      }
    </Grid>
  );
}
