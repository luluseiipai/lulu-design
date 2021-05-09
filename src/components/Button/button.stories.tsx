import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button, { ButtonProps } from './button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: {
        type: 'radio',
        options: ['lg', 'sm', 'normal'],
      },
    },
    btnType: {
      control: {
        type: 'radio',
        options: ['primary', 'default', 'warning', 'danger', 'link'],
      },
    },
    disabled: { control: 'boolean' },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Default = Template.bind({})
Default.args = {
  btnType: 'default',
  onClick: action('clicked'),
}
Default.storyName = '默认按钮'

export const Size = () => (
  <>
    <Button size='lg'>Large button</Button>
    <Button>normal button</Button>
    <Button size='sm'>small button</Button>
  </>
)
Size.storyName = '不同尺寸的按钮'

export const Type = () => (
  <>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='default'>default button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='warning'>warning button</Button>
    <Button btnType='link' href='#'>
      link button
    </Button>
  </>
)
Type.storyName = '不同类型的按钮'
