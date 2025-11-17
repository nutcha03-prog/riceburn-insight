'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import { Loader2 } from 'lucide-react'

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="h-[700px] flex items-center justify-center bg-gray-100 rounded-2xl">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-emerald-600" />
        <p className="text-gray-600">กำลังโหลดแผนที่...</p>
      </div>
    </div>
  )
})

const months = [
  { value: '01', label: 'มกราคม' },
  { value: '02', label: 'กุมภาพันธ์' },
  { value: '03', label: 'มีนาคม' },
  { value: '04', label: 'เมษายน' },
  { value: '05', label: 'พฤษภาคม' },
  { value: '06', label: 'มิถุนายน' },
  { value: '07', label: 'กรกฎาคม' },
  { value: '08', label: 'สิงหาคม' },
  { value: '09', label: 'กันยายน' },
  { value: '10', label: 'ตุลาคม' },
  { value: '11', label: 'พฤศจิกายน' },
  { value: '12', label: 'ธันวาคม' },
]

export default function MapPage() {
  const [selectedMonth, setSelectedMonth] = useState('01')
  const [showHotspots, setShowHotspots] = useState(true)
  const [stats, setStats] = useState({
    totalHotspots: 0,
    topProvince: '-'
  })

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              🗺️ แผนที่แสดงจุดความร้อน
            </h1>
            <p className="text-gray-600 text-lg">
              ข้อมูลจุดความร้อน จากกรมป่าไม้ ปี 2023
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-100">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-gray-700 font-semibold">เลือกเดือน:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors bg-white text-gray-700 font-medium"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-400 transition-all hover:shadow-md">
                <input
                  type="checkbox"
                  checked={showHotspots}
                  onChange={(e) => setShowHotspots(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="font-medium text-gray-700">🔥 แสดงจุดความร้อน</span>
              </label>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-white/90 font-semibold mb-2 text-lg">
                🔥 จุดความร้อนในพื้นที่นาข้าว
              </h3>
              <div className="text-5xl font-bold">{stats.totalHotspots.toLocaleString()}</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-white/90 font-semibold mb-2 text-lg">
                🏆 จังหวัดที่มีจุดความร้อนมากที่สุด
              </h3>
              <div className="text-3xl font-bold">{stats.topProvince}</div>
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <MapComponent 
              selectedMonth={selectedMonth}
              showHotspots={showHotspots}
              onStatsUpdate={setStats}
            />
          </div>
        </div>
      </div>
    </>
  )
}
