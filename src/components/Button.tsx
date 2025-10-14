import React from 'react'

interface Props {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ variant = 'primary', children, onClick }: Props) => {
  return (
    <button className={variant === 'primary' ? 'btn primary' : 'btn secondary'} onClick={onClick}>
      {children}
    </button>
  )
}
