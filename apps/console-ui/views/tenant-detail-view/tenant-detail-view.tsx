'use client'
import { useState } from 'react'

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useGetScopesByTenantId } from '@waypoint/api-console'

import {
  MainBody,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'console-ui/components'

import { AnalysisConfigurationList } from './analysis-configuration-list'

export const TenantDetailView = () => {
  const { id } = useParams<{ id: string }>()

  const { data } = useGetScopesByTenantId({
    id,
  })

  return (
    <MainBody activeSection="tenants" title={`Tenant | ${id}`}>

      <div className="flex gap-8 flex-col">
        <section>
          <div className="sm:flex-auto m-8 mb-4">
            <h1 className="text-base font-semibold leading-6 text-gray-100">
              List of scopes for tenant
            </h1>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell first>Title</TableHeadCell>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>External URL</TableHeadCell>
                <TableHeadCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((scope) => (
                <TableRow key={scope.id}>
                  <TableCell first>{scope.title}</TableCell>
                  <TableCell>{scope.id}</TableCell>
                  <TableCell>
                    <a
                      className="text-blue-400 hover:text-blue-500"
                      href={scope.external_url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {scope.external_url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="text-blue-400 hover:text-blue-500"
                      href={`/scope/${scope.id}`}
                    >
                      Scope detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <AnalysisConfigurationList />
      </div>
    </MainBody>
  )
}
