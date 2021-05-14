import { FC } from 'react'
import { Tab, TabProps } from './Tab'
import { TabItem, TabItemProps } from './TabItem'

export type ITabProps = FC<TabProps> & {
  Item: FC<TabItemProps>
}

const TransProps = Tab as ITabProps

TransProps.Item = TabItem

export default TransProps
