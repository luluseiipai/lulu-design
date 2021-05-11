import React, { FC, useContext, CSSProperties } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: CSSProperties
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, children, className, style } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  index: '0',
  disabled: false,
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
