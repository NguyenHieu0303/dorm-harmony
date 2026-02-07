import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ChatSupport } from "@/components/registration/ChatSupport";

interface FormData {
  studentId: string;
  fullName: string;
  dob: string;
  gender: string;
  cccd: string;
  class: string;
  faculty: string;
  email: string;
  phone: string;
  address: string;
  roomType: string;
  building: string;
}

export default function Registration() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    fullName: "",
    dob: "",
    gender: "",
    cccd: "",
    class: "",
    faculty: "",
    email: "",
    phone: "",
    address: "",
    roomType: "8",
    building: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Show success page after submission
  if (isSubmitted) {
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

          {/* Student Info Card */}
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
                  <p className="font-medium text-foreground">
                    Phòng {formData.roomType} người - {formData.building || "Không yêu cầu"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-accent/30 border-accent">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center shrink-0">
                  <User className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Trạng thái: Chờ xét duyệt</h3>
                  <p className="text-muted-foreground text-sm">
                    Hồ sơ của bạn đang được cán bộ KTX xem xét. Thời gian xử lý thường từ 3-5 ngày làm việc.
                  </p>
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
        <ChatSupport />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Đăng ký Ký túc xá
          </h1>
          <p className="text-muted-foreground mt-1">
            Dành cho sinh viên năm học 2024-2025
          </p>
        </div>

        {/* Main Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Mã sinh viên</Label>
                <Input
                  id="studentId"
                  placeholder="VD: SV240001"
                  value={formData.studentId}
                  onChange={(e) => updateFormData("studentId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  placeholder="Nhập họ và tên đầy đủ"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Ngày sinh</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateFormData("dob", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => updateFormData("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cccd">Số CCCD</Label>
                <Input
                  id="cccd"
                  placeholder="Nhập số CCCD"
                  value={formData.cccd}
                  onChange={(e) => updateFormData("cccd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Lớp</Label>
                <Input
                  id="class"
                  placeholder="VD: K24-CNTT"
                  value={formData.class}
                  onChange={(e) => updateFormData("class", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faculty">Khoa</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(value) => updateFormData("faculty", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNTT">Công nghệ thông tin</SelectItem>
                    <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                    <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                    <SelectItem value="Cơ khí">Cơ khí</SelectItem>
                    <SelectItem value="Điện - Điện tử">Điện - Điện tử</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email sinh viên</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@student.edu.vn"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Địa chỉ thường trú</Label>
                <Textarea
                  id="address"
                  placeholder="Nhập địa chỉ thường trú"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                />
              </div>
            </div>

            {/* Room Preferences */}
            <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">
              Nguyện vọng đăng ký KTX
            </h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Loại phòng mong muốn</Label>
                <RadioGroup
                  value={formData.roomType}
                  onValueChange={(value) => updateFormData("roomType", value)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="4" id="room-4" />
                      <Label htmlFor="room-4" className="cursor-pointer flex-1">
                        <div className="font-medium">Phòng 4 người</div>
                        <div className="text-sm text-muted-foreground">
                          600.000đ/tháng
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="6" id="room-6" />
                      <Label htmlFor="room-6" className="cursor-pointer flex-1">
                        <div className="font-medium">Phòng 6 người</div>
                        <div className="text-sm text-muted-foreground">
                          450.000đ/tháng
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="8" id="room-8" />
                      <Label htmlFor="room-8" className="cursor-pointer flex-1">
                        <div className="font-medium">Phòng 8 người</div>
                        <div className="text-sm text-muted-foreground">
                          350.000đ/tháng
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Tòa nhà ưu tiên</Label>
                <Select
                  value={formData.building}
                  onValueChange={(value) => updateFormData("building", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tòa nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tòa A">Tòa A</SelectItem>
                    <SelectItem value="Tòa B">Tòa B</SelectItem>
                    <SelectItem value="Tòa C">Tòa C</SelectItem>
                    <SelectItem value="Không yêu cầu">Không yêu cầu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8 pt-6 border-t border-border">
              <Button onClick={handleSubmit}>
                Gửi đăng ký
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Support */}
      <ChatSupport />
    </div>
  );
}
