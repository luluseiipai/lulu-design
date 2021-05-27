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
import useDebounce from '../../hooks/useDebounce'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    value,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)

  const debounceValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debounceValue) {
      const result = fetchSuggestions(debounceValue)
      if (result instanceof Promise) {
        console.log('triggererd')
        setLoading(true)
        result.then((data) => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestions])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion-item', {
            'item-highlighted': index === highlightIndex,
          })
          return (
            <li
              className={classes}
              key={index}
              onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='lu-auto-complete'>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {loading && (
        <ul>
          <Icon icon='spinner' spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}

export default AutoComplete
