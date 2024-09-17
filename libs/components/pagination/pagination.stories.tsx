import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Pagination } from './pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pagesNeeded: 10,
    currentPage: 4,
    onNextClick: fn(),
    onPrevClick: fn(),
    onPageClick: fn(),
  },
}
