import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../avatar'
import { Card } from '../card'
import { Pagination } from '../pagination'

import { Table } from './table'
import { TableRow } from './table-row'

const meta = {
  title: 'Components/Table',
  component: Table,
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tableHead: <></>,
    children: <></>,
  },
  argTypes: {
    tableHead: {
      control: {
        disable: true,
      },
    },
  },
  render: () => (
    <Card>
      <Table
        tableHead={
          <>
            <th
              className="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-sm text-left font-semibold text-gray-900 sm:pl-6 lg:pl-8"
              scope="col"
            >
              Name
            </th>
            <th
              className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell w-80 "
              scope="col"
            >
              Title
            </th>
            <th
              className="sticky top-0 z-10 hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              scope="col"
            >
              Summary
            </th>
          </>
        }
      >
        <TableRow>
          <td className="hidden px-3 py-4 pl-4  text-sm text-gray-500 sm:pl-6 lg:pl-8 lg:table-cell align-top align-left">
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <span className="ml-2 text-sm font-semibold text-gray-900">
              Joe Doe
            </span>
          </td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell align-top">
            Title
          </td>
          <td className="relative py-4 pr-4 pl-3 text-left text-gray-500 text-sm sm:pr-8 lg:pr-8">
            Summary
          </td>
        </TableRow>
        <TableRow>
          <td className="hidden px-3 py-4 pl-4  text-sm text-gray-500 sm:pl-6 lg:pl-8 lg:table-cell align-top align-left">
            <Avatar size="sm" initials="PS" />
            <span className="ml-2 text-sm font-semibold text-gray-900">
              Patrik Safar
            </span>
          </td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell align-top">
            Title
          </td>
          <td className="relative py-4 pr-4 pl-3 text-left text-gray-500 text-sm sm:pr-8 lg:pr-8">
            Summary
          </td>
        </TableRow>
        <TableRow>
          <td className="hidden px-3 py-4 pl-4  text-sm text-gray-500 sm:pl-6 lg:pl-8 lg:table-cell align-top align-left">
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <span className="ml-2 text-sm font-semibold text-gray-900">
              Joe Doe
            </span>
          </td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell align-top">
            Title
          </td>
          <td className="relative py-4 pr-4 pl-3 text-left text-gray-500 text-sm sm:pr-8 lg:pr-8">
            Summary
          </td>
        </TableRow>
      </Table>
      <div className="px-6 py-4">
        <Pagination
          currentPage={1}
          pagesNeeded={10}
          onPrevClick={() => console.log('prev')}
          onNextClick={() => console.log('next')}
          onPageClick={() => console.log('page')}
        />
      </div>
    </Card>
  ),
}
