import React, { useEffect } from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/Button'
import Alert from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'

function App() {
  useEffect(() => {})
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='menu' style={{ margin: '50px' }}>
          <Menu
            defaultIndex={0}
            onSelect={(index) => {
              alert(index)
            }}>
            <MenuItem index={0}>cool link</MenuItem>
            <MenuItem index={1} disabled>
              cool link 2
            </MenuItem>
            <MenuItem index={2}>cool link 3</MenuItem>
          </Menu>
        </div>
        <div className='button' style={{ margin: '20px' }}>
          <button className='test'>test</button>
          <Button disabled className='test'>
            hello
          </Button>
          <Button
            btnType={ButtonType.Primary}
            size={ButtonSize.Large}
            autoFocus>
            123
          </Button>
          <Button
            btnType={ButtonType.Primary}
            onClick={() => {
              console.log(123)
            }}>
            123
          </Button>
          <Button btnType={ButtonType.Warning}>123</Button>
          <Button btnType={ButtonType.Danger}>123</Button>
          <Button>123</Button>
          <Button
            btnType={ButtonType.Link}
            size={ButtonSize.Small}
            disabled
            href='https://luluonline.cn'>
            123
          </Button>
          <Button
            btnType={ButtonType.Link}
            size={ButtonSize.Small}
            href='https://luluonline.cn'>
            123
          </Button>
        </div>
        <div className='split' style={{ marginBottom: '20px' }}>
          ***
        </div>
        <div className='alert'>
          <Alert closable title='测试' description='test' />
          <Alert title='测试' type='success' />
          <Alert title='测试' type='warning' />
          <Alert title='测试' type='danger' />
        </div>
      </header>
    </div>
  )
}

export default App
