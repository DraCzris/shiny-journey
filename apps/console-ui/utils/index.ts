import type { Type } from '@waypoint/api-console'

import type { BadgeProps } from '../components'

export const MappedTypes: Record<Type, { name: string }> = {
  1: { name: 'Jira' },
  2: { name: 'Zendesk' },
  3: { name: 'Prompt' },
  4: { name: 'Root' },
  5: { name: 'Script' },
  6: { name: 'Snapshot' },
}

export const MappedRevisionStatus = {
  1: { name: 'New' },
  2: { name: 'Resolving' },
  3: { name: 'Resolved' },
  4: { name: 'Retrying' },
}

export const MappedRevisionStatusColor: Record<number, BadgeProps['variant']> =
  {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'indigo',
  }

export const MappedNodeDefinitionTypeColor: Record<
  Type,
  BadgeProps['variant']
> = {
  1: 'green',
  2: 'blue',
  3: 'yellow',
  4: 'red',
  5: 'purple',
  6: 'gray',
}

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatJSON = (data: any) => {
  if (!data) {
    return ''
  }

  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2)
  }

  try {
    return JSON.stringify(JSON.parse(data), null, 2)
  } catch (e) {
    return data
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJSON = (data: any) => {
  if (!data) {
    return {}
  }

  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (data: any) => {
  if (typeof data === 'object') {
    return Object.keys(data).length === 0
  }

  if (typeof data === 'string') {
    return data === ''
  }

  return !data
}
