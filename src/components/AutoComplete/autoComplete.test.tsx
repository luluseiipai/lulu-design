import React from 'react'
import { config } from 'react-transition-group'
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react'

import { AutoComplete, AutoCompleteProps } from './AutoComplete'

config.disabled = true // 全部异步性变为同步，动画等于无

const testArray = [
  { value: 'ab', number: 11 },
  { value: 'abc', number: 1 },
  { value: 'b', number: 4 },
  { value: 'c', number: 15 },
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete Component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText(
      'auto-complete'
    ) as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // should have two suggestion items
    expect(
      wrapper.container.querySelectorAll('.suggestion-item').length
    ).toEqual(2)
    // click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secResult = wrapper.queryByText('abc')
    // arrow down
    fireEvent.keyUp(inputNode, { code: 'ArrowDown' })
    expect(firstResult).toHaveClass('is-active')
    // arrow down
    fireEvent.keyUp(inputNode, { code: 'ArrowDown' })
    expect(secResult).toHaveClass('is-active')
    // arrow up
    fireEvent.keyUp(inputNode, { code: 'ArrowUp' })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyUp(inputNode, { code: 'Enter' })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('click outside should hide the dropdown', async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', () => {})
  it('async fetchSuggestion should works find', () => {})
})
