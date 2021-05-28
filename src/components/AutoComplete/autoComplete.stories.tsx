import React, { CSSProperties } from 'react'
import { Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { AutoComplete, DataSourceType } from './AutoComplete'

export default {
  title: '组件/AutoComplete',
  component: AutoComplete,
} as Meta

interface LakerPlayerProps {
  value: string
  number: number
}

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

const styles: CSSProperties = {
  padding: '20px 40px',
  width: '500px',
}
const Decorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

export const Default = () => {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ]
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }))
  }
  return (
    <AutoComplete
      placeholder='输入湖人队球员英文名试试'
      fetchSuggestions={handleFetch}
      onSelect={action('selected!')}
    />
  )
}
Default.storyName = 'AutoComplete'
Default.decorators = [Decorator]

export const CustomComplete = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ]

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    )
  }

  return (
    <AutoComplete
      placeholder='输入湖人队球员英文名试试'
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
      onSelect={action('selected!')}
    />
  )
}

CustomComplete.storyName = '支持自定义的下拉选项'
CustomComplete.decorators = [Decorator]

export const asyncComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items)
        const formatItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }))
        return formatItems
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>login: {itemWithGithub.login}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }

  return (
    <AutoComplete
      placeholder='输入github用户名试试'
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
      onSelect={action('selected!')}
    />
  )
}
asyncComplete.storyName = '支持异步请求的下拉选项'
asyncComplete.decorators = [Decorator]
