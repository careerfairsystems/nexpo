import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';

import MailtemplateForm from '../../../Forms/MailtemplateForm';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';

type Props = {
  id?: string,
  mailtemplate: {},
  createMailtemplate: () => Promise<any>,
  fetching: boolean,
  getMailtemplate: () => Promise<any>,
  updateMailtemplate: () => Promise<any>
};
class Mailtemplate extends Component<Props> {
  static defaultProps = {
    id: null
  };

  componentWillMount() {
    const { id, getMailtemplate } = this.props;
    if (id) getMailtemplate(id);
  }

  updateMailtemplate = values => {
    const {
      id,
      mailtemplate,
      createMailtemplate,
      updateMailtemplate
    } = this.props;

    if (isEmpty(mailtemplate)) {
      createMailtemplate({ mailtemplate: values });
    } else {
      updateMailtemplate(id, { mailtemplate: values });
    }
  };

  render() {
    const { id, mailtemplate, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (id && isEmpty(mailtemplate)) return <NotFound />;

    return (
      <div className="mailtemplate">
        <h1>Mailtemplate</h1>
        <MailtemplateForm
          onSubmit={this.updateMailtemplate}
          initialValues={mailtemplate}
        />
      </div>
    );
  }
}

export default Mailtemplate;
