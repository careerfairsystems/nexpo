import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

/**
 * Set HtmlTitle of page
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
