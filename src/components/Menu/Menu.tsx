import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: selectCallback
}

interface IMenuContext {
  index: string
  mode?: MenuMode
  onSelect?: selectCallback
}

export const MenuContext = React.createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, children, mode, style, onSelect } = props
  const [curActive, setCurActive] = useState(defaultIndex)

  const classes = classNames('lu-menu', className, {
    [`lu-menu-${mode}`]: mode,
  })

  const handleClick = (index: string) => {
    setCurActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: curActive ? curActive : '0',
    mode,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childEl.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        const idx =
          childEl.props.index && childEl.props.index !== '0'
            ? childEl.props.index
            : index
        return React.cloneElement(childEl, { index: idx + '' })
      }
      console.error(
        'Warning: Menu has a child which is not a MenuItem component'
      )
    })
  }

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
}

export default Menu
