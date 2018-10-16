import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash/fp';
import NotFound from '../../NotFound';
import MailtemplateForm from '../../../Forms/MailtemplateForm';
import LoadingSpinner from '../../../Components/LoadingSpinner';

class Mailtemplate extends Component {
  componentWillMount() {
    const { id, getMailtemplate } = this.props;
    getMailtemplate(id);
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
    const { mailtemplate, fetching } = this.props;

    if (fetching) return <LoadingSpinner />;
    if (isEmpty(mailtemplate) || isNil(mailtemplate)) return <NotFound />;

    return (
      <div className="mailtemplate">
        <div>
          <h1>Mailtemplate</h1>
          <MailtemplateForm
            onSubmit={this.updateMailtemplate}
            initialValues={mailtemplate}
          />
        </div>
      </div>
    );
  }
}

Mailtemplate.defaultProps = {
  id: null
};
Mailtemplate.propTypes = {
  id: PropTypes.string,
  mailtemplate: PropTypes.object.isRequired,
  createMailtemplate: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  getMailtemplate: PropTypes.func.isRequired,
  updateMailtemplate: PropTypes.func.isRequired
};

export default Mailtemplate;
