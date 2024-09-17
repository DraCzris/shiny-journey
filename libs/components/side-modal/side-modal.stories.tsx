import type { Meta, StoryObj } from '@storybook/react'

import { SideModal } from './side-modal'

const meta = {
  title: 'Components/SideModal',
  component: SideModal,
} satisfies Meta<typeof SideModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    panelTitle: 'Side modal title',
    children: (
      <div>
        <p>Content</p>
      </div>
    ),
  },
}
