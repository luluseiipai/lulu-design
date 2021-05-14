import React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import { Tab, TabProps } from './Tab'
import { TabItem } from './TabItem'

const testProps: TabProps = {
  defaultIndex: 1,
  onSelect: jest.fn(),
  className: 'test',
}

const cardProps: TabProps = {
  defaultIndex: 0,
  mode: 'card',
}

const generateTabs = (props: TabProps) => (
  <Tab {...props}>
    <TabItem label='tab 1'>tab 1 content</TabItem>
    <TabItem label='tab 2'>tab 2 content</TabItem>
    <TabItem label='disabled' disabled>
      disabled content
    </TabItem>
    <TabItem label='tab 4'>tab 4 content</TabItem>
  </Tab>
)

let wrapper: RenderResult, wrapper2: RenderResult
describe('test Tab and TabItem Component in default mode', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render the correct default tab', () => {
    const { queryByText, container } = wrapper
    expect(wrapper.getByTestId('test-tab')).toBeInTheDocument()
    expect(wrapper.getByTestId('test-tab')).toHaveClass('lu-tab test')
    expect(container.querySelector('.lu-tab-nav')).toHaveClass('nav-default')
    const activeEl = queryByText('tab 2')
    expect(activeEl).toBeInTheDocument()
    expect(activeEl).toHaveClass('is-active')
    expect(queryByText('tab 1')).not.toHaveClass('is-active')
    expect(queryByText('tab 2 content')).toBeInTheDocument()
    expect(queryByText('tab 1 content')).not.toBeInTheDocument()
  })
  it('click tabItem should switch the content', () => {
    const { queryByText, getByText } = wrapper
    const clickEl = getByText('tab 1')
    fireEvent.click(clickEl)
    expect(clickEl).toHaveClass('is-active')
    expect(queryByText('tab 1 content')).toBeInTheDocument()
    expect(queryByText('tab 2')).not.toHaveClass('is-active')
    expect(queryByText('tab 2 content')).not.toBeInTheDocument()
    expect(testProps.onSelect).toHaveBeenCalledWith(0)
  })
  it('click disabled tabItem should not works', () => {
    const { queryByText, getByText } = wrapper
    const disabledEl = getByText('disabled')
    expect(disabledEl).toHaveClass('is-disabled')
    fireEvent.click(disabledEl)
    expect(disabledEl).not.toHaveClass('is-active')
    expect(queryByText('disabled content')).not.toBeInTheDocument()
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })
})

describe('test Tab and TabItem Component in card mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateTabs(cardProps))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render the correct tab in card mode', () => {
    const { container } = wrapper2
    expect(wrapper.getByTestId('test-tab')).toBeInTheDocument()
    expect(container.querySelector('.lu-tab-nav')).toHaveClass('nav-card')
  })
})
