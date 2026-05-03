import { Upload, X, FileText, ArrowLeft, ArrowRight, CreditCard, ShieldCheck, Camera, ImageIcon, Users, Phone, MapPin, RefreshCw, Building, CalendarDays, AlertCircle } from "lucide-react";
import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import type { FormData, UploadedFile } from "@/pages/student/Registration";
import { AvailableRoomsPicker } from "./AvailableRoomsPicker";

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

interface ValidationErrors {
  [key: string]: string;
}

export function RegistrationForm({
  formData,
  setFormData,
  uploadedFiles,
  setUploadedFiles,
  onSubmit,
  onBack,
}: RegistrationFormProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateFormData = (field: keyof FormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.studentId.trim()) newErrors.studentId = "Vui lòng nhập mã sinh viên";
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên";
    if (!formData.dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!formData.cccd.trim()) newErrors.cccd = "Vui lòng nhập số CCCD";
    else if (!/^\d{12}$/.test(formData.cccd)) newErrors.cccd = "Số CCCD phải có 12 chữ số";
    if (!formData.class.trim()) newErrors.class = "Vui lòng nhập lớp";
    if (!formData.faculty) newErrors.faculty = "Vui lòng chọn khoa";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^0\d{9}$/.test(formData.phone)) newErrors.phone = "Số điện thoại phải có 10 chữ số, bắt đầu bằng 0";
    if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";

    // Family contact validation
    if (!formData.familyName.trim()) newErrors.familyName = "Vui lòng nhập họ tên người thân";
    if (!formData.familyRelation) newErrors.familyRelation = "Vui lòng chọn mối quan hệ";
    if (!formData.familyPhone.trim()) newErrors.familyPhone = "Vui lòng nhập số điện thoại người thân";
    else if (!/^0\d{9}$/.test(formData.familyPhone)) newErrors.familyPhone = "Số điện thoại phải có 10 chữ số";

    // Extension validation
    if (formData.isExtension) {
      if (!formData.currentRoom.trim()) newErrors.currentRoom = "Vui lòng nhập phòng hiện tại";
      if (!formData.currentBuilding) newErrors.currentBuilding = "Vui lòng chọn tòa nhà hiện tại";
    }

    if (!formData.roomType) newErrors.roomType = "Vui lòng chọn loại phòng";
    if (!formData.building) newErrors.building = "Vui lòng chọn tòa nhà";
    if (!formData.selectedRoom) newErrors.selectedRoom = "Vui lòng chọn một phòng còn trống";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrorEl = document.querySelector(`[data-field="${Object.keys(newErrors)[0]}"]`);
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
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

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
        <AlertCircle className="h-3.5 w-3.5" />
        {errors[field]}
      </p>
    ) : null;

  const StepHeader = ({ step, title, icon: Icon }: { step: number; title: string; icon?: React.ElementType }) => (
    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">{step}</span>
      {Icon && <Icon className="h-5 w-5 text-primary" />}
      {title}
    </h2>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Đăng ký Ký túc xá</h1>
          <p className="text-muted-foreground mt-1">Dành cho sinh viên năm học 2024-2025</p>
        </div>

        {/* Extension Toggle */}
        <Card className="mb-6 border-primary/30 bg-accent/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Gia hạn ở KTX</p>
                  <p className="text-sm text-muted-foreground">Dành cho sinh viên đã đăng ký và đang ở KTX trước đó</p>
                </div>
              </div>
              <Switch
                checked={formData.isExtension}
                onCheckedChange={(v) => updateFormData("isExtension", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Extension Info (conditional) */}
        {formData.isExtension && (
          <Card className="mb-6 border-secondary/30">
            <CardContent className="p-6">
              <StepHeader step={0} title="Thông tin gia hạn" icon={Building} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2" data-field="currentBuilding">
                  <Label>Tòa nhà hiện tại</Label>
                  <Select value={formData.currentBuilding} onValueChange={(v) => updateFormData("currentBuilding", v)}>
                    <SelectTrigger className={errors.currentBuilding ? "border-destructive" : ""}>
                      <SelectValue placeholder="Chọn tòa nhà" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tòa A">Tòa A</SelectItem>
                      <SelectItem value="Tòa B">Tòa B</SelectItem>
                      <SelectItem value="Tòa C">Tòa C</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError field="currentBuilding" />
                </div>
                <div className="space-y-2" data-field="currentRoom">
                  <Label>Phòng hiện tại</Label>
                  <Input
                    placeholder="VD: A301"
                    value={formData.currentRoom}
                    onChange={(e) => updateFormData("currentRoom", e.target.value)}
                    className={errors.currentRoom ? "border-destructive" : ""}
                  />
                  <FieldError field="currentRoom" />
                </div>
                <div className="space-y-2">
                  <Label>Số kỳ đã ở</Label>
                  <Select value={String(formData.semestersStayed || "")} onValueChange={(v) => updateFormData("semestersStayed", parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn số kỳ" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n} kỳ</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm text-success flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Sinh viên gia hạn không cần nộp tiền thế chấp 100.000đ cho kỳ tiếp theo.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Personal Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <StepHeader step={1} title="Thông tin cá nhân" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2" data-field="studentId">
                <Label htmlFor="studentId">Mã sinh viên <span className="text-destructive">*</span></Label>
                <Input id="studentId" placeholder="VD: SV240001" value={formData.studentId} onChange={(e) => updateFormData("studentId", e.target.value)} className={errors.studentId ? "border-destructive" : ""} />
                <FieldError field="studentId" />
              </div>
              <div className="space-y-2" data-field="fullName">
                <Label htmlFor="fullName">Họ và tên <span className="text-destructive">*</span></Label>
                <Input id="fullName" placeholder="Nhập họ và tên đầy đủ" value={formData.fullName} onChange={(e) => updateFormData("fullName", e.target.value)} className={errors.fullName ? "border-destructive" : ""} />
                <FieldError field="fullName" />
              </div>
              <div className="space-y-2" data-field="dob">
                <Label htmlFor="dob">Ngày sinh <span className="text-destructive">*</span></Label>
                <Input id="dob" type="date" value={formData.dob} onChange={(e) => updateFormData("dob", e.target.value)} className={errors.dob ? "border-destructive" : ""} />
                <FieldError field="dob" />
              </div>
              <div className="space-y-2" data-field="gender">
                <Label htmlFor="gender">Giới tính <span className="text-destructive">*</span></Label>
                <Select value={formData.gender} onValueChange={(v) => updateFormData("gender", v)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}><SelectValue placeholder="Chọn giới tính" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError field="gender" />
              </div>
              <div className="space-y-2" data-field="cccd">
                <Label htmlFor="cccd">Số CCCD <span className="text-destructive">*</span></Label>
                <Input id="cccd" placeholder="Nhập số CCCD (12 chữ số)" value={formData.cccd} onChange={(e) => updateFormData("cccd", e.target.value)} className={errors.cccd ? "border-destructive" : ""} />
                <FieldError field="cccd" />
              </div>
              <div className="space-y-2" data-field="class">
                <Label htmlFor="class">Lớp <span className="text-destructive">*</span></Label>
                <Input id="class" placeholder="VD: K24-CNTT" value={formData.class} onChange={(e) => updateFormData("class", e.target.value)} className={errors.class ? "border-destructive" : ""} />
                <FieldError field="class" />
              </div>
              <div className="space-y-2" data-field="faculty">
                <Label htmlFor="faculty">Khoa <span className="text-destructive">*</span></Label>
                <Select value={formData.faculty} onValueChange={(v) => updateFormData("faculty", v)}>
                  <SelectTrigger className={errors.faculty ? "border-destructive" : ""}><SelectValue placeholder="Chọn khoa" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNTT">Công nghệ thông tin</SelectItem>
                    <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                    <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                    <SelectItem value="Cơ khí">Cơ khí</SelectItem>
                    <SelectItem value="Điện - Điện tử">Điện - Điện tử</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError field="faculty" />
              </div>
              <div className="space-y-2" data-field="email">
                <Label htmlFor="email">Email sinh viên <span className="text-destructive">*</span></Label>
                <Input id="email" type="email" placeholder="email@student.edu.vn" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} className={errors.email ? "border-destructive" : ""} />
                <FieldError field="email" />
              </div>
              <div className="space-y-2" data-field="phone">
                <Label htmlFor="phone">Số điện thoại <span className="text-destructive">*</span></Label>
                <Input id="phone" placeholder="Nhập số điện thoại" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} className={errors.phone ? "border-destructive" : ""} />
                <FieldError field="phone" />
              </div>
              <div className="space-y-2 md:col-span-2" data-field="address">
                <Label htmlFor="address">Địa chỉ thường trú <span className="text-destructive">*</span></Label>
                <Textarea id="address" placeholder="Nhập địa chỉ thường trú" value={formData.address} onChange={(e) => updateFormData("address", e.target.value)} className={errors.address ? "border-destructive" : ""} />
                <FieldError field="address" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Family Emergency Contact */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <StepHeader step={2} title="Thông tin liên hệ gia đình (khẩn cấp)" icon={Users} />
            <p className="text-sm text-muted-foreground mb-4 -mt-4">
              Thông tin này được sử dụng trong trường hợp khẩn cấp cần liên lạc với gia đình sinh viên.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2" data-field="familyName">
                <Label>Họ tên người thân <span className="text-destructive">*</span></Label>
                <Input placeholder="Nhập họ tên người thân" value={formData.familyName} onChange={(e) => updateFormData("familyName", e.target.value)} className={errors.familyName ? "border-destructive" : ""} />
                <FieldError field="familyName" />
              </div>
              <div className="space-y-2" data-field="familyRelation">
                <Label>Mối quan hệ <span className="text-destructive">*</span></Label>
                <Select value={formData.familyRelation} onValueChange={(v) => updateFormData("familyRelation", v)}>
                  <SelectTrigger className={errors.familyRelation ? "border-destructive" : ""}><SelectValue placeholder="Chọn mối quan hệ" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cha">Cha</SelectItem>
                    <SelectItem value="Mẹ">Mẹ</SelectItem>
                    <SelectItem value="Anh/Chị">Anh/Chị</SelectItem>
                    <SelectItem value="Người giám hộ">Người giám hộ</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError field="familyRelation" />
              </div>
              <div className="space-y-2" data-field="familyPhone">
                <Label className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> Số điện thoại <span className="text-destructive">*</span>
                </Label>
                <Input placeholder="Nhập số điện thoại người thân" value={formData.familyPhone} onChange={(e) => updateFormData("familyPhone", e.target.value)} className={errors.familyPhone ? "border-destructive" : ""} />
                <FieldError field="familyPhone" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Địa chỉ người thân
                </Label>
                <Input placeholder="Nhập địa chỉ người thân (không bắt buộc)" value={formData.familyAddress} onChange={(e) => updateFormData("familyAddress", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Upload documents */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <StepHeader step={3} title="Tải lên hồ sơ minh chứng" />

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

        {/* Step 4: Room preferences */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <StepHeader step={4} title={formData.isExtension ? "Nguyện vọng phòng kỳ tiếp theo" : "Chọn phòng ở"} />

            <div className="space-y-6">
              {/* Building */}
              <div className="space-y-2" data-field="building">
                <Label>Bước 1: Chọn tòa nhà <span className="text-destructive">*</span></Label>
                <Select value={formData.building} onValueChange={(v) => { updateFormData("building", v); updateFormData("selectedRoom", ""); }}>
                  <SelectTrigger><SelectValue placeholder="Chọn tòa nhà" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tòa A">Tòa A</SelectItem>
                    <SelectItem value="Tòa B">Tòa B</SelectItem>
                    <SelectItem value="Tòa C">Tòa C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Room type */}
              <div className="space-y-3" data-field="roomType">
                <Label>Bước 2: Chọn loại phòng <span className="text-destructive">*</span></Label>
                <RadioGroup value={formData.roomType} onValueChange={(v) => { updateFormData("roomType", v); updateFormData("selectedRoom", ""); }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: "4", label: "Phòng 4 người", price: "600.000đ/tháng" },
                      { value: "6", label: "Phòng 6 người", price: "450.000đ/tháng" },
                      { value: "8", label: "Phòng 8 người", price: "350.000đ/tháng" },
                    ].map((room) => (
                      <div key={room.value} className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${formData.roomType === room.value ? "border-primary bg-primary/5" : ""}`}>
                        <RadioGroupItem value={room.value} id={`room-${room.value}`} />
                        <Label htmlFor={`room-${room.value}`} className="cursor-pointer flex-1">
                          <div className="font-medium">{room.label}</div>
                          <div className="text-sm text-muted-foreground">{room.price}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                <FieldError field="roomType" />
              </div>

              {/* Available rooms (realtime) */}
              <div className="space-y-3" data-field="selectedRoom">
                <Label>Bước 3: Chọn phòng còn trống <span className="text-destructive">*</span></Label>
                <AvailableRoomsPicker
                  building={formData.building}
                  roomType={formData.roomType}
                  selected={formData.selectedRoom}
                  onSelect={(r) => updateFormData("selectedRoom", r)}
                />
                <FieldError field="selectedRoom" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Priority docs (optional) */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <StepHeader step={5} title="Minh chứng ưu tiên (nếu có)" />
            <p className="text-sm text-muted-foreground mb-4 -mt-4">
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
          <Button onClick={handleSubmit} className="gap-2">
            {formData.isExtension ? "Gửi gia hạn" : "Gửi đăng ký"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
