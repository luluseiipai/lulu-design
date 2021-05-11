import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './'
import { MenuProps } from './Menu'

export default {
  title: '组件/Menu',
  component: Menu,
} as Meta

const Template: Story<MenuProps> = (args) => (
  <Menu {...args} onSelect={action('selected!')}>
    <Menu.Item>item 1</Menu.Item>
    <Menu.Item disabled>item 2</Menu.Item>
    <Menu.Item>item 3</Menu.Item>
    <Menu.SubMenu title='下拉列表'>
      <Menu.Item>下拉列表 1</Menu.Item>
      <Menu.Item>下拉列表 2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  defaultIndex: '0',
}
Horizontal.storyName = 'Menu'

export const Vertical = Template.bind({})
Vertical.args = {
  mode: 'vertical',
}
Vertical.storyName = '纵向的 Menu'

export const OpenVertical = Template.bind({})
OpenVertical.args = {
  mode: 'vertical',
  defaultOpenSubMenus: ['3'],
}
OpenVertical.storyName = '默认展开的纵向 Menu'
