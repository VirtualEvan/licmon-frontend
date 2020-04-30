import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Header, Dropdown, Segment, Container, Table, Menu, Button, Divider, Image, Label, Input, Icon } from 'semantic-ui-react'

import logo from './logo.svg';
import './App.css';
import Feature from './Feature'
import NavigationMenu from './NavigationMenu'
import UsersTable from './UsersTable';

function App() {
  const [product, setProduct] = useState(null)
  const [currentFeature, setCurrentFeature] = useState()
  const [filterList, setFilterList] = useState([])
  const [filterOptions, setFilterOptions] = useState()

  useEffect(() => {
    if (product !== null){
      // TODO: the features array is being iterated twice (here and in the return)
      setFilterOptions(product.features.map(
        (feature, key) => (
          {key: key, text: feature.name, value: feature.name}
        ))
      )
    }
  }, [product]);
  console.log(filterOptions)

  let prodcutList = [
    {
      key: "comsol",
      text: "Comsol",
      value: "comsol"
    },
    {
      key: "autodesk",
      text: "Autodesk",
      value: "autodesk2015"
    },
    {
      key: "mentor",
      text: "Mentor",
      value: "mentor"
    }
  ]

  function fetchProduct(productName) {
    fetch('http://localhost:5000/product/' + productName)
    .then(res => res.json())
    .then((data) => {
      setProduct(data)
    })
    .catch(console.log)
  }
  
  const handleProductSelection = (event, data) => fetchProduct(data.value)

  const handleFilterChange = (e, selection) => setFilterList(selection.value)

  return (
      <Grid padded>
        <Grid.Column
          tablet={3}
          computer={3}
          only="tablet computer"
          id="sidebar"
        >
          <NavigationMenu/>
        </Grid.Column>

        <Grid.Column
          mobile={16}
          tablet={13}
          computer={13}
          floated="right"
          id="content"
        >
        
          <Grid padded>
            <Grid.Row>
              <Header as='h1'>
                {product?.name}
              </Header>
              <Menu>
                <Dropdown 
                  placeholder='Select Product'
                  search
                  selection
                  options={prodcutList}
                  onChange={handleProductSelection}
                />
                <Dropdown
                  placeholder='Filter features'
                  search
                  selection
                  multiple
                  options={filterOptions}
                  noResultsMessage={null}
                  //allowAdditions
                  //value={test}
                  //onAddItem={()=> {}}
                  onChange={handleFilterChange}
                />
              </Menu>

            </Grid.Row>

            <Grid.Row style={{overflowX: 'scroll', flexWrap: 'nowrap'}}>

              {product?.features.map((feature, key) => (
                //featureList.push({key: key, text: feature.name, value: feature.name}),
                // TODO: This div should be removed
                // If the div is not there, the "hidden" property does not work
                // Having this div removes the space between features
                <div>
                  <Grid.Column key={key} mobile={8} tablet={4} computer={9} style={{minWidth: '200pt'}} hidden={!filterList.includes(feature.name)}>
                    <Feature
                      name = {feature.name}
                      // TODO: Change this "|| 0"
                      licenses_issued = {feature.licenses_issued || 0}
                      licenses_in_use = {feature.licenses_in_use || 0}
                      users = {feature.users}
                      message = {feature.message}
                      selectFeature = {setCurrentFeature}
                    />
                  </Grid.Column>
                </div>
              ))}

            </Grid.Row>

            <Divider section hidden />

            <Grid.Row>
              <Header dividing size="huge" as="h2">
                Users of {currentFeature}
              </Header>
              <UsersTable 
                userList = {product?.features.find(f => f.name === currentFeature)?.users}
              />
            </Grid.Row>

            <Grid.Row>
              
            </Grid.Row>

          </Grid>
        </Grid.Column>
      </Grid>
    
  );
}

export default App;
