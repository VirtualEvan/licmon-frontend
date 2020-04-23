import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react'

function UserRow({
    username,
    hostname,
    display,
    version,
    server,
    port,
    handle,
    checkout,
    num_licenses
  }) {

  return (
    <Table.Row>
      <Table.Cell>
        {username}
      </Table.Cell>
      <Table.Cell>
        {hostname}
      </Table.Cell>
      <Table.Cell>
        {display}
      </Table.Cell>
      <Table.Cell>
        {version}
      </Table.Cell>
      <Table.Cell>
        {server}
      </Table.Cell>
      <Table.Cell>
        {port}
      </Table.Cell>
      <Table.Cell>
        {handle}
      </Table.Cell>
      <Table.Cell>
        {checkout}
      </Table.Cell>
      <Table.Cell>
        {num_licenses}
      </Table.Cell>
    </Table.Row>
  );
}

export default function UsersTable({usersData}) {

  if (usersData.length === 0) {
    return null;
  }

  return (
    <Table striped>
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
          <Table.HeaderCell>Num. licenses</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {usersData.map(user => (
          <UserRow
            key={user.username}
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
        ))}
      </Table.Body>
    </Table>
  );
}