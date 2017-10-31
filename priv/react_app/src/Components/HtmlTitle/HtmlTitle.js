import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

/**
 * A component which sets the html title of the page
 */
const HtmlTitle = ({title}) => {
  const text = title ? `Nexpo | ${title}` : 'Nexpo'
  return (
    <Helmet>
      <title>{text}</title>
    </Helmet>
  )
}

HtmlTitle.propTypes = {
  title: PropTypes.string
}

export default HtmlTitle
