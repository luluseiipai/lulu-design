import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from 'react'
import classNames from 'classnames'
import { InputProps, Input } from '../Input/Input'
import Icon from '../Icon'
import Transition from '../Transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface SelectProps {
  /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
  defaultValue: string | string[]
  /**select input的 name 属性 */
  name: string
  /**选择框占位符 */
  placeholder: string
  /**是否禁用 */
  disabled: boolean
  /**是否支持多选 */
  multiple: boolean
  /**下拉框出现隐藏时触发 */
  onVisibleChange: (visible: boolean) => void
  /**选中时触发 */
  onChange: () => void
}
