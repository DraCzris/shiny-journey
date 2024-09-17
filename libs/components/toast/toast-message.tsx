import { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

type Props = {
  message: string
  title?: string
  type: 'success' | 'error'
  onClose: () => void
}
export const ToastMessage = ({ message, title, type, onClose }: Props) => {
  const [isShowing, setIsShowing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsShowing(false)
    onClose()
  }

  return (
    <Transition
      as="div"
      className="flex w-full flex-col items-center space-y-4 sm:items-end relative"
      show={isShowing}
      enter="transform transition ease-in-out duration-300 sm:duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-300 sm:duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                aria-hidden="true"
                className={`h-6 w-6 ${
                  type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="button"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}
