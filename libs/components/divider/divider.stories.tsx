import type { Meta, StoryObj } from '@storybook/react'

import { Divider } from './divider'

const meta = {
  title: 'Components/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const WithLabel: Story = {
  args: {
    label: 'Divider',
  },
}

export const Default: Story = {}
