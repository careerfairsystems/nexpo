import React, { Component } from 'react';
import { isEmpty } from 'lodash/fp';

import MailtemplateForm from '../../../Forms/MailtemplateForm';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';

type MailTemplateObj = {
  id?: string,
  name: string,
  subject: string,
  content: string,
  signature: string
};

type Props = {
  id?: string,
  mailtemplate: { mailtemplate: MailTemplateObj } | {},
  createMailtemplate: ({ mailtemplate: MailTemplateObj }) => Promise<void>,
  fetching: boolean,
  getMailtemplate: string => Promise<void>,
  updateMailtemplate: (
    string,
    { mailtemplate: MailTemplateObj }
  ) => Promise<void>
};
class Mailtemplate extends Component<Props> {
  static defaultProps = {
    id: ''
  };

  componentWillMount() {
    const { id, getMailtemplate } = this.props;
    if (id) getMailtemplate(id);
  }

  updateMailtemplate = (values: {
    name?: string,
    subject?: string,
    content?: string,
    signature?: string
  }) => {
    const {
      id,
      mailtemplate,
      createMailtemplate,
      updateMailtemplate
    } = this.props;

    if (isEmpty(mailtemplate)) {
      createMailtemplate({ mailtemplate: { id, ...values } });
    } else if (id) {
      updateMailtemplate(id, { mailtemplate: { id, ...values } });
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
