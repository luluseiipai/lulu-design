import React, { CSSProperties } from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Upload, UploadProps } from './Upload'
import Button from '../Button'

export default {
  title: '组件/Upload',
  component: Upload,
} as Meta

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

const styles: CSSProperties = {
  padding: '20px',
  width: '800px',
}
const Decorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const Template: Story<UploadProps> = (args) => (
  <Upload {...args}>
    <Button>click</Button>
  </Upload>
)

export const Default = Template.bind({})
Default.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  name: 'storyFile',
  data: { key: 'value' },
  headers: { 'X-Husion-Test': 'lulu' },
  accept: '.txt',
  multiple: true,
  withCredentials: true,
  onChange: action('changed'),
  onProgress: action('progress'),
  onSuccess: action('success'),
  onError: action('error'),
  onRemoved: action('removed'),
}
Default.storyName = 'Upload'
Default.decorators = [Decorator]

export const SizeLimit = Template.bind({})
SizeLimit.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  onChange: action('changed'),
  beforeUpload: checkFileSize,
}
SizeLimit.storyName = '上传前检查文件大小'
SizeLimit.decorators = [Decorator]

export const Wrap = Template.bind({})
Wrap.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  onChange: action('changed'),
  beforeUpload: filePromise,
}
Wrap.storyName = '重新打包文件'
Wrap.decorators = [Decorator]
