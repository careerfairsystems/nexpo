import React, { Component } from 'react';
import { isEmpty, isNil, capitalize, join } from 'lodash/fp';
import { List, Avatar, Button } from 'antd';
import NotFound from '../../../NotFound';
import HtmlTitle from '../../../../Components/HtmlTitle';
import InvisibleLink from '../../../../Components/InvisibleLink';
import '../Role.css';

/**
 * Responsible for rendering a role. Role id is recieved via url
 */
type Props = {
  id: string,
  role: {
    id?: string,
    type?: string,
    permissions?: Array<string>,
    users?: Array<number>
  },
  getRole: string => Promise<void>
};
class RoleShow extends Component<Props> {
  componentWillMount() {
    const { id, getRole } = this.props;
    getRole(id);
  }

  render() {
    const { role } = this.props;

    if (isEmpty(role) || isNil(role)) {
      return <NotFound />;
    }

    return (
      <div className="role-show-view">
        <HtmlTitle title={capitalize(role.type || '')} />

        <div>
          <h1>{capitalize(role.type || '')}</h1>
          <p>Permissions: {join(',', role.permissions || [])}</p>
          <h2>Users</h2>
          <List
            dataSource={role.users}
            bordered
            renderItem={({ id, firstName, lastName, email }) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <InvisibleLink to={`/admin/users/${id}`}>
                      <Avatar size="large">{id}</Avatar>
                    </InvisibleLink>
                  }
                  title={[firstName, lastName].join(' ')}
                  description={`Email: ${email}`}
                />
              </List.Item>
            )}
          />
        </div>
        <br />

        <InvisibleLink to={`/admin/roles/${role.id || ''}/edit`}>
          <Button onClick={() => null} type="primary">
            Edit
          </Button>
        </InvisibleLink>
      </div>
    );
  }
}

export default RoleShow;
