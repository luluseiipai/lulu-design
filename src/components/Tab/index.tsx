import { FC } from 'react'
import { Tab, TabProps } from './Tab'
import { TabItem, TabItemProps } from './TabItem'

export type ITabProps = FC<TabProps> & {
  item: FC<TabItemProps>
}

const TransProps = Tab as ITabProps

TransProps.item = TabItem

export default TransProps
