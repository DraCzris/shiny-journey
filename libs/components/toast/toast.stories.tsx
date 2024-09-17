import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'

import { ToastProvider } from './toast-provider'
import { useToast } from './toast.hook'

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>

const ToastStory = () => {
  const { addToast } = useToast()

  const handleToast = () => {
    addToast({
      title: 'Hello',
      message: 'This is a toast',
      type: 'success',
    })
  }

  return <Button onClick={handleToast}> Add Toast </Button>
}

export default meta
export const DefaultStory: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastStory />
    </ToastProvider>
  ),

  name: 'default',
}
