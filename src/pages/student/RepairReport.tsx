import { useState } from "react";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Upload, Wrench, Calendar, Clock } from "lucide-react";

const repairHistory = [
  {
    id: 1,
    type: "Điện",
    description: "Ổ cắm điện bị hỏng, không sử dụng được",
    date: "10/01/2024",
    status: "processing" as const,
  },
  {
    id: 2,
    type: "Nước",
    description: "Vòi nước lavabo bị rò rỉ",
    date: "28/12/2023",
    status: "completed" as const,
  },
  {
    id: 3,
    type: "Quạt",
    description: "Quạt trần không hoạt động",
    date: "15/12/2023",
    status: "completed" as const,
  },
];

const issueTypes = [
  { value: "dien", label: "Điện" },
  { value: "nuoc", label: "Nước" },
  { value: "giuong", label: "Giường" },
  { value: "quat", label: "Quạt" },
  { value: "khac", label: "Khác" },
];

export default function RepairReport() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <StudentSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Báo cáo sửa chữa
          </h1>
          <p className="text-muted-foreground mt-1">
            Gửi yêu cầu sửa chữa cơ sở vật chất trong ký túc xá
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Gửi yêu cầu mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Loại sự cố</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại sự cố" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả chi tiết</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả cụ thể vấn đề bạn gặp phải..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hình ảnh đính kèm</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Kéo thả hoặc click để chọn ảnh
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tối đa 3 ảnh, mỗi ảnh không quá 5MB
                    </p>
                    <Input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Gửi yêu cầu
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Repair History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Lịch sử yêu cầu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {repairHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {item.type}
                        </span>
                        <StatusBadge status={item.status} />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentSidebar>
  );
}
