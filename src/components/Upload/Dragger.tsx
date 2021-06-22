import React, { DragEvent, FC, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (file: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('lu-upload-dragger', {
    'is-dragover': dragOver,
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
  }

  return <div className={classes}></div>
}

export default Dragger
