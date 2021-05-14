import React, { FC, Children, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './TabItem'

type TypeMode = 'default' | 'card'
type selectCallback = (index: number) => void

export interface TabProps {
  /**标签页类型 */
  mode?: TypeMode
  /**可扩展的 className */
  className?: string
  /**设置默认 active 的标签页索引值 */
  defaultIndex?: number
  /**选中标签页时的回调函数 */
  onSelect?: selectCallback
}

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 *
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'vikingship'
 * ~~~
 */
export const Tab: FC<TabProps> = (props) => {
  const { className, mode, defaultIndex, onSelect, children } = props
  const [curActive, setCurActive] = useState(defaultIndex)

  const navClasses = classNames('lu-tab-nav', className, {
    [`nav-${mode}`]: mode,
  })

  const handleClick = (index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setCurActive(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }

  const renderNavLinks = () => {
    return Children.map(children, (child, index) => {
      const childEl = child as FunctionComponentElement<TabItemProps>
      if (childEl.type.displayName === 'TabItem') {
        const { label, disabled } = childEl.props
        const classes = classNames('lu-tab-nav-item', {
          'is-active': curActive === index,
          'is-disabled': disabled,
        })
        return (
          <li
            className={classes}
            key={`nav-item-${index}`}
            onClick={() => handleClick(index, disabled)}>
            {label}
          </li>
        )
      } else {
        console.error(
          'Warning: Tab has a child which is not a TabItem component'
        )
      }
    })
  }

  const renderContent = () => {
    return Children.map(children, (child, index) => {
      if (curActive === index) {
        return child
      }
    })
  }

  return (
    <div className={`lu-tab ${className}`} data-testid='test-tab'>
      <ul className={navClasses}>{renderNavLinks()}</ul>
      <div className='lu-tab-content'>{renderContent()}</div>
    </div>
  )
}

Tab.defaultProps = {
  defaultIndex: 0,
  mode: 'default',
}

export default Tab
