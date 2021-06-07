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
  defaultValue: string | string[]
  name: string
  placeholder: string
}
