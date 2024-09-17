import { Dialog } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

import { Modal } from '../../components'

type Props = {
  opened: boolean
  onClose: () => void
}

export const SuccessPlanChangeModal = ({ opened, onClose }: Props) => (
  <Modal opened={opened} onClose={onClose}>
    <div>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900"
        >
          Your subscription has been changed
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Your subscription has been changed, you can now close this window
            and continue.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-5 sm:mt-6">
      <button
        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        type="button"
        onClick={onClose}
      >
        Close and continue
      </button>
    </div>
  </Modal>
)
