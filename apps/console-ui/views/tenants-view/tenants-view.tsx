'use client'
import { useState } from 'react'

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { useGetTenantList } from '@waypoint/api-console'
import { DropDownItem, Dropdown } from '@waypoint/components'

import {
  MainBody,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'console-ui/components'

import { DeleteTenantModal } from './components'

export const TenantsPageView = () => {
  const { data } = useGetTenantList()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <MainBody
      activeSection="tenants"
      headerEndAdornment={
        <Dropdown
          align="right"
          ariaLabel="Tenant actions"
          dropdownButton={
            <div className="rounded-full p-1 text-gray-200 hover:text-blue-200 hover:bg-gray-700">
              <EllipsisVerticalIcon className="w-6 h-6s" />
            </div>
          }
        >
          <DropDownItem>
            <div
              className="text-red-500 text-sm px-4 py-1 hover:bg-red-900/50 cursor-pointer focus:bg-red-900/50"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete technical tenant
            </div>
          </DropDownItem>
        </Dropdown>
      }
      title="Tenants"
    >
      {/* Delete confirm modal */}
      <DeleteTenantModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />

      <div className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell first>Name</TableHeadCell>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell first>{tenant.name || 'Unknown'}</TableCell>
                <TableCell>{tenant.id}</TableCell>
                <TableCell>
                  <Link
                    className="text-blue-400 hover:text-blue-500"
                    href={`/tenant/${tenant.id}`}
                  >
                    Tenant detail
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainBody>
  )
}
