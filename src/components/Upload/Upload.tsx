import React, { FC } from 'react'
import classNames from 'classnames'
import Button from '../Button'

export interface UploadProps {
  action: string
  name: string
  beforeUpload: () => void
  onProgress: () => void
  onChange: () => void
  onSuccess: () => void
  onError: () => void
  onRemoved: () => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    beforeUpload,
    onProgress,
    onChange,
    onSuccess,
    onError,
    onRemoved,
    children,
  } = props
  return <></>
}

export default Upload
