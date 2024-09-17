import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'

const meta = {
  title: 'Components/Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    roundedSize: 'xl',
    children: (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Card title</h2>
        <p className="text-sm text-gray-500">Card description</p>
      </div>
    ),
  },
}
