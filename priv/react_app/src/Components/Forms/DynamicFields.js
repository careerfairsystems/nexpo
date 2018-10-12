import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

let uuid = 0;
class DynamicFieldSet extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item required={false} key={k}>
        <Input placeholder="date" style={{ width: '60%', marginRight: 8 }} />
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={keys.length === 1}
          onClick={() => this.remove(k)}
        />
      </Form.Item>
    ));
    return (
      <div>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add}>
            <Icon type="plus" />
            Add field
          </Button>
        </Form.Item>
      </div>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
export default WrappedDynamicFieldSet;
