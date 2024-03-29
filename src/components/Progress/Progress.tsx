import React, { FC, CSSProperties } from 'react'
import { ThemeProps } from '../Icon/Icon'

interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: CSSProperties
  theme?: ThemeProps
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props
  return (
    <div className='lu-progress-bar' style={styles}>
      <div
        className='lu-progress-bar-outer'
        style={{ height: `${strokeHeight}px` }}>
        <div
          className={`lu-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress
