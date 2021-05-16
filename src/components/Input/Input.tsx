import React, { FC, ReactElement, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import { IconProp } from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' | 'sm'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean
  size?: InputSize
  icon?: IconProp
  prepend?: string | ReactElement
  append?: string | ReactElement
}

export const Input: FC<InputProps> = (props) => {
  // 取出各种属性
  const { className, disabled, size, icon, prepend, append } = props

  // 根据属性计算不同的 className
  const classes = classNames('lu-input', className, {
    'is-disabled': disabled,
  })
  return (
    // 根据属性判断是否要添加特定的节点
    <></>
  )
}

export default Input
