import React, { useState } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: number) => void

export interface MenuProps {
  defaultIndex?: number
  className?: string
  mode?: MenuMode
  style?: React.CSSProperties
  onSelect?: selectCallback
}

interface IMenuContext {
  index: number
  onSelect?: selectCallback
}

export const MenuContext = React.createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, children, mode, style, onSelect } = props
  const [curActive, setCurActive] = useState(defaultIndex)

  const classes = classNames('lu-menu', className, {
    [`lu-menu-${mode}`]: mode === 'horizontal',
  })

  const handleClick = (index: number) => {
    setCurActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: curActive ? curActive : 0,
    onSelect: handleClick,
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu
