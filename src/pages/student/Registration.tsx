import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import { ChatSupport } from "@/components/registration/ChatSupport";
import { FacePreviewCard } from "@/components/registration/FacePreviewCard";
import { FaceVerification } from "@/components/registration/FaceVerification";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";

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
  faceImage: string;
}

const steps = [
  { id: 1, title: "Thông tin sinh viên", icon: User },
  { id: 2, title: "Xác thực khuôn mặt", icon: Camera },
];

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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
    faceImage: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFaceCapture = (imageData: string) => {
    updateFormData("faceImage", imageData);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Show success page after face verification
  if (isSubmitted) {
    return (
      <>
        <RegistrationSuccess
          studentInfo={{
            studentId: formData.studentId || "SV240001",
            fullName: formData.fullName || "Nguyễn Văn A",
            email: formData.email || "a.nv@student.edu.vn",
            phone: formData.phone || "0912345678",
            faculty: formData.faculty || "CNTT",
            class: formData.class || "K24",
            roomType: formData.roomType === "4" ? "4 người" : formData.roomType === "6" ? "6 người" : "8 người",
            building: formData.building || "Tòa A",
          }}
          faceImage={formData.faceImage}
        />
        <ChatSupport />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Đăng ký Ký túc xá
          </h1>
          <p className="text-muted-foreground mt-1">
            Dành cho sinh viên năm học 2024-2025
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center",
                    currentStep >= step.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-20 h-0.5 mx-4",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Student Information Form */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <Card className="lg:col-span-2">
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

                {/* Navigation */}
                <div className="flex justify-end mt-8 pt-6 border-t border-border">
                  <Button onClick={handleNext}>
                    Tiếp tục & Xác thực khuôn mặt
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Face Preview Card */}
            <FacePreviewCard
              imageData={formData.faceImage}
              isVerified={!!formData.faceImage}
            />
          </div>
        )}

        {/* Step 2: Face Verification */}
        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
                Xác thực khuôn mặt
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Ảnh khuôn mặt sẽ được sử dụng làm ảnh định danh chính thức trong hệ thống KTX
              </p>
              <FaceVerification
                onCapture={handleFaceCapture}
                capturedImage={formData.faceImage}
              />
              <div className="flex justify-start mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chat Support */}
      <ChatSupport />
    </div>
  );
}
