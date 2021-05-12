import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Icon, IconProps } from './Icon'
import Button from '../Button'

export default {
  title: '组件/Icon',
  component: Icon,
} as Meta

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: 'tools',
  size: '10x',
}
Default.storyName = 'Icon'

export const diffIcon = () => (
  <>
    <Icon icon='trademark' size='2x' style={{ marginRight: '5px' }} />
    <Icon icon='train' size='2x' style={{ marginRight: '5px' }} />
    <Icon
      icon='cheese'
      theme='success'
      size='2x'
      style={{ marginRight: '5px' }}
    />
    <Button btnType='primary' size='lg'>
      <Icon icon='check' />
      check
    </Button>
  </>
)
diffIcon.storyName = '不同类型的 Icon'

export const extraIcon = () => (
  <>
    <Icon
      icon='spinner'
      theme='primary'
      size='3x'
      style={{ marginRight: '5px' }}
      pulse
    />
    <Icon
      icon='spinner'
      theme='success'
      size='3x'
      style={{ marginRight: '5px' }}
      spin
    />
  </>
)
extraIcon.storyName = '更多行为的 Icon'
