import React, { useState } from 'react'
import classNames from 'classnames'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

interface AlertProps {
  type?: AlertType
  title?: string
  description?: string
  closable?: boolean
  onClose: () => void
}

const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false)
  const { type, title, description, closable, onClose } = props
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  })
  const titleClasses = classNames('alert-title', {
    ['bold-title']: description,
  })
  return <>123</>
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
}

export default Alert
