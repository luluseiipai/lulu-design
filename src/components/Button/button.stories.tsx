import React from 'react'
import { Story, Meta } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { Button, ButtonProps } from './Button'

export default {
  title: '组件/Button',
  component: Button,
  argTypes: {
    size: {
      defaultValue: 'normal',
      control: {
        type: 'radio',
        options: ['lg', 'sm', 'normal'],
      },
      table: {
        category: 'Sizes',
        subcategory: 'Button size',
      },
    },
    btnType: {
      defaultValue: 'default',
      control: {
        type: 'radio',
        options: ['primary', 'default', 'warning', 'danger', 'link'],
      },
      table: {
        category: 'Colors',
        subcategory: 'Button style',
      },
    },
    disabled: {
      defaultValue: false,
      control: 'boolean',
    },
    onClick: {
      description: '点击函数',
      table: {
        category: 'Events',
        subcategory: 'Button Event',
      },
    },
  },
} as Meta

// const styles: React.CSSProperties = {
//   textAlign: 'center',
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Default = Template.bind({})
Default.args = {
  btnType: 'default',
  // onClick: action('clicked'),
}
Default.storyName = 'Button'
// Default.decorators = [CenterDecorator]
Default.parameters = {
  docs: {},
}

export const Size = () => (
  <>
    <Button size='lg'>Large button</Button>
    <Button>normal button</Button>
    <Button size='sm'>small button</Button>
  </>
)
Size.storyName = '不同尺寸的 Button'

export const Type = () => (
  <>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='default' disabled>
      default button
    </Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='warning'>warning button</Button>
    <Button btnType='link' href='#'>
      link button
    </Button>
  </>
)
Type.storyName = '不同状态的 Button'
// Type.decorators = [CenterDecorator]
