import { Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FormData } from "@/pages/student/Registration";
import type { NavigateFunction } from "react-router-dom";

interface RegistrationSuccessProps {
  formData: FormData;
  navigate: NavigateFunction;
}

export function RegistrationSuccess({ formData, navigate }: RegistrationSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Đăng ký ký túc xá thành công!</h1>
          <p className="text-muted-foreground">Hồ sơ của bạn đã được gửi và đang chờ xét duyệt</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Thông tin đăng ký
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Họ và tên</p>
                <p className="font-medium text-foreground">{formData.fullName || "Chưa nhập"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mã sinh viên</p>
                <p className="font-medium text-foreground">{formData.studentId || "Chưa nhập"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{formData.email || "Chưa nhập"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium text-foreground">{formData.phone || "Chưa nhập"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Khoa - Lớp</p>
                <p className="font-medium text-foreground">{formData.faculty || "Chưa nhập"} - {formData.class || "Chưa nhập"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nguyện vọng</p>
                <p className="font-medium text-foreground">Phòng {formData.roomType} người - {formData.building || "Không yêu cầu"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Liên hệ khẩn cấp</p>
                <p className="font-medium text-foreground">{formData.familyName || "Chưa nhập"} ({formData.familyRelation || "—"}) - {formData.familyPhone || "—"}</p>
              </div>
              {formData.isExtension && (
                <div>
                  <p className="text-sm text-muted-foreground">Loại đăng ký</p>
                  <p className="font-medium text-success">Gia hạn (Phòng {formData.currentRoom} - {formData.currentBuilding})</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                <User className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Trạng thái: Chờ xét duyệt</h3>
                <p className="text-muted-foreground text-sm">Hồ sơ của bạn đang được cán bộ KTX xem xét. Thời gian xử lý thường từ 3-5 ngày làm việc.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate("/student/profile")}>Về trang chủ</Button>
          <Button onClick={() => navigate("/student/room")}>Xem kết quả xét duyệt</Button>
        </div>
      </div>
    </div>
  );
}
