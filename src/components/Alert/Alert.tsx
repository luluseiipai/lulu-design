import React, { useState } from 'react'
import classNames from 'classnames'

export type AlertType = 'success' | 'default' | 'warning' | 'danger'

export interface AlertProps {
  type?: AlertType
  title: string
  description?: string
  closable?: boolean
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false)
  const { type, title, description, closable, onClose } = props
  const classes = classNames('lu-alert', {
    [`lu-alert-${type}`]: type,
  })
  const titleClasses = classNames('lu-alert-title', {
    'bold-title': description,
  })
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }
  if (!hide) {
    return (
      <div className={classes}>
        <span className={titleClasses}>{title}</span>
        {description && <p className='lu-alert-desc'>{description}</p>}
        {closable && (
          <div className='lu-alert-close' onClick={handleClose}>
            关闭
          </div>
        )}
      </div>
    )
  }
  return null
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
}

export default Alert
