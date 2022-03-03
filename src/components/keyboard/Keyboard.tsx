import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect, useState } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  isRevealing?: boolean
  setIsHandsModalOpen: (value: boolean) => void
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
  setIsHandsModalOpen,
}: Props) => {
  const [isMobile, setIsMobile] = useState(true)

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  //create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      {isMobile ? (
        <div>
          <div className="flex justify-center mb-1">
            {[
              '♔',
              '♕',
              '♖',
              '♗',
              '♘',
              '♙',
              
            ].map((key) => (
              <Key
                value={key}
                key={key}
                onClick={onClick}
                status={charStatuses[key]}
                width={25}
                height={35}
                isRevealing={isRevealing}
                isMobile={isMobile}
              />
            ))}
          </div>

        </span>
      </div>
    </div>
  )
}
