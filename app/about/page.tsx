import Navigation from '@/components/navigation'
import { MapPin, Users, Database, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  const provinces = [
    'เชียงใหม่', 'เชียงราย', 'พะเยา', 'ลำปาง', 
    'ลำพูน', 'แพร่', 'น่าน', 'แม่ฮ่องสอน', 'อุตรดิตถ์'
  ]

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              เกี่ยวกับ RiceBurn Insight
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              ระบบติดตามและวิเคราะห์จุดความร้อนในพื้นที่นาข้าว<br/>
              ประเทศไทย
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">ครอบคลุม 77 จังหวัด</h3>
              <p className="text-gray-600 text-sm">ประเทศไทย</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">ข้อมูล Real-time</h3>
              <p className="text-gray-600 text-sm">อัพเดททุกวัน</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">วิเคราะห์แนวโน้ม</h3>
              <p className="text-gray-600 text-sm">รายเดือน รายจังหวัด</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">ใช้งานง่าย</h3>
              <p className="text-gray-600 text-sm">UI/UX เป็นมิตร</p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 shadow-xl max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">เป้าหมายของเรา</h2>
            <p className="text-lg text-emerald-50 leading-relaxed">
              พัฒนาระบบติดตามและวิเคราะห์จุดความร้อนจากพื้นที่นาข้าวในประเทศไทย 
              เพื่อช่วยลดปัญหามลพิษทางอากาศและสนับสนุนการตัดสินใจของหน่วยงานที่เกี่ยวข้อง 
              ในการจัดการปัญหาการเผาในภาคเกษตรอย่างมีประสิทธิภาพ
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
