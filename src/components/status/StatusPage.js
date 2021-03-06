import React, {useState, useEffect} from 'react';
import {Grid, Dropdown, Message, Menu, Tab, TextArea, Header, Button} from 'semantic-ui-react';
import {getServers, getProduct, requestRelease} from '../../services/status';
import styles from './StatusPage.module.scss';
import client from '../../core/client'

import FeatureList from './FeatureList';
import UserTable from './UserTable';
import AdminRequired from '../users/AdminRequired';

// TODO: Remove all interrogations
export default function StatusPage() {
  const [filter, setFilter] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState();
  const [servers, loadingServers] = client.useBackend(getServers);
  const [_getProduct, loadingProduct, , product] = client.useBackendLazy(getProduct);
  const [sendReleaseRequest, sendingReleaseRequest] = client.useBackendLazy(requestRelease);
  useEffect(() => {
    servers &&
    setProductList(
      servers.map(server => ({
        key: server.name,
        text: server.name,
        value: server.name,
      }))
    )
  }, [servers]);

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

  const handleProductSelection = (e, {value}) => _getProduct(value);

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
        <Header as="h1">
          <Dropdown
            placeholder="Select product..."
            search
            selectOnBlur={false}
            options={productList}
            onChange={handleProductSelection}
            loading={loadingServers}
            className={styles['product-selector']}
          />
        </Header>
      </Grid.Row>

      <Grid.Row>
        {product && (
          <Tab
            //menu={{attached: false, tabular: false}}
            className={styles.info}
            panes={[
              {
                menuItem: {key: 'features', icon: 'id card outline', content: 'Features'},
                render: () => (
                  <Tab.Pane className={styles['main-pane']}>
                    <FeatureList
                      features={filter.length > 0 ? filter : product.features}
                      featureSelectionHandler={handleFeatureSelection}
                    />

                    {
                      // TODO: Create a component to render this??
                      // so it can be checked if product is null in the new component
                      product && selectedFeature !== undefined && (
                        <>
                          {selectedFeature.message && (
                            <Grid.Row>
                              <Message
                                warning
                                header="Feature message"
                                content={selectedFeature.message}
                              />
                            </Grid.Row>
                          )}
                          <Grid.Row>
                            <AdminRequired
                              component={UserTable}
                              featureName={selectedFeature.name}
                              userList={selectedFeature.licenses}
                            />
                          </Grid.Row>
                          <Grid.Row className={styles['button-row']}>
                            <Button
                              icon="mail"
                              content="Request license release"
                              size="big"
                              className={styles['request-release-button']}
                              onClick={() => sendReleaseRequest(product.name, selectedFeature.name)}
                              loading={sendingReleaseRequest}
                              disabled={sendingReleaseRequest}
                            />
                          </Grid.Row>
                        </>
                      )
                    }
                  </Tab.Pane>
                ),
              },
              {
                menuItem: (
                  <AdminRequired
                    component={Menu.Item}
                    key='raw'
                    icon='code'
                    content='Raw' />
                ),
                render: () => (
                  <AdminRequired
                    component={TextArea}
                    rows="50"
                    disabled
                    className={styles.raw}
                    value={product.raw}
                  />
                ),
              },
              {
                menuItem: (
                  <Menu.Menu key="filter" position="right" active="false">
                    <Dropdown
                      multiple
                      selection
                      search
                      placeholder="Filter features"
                      options={filterOptions}
                      onChange={handleFilterChange}
                      className={styles.filter}
                    />
                  </Menu.Menu>
                ),
              },
            ]}
          />
        )}
      </Grid.Row>
    </Grid>
  );
}
