import type { Meta, StoryObj } from '@storybook/react'

import { Stepper } from './stepper'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    steps: [
      {
        id: 'Step 1',
        name: 'Accept Terms & Conditions',
        status: 'current',
      },
      { id: 'Step 2', name: 'Choose a Plan', status: 'upcoming' },
      { id: 'Step 3', name: 'Connect to Jira', status: 'upcoming' },
    ],
  },
}
