import React, { FC, MouseEvent, useContext } from 'react'
import classNames from 'classnames'
import { SelectContext } from './Select'
import Icon from '../Icon'

export interface OptionProps {
  index?: string
  /** 默认根据此属性值进行筛选，该值不能相同*/
  value: string
  /** 选项的标签，若不设置则默认与 value 相同*/
  label?: string
  /** 是否禁用该选项*/
  disabled?: boolean
}

export const Option: FC<OptionProps> = ({
  index,
  value,
  label,
  disabled,
  children,
}) => {
  const { selectedValues, multiple, onSelect } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const classes = classNames('lu-select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })

  const handleClick = (e: MouseEvent, value: string, isSelected: boolean) => {
    e.preventDefault()
    if (onSelect && !disabled) {
      onSelect(value, isSelected)
    }
  }

  return (
    <li
      key={index}
      className={classes}
      onClick={(e) => handleClick(e, value, isSelected)}>
      {children || (label ? label : value)}
      {multiple && isSelected && <Icon icon='check' />}
    </li>
  )
}

Option.displayName = 'Option'

export default Option
