import type { ReactNode } from 'react'
import { Fragment } from 'react'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { classNames } from '../utils'

type Props = {
  open: boolean
  onClose: (open: boolean) => void
  panelTitle?: string | ReactNode
  children?: React.ReactNode
  sizeVariant?: 'md' | '6xl'
}

export const SideModal = ({
  open,
  onClose,
  panelTitle,
  children,
  sizeVariant = 'md',
}: Props) => (
  <Transition show={open} as={Fragment}>
    <Dialog className="relative z-50" onClose={() => onClose(false)}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel
                className={classNames(
                  'pointer-events-auto w-screen',
                  sizeVariant === 'md' ? 'sm:max-w-md' : '',
                  sizeVariant === '6xl' ? 'sm:max-w-6xl' : ''
                )}
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-[#f8fafc] dark:bg-gray-800 py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                        {panelTitle}
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative rounded-md bg-gray-200 dark:bg-gray-900 text-gray-400 dark:text-gray-400 hover:text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 dark:ring-gray-400 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={() => onClose(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition>
)
