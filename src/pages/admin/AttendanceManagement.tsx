import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Download, 
  Search, 
  Filter,
  Calendar,
  Building2,
  Layers,
  BarChart3,
  ChevronDown
} from "lucide-react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const attendanceData = [
  { id: 1, mssv: "SV001", name: "Nguyễn Văn A", room: "A305", building: "A", floor: 3, time: "22:15", method: "Khuôn mặt", status: "completed" },
  { id: 2, mssv: "SV002", name: "Trần Thị B", room: "A305", building: "A", floor: 3, time: "21:45", method: "QR Code", status: "completed" },
  { id: 3, mssv: "SV003", name: "Lê Văn C", room: "B201", building: "B", floor: 2, time: "-", method: "-", status: "rejected" },
  { id: 4, mssv: "SV004", name: "Phạm Thị D", room: "A102", building: "A", floor: 1, time: "22:30", method: "Khuôn mặt", status: "completed" },
  { id: 5, mssv: "SV005", name: "Hoàng Văn E", room: "C405", building: "C", floor: 4, time: "-", method: "-", status: "rejected" },
  { id: 6, mssv: "SV006", name: "Ngô Thị F", room: "B301", building: "B", floor: 3, time: "23:00", method: "QR Code", status: "completed" },
  { id: 7, mssv: "SV007", name: "Đỗ Văn G", room: "A305", building: "A", floor: 3, time: "22:00", method: "Khuôn mặt", status: "completed" },
  { id: 8, mssv: "SV008", name: "Vũ Thị H", room: "C102", building: "C", floor: 1, time: "-", method: "-", status: "pending" },
];

const weeklyStats = [
  { day: "T2", present: 245, absent: 5 },
  { day: "T3", present: 242, absent: 8 },
  { day: "T4", present: 248, absent: 2 },
  { day: "T5", present: 240, absent: 10 },
  { day: "T6", present: 244, absent: 6 },
  { day: "T7", present: 238, absent: 12 },
  { day: "CN", present: 235, absent: 15 },
];

const buildingStats = [
  { name: "Tòa A", value: 120, color: "hsl(var(--primary))" },
  { name: "Tòa B", value: 85, color: "hsl(var(--success))" },
  { name: "Tòa C", value: 45, color: "hsl(var(--warning))" },
];

const roomStats = [
  { room: "A305", total: 8, present: 7, absent: 1, rate: "87.5%" },
  { room: "A102", total: 6, present: 6, absent: 0, rate: "100%" },
  { room: "B201", total: 8, present: 5, absent: 3, rate: "62.5%" },
  { room: "B301", total: 6, present: 6, absent: 0, rate: "100%" },
  { room: "C102", total: 8, present: 6, absent: 2, rate: "75%" },
  { room: "C405", total: 6, present: 4, absent: 2, rate: "66.7%" },
];

export default function AttendanceManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredData = attendanceData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mssv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBuilding = selectedBuilding === "all" || item.building === selectedBuilding;
    const matchesFloor = selectedFloor === "all" || item.floor.toString() === selectedFloor;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesBuilding && matchesFloor && matchesStatus;
  });

  const totalStudents = 250;
  const presentToday = attendanceData.filter(s => s.status === "completed").length;
  const absentToday = attendanceData.filter(s => s.status === "rejected").length;
  const pendingToday = attendanceData.filter(s => s.status === "pending").length;

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quản lý điểm danh</h1>
            <p className="text-muted-foreground mt-1">
              Theo dõi điểm danh sinh viên nội trú - Ngày {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Chọn ngày
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tổng sinh viên"
            value={totalStudents}
            icon={Users}
            description="Đang ở KTX"
          />
          <StatCard
            title="Đã điểm danh"
            value={presentToday}
            icon={UserCheck}
            description="Hôm nay"
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Vắng mặt"
            value={absentToday}
            icon={UserX}
            description="Chưa điểm danh"
          />
          <StatCard
            title="Tỷ lệ điểm danh"
            value={`${Math.round((presentToday / (presentToday + absentToday)) * 100)}%`}
            icon={BarChart3}
            description="Trung bình tuần: 96%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê điểm danh theo tuần</CardTitle>
              <CardDescription>7 ngày gần nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="present" name="Có mặt" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" name="Vắng" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Building Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo tòa nhà</CardTitle>
              <CardDescription>Tổng số sinh viên điểm danh hôm nay</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={buildingStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {buildingStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList>
            <TabsTrigger value="students">Danh sách sinh viên</TabsTrigger>
            <TabsTrigger value="rooms">Theo phòng</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Chi tiết điểm danh</CardTitle>
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm sinh viên..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-[200px]"
                      />
                    </div>
                    <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                      <SelectTrigger className="w-[130px]">
                        <Building2 className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Tòa nhà" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả tòa</SelectItem>
                        <SelectItem value="A">Tòa A</SelectItem>
                        <SelectItem value="B">Tòa B</SelectItem>
                        <SelectItem value="C">Tòa C</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                      <SelectTrigger className="w-[120px]">
                        <Layers className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Tầng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả tầng</SelectItem>
                        <SelectItem value="1">Tầng 1</SelectItem>
                        <SelectItem value="2">Tầng 2</SelectItem>
                        <SelectItem value="3">Tầng 3</SelectItem>
                        <SelectItem value="4">Tầng 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[140px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="completed">Đã điểm danh</SelectItem>
                        <SelectItem value="rejected">Vắng mặt</SelectItem>
                        <SelectItem value="pending">Chưa điểm danh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>MSSV</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Tòa/Tầng</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Phương thức</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.mssv}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.room}</TableCell>
                        <TableCell>{student.building} / Tầng {student.floor}</TableCell>
                        <TableCell>{student.time}</TableCell>
                        <TableCell>{student.method}</TableCell>
                        <TableCell>
                          <StatusBadge 
                            status={student.status as "completed" | "rejected" | "pending"} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <CardTitle>Thống kê theo phòng</CardTitle>
                <CardDescription>Tỷ lệ điểm danh của từng phòng trong ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phòng</TableHead>
                      <TableHead>Tổng SV</TableHead>
                      <TableHead>Có mặt</TableHead>
                      <TableHead>Vắng</TableHead>
                      <TableHead>Tỷ lệ</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomStats.map((room) => (
                      <TableRow key={room.room}>
                        <TableCell className="font-medium">{room.room}</TableCell>
                        <TableCell>{room.total}</TableCell>
                        <TableCell className="text-success">{room.present}</TableCell>
                        <TableCell className="text-destructive">{room.absent}</TableCell>
                        <TableCell className="font-medium">{room.rate}</TableCell>
                        <TableCell>
                          <StatusBadge 
                            status={room.absent === 0 ? "completed" : room.absent > 2 ? "rejected" : "pending"} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminSidebar>
  );
}
