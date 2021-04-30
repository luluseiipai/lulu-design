import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

const defaultProps = {
  onClick: jest.fn(), // 被监控的 mock function
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'classes',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

// describe 分类
describe('test Button component', () => {
  // it 和 test 一样
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>First</Button>)
    const element = wrapper.getByText('First') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON') // tagname都是大写
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    // fireEvent 触发用户行为事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>First</Button>)
    const element = wrapper.getByText('First')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg classes')
  })
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(
      <Button btnType='link' href='https://www.baidu.com'>
        link
      </Button>
    )
    const element = wrapper.getByText('link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>disabled</Button>)
    const element = wrapper.getByText('disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
