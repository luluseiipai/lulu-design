import React, { FC, ReactElement } from 'react'

export interface TabItemProps {
  /**tab 选项上的文字 */
  label: string | ReactElement
  /**tab 选项是否被禁用 */
  disabled?: boolean
}

export const TabItem: FC<TabItemProps> = ({ children }) => (
  <div className='lu-tab-panel'>{children}</div>
)

TabItem.displayName = 'TabItem'

export default TabItem
