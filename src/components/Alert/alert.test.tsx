import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './'

const testProps: AlertProps = {
  title: '测试',
  onClose: jest.fn(),
}

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'desc',
  closable: false,
}

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    const { getByText, queryByText, container } = render(
      <Alert {...testProps} />
    )
    expect(queryByText('测试')).toBeInTheDocument()
    expect(container.querySelector('.lu-alert')).toHaveClass('lu-alert-default')
    fireEvent.click(getByText('关闭'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(queryByText('测试')).not.toBeInTheDocument()
  })
  it('should render the correct component based on different type and description', () => {
    const { container, queryByText } = render(<Alert {...typeProps} />)
    expect(queryByText('测试')).toHaveClass('bold-title')
    expect(container.querySelector('.lu-alert')).toHaveClass('lu-alert-success')
    expect(queryByText('desc')).toBeInTheDocument()
    expect(queryByText('关闭')).not.toBeInTheDocument()
  })
})