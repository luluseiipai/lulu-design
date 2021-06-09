import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
  createContext,
  Children,
  FunctionComponentElement,
} from 'react'
import classNames from 'classnames'
import { Input } from '../Input/Input'
import Icon from '../Icon'
import Transition from '../Transition'
import useClickOutside from '../../hooks/useClickOutside'

export interface SelectProps {
  /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
  defaultValue?: string | string[]
  /**select input的 name 属性 */
  name?: string
  /**选择框占位符 */
  placeholder?: string
  /**是否禁用 */
  disabled?: boolean
  /**是否支持多选 */
  multiple?: boolean
  /**下拉框出现隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void
  /**选中时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void
}

export interface ISelectContext {
  selectedValues: string[]
  multiple?: boolean
  onSelect?: (value: string, isSelected?: boolean) => void
}

export const SelectContext = createContext<ISelectContext>({
  selectedValues: [],
})

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'lulu-ui'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    name,
    placeholder,
    disabled,
    multiple,
    onVisibleChange,
    onChange,
    children,
  } = props
  const [menuOpen, setMenuOpen] = useState(false)
  const [value, setValue] = useState(
    typeof defaultValue === 'string' ? defaultValue : ''
  )
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )

  const containerClasses = classNames('lu-select', {
    'is-disabled': disabled,
    'is-multiple': multiple,
    'menu-is-open': menuOpen,
  })

  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSelect = (value: string, isSelected?: boolean) => {
    if (!multiple) {
      setMenuOpen(false)
    } else {
      setValue('')
    }
  }

  // const generateOptions = () => {
  //   return Children.map(children, (child,index) => {
  //     const childEl = child as FunctionComponentElement<>
  //   })
  // }

  const passedContext: ISelectContext = {
    selectedValues,
    multiple,
    onSelect: handleSelect,
  }
  return (
    <div className={containerClasses}>
      <div className='lu-select-input' onClick={handleClick}>
        <Input
          icon='angle-down'
          readOnly
          value={value}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation='zoom-in-top' timeout={300}>
          <ul>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
          </ul>
        </Transition>
      </SelectContext.Provider>
    </div>
  )
}

Select.defaultProps = {
  name: 'lu-select',
  placeholder: '请选择',
}

export default Select
