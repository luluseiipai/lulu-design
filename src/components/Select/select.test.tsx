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
  <Select {...testProps}>
    <Option value='id1' />
    <Option value='id2' label='text2' />
    <Option value='id3' disabled label='disabled' />
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
  })
})
