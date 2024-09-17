import type { Args, Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'

import { Dropdown } from './dropdown'
import { DropDownItem } from './dropdown-item'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>

export default meta
export const DefaultStory: StoryObj = {
  render: (args: Args) => (
    <Dropdown
      dropdownButton={<Button variant="secondary">Open menu</Button>}
      {...args}
    >
      <DropDownItem>
        <div>I am Item</div>
      </DropDownItem>
      <DropDownItem>
        {({ active }) => (
          <div className={active ? 'bg-red-200' : ''}>Active on hover</div>
        )}
      </DropDownItem>
      <DropDownItem disabled>
        {({ disabled }) => (
          <div className={disabled ? 'opacity-50' : ''}>I am disabled Item</div>
        )}
      </DropDownItem>
    </Dropdown>
  ),

  name: 'default',
}
