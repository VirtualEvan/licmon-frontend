import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Grid,
  Header,
  Dropdown,
  Message,
  Menu,
  Divider,
} from 'semantic-ui-react';

import FeatureList from './FeatureList';
import UsersTable from './UsersTable';
// TODO: Remove all interrogations
export default function StatusPage() {
  const [product, setProduct] = useState();
  const [filter, setFilter] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [currentFeature, setCurrentFeature] = useState();
  const selectedFeature = useSelector(state => state.status.selectedFeature);

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

  useEffect(() => {
    if (selectedFeature === undefined)
      console.log('It is undefined')
    else {
      console.log(selectedFeature)
      product && setCurrentFeature(product.features.find(f => f.name === selectedFeature));
    }
  }, [selectedFeature, product]);
  

  let prodcutList = [
    {
      key: 'comsol',
      text: 'Comsol',
      value: 'comsol',
    },
    {
      key: 'autodesk',
      text: 'Autodesk',
      value: 'autodesk2015',
    },
    {
      key: 'mentor',
      text: 'Mentor',
      value: 'mentor',
    },
  ];

  // TODO: Improve this (await)
  function fetchProduct(productName) {
    fetch('http://localhost:5000/product/' + productName)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(console.log);
  }

  const handleProductSelection = (e, {value}) => fetchProduct(value);

  // TODO: Use references instead of creating a new array
  const handleFilterChange = (e, {value}) => setFilter(product.features.filter(f => value.includes(f.name)));
  
  // TODO: remove after changing the behavior to use the store
  //const handleSelectFeature = featureName =>
  //  setCurrentFeature(product?.features.find(f => f.name === featureName));

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
            options={prodcutList}
            onChange={handleProductSelection}
          />
          <Dropdown
            placeholder="Filter features"
            search
            selection
            multiple
            options={filterOptions}
            noResultsMessage={null}
            onChange={handleFilterChange}
          />
        </Menu>
      </Grid.Row>

      {
        // TODO: Create a component to render this??
        // so it can be checked if product is null in the new component
        product &&
        <>
          <Grid.Row>
            <Header as="h1">{product.name}</Header>
          </Grid.Row>

          <Grid.Row style={{overflowX: 'scroll', flexWrap: 'nowrap'}}>
            <FeatureList features={filter.length > 0 ? filter : product.features} />
          </Grid.Row>
        
          <Divider section />

          {
            // Header
            currentFeature !== undefined && (
              <>
                <Grid.Row>
                  <Header dividing size="huge" as="h2">
                    Users of {currentFeature.name}
                  </Header>
                </Grid.Row>

                <Grid.Row>
                  <Message
                    warning
                    hidden={currentFeature.message === undefined}
                    header="Feature message"
                    content={currentFeature.message}
                  />
                </Grid.Row>

                <Grid.Row>
                  <UsersTable userList={currentFeature.users} />
                </Grid.Row>
              </>
            )
          }
        </>
      }
    </Grid>
  );
}
