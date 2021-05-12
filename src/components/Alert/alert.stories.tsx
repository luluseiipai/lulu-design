import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Alert, AlertProps } from './Alert'

export default {
  title: '组件/Alert',
  component: Alert,
} as Meta

const Template: Story<AlertProps> = (args) => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'this is a alert!',
}
Default.storyName = 'Alert'

export const stylesAlert = () => (
  <>
    <Alert title='this is a alert!' />
    <Alert title='this is a alert!' type='success' />
    <Alert title='this is a alert!' type='danger' />
    <Alert title='this is a alert!' type='warning' closable={false} />
  </>
)
stylesAlert.storyName = '不同类型的 Alert'

export const fullAlert = Template.bind({})
fullAlert.args = {
  title: 'this is a alert!',
  message: 'test',
}
fullAlert.storyName = '添加描述的 Alert'
