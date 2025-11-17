import Link from 'next/link'
import { ChevronRight, Flame, MapPin, BarChart3 } from 'lucide-react'
import Navigation from '@/components/navigation'

export default function HomePage() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20">

        {/* ================= HERO SECTION (NEW) ================= */}
        <div 
          className="relative w-full min-h-[85vh] flex items-center justify-center"
          style={{
            backgroundImage: "url('/img/1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="relative z-10 text-center px-6 max-w-4xl">
            
            {/* Top Badge */}
            <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold shadow-lg">
              🌾 Rice Monitoring System
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6">
              RiceBurn Insight
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-10 drop-shadow-lg">
              ระบบติดตามจุดความร้อน<br/>ในพื้นที่นาข้าวทั่วประเทศไทย
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              {/* Dashboard Button */}
              <Link 
                href="/dashboard"
                className="group inline-flex items-center justify-center px-8 py-4 
                bg-white text-emerald-700 font-semibold rounded-xl shadow-lg 
                hover:bg-emerald-50 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                เข้าสู่แดชบอร์ด
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Map Button */}
              <Link 
                href="/map"
                className="group inline-flex items-center justify-center px-8 py-4 
                bg-emerald-700 text-white font-semibold rounded-xl shadow-lg border border-white/20
                hover:bg-emerald-800 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                <MapPin className="w-5 h-5 mr-2" />
                ดูแผนที่ความร้อน
              </Link>

            </div>
          </div>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ฟีเจอร์หลัก
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Feature 1 */}
            <Link href="/map" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">แผนที่จุดความร้อน</h3>
                <p className="text-gray-600 leading-relaxed">ติดตามจุดความร้อนแบบ Real-time บนแผนที่</p>
              </div>
            </Link>

            {/* Feature 2 */}
            <Link href="/dashboard" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">วิเคราะห์ข้อมูล</h3>
                <p className="text-gray-600 leading-relaxed">สถิติและกราฟแสดงแนวโน้มรายเดือนและรายจังหวัด</p>
              </div>
            </Link>

            {/* Feature 3 */}
            <Link href="/about" className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">ครอบคลุมทั่วประเทศ</h3>
                <p className="text-gray-600 leading-relaxed">
                  ข้อมูล hotspot ทุกจังหวัด พร้อมแผนที่ภาพจริง
                </p>
              </div>
            </Link>

          </div>
        </div>

        {/* ================= STATS SECTION ================= */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">

              <div className="text-white">
                <div className="text-5xl font-bold mb-2">77</div>
                <div className="text-emerald-100 text-lg">จังหวัดในระบบ</div>
              </div>

              <div className="text-white">
                <div className="text-5xl font-bold mb-2">2023</div>
                <div className="text-emerald-100 text-lg">ข้อมูลปี</div>
              </div>

              <div className="text-white">
                <div className="text-5xl font-bold mb-2">Real-time</div>
                <div className="text-emerald-100 text-lg">อัพเดทข้อมูล</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
