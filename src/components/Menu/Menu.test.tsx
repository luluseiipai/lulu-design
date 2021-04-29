import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  act,
} from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop 1</MenuItem>
      </SubMenu>
      <SubMenu title='opened'>
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile = `
    .subMenu {
      display: none;
    }
    .subMenu.menu-opened {
      display: block
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test Menu and MenuItem Component in default(horizontal) mode', () => {
  beforeEach(() => {
    // 每个单例运行前都会执行
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    // wrapper.container.getElementsByClassName
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    jest.useFakeTimers()
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('lu-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('lu-menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', () => {
    // 可能不存在，用query可以 htmlEl 或者 null
    expect(wrapper.queryByText('drop 1')).not.toBeVisible()
    const dropdownEl = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownEl)
    act(() => {
      jest.runAllTimers()
    })
    expect(wrapper.queryByText('drop 1')).toBeVisible()
    fireEvent.click(wrapper.getByText('drop 1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownEl)
    act(() => {
      jest.runAllTimers()
    })
    expect(wrapper.queryByText('drop 1')).not.toBeVisible()
  })
})

describe('test Menu and MenuItem Component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    expect(wrapper2.getByTestId('test-menu')).toHaveClass('lu-menu-vertical')
  })
  it('should show dropdown items when click on subMenu title for vertical mode', () => {
    const dropdownItem = wrapper2.getByText('drop 1')
    expect(dropdownItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText('dropdown'))
    expect(dropdownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contain SubMenu index', () => {
    expect(wrapper2.getByText('opened1')).toBeVisible()
  })
})
