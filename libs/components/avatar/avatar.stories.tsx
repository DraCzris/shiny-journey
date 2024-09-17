import { UserCircleIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'
import { AvatarGroup } from './avatar-group'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    alt: 'Avatar',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
}

export const WithIcon: Story = {
  args: {
    size: 'md',
    alt: 'Avatar',
    children: (
      <UserCircleIcon className="w-full h-full text-gray-400 bg-gray-100" />
    ),
  },
}

export const WithInitials: Story = {
  args: {
    size: 'md',
    initials: 'JD',
  },
}

export const WithAvatarGroup: Story = {
  args: {
    size: 'md',
    initials: 'JD',
  },
  render: ({ size }) => (
    <AvatarGroup>
      <Avatar
        size={size}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <Avatar
        size={size}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <Avatar size={size} initials="JD" />
      <Avatar
        size={size}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
      <Avatar
        size={size}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      >
        <UserCircleIcon className="w-full h-full text-gray-400 bg-gray-100" />
      </Avatar>
    </AvatarGroup>
  ),
}
