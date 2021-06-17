import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'
import Select, { SelectProps } from './Select'
import Option from './Option'

config.disabled = true
// jest.mock('../Icon/icon', () => {
//   return (props: any) => {
//     return <span onClick={props.onClick}>{props.icon}</span>
//   }
// })

const testProps: SelectProps = {
  defaultValue: [],
  name: 'test-select',
  placeholder: 'test',
  onVisibleChange: jest.fn(),
  onChange: jest.fn(),
}

const testMultiProps: SelectProps = {
  ...testProps,
  multiple: true,
}

const generateSelect = (props: SelectProps) => (
  <Select {...props}>
    <Option value='id1' />
    <Option value='id2' label='label2' />
    <Option value='id3' disabled label='disabled' />
    <Option value='id4' label='label4' />
  </Select>
)

describe('test Select Component', () => {
  it('should render the correct Select Component', () => {
    const { getByText, getByPlaceholderText } = render(
      generateSelect(testProps)
    )
    const input = getByPlaceholderText('test') as HTMLInputElement
    expect(input).toBeInTheDocument()
    // click the input
    fireEvent.click(input)
    const firstItem = getByText('id1')
    const disabledItem = getByText('disabled')
    expect(firstItem).toBeInTheDocument()
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(true)
    // click disabled item should not working
    fireEvent.click(disabledItem)
    expect(disabledItem).toBeInTheDocument()
    // click the dropdown
    fireEvent.click(firstItem)
    expect(firstItem).not.toBeInTheDocument()
    // check the event
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(false)
    expect(testProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    expect(input.value).toEqual('id1')
    // test focus
    expect(document.activeElement).toEqual(input)
  })
  it('Select in multiple mode should work fine', () => {
    const { getByText, getByPlaceholderText, container } = render(
      generateSelect(testMultiProps)
    )
    const input = getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(input)
    const firstItem = getByText('id1')
    const secItem = getByText('label2')
    fireEvent.click(firstItem)
    expect(firstItem).toBeInTheDocument()
    expect(firstItem).toHaveClass('is-selected')
    expect(container.getElementsByClassName('lu-tag')[0]).toBeInTheDocument()
    expect(testMultiProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    expect(input.placeholder).toEqual('')
    fireEvent.click(secItem)
    expect(secItem).toBeInTheDocument()
    expect(secItem).toHaveClass('is-selected')
    expect(testMultiProps.onChange).toHaveBeenCalledWith('id2', ['id1', 'id2'])
    expect(container.querySelectorAll('.lu-tag').length).toEqual(2)
    fireEvent.click(secItem)
    expect(secItem).not.toHaveClass('is-selected')
    expect(container.querySelectorAll('.lu-tag').length).toEqual(1)
    expect(testMultiProps.onChange).toHaveBeenCalledWith('id2', ['id1'])
    fireEvent.click(firstItem)
    expect(container.querySelectorAll('.lu-tag').length).toEqual(0)
    expect(testMultiProps.onChange).toHaveBeenCalledWith('id1', [])
    expect(input.placeholder).toEqual('test')
  })
})
