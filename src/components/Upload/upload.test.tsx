import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
  createEvent,
} from '@testing-library/react'
import { Upload, UploadProps } from './Upload'

// jest.mock('../Icon/icon', () => {
//   return (props: any) => {
//     return <span onClick={props.onClick}>{props.icon}</span>
//   }
// })

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeUrl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemoved: jest.fn(),
  drag: true,
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>)
    fileInput = wrapper.container.querySelector(
      '.lu-file-input'
    ) as HTMLInputElement
    uploadArea = wrapper.queryByText('click to upload') as HTMLElement
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
  })
  it('upload process should works fine', async () => {
    const { queryByText, container } = wrapper
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(container.querySelector('.lu-upload-list-item')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
      expect(container.querySelector('.file-name-success')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )

    // remove the uploaded file
    expect(container.querySelector('.file-actions')).toBeInTheDocument()
    fireEvent.click(container.getElementsByClassName('file-actions')[0])
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemoved).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    )
  })
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    })
    fireEvent(uploadArea, mockDropEvent)
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        response: 'cool',
        name: 'test.png',
      })
    )
  })
})
