import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Home,
  CreditCard,
  Shield,
  Heart,
  Edit,
  BookOpen,
} from "lucide-react";

const studentInfo = {
  name: "Nguyễn Văn A",
  mssv: "2051012345",
  avatar: "",
  email: "nguyenvana@student.edu.vn",
  phone: "0912345678",
  gender: "Nam",
  dob: "15/03/2002",
  cccd: "079202012345",
  hometown: "Quận 1, TP. Hồ Chí Minh",
  faculty: "Công nghệ Thông tin",
  major: "Khoa học Máy tính",
  classId: "KTPM2021",
  academicYear: "2021 - 2025",
  currentYear: "Năm 3",
};

const dormInfo = {
  room: "A305",
  building: "Tòa nhà A",
  roomType: "8 người",
  floor: "Tầng 3",
  status: "Đang ở",
  checkInDate: "01/09/2023",
  semester: "Học kỳ 2 - 2023/2024",
  deposit: "100.000đ",
  monthlyRent: "350.000đ",
};

const familyContact = {
  name: "Nguyễn Văn B",
  relation: "Bố",
  phone: "0987654321",
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

export default function StudentProfile() {
  return (
    <StudentSidebar>
      <div className="p-6 lg:p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Thông tin cá nhân</h1>
          <p className="text-muted-foreground mt-1">
            Xem và quản lý thông tin cá nhân của bạn
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary-foreground/30">
                <AvatarImage src={studentInfo.avatar} />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xl font-bold">
                  {studentInfo.name.split(" ").pop()?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
                <p className="text-primary-foreground/80">MSSV: {studentInfo.mssv}</p>
                <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground border-0">
                  {studentInfo.faculty}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

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
              <InfoRow icon={User} label="Họ và tên" value={studentInfo.name} />
              <InfoRow icon={CreditCard} label="CCCD" value={studentInfo.cccd} />
              <InfoRow icon={Calendar} label="Ngày sinh" value={studentInfo.dob} />
              <InfoRow icon={User} label="Giới tính" value={studentInfo.gender} />
              <InfoRow icon={Mail} label="Email" value={studentInfo.email} />
              <InfoRow icon={Phone} label="Số điện thoại" value={studentInfo.phone} />
              <InfoRow icon={MapPin} label="Quê quán" value={studentInfo.hometown} />
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Thông tin học tập
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <InfoRow icon={BookOpen} label="Khoa" value={studentInfo.faculty} />
              <InfoRow icon={GraduationCap} label="Ngành" value={studentInfo.major} />
              <InfoRow icon={User} label="Lớp" value={studentInfo.classId} />
              <InfoRow icon={Calendar} label="Khóa" value={studentInfo.academicYear} />
              <InfoRow icon={Shield} label="Năm học hiện tại" value={studentInfo.currentYear} />
            </CardContent>
          </Card>

          {/* Dorm Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Thông tin KTX
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <InfoRow icon={Home} label="Phòng" value={`${dormInfo.room} - ${dormInfo.building}`} />
              <InfoRow icon={User} label="Loại phòng" value={dormInfo.roomType} />
              <InfoRow icon={MapPin} label="Tầng" value={dormInfo.floor} />
              <InfoRow icon={Calendar} label="Ngày nhận phòng" value={dormInfo.checkInDate} />
              <InfoRow icon={GraduationCap} label="Học kỳ" value={dormInfo.semester} />
              <InfoRow icon={CreditCard} label="Tiền thuê" value={dormInfo.monthlyRent} />
              <InfoRow icon={Shield} label="Tiền thế chấp" value={dormInfo.deposit} />
              <div className="pt-2">
                <Badge className="bg-success/10 text-success border-success/20">
                  {dormInfo.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Family Contact */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Liên hệ khẩn cấp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              <InfoRow icon={User} label="Họ và tên" value={familyContact.name} />
              <InfoRow icon={Heart} label="Quan hệ" value={familyContact.relation} />
              <InfoRow icon={Phone} label="Số điện thoại" value={familyContact.phone} />
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentSidebar>
  );
}
