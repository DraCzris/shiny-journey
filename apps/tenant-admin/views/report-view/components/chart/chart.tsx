'use client'

import { memo, useMemo } from 'react'

import dynamic from 'next/dynamic'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ChartComponent = () => {
  const chartOptions = useMemo(
    () => ({
      chart: {
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      fill: {
        type: ['gradient', 'gradient'],
        gradient: {
          type: 'vertical',
          opacityFrom: 0.5,
          opacityTo: 0,
          gradientToColors: ['#2563eb', '#4f46e5', '#7600f3'],
          stops: [0, 90, 100],
        },
      },
      colors: ['#2563eb', '#4f46e5', '#7600f3'],
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => '',
          },
        },
        marker: {
          show: false,
        },
      },
    }),
    []
  )

  const chartSeries = useMemo(
    () => [
      {
        name: 'Opened',
        data: [
          { x: 0, y: 10 },
          { x: 1, y: 18 },
          { x: 2, y: 17 },
          { x: 3, y: 14 },
          { x: 4, y: 12 },
          { x: 5, y: 11 },
          { x: 6, y: 17 },
        ],
        type: 'area',
      },
      // {
      //   name: 'Closed',
      //   data: [
      //     { x: 0, y: 0 },
      //     { x: 1, y: 10 },
      //     { x: 2, y: 9 },
      //     { x: 3, y: 0 },
      //     { x: 4, y: 8 },
      //     { x: 5, y: 1 },
      //     { x: 6, y: 1 },
      //   ],
      //   type: 'area',
      // },
    ],
    []
  )

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <ApexChart
      height="100%"
      options={chartOptions as ApexCharts.ApexOptions}
      series={chartSeries}
      type="line"
    />
  )
}

export const Chart = memo(ChartComponent)
