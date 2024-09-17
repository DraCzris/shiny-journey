import { ExclamationTriangleIcon } from '@heroicons/react/16/solid'
import { useQueryClient } from '@tanstack/react-query'

import {
  getGetTenantListQueryKey,
  useDeleteTechnicalTenant,
} from '@waypoint/api-console'
import { Button, useToast } from '@waypoint/components'

import { Modal } from 'console-ui/components'

type Props = {
  isOpen: boolean
  onClose: () => void
}
export const DeleteTenantModal = ({ isOpen, onClose }: Props) => {
  const { addToast } = useToast()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useDeleteTechnicalTenant({
    mutation: {
      onSuccess: (data) => {
        if (data.data.id) {
          addToast({
            title: 'Tenant deleted',
            message: 'Tenant deleted successfully',
            type: 'success',
          })
          onClose()

          queryClient.invalidateQueries({
            queryKey: getGetTenantListQueryKey(),
          })

          return
        }

        onClose()
        addToast({
          title: 'Error',
          message: 'An error occurred while deleting tenant',
          type: 'error',
        })
      },
      onError: () => {
        onClose()
        addToast({
          title: 'Error',
          message: 'An error occurred while deleting tenant',
          type: 'error',
        })
      },
    },
  })

  const handleDelete = () => {
    mutate()
  }

  return (
    <Modal handleClose={onClose} open={isOpen}>
      <ExclamationTriangleIcon className="text-red-500 w-12 h-12 mx-auto mb-4" />

      <h2 className="text-lg font-semibold text-white text-center mb-4">
        Are you sure you want to delete Technical tenant?
      </h2>
      <p className="text-md text-gray-400 text-center mb-8">
        This action cannot be undone.
      </p>
      <div className="flex gap-2 justify-center">
        <Button disabled={isPending} variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} variant="error" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
