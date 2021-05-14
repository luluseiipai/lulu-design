import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tab from './'
import { TabProps } from './Tab'
import { Icon } from '../Icon'

export default {
  title: '组件/Tab',
  component: Tab,
} as Meta

const Template: Story<TabProps> = (args) => (
  <Tab {...args} onSelect={action('selected!')}>
    <Tab.Item label='选项卡 1'>this is content 1</Tab.Item>
    <Tab.Item label='选项卡 2'>this is content 2</Tab.Item>
    <Tab.Item label='用户管理'>用户管理个啥</Tab.Item>
  </Tab>
)

export const Default = Template.bind({})
Default.args = {
  defaultIndex: 0,
}
Default.storyName = 'Tab'

export const CardTab = Template.bind({})
CardTab.args = {
  mode: 'card',
}
CardTab.storyName = '不同样式的选项卡 Tab'

export const MixTab = () => (
  <Tab onSelect={action('selected!')}>
    <Tab.Item label='选项卡 1'>this is content 1</Tab.Item>
    <Tab.Item label='选项卡 2'>this is content 2</Tab.Item>
    <Tab.Item
      label={
        <>
          <Icon icon='check-circle' /> 自定义图标
        </>
      }>
      自定义
    </Tab.Item>
  </Tab>
)
MixTab.storyName = '自定义选项卡内容'
