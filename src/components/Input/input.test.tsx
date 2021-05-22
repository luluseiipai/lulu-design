import React from 'react'
import { render, fireEvent, queryByText } from '@testing-library/react'
import { Input, InputProps } from './Input'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
}

describe('test Input Component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps} />)
    const testNode = wrapper.getByPlaceholderText(
      'test-input'
    ) as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('lu-input-inner')
    fireEvent.change(testNode, { target: { value: '123' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('123')
  })
  it('should render the correct disabled Input on disabled property', () => {
    const wrapper = render(
      <Input {...defaultProps} disabled placeholder='disabled' />
    )
    const testNode = wrapper.getByPlaceholderText(
      'disabled'
    ) as HTMLInputElement
    expect(wrapper.container.querySelector('.is-disabled')).toBeInTheDocument()
    expect(testNode.disabled).toBeTruthy()
  })
  it('should render the different Input sizes on size property', () => {
    const wrapper = render(
      <>
        <Input size='lg' placeholder='large size' />
        <Input size='sm' placeholder='small size' />
      </>
    )
    const largeContainer = wrapper.getByPlaceholderText('large size')
      .parentElement
    const smallContainer = wrapper.getByPlaceholderText('small size')
      .parentElement
    expect(largeContainer).toHaveClass('input-size-lg')
    expect(smallContainer).toHaveClass('input-size-sm')
  })
  it('should render prepend and append Input on prepend/append property', () => {
    const { container, queryByText } = render(
      <Input defaultValue='google' prepend='https://' append='.com' />
    )
    const testContainer = container.querySelector('.lu-input-wrapper')
    expect(testContainer).toHaveClass(
      'input-group input-group-prepend input-group-append'
    )
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
})
