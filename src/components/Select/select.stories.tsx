import React, { CSSProperties } from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Select, SelectProps } from './Select'

export default {
  title: '组件/Select',
  component: Select,
} as Meta

const Template: Story<SelectProps> = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.storyName = 'Select'
