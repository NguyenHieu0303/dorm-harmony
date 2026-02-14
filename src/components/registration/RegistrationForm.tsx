import { Upload, X, FileText, ArrowLeft, ArrowRight, CreditCard, ShieldCheck, Camera, ImageIcon } from "lucide-react";
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
import type { FormData, UploadedFile } from "@/pages/student/Registration";

interface RegistrationFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  onSubmit: () => void;
  onBack: () => void;
}

const uploadCategories = [
  { id: "cccd", label: "Căn cước công dân / Căn cước", icon: CreditCard, accept: ".jpg,.jpeg,.png,.pdf" },
  { id: "bhyt", label: "Thẻ Bảo hiểm Y tế", icon: ShieldCheck, accept: ".jpg,.jpeg,.png,.pdf" },
  { id: "enrollment", label: "Minh chứng trúng tuyển / nhập học / thẻ SV", icon: FileText, accept: ".jpg,.jpeg,.png,.pdf" },
  { id: "portrait", label: "Ảnh chân dung", icon: Camera, accept: ".jpg,.jpeg,.png" },
];

export function RegistrationForm({
  formData,
  setFormData,
  uploadedFiles,
  setUploadedFiles,
  onSubmit,
  onBack,
}: RegistrationFormProps) {
  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        category,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFilesForCategory = (categoryId: string) =>
    uploadedFiles
      .map((f, i) => ({ ...f, originalIndex: i }))
      .filter((f) => f.category === categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Đăng ký Ký túc xá</h1>
          <p className="text-muted-foreground mt-1">Dành cho sinh viên năm học 2024-2025</p>
        </div>

        {/* Step 1: Personal Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
              Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Mã sinh viên</Label>
                <Input id="studentId" placeholder="VD: SV240001" value={formData.studentId} onChange={(e) => updateFormData("studentId", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input id="fullName" placeholder="Nhập họ và tên đầy đủ" value={formData.fullName} onChange={(e) => updateFormData("fullName", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Ngày sinh</Label>
                <Input id="dob" type="date" value={formData.dob} onChange={(e) => updateFormData("dob", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Select value={formData.gender} onValueChange={(v) => updateFormData("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Chọn giới tính" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cccd">Số CCCD</Label>
                <Input id="cccd" placeholder="Nhập số CCCD" value={formData.cccd} onChange={(e) => updateFormData("cccd", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Lớp</Label>
                <Input id="class" placeholder="VD: K24-CNTT" value={formData.class} onChange={(e) => updateFormData("class", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faculty">Khoa</Label>
                <Select value={formData.faculty} onValueChange={(v) => updateFormData("faculty", v)}>
                  <SelectTrigger><SelectValue placeholder="Chọn khoa" /></SelectTrigger>
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
                <Input id="email" type="email" placeholder="email@student.edu.vn" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Địa chỉ thường trú</Label>
                <Textarea id="address" placeholder="Nhập địa chỉ thường trú" value={formData.address} onChange={(e) => updateFormData("address", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Upload documents */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
              Tải lên hồ sơ minh chứng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uploadCategories.map((cat) => {
                const Icon = cat.icon;
                const files = getFilesForCategory(cat.id);
                return (
                  <div key={cat.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{cat.label}</span>
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2">
                        {files.map((file) => (
                          <div key={file.originalIndex} className="flex items-center justify-between p-2 bg-accent/50 rounded-md text-sm">
                            <div className="flex items-center gap-2 min-w-0">
                              <ImageIcon className="h-4 w-4 text-primary shrink-0" />
                              <span className="truncate text-foreground">{file.name}</span>
                              <span className="text-muted-foreground text-xs shrink-0">({formatFileSize(file.size)})</span>
                            </div>
                            <button type="button" onClick={() => removeFile(file.originalIndex)} className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors shrink-0">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-md p-3 cursor-pointer hover:border-primary/50 transition-colors text-sm text-muted-foreground hover:text-foreground">
                      <Upload className="h-4 w-4" />
                      <span>Chọn file</span>
                      <input type="file" className="hidden" accept={cat.accept} onChange={(e) => handleFileUpload(e, cat.id)} />
                    </label>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Hỗ trợ: JPG, PNG, PDF (Tối đa 10MB/file)
            </p>
          </CardContent>
        </Card>

        {/* Step 3: Room preferences */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
              Nguyện vọng đăng ký KTX
            </h2>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Loại phòng mong muốn</Label>
                <RadioGroup value={formData.roomType} onValueChange={(v) => updateFormData("roomType", v)}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: "4", label: "Phòng 4 người", price: "600.000đ/tháng" },
                      { value: "6", label: "Phòng 6 người", price: "450.000đ/tháng" },
                      { value: "8", label: "Phòng 8 người", price: "350.000đ/tháng" },
                    ].map((room) => (
                      <div key={room.value} className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                        <RadioGroupItem value={room.value} id={`room-${room.value}`} />
                        <Label htmlFor={`room-${room.value}`} className="cursor-pointer flex-1">
                          <div className="font-medium">{room.label}</div>
                          <div className="text-sm text-muted-foreground">{room.price}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Tòa nhà ưu tiên</Label>
                <Select value={formData.building} onValueChange={(v) => updateFormData("building", v)}>
                  <SelectTrigger><SelectValue placeholder="Chọn tòa nhà" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tòa A">Tòa A</SelectItem>
                    <SelectItem value="Tòa B">Tòa B</SelectItem>
                    <SelectItem value="Tòa C">Tòa C</SelectItem>
                    <SelectItem value="Không yêu cầu">Không yêu cầu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Priority docs (optional) */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
              Minh chứng ưu tiên (nếu có)
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Upload các giấy tờ chứng minh đối tượng ưu tiên: Giấy xác nhận hộ nghèo/cận nghèo,
              giấy chứng nhận gia đình chính sách, giấy xác nhận sinh viên vùng sâu vùng xa, v.v.
            </p>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground">Kéo thả file hoặc click để upload</p>
              <p className="text-xs text-muted-foreground mt-1">Hỗ trợ: PDF, JPG, PNG, DOC, DOCX (Tối đa 10MB/file)</p>
              <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => handleFileUpload(e, "priority")} />
            </label>

            {getFilesForCategory("priority").length > 0 && (
              <div className="space-y-2 mt-4">
                {getFilesForCategory("priority").map((file) => (
                  <div key={file.originalIndex} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(file.originalIndex)} className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between pt-2 pb-8">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <Button onClick={onSubmit} className="gap-2">
            Gửi đăng ký
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
