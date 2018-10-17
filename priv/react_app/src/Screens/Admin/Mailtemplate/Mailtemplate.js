import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';

import MailtemplateForm from '../../../Forms/MailtemplateForm';
import NotFound from '../../NotFound';
import LoadingSpinner from '../../../Components/LoadingSpinner';

class Mailtemplate extends Component {
  static propTypes = {
    id: PropTypes.string,
    mailtemplate: PropTypes.object.isRequired,
    createMailtemplate: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    getMailtemplate: PropTypes.func.isRequired,
    updateMailtemplate: PropTypes.func.isRequired
  };

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
