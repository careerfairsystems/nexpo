import React from 'react';

import { Input, Button } from 'antd';

type InputEvent = SyntheticKeyboardEvent<HTMLInputElement>;

type Props = {
  clearFilters: void => void,
  confirm: void => void,
  selectedKeys: Array<string>,
  setSelectedKeys: (Array<?string>) => void
};

const FilterSearchNew = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters
}: Props) => (
  <div className="custom-filter">
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

export default FilterSearchNew;
