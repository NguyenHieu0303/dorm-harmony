import { Home, Users, Bell, CheckCircle, Clock, FileText } from "lucide-react";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const notifications = [
  {
    id: 1,
    title: "Thông báo nộp tiền điện tháng 1/2024",
    date: "15/01/2024",
    isRead: false,
  },
  {
    id: 2,
    title: "Lịch vệ sinh khu vực công cộng",
    date: "12/01/2024",
    isRead: true,
  },
  {
    id: 3,
    title: "Quy định mới về giờ giấc sinh hoạt",
    date: "10/01/2024",
    isRead: true,
  },
];

export default function StudentDashboard() {
  return (
    <StudentSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Xin chào, Nguyễn Văn A
          </h1>
          <p className="text-muted-foreground mt-1">
            Chào mừng bạn quay lại hệ thống quản lý ký túc xá
          </p>
        </div>

        {/* Room Info Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-primary p-6 text-primary-foreground">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">
                  Phòng hiện tại
                </p>
                <h2 className="text-3xl font-bold mt-1">A305</h2>
                <p className="text-primary-foreground/80 mt-1">Tòa nhà A</p>
              </div>
              <div className="p-3 rounded-xl bg-primary-foreground/20">
                <Home className="h-8 w-8" />
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Loại phòng</p>
                <p className="font-semibold">8 người</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số người hiện tại</p>
                <p className="font-semibold">7/8</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tầng</p>
                <p className="font-semibold">Tầng 3</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Giá thuê</p>
                <p className="font-semibold">350.000đ/tháng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Trạng thái đăng ký"
            value="Đã duyệt"
            icon={CheckCircle}
            description="Hồ sơ KTX năm học 2024-2025"
          />
          <StatCard
            title="Tiền điện tháng này"
            value="125.000đ"
            icon={Clock}
            description="Hạn nộp: 25/01/2024"
          />
          <StatCard
            title="Yêu cầu sửa chữa"
            value="1"
            icon={FileText}
            description="Đang được xử lý"
          />
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Thông báo mới
            </CardTitle>
            <a href="#" className="text-sm text-primary hover:underline">
              Xem tất cả
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      notification.isRead ? "bg-muted" : "bg-primary"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        notification.isRead
                          ? "text-muted-foreground"
                          : "text-foreground font-medium"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentSidebar>
  );
}
