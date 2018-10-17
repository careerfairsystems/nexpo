import React from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Icon } from 'antd';

export const FilterIcon = filtered => (
  <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
);

const FilterSearch = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}) => (
  <div className="custom-filter-dropdown">
    <Input
      placeholder="Search"
      value={selectedKeys[0]}
      onChange={({ target: { value } }) => {
        setSelectedKeys(value ? [value] : []);
      }}
      onPressEnter={() => confirm()}
    />
    <Button type="primary" onClick={() => confirm()}>
      Search
    </Button>
    <Button onClick={() => clearFilters()}>Reset</Button>
  </div>
);

FilterSearch.propTypes = {
  setSelectedKeys: PropTypes.func.isRequired,
  selectedKeys: PropTypes.array.isRequired,
  confirm: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default FilterSearch;
