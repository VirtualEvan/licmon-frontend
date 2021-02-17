import React, {useState, useEffect} from 'react';
import {Table, Header, Menu, Search, Divider} from 'semantic-ui-react';
import styles from './UserTable.module.scss';

function SingleLicenseRow({username, hostname, display, version, server, port, handle, checkout}) {
  return (
    <Table.Row>
      <Table.Cell>{username}</Table.Cell>
      <Table.Cell>{hostname}</Table.Cell>
      <Table.Cell>{display}</Table.Cell>
      <Table.Cell>{version}</Table.Cell>
      <Table.Cell>{server}</Table.Cell>
      <Table.Cell>{port}</Table.Cell>
      <Table.Cell>{handle}</Table.Cell>
      <Table.Cell>{checkout}</Table.Cell>
    </Table.Row>
  );
}

function MultiLicenseRow({
  username,
  hostname,
  display,
  version,
  server,
  port,
  handle,
  checkout,
  num_licenses,
}) {
  return (
    <Table.Row>
      <Table.Cell>{username}</Table.Cell>
      <Table.Cell>{hostname}</Table.Cell>
      <Table.Cell>{display}</Table.Cell>
      <Table.Cell>{version}</Table.Cell>
      <Table.Cell>{server}</Table.Cell>
      <Table.Cell>{port}</Table.Cell>
      <Table.Cell>{handle}</Table.Cell>
      <Table.Cell>{checkout}</Table.Cell>
      <Table.Cell>{num_licenses}</Table.Cell>
    </Table.Row>
  );
}

//TODO: Refactor this
export default function UserTable({featureName, userList = []}) {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(userList);
  }, [userList]);

  if (userList.length === 0) {
    return null;
  }

  // TODO: Just read it...
  // Check if multiple licenses are granted for this feature
  //const isMultiLicense = 'num_licenses' in userList[0];
  const isMultiLicense = userList[0]['num_licenses'] !== null;

  const handleFilterChange = (e, {value}) =>
    setFilter(userList.filter(user => JSON.stringify(Object.values(user)).includes(value)));

  return (
    <>
      <Divider />

      <Menu attached="top" borderless className={styles['table-menu']}>
        <Menu.Item>
          <Header as="h2" className={styles['table-title']}>
            Users of {featureName}
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Search
            className={styles['user-filter']}
            onSearchChange={handleFilterChange}
            showNoResults={false}
          />
        </Menu.Menu>
      </Menu>
      {
        // TODO: Use {`${styles['users-table']} attached segment`} if using attached tabs
      }
      <Table attached="bottom" className={styles['users-table']}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Hostname</Table.HeaderCell>
            <Table.HeaderCell>Display</Table.HeaderCell>
            <Table.HeaderCell>Version</Table.HeaderCell>
            <Table.HeaderCell>Server</Table.HeaderCell>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Handle</Table.HeaderCell>
            <Table.HeaderCell>Checkout</Table.HeaderCell>
            {isMultiLicense && <Table.HeaderCell>Num. licenses</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isMultiLicense
            ? filter.map((user, key) => (
                <MultiLicenseRow
                  key={key}
                  username={user.username}
                  hostname={user.hostname}
                  display={user.display}
                  version={user.version}
                  server={user.server}
                  port={user.port}
                  handle={user.handle}
                  checkout={user.checkout}
                  num_licenses={user.num_licenses}
                />
              ))
            : filter.map((user, key) => (
                <SingleLicenseRow
                  key={key}
                  username={user.username}
                  hostname={user.hostname}
                  display={user.display}
                  version={user.version}
                  server={user.server}
                  port={user.port}
                  handle={user.handle}
                  checkout={user.checkout}
                />
              ))}
        </Table.Body>
      </Table>
    </>
  );
}
