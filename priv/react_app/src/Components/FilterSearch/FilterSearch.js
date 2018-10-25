import React from 'react';

import { Input, Button, Icon } from 'antd';

export const FilterIcon = (filtered: boolean) => (
  <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
);

type InputEvent = SyntheticKeyboardEvent<HTMLInputElement>;

type Props = {
  clearFilters: void => void,
  confirm: void => void,
  selectedKeys: Array<string>,
  setSelectedKeys: (Array<?string>) => void
};

const FilterSearch = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}: Props) => (
  <div className="custom-filter-dropdown">
    <Input
      placeholder="Search"
      autoFocus
      value={selectedKeys[0]}
      onChange={({ currentTarget: { value } }: InputEvent) => {
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

export default FilterSearch;
