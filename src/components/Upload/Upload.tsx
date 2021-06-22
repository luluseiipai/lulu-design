import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button'
import UploadList from './UploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string
  /**上传的文件字段名 */
  name?: string
  /**设置上传的请求头部 */
  headers?: { [key: string]: any }
  /**上传时附带的额外参数 */
  data?: { [key: string]: any }
  /**支持发送 cookie 凭证信息 */
  withCredentials: boolean
  /**可选参数, 接受上传的文件类型 */
  accept?: string
  /**是否支持多选文件 */
  multiple?: boolean
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[]
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用*/
  onChange?: (file: UploadFile) => void
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void
  /**文件列表移除文件时的钩子 */
  onRemoved?: (file: UploadFile) => void
  /**是否支持拖拽上传 */
  drag?: boolean
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'lulu-ui'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    name,
    headers,
    data,
    accept,
    multiple,
    drag,
    withCredentials,
    defaultFileList,
    beforeUpload,
    onProgress,
    onChange,
    onSuccess,
    onError,
    onRemoved,
    children,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    // 用于处理异步情况采用函数式
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        } else {
          console.error('beforeUpload: Valid failed')
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    // setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file_' + file.name, file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, {
              percent: percentage,
              status: 'uploading',
            })
            if (onProgress) {
              onProgress(percentage, _file)
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, {
          percent: 100,
          status: 'success',
          response: resp.data,
        })
        if (onSuccess) {
          onSuccess(resp.data, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
      .catch((err) => {
        updateFileList(_file, {
          percent: 100,
          status: 'error',
          error: err,
        })
        if (onError) {
          onError(err, _file)
        }
        if (onChange) {
          onChange(_file)
        }
      })
  }

  const handleRemoved = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => file.uid !== item.uid)
    })
    if (onRemoved) {
      onRemoved(file)
    }
  }

  console.log(fileList)
  return (
    <div className='lu-upload-component'>
      <div
        className='lu-upload-input'
        style={{ display: 'inline-block' }}
        onClick={handleClick}>
        {children}
        <input
          ref={fileInput}
          className='lu-file-input'
          style={{ display: 'none' }}
          type='file'
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
      <UploadList fileList={fileList} onRemoved={handleRemoved} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
}

export default Upload
