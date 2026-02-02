import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Home,
  Upload,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Thông tin cá nhân", icon: User },
  { id: 2, title: "Thông tin học tập", icon: GraduationCap },
  { id: 3, title: "Nguyện vọng KTX", icon: Home },
  { id: 4, title: "Upload hồ sơ", icon: Upload },
];

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-background p-4">
        <div className="w-full max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-6">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Gửi hồ sơ thành công!
          </h1>
          <p className="text-muted-foreground mb-8">
            Hồ sơ của bạn đã được gửi và đang chờ xét duyệt. Bạn có thể theo dõi
            trạng thái hồ sơ trong hệ thống.
          </p>
          <Button onClick={() => navigate("/student/room")}>
            Xem kết quả duyệt
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Đăng ký Ký túc xá
          </h1>
          <p className="text-muted-foreground mt-1">
            Dành cho tân sinh viên năm học 2024-2025
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
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
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 text-center hidden sm:block",
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
                    "w-12 md:w-20 h-0.5 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl shadow-elevated border border-border/50 p-6 md:p-8">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Thông tin cá nhân
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" placeholder="Nhập họ và tên đầy đủ" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cccd">Số CCCD</Label>
                  <Input id="cccd" placeholder="Nhập số CCCD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày sinh</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select>
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
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Nhập email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="Nhập số điện thoại" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Thông tin học tập
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty">Khoa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cntt">Công nghệ thông tin</SelectItem>
                      <SelectItem value="kinh-te">Kinh tế</SelectItem>
                      <SelectItem value="ngoai-ngu">Ngoại ngữ</SelectItem>
                      <SelectItem value="co-khi">Cơ khí</SelectItem>
                      <SelectItem value="dien-dien-tu">Điện - Điện tử</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Ngành học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn ngành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ktpm">Kỹ thuật phần mềm</SelectItem>
                      <SelectItem value="httt">Hệ thống thông tin</SelectItem>
                      <SelectItem value="khmt">Khoa học máy tính</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Khóa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khóa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="k24">K24 (2024-2028)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">MSSV (nếu có)</Label>
                  <Input id="studentId" placeholder="Nhập MSSV" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dormitory Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Nguyện vọng ký túc xá
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Loại phòng mong muốn</Label>
                  <RadioGroup defaultValue="8">
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

                <div className="space-y-3">
                  <Label>Tòa nhà ưu tiên</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tòa nhà" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Tòa A</SelectItem>
                      <SelectItem value="b">Tòa B</SelectItem>
                      <SelectItem value="c">Tòa C</SelectItem>
                      <SelectItem value="any">Không yêu cầu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Upload Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">
                Upload hồ sơ
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium text-foreground">
                    Giấy báo trúng tuyển
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kéo thả file hoặc click để chọn (PDF, JPG, PNG)
                  </p>
                  <Input type="file" className="hidden" />
                </div>

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium text-foreground">
                    Ảnh CCCD (mặt trước & sau)
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kéo thả file hoặc click để chọn (JPG, PNG)
                  </p>
                  <Input type="file" className="hidden" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <Button onClick={handleNext}>
              {currentStep === 4 ? "Gửi hồ sơ" : "Tiếp tục"}
              {currentStep < 4 && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
