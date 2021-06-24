import React, { FC, useState, MouseEvent } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import Transition from '../Transition'

export type AlertType = 'success' | 'default' | 'warning' | 'danger'

export interface AlertProps {
  type?: AlertType
  /**标题 */
  title: string
  /**描述 */
  message?: string
  /**是否显示关闭按钮 */
  closable?: boolean
  /**关闭时触发的回调函数 */
  onClose?: () => void
}

/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 *
 * ### 引用方法
 *
 * ~~~ts
 * import { Alert } from 'lulu-design'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const { type, title, message, closable, onClose } = props
  const [hide, setHide] = useState(false)

  const classes = classNames('lu-alert', {
    [`lu-alert-${type}`]: type,
  })
  const titleClasses = classNames('lu-alert-title', {
    'bold-title': message,
  })

  const handleClose = (e: MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }

  return (
    <Transition in={!hide} timeout={300} animation='zoom-in-top'>
      <div className={classes}>
        <span className={titleClasses}>{title}</span>
        {message && <p className='lu-alert-desc'>{message}</p>}
        {closable && (
          <span className='lu-alert-close' onClick={handleClose}>
            <Icon icon='times' />
          </span>
        )}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: 'default',
  closable: true,
}

export default Alert
