import { useContext } from 'react'

import { ToastContext } from './toast-provider'

export const useToast = () => {
  const context = useContext(ToastContext)

  return context
}
