import React, {
  FC,
  useState,
  CSSProperties,
  createContext,
  FunctionComponentElement,
  Children,
  cloneElement,
} from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /**设置默认 active 的菜单项索引值 */
  defaultIndex?: string
  className?: string
  /**设置菜类型 横向纵向 */
  mode?: MenuMode
  style?: CSSProperties
  /**设置默认展开列表 只在纵向模式有效 */
  defaultOpenSubMenus?: string[]
  /**选中菜单项后回调 */
  onSelect?: selectCallback
}

interface IMenuContext {
  index: string
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
  onSelect?: selectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ## 引用方法
 *
 * ```ts
 * import { Menu } from 'lulu-ui'
 * // 然后可以使用 Menu.Item 和 Menu.SubMenu 访问选项和子下拉菜单组件
 * ```
 */
export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    defaultIndex,
    children,
    mode,
    style,
    defaultOpenSubMenus,
    onSelect,
  } = props
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
    defaultOpenSubMenus,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childEl = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childEl.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        const idx =
          childEl.props.index && childEl.props.index !== '0'
            ? childEl.props.index
            : index
        return cloneElement(childEl, { index: idx + '' })
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
  defaultOpenSubMenus: [],
}

export default Menu
