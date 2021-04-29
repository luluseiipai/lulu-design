import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item subMenu-item', className, {
    'is-active': context.index === index,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvent =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}
  const hoverEvent =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('subMenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childEl = child as React.FunctionComponentElement<MenuItemProps>
      if (childEl.type.displayName === 'MenuItem') {
        const idx =
          childEl.props.index && childEl.props.index !== '0'
            ? childEl.props.index
            : i
        return React.cloneElement(childEl, {
          index: `${index}-${idx}`,
        })
      }
      console.error(
        'Warning: Menu has a child which is not a MenuItem component'
      )
    })
    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }

  return (
    <li className={classes} {...hoverEvent}>
      <div className='subMenu-title' {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
