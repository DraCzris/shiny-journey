import type { Meta, StoryObj } from '@storybook/react'

import { Stats } from './stats'

const meta = {
  title: 'Components/Stats',
  component: Stats,
  render: (props) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      <Stats {...props} />
    </div>
  ),
} satisfies Meta<typeof Stats>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Revenue',
    value: '$1,200',
    trend: {
      value: 12,
      type: 'increase',
    },
  },
}
