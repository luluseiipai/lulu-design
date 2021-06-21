import React from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Upload, UploadProps } from './Upload'

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

const Template: Story<UploadProps> = (args) => <Upload {...args} />

export const Default = Template.bind({})
Default.args = {
  action: 'http://jsonplaceholder.typicode.com/posts',
  onChange: action('changed'),
  beforeUpload: filePromise,
}
Default.storyName = 'Upload'
