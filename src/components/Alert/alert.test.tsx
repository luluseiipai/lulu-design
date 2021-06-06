import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './Alert'
config.disabled = true

// jest.mock('../Icon/icon', () => {
//   return (props: any) => {
//     return <span>{props.icon}</span>
//   }
// })

const testProps: AlertProps = {
  title: '测试',
  onClose: jest.fn(),
}

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  message: 'desc',
  closable: false,
}

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    const { queryByText, container } = render(<Alert {...testProps} />)
    expect(queryByText('测试')).toBeInTheDocument()
    expect(container.querySelector('.lu-alert')).toHaveClass('lu-alert-default')
    expect(
      container.getElementsByClassName('lu-alert-close')[0]
    ).toBeInTheDocument()
    fireEvent.click(container.getElementsByClassName('lu-alert-close')[0])
    expect(testProps.onClose).toHaveBeenCalled()
    expect(queryByText('测试')).not.toBeInTheDocument()
  })
  it('should render the correct component based on different type and description', () => {
    const { container, queryByText } = render(<Alert {...typeProps} />)
    expect(queryByText('测试')).toHaveClass('bold-title')
    expect(container.querySelector('.lu-alert')).toHaveClass('lu-alert-success')
    expect(queryByText('desc')).toBeInTheDocument()
    expect(queryByText('times')).not.toBeInTheDocument()
  })
})
