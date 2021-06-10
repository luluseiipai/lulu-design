import React, { CSSProperties } from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from './'
import { SelectProps } from './Select'

export default {
  title: '组件/Select',
  component: Select,
} as Meta

const styles: CSSProperties = {
  padding: '20px 40px',
  width: '500px',
}
const Decorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const Template: Story<SelectProps> = (args) => (
  <Select {...args}>
    <Select.Option value='123' />
    <Select.Option value='234' />
    <Select.Option value='345' />
    <Select.Option value='456' disabled />
    <Select.Option value='567' />
    <Select.Option value='678' />
    <Select.Option value='789' />
  </Select>
)

export const Default = Template.bind({})
Default.args = {
  onVisibleChange: action('visible'),
  onChange: action('changed'),
}
Default.storyName = 'Select'
Default.decorators = [Decorator]
