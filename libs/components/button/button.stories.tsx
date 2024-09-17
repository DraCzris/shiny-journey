import { CheckCircleIcon } from '@heroicons/react/20/solid'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
  },
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
}

export const Secondary: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
}

export const Error: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'error',
  },
}

export const Text: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: 'text',
  },
}

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
}

export const WithIcon: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    startAdornment: (
      <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
    ),
  },
}
