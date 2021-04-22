import React, { useEffect } from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button'

function App() {
  useEffect(() => {})
  return (
    <div className='App'>
      <header className='App-header'>
        <button className='test'>test</button>
        <Button disabled className='test'>
          hello
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} autoFocus>
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
      </header>
    </div>
  )
}

export default App
