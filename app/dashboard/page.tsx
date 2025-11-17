'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Flame } from 'lucide-react'
import * as turf from '@turf/turf'

export default function DashboardPage() {
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [provinceData, setProvinceData] = useState<any[]>([])
  const [totalHotspots, setTotalHotspots] = useState(0)
  const [topProvince, setTopProvince] = useState('Loading...')

  // 12 เดือน
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
  const monthLabels = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.']

  useEffect(() => {
    const loadData = async () => {

      // โหลดขอบเขตจังหวัดทั้งประเทศ
      const districts = await fetch('/geo/provinces.geojson').then(r => r.json())

      let monthlyCounts: any[] = []
      let provinceCounts: Record<string, number> = {}

      let totalAll = 0

      for (let i = 0; i < months.length; i++) {
        const month = months[i]
        const file = `/geo/Hotspot_inrice_${month}.geojson`

        try {
          const geo = await fetch(file).then(r => r.json())
          const features = geo.features || []

          // ✔ จำนวนจุดความร้อนรายเดือน
          const count = features.length
          monthlyCounts.push({ month: monthLabels[i], count })
          totalAll += count

          // ✔ นับ hotspot ต่อจังหวัด
          features.forEach((pt: any) => {
            const [lon, lat] = pt.geometry.coordinates
            const point = turf.point([lon, lat])

            districts.features.forEach((d: any) => {
              let poly
              if (d.geometry.type === 'Polygon')
                poly = turf.polygon(d.geometry.coordinates)
              else if (d.geometry.type === 'MultiPolygon')
                poly = turf.multiPolygon(d.geometry.coordinates)

              if (turf.booleanPointInPolygon(point, poly)) {
                const prov = d.properties.pro_th || d.properties.NAME_1 || d.properties.name
                if (prov) {
                  provinceCounts[prov] = (provinceCounts[prov] || 0) + 1
                }
              }
            })
          })

        } catch (e) {
          console.log("เดือนนี้ไม่มีไฟล์:", file)
          monthlyCounts.push({ month: monthLabels[i], count: 0 })
        }
      }

      // ✔ จัดอันดับจังหวัด (Top 5)
      const sorted = Object.entries(provinceCounts).sort((a, b) => b[1] - a[1])
      const top5 = sorted.slice(0, 5).map(([name, count]) => ({ name, count }))

      setMonthlyData(monthlyCounts)
      setProvinceData(top5)
      setTotalHotspots(totalAll)

      if (sorted.length > 0) {
        setTopProvince(`${sorted[0][0]} (${sorted[0][1]} จุด)`)
      } else {
        setTopProvince("ไม่มีข้อมูล")
      }
    }

    loadData()
  }, [])

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20">
        <div className="container mx-auto px-6 py-8">

          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            📊 แดชบอร์ด (ข้อมูลปี 2023)
          </h1>

          {/* SUMMARY */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-gray-600 font-semibold mb-2">🔥 จุดความร้อนทั้งหมด</h3>
              <div className="text-4xl font-bold">{totalHotspots.toLocaleString()}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-gray-600 font-semibold mb-2">จังหวัดที่มีจุดความร้อนมากที่สุด</h3>
              <div className="text-xl font-bold">{topProvince}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-gray-600 font-semibold mb-2">จำนวนจังหวัดที่ครอบคลุม</h3>
              <div className="text-4xl font-bold">
                {provinceData.length > 0 ? Object.keys(provinceData).length : 77}
              </div>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Monthly */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">📈 จำนวนจุดความร้อนรายเดือน</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">🏆 5 จังหวัด จุดความร้อนสูงสุด</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={provinceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
