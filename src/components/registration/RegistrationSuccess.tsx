import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Clock, Camera, User, Mail, Phone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudentInfo {
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  faculty: string;
  class: string;
  roomType: string;
  building: string;
}

interface RegistrationSuccessProps {
  studentInfo: StudentInfo;
  faceImage: string;
}

export function RegistrationSuccess({ studentInfo, faceImage }: RegistrationSuccessProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Đăng ký ký túc xá thành công!
          </h1>
          <p className="text-muted-foreground">
            Hồ sơ của bạn đã được gửi và đang chờ xét duyệt
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Thông tin sinh viên
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Họ và tên</p>
                    <p className="font-medium text-foreground">{studentInfo.fullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Mã sinh viên</p>
                    <p className="font-medium text-foreground">{studentInfo.studentId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{studentInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p className="font-medium text-foreground">{studentInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Khoa - Lớp</p>
                    <p className="font-medium text-foreground">{studentInfo.faculty} - {studentInfo.class}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nguyện vọng</p>
                    <p className="font-medium text-foreground">Phòng {studentInfo.roomType} - {studentInfo.building}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Face Image */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Ảnh xác thực
              </h2>
              <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                <img
                  src={faceImage}
                  alt="Face verification"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full text-sm">
                  <Check className="h-4 w-4" />
                  <span>Đã xác thực</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card className="mt-6 bg-accent/30 border-accent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Trạng thái: Chờ xét duyệt</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Hồ sơ của bạn đang được cán bộ KTX xem xét. Thời gian xử lý thường từ 3-5 ngày làm việc.
                </p>
                <div className="p-3 bg-primary/10 rounded-lg text-sm text-foreground">
                  <strong>Lưu ý:</strong> Ảnh khuôn mặt này sẽ được sử dụng thay thế ảnh thẻ trong quá trình quản lý ký túc xá, 
                  bao gồm điểm danh và xác thực ra vào cổng.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate("/student/profile")}>
            Về trang chủ
          </Button>
          <Button onClick={() => navigate("/student/room")}>
            Xem kết quả xét duyệt
          </Button>
        </div>
      </div>
    </div>
  );
}
