import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Edit,
  Building2,
  Users,
  FileText,
  Wrench,
  MapPin,
  Briefcase,
} from "lucide-react";

const adminInfo = {
  name: "Trần Thị B",
  staffId: "CB00123",
  avatar: "",
  email: "tranthib@university.edu.vn",
  phone: "0901234567",
  gender: "Nữ",
  dob: "20/08/1985",
  position: "Quản lý KTX",
  department: "Phòng Công tác Sinh viên",
  managedArea: "Khu A - Tòa nhà A, B, C",
  startDate: "01/09/2015",
  yearsWorking: "9 năm",
};

const stats = {
  totalStudents: 450,
  totalRooms: 60,
  pendingApplications: 12,
  pendingRepairs: 5,
};

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="p-2 rounded-lg bg-accent shrink-0">
        <Icon className="h-4 w-4 text-accent-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function AdminProfile() {
  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Thông tin cá nhân</h1>
          <p className="text-muted-foreground mt-1">
            Thông tin tài khoản quản lý ký túc xá
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary-foreground/30">
                <AvatarImage src={adminInfo.avatar} />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl font-bold">
                  {adminInfo.name.split(" ").pop()?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{adminInfo.name}</h2>
                <p className="text-primary-foreground/80">Mã CB: {adminInfo.staffId}</p>
                <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground border-0">
                  {adminInfo.position}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Sinh viên quản lý" value={stats.totalStudents.toString()} icon={Users} />
          <StatCard title="Tổng số phòng" value={stats.totalRooms.toString()} icon={Building2} />
          <StatCard title="Hồ sơ chờ duyệt" value={stats.pendingApplications.toString()} icon={FileText} />
          <StatCard title="Sửa chữa chờ xử lý" value={stats.pendingRepairs.toString()} icon={Wrench} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Thông tin cá nhân
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-1" /> Sửa
              </Button>
            </CardHeader>
            <CardContent className="space-y-0">
              <InfoRow icon={User} label="Họ và tên" value={adminInfo.name} />
              <InfoRow icon={Calendar} label="Ngày sinh" value={adminInfo.dob} />
              <InfoRow icon={User} label="Giới tính" value={adminInfo.gender} />
              <InfoRow icon={Mail} label="Email" value={adminInfo.email} />
              <InfoRow icon={Phone} label="Số điện thoại" value={adminInfo.phone} />
            </CardContent>
          </Card>

          {/* Work Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Thông tin công tác
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <InfoRow icon={Shield} label="Chức vụ" value={adminInfo.position} />
              <InfoRow icon={Building2} label="Phòng ban" value={adminInfo.department} />
              <InfoRow icon={MapPin} label="Khu vực quản lý" value={adminInfo.managedArea} />
              <InfoRow icon={Calendar} label="Ngày bắt đầu" value={adminInfo.startDate} />
              <InfoRow icon={Briefcase} label="Thâm niên" value={adminInfo.yearsWorking} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminSidebar>
  );
}
