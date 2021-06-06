import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Tab from './components/Tab/Tab'
import TabItem from './components/Tab/TabItem'
import Icon from './components/Icon'
import AutoComplete, {
  DataSourceType,
} from './components/AutoComplete/AutoComplete'
import Alert from './components/Alert'

library.add(fas)
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
function App() {
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }))
  }
  const renderOption = (item: DataSourceType) => {
    return <h2>Name: {item.value}</h2>
  }
  return (
    <div className='App'>
      <Alert title='title' />
      <Tab mode='card' onSelect={(index) => console.log(index)}>
        <TabItem label='tab1'>测试 1 内容</TabItem>
        <TabItem label='tab2'>测试 2 内容</TabItem>
        <TabItem label='disabled' disabled>
          disabled
        </TabItem>
        <TabItem
          label={
            <div>
              <Icon icon='check' />
              123
            </div>
          }>
          测试 4 内容
        </TabItem>
      </Tab>
      <AutoComplete
        placeholder='输入湖人队球员英文名试试'
        fetchSuggestions={handleFetch}
        onSelect={() => {
          console.log('select')
        }}
        renderOption={renderOption}
      />
    </div>
  )
}

export default App
