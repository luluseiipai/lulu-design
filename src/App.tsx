import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Icon from './components/Icon/Icon'
import Transition from './components/Transition/Transition'
import Button from './components/Button'

library.add(fas)

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className='App'>
      <header className='App-header'>
        <Icon theme='danger' icon='comment' size='10x' />
        <div className='menu' style={{ margin: '50px' }}>
          <Menu
            defaultIndex={'0'}
            mode='horizontal'
            defaultOpenSubMenus={['3']}
            onSelect={(index) => {
              console.log(index)
            }}>
            <MenuItem>cool link</MenuItem>
            <MenuItem disabled>cool link 2</MenuItem>
            <MenuItem>cool link 3</MenuItem>
            <SubMenu title='dropdown'>
              <MenuItem>dropdown 1</MenuItem>
              <MenuItem>dropdown 2</MenuItem>
              <MenuItem>dropdown 3</MenuItem>
            </SubMenu>
            <MenuItem>cool link 3</MenuItem>
          </Menu>
          <Button
            size='lg'
            onClick={() => {
              setShow(!show)
            }}>
            toggle
          </Button>
        </div>
        <Transition in={show} timeout={300} animation='zoom-in-left'>
          <div>
            <p>ediewopgnwpgiwngpoeirngpwignrpgwngiprngpwgnwpg t</p>
            <p>
              editediewopgnwpgiwngpoeirngpwignrpgwngiprngpwgnwpgediewopgnwpgiwngpoeirngpwignrpgwngiprngpwgnwpg
            </p>
            <p>ediediewopgnwpgiwngpoeirngpwignrpgwngiprngpwgnwpgt</p>
            <p>edit</p>
            <p>
              edediewopgnwpgiwngpoeirngpwignrpgwngiprngpwgnwpgediewopgnwpgiwngpoeirngpwignrpgwngiprngpwgnwpgit
            </p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation='zoom-in-right'>
          <Button btnType='primary' size='lg'>
            a large btn
          </Button>
        </Transition>
      </header>
    </div>
  )
}

export default App
