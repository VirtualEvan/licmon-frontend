import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Header, Dropdown, Message, Segment, Container, Table, Menu, Button, Divider, Image, Label, Input, Icon } from 'semantic-ui-react'

import logo from './logo.svg';
import './App.css';
import Feature from './Feature'
import NavigationMenu from './NavigationMenu'
import UsersTable from './UsersTable';

function App() {
  const [product, setProduct] = useState(null)
  const [currentFeature, setCurrentFeature] = useState()
  const [filterList, setFilterList] = useState([])
  const [filterOptions, setFilterOptions] = useState([])

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

  // TODO: Improve this (await)
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

  const handleSelectFeature = (featureName) => setCurrentFeature(product?.features.find(f => f.name === featureName))

  const isFilteredFeature = (name) => filterList.includes(name) || filterList.length === 0

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
                  onChange={handleFilterChange}
                />
              </Menu>
            </Grid.Row>

            <Grid.Row>
              <Header as='h1'>
                {product?.name}
              </Header>
            </Grid.Row>

            <Grid.Row style={{overflowX: 'scroll', flexWrap: 'nowrap'}}>
              
              {
              // TODO: Check cardgroups
              product?.features.map((feature, key) => (
                // TODO: Check if it is better (more performant) to filter adding a "hidden" property
                // The hidden property only works if the Grid is wrapped inside a div
                isFilteredFeature(feature.name) &&
                  <Grid.Column key={key} mobile={8} tablet={4} computer={9} style={{minWidth: '200pt', maxWidth: '200pt'}}>
                    <Feature
                      name = {feature.name}
                      // TODO: Change this "|| 0"
                      licenses_issued = {feature.licenses_issued || 0}
                      licenses_in_use = {feature.licenses_in_use || 0}
                      users = {feature.users}
                      message = {feature.message}
                      selectFeature = {handleSelectFeature}
                    />
                  </Grid.Column>
              ))}

            </Grid.Row>

            <Divider section hidden />
            
            { // Header
              typeof currentFeature !== 'undefined' &&
                <Grid.Row>
                  <Header dividing size="huge" as="h2">
                    Users of {currentFeature?.name}
                  </Header>
                </Grid.Row>
            }

            { // Message
              typeof currentFeature !== 'undefined' &&
                <Grid.Row>
                  <Message
                    warning
                    hidden={typeof currentFeature?.message === 'undefined'}
                    header='Feature message'
                    content={currentFeature?.message}
                  />
                </Grid.Row> 
            }

            <Grid.Row>
              <UsersTable 
                userList = {currentFeature?.users}
              />
            </Grid.Row>

          </Grid>
        </Grid.Column>
      </Grid>
    
  );
}

export default App;
