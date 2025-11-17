"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flame, TrendingUp, MapPin } from "lucide-react";

export default function DashboardPage() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [totalHotspots, setTotalHotspots] = useState(0);
  const [topProvince, setTopProvince] = useState("-");

  // 12 เดือน
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const monthLabels = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  useEffect(() => {
    const load = async () => {
      let monthly: any[] = [];
      let provinceCount: Record<string, number> = {};
      let total = 0;

      for (let i = 0; i < months.length; i++) {
        const f = `/geo/Hotspot_inrice_${months[i]}.geojson`;

        try {
          const geo = await fetch(f).then((r) => r.json());
          const features = geo.features || [];

          monthly.push({ month: monthLabels[i], count: features.length });
          total += features.length;

          // Province count
          features.forEach((pt: any) => {
            const prov = pt.properties?.PROVINCE || "ไม่ทราบจังหวัด";
            provinceCount[prov] = (provinceCount[prov] || 0) + 1;
          });
        } catch {
          monthly.push({ month: monthLabels[i], count: 0 });
        }
      }

      // Sort top province
      const sorted = Object.entries(provinceCount).sort((a, b) => b[1] - a[1]);

      if (sorted.length > 0) {
        setTopProvince(`${sorted[0][0]} (${sorted[0][1]} จุด)`);
      }

      setTotalHotspots(total);
      setMonthlyData(monthly);
    };

    load();
  }, []);

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20">
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            📊 แดชบอร์ด (ข้อมูลจริง)
          </h1>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Total Hotspots */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">
                  จุดความร้อนทั้งหมด
                </h3>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Flame className="text-white w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800">
                {totalHotspots.toLocaleString()}
              </div>
            </div>

            {/* Top Province */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">
                  จังหวัดที่มีจุดความร้อนมากที่สุด
                </h3>
                <TrendingUp className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="text-xl font-bold">{topProvince}</div>
            </div>

            {/* Coverage */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">พื้นที่ครอบคลุม</h3>
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-800">ประเทศไทย</div>
            </div>
          </div>

          {/* Monthly Chart */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
              📈 จำนวนจุดความร้อนรายเดือน
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
