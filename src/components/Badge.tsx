import React from 'react'

export const Badge = ({ color = 'green', children }: { color?: 'green' | 'red', children: React.ReactNode }) => {
  return <span className={'badge ' + (color === 'green' ? 'green' : 'red')}>{children}</span>
}
