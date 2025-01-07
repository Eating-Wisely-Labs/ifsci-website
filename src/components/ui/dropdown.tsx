import React, { useState, useRef, useEffect } from 'react'

interface DropdownProps {
  children: React.ReactNode
  menu: {
    label: string
    onClick: () => void
  }[]
  placement?: 'bottom-left' | 'bottom-right'
  className: string
}

export const Dropdown: React.FC<DropdownProps> = ({ children, menu, placement = 'bottom-right', className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const handleMenuItemClick = (onClick: () => void) => {
    onClick()
    setIsOpen(false)
  }

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      <div className="cursor-pointer">{children}</div>
      <div
        className={`absolute min-w-[160px] rounded-lg bg-[#222] shadow-lg ${placement === 'bottom-right' ? 'right-0' : 'left-0'} ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'} top-full z-[1000] overflow-hidden transition-all duration-200 ease-in-out`}
      >
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuItemClick(item.onClick)}
            className="cursor-pointer px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#333]"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
