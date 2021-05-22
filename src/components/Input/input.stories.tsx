import React, { CSSProperties } from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Input, InputProps } from './Input'

export default {
  title: '组件/Input',
  component: Input,
} as Meta

const styles: CSSProperties = {
  padding: '20px 40px',
  width: '500px',
}
const InputDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const Template: Story<InputProps> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: '漂亮的Input',
  onChange: action('changed'),
}
Default.storyName = 'Input'
Default.decorators = [InputDecorator]

export const DisabledInput = Template.bind({})
DisabledInput.args = {
  placeholder: '被禁用的Input',
  disabled: true,
}
DisabledInput.storyName = '被禁用的Input'
DisabledInput.decorators = [InputDecorator]

export const IconInput = Template.bind({})
IconInput.args = {
  icon: 'search',
  placeholder: 'input width icon',
}
IconInput.storyName = '带图标的Input'
IconInput.decorators = [InputDecorator]

export const SizeInput = () => (
  <>
    <Input defaultValue='large size' size='lg' />
    <Input defaultValue='small size' size='sm' />
  </>
)
SizeInput.storyName = '不同尺寸的Input'
SizeInput.decorators = [InputDecorator]

export const ExtraInput = () => (
  <>
    <Input defaultValue='www.baidu.com' prepend='https://' />
    <Input defaultValue='google' append='.com' />
  </>
)
ExtraInput.decorators = [InputDecorator]
