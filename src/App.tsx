import axios from 'axios'
import React from 'react'

function App() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const upLoadedFile = files[0]
      const formData = new FormData()
      formData.append(upLoadedFile.name, upLoadedFile)
      axios
        .post('http://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
        })
    }
  }
  return (
    <div className='App'>
      <input type='file' name='myFile' onChange={handleChange} />
    </div>
  )
}

export default App
