import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Tab from './components/Tab/Tab'
import TabItem from './components/Tab/TabItem'

library.add(fas)

function App() {
  return (
    <div className='App'>
      <Tab mode='card' onSelect={(index) => console.log(index)}>
        <TabItem label='123'>测试 1 内容</TabItem>
        <TabItem label='234'>测试 2 内容</TabItem>
        <TabItem label='345'>测试 3 内容</TabItem>
        <TabItem label='456' disabled>
          测试 4 内容
        </TabItem>
      </Tab>
    </div>
  )
}

export default App
