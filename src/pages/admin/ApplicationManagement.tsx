import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Check,
  X,
  Wand2,
  Eye,
  FileText,
  Star,
  Camera,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
} from "lucide-react";

// Mock face images using placeholder
const mockFaceImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
];

const applications = [
  {
    id: 1,
    studentId: "SV240001",
    name: "Nguyễn Văn An",
    email: "an.nv@student.edu.vn",
    phone: "0912345678",
    faculty: "CNTT",
    class: "K24-CNTT1",
    priority: 85,
    roomType: "8 người",
    building: "Tòa A",
    status: "pending" as const,
    submittedAt: "15/07/2024",
    faceImage: mockFaceImages[0],
  },
  {
    id: 2,
    studentId: "SV240002",
    name: "Trần Thị Bình",
    email: "binh.tt@student.edu.vn",
    phone: "0923456789",
    faculty: "Kinh tế",
    class: "K24-KT2",
    priority: 78,
    roomType: "6 người",
    building: "Tòa B",
    status: "pending" as const,
    submittedAt: "14/07/2024",
    faceImage: mockFaceImages[1],
  },
  {
    id: 3,
    studentId: "SV240003",
    name: "Lê Văn Cường",
    email: "cuong.lv@student.edu.vn",
    phone: "0934567890",
    faculty: "Cơ khí",
    class: "K24-CK1",
    priority: 92,
    roomType: "8 người",
    building: "Tòa A",
    status: "approved" as const,
    submittedAt: "13/07/2024",
    faceImage: mockFaceImages[2],
  },
  {
    id: 4,
    studentId: "SV240004",
    name: "Phạm Thị Dung",
    email: "dung.pt@student.edu.vn",
    phone: "0945678901",
    faculty: "Ngoại ngữ",
    class: "K24-NN1",
    priority: 65,
    roomType: "4 người",
    building: "Tòa C",
    status: "rejected" as const,
    submittedAt: "12/07/2024",
    faceImage: mockFaceImages[3],
  },
  {
    id: 5,
    studentId: "SV240005",
    name: "Hoàng Văn Em",
    email: "em.hv@student.edu.vn",
    phone: "0956789012",
    faculty: "Điện - Điện tử",
    class: "K24-DDT1",
    priority: 88,
    roomType: "8 người",
    building: "Tòa A",
    status: "pending" as const,
    submittedAt: "11/07/2024",
    faceImage: mockFaceImages[4],
  },
];

export default function ApplicationManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<(typeof applications)[0] | null>(null);
  const [showAutoAssign, setShowAutoAssign] = useState(false);

  const filteredApps = applications.filter((app) => {
    const matchSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Quản lý hồ sơ & Phân phòng
            </h1>
            <p className="text-muted-foreground mt-1">
              Duyệt hồ sơ đăng ký và phân phòng cho sinh viên
            </p>
          </div>
          <Button onClick={() => setShowAutoAssign(true)}>
            <Wand2 className="h-4 w-4 mr-2" />
            Phân phòng tự động
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc MSSV..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Danh sách hồ sơ ({filteredApps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Ảnh
                      </div>
                    </TableHead>
                    <TableHead>MSSV</TableHead>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Khoa</TableHead>
                    <TableHead>Phòng / Khu</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Điểm UT
                      </div>
                    </TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={app.faceImage} alt={app.name} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{app.studentId}</TableCell>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.faculty}</TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {app.roomType} - {app.building}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            app.priority >= 80
                              ? "text-success"
                              : app.priority >= 60
                              ? "text-warning"
                              : "text-destructive"
                          }`}
                        >
                          {app.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedApp(app)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {app.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-success hover:text-success"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Application Detail Dialog */}
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Chi tiết hồ sơ đăng ký KTX</DialogTitle>
              <DialogDescription>
                Thông tin đầy đủ và ảnh xác thực khuôn mặt của sinh viên
              </DialogDescription>
            </DialogHeader>
            {selectedApp && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Face Image */}
                <div className="md:col-span-1">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                    <img
                      src={selectedApp.faceImage}
                      alt={selectedApp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm">
                      <Camera className="h-4 w-4" />
                      <span>Ảnh AI Capture</span>
                    </div>
                  </div>
                </div>

                {/* Student Info */}
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Họ và tên</p>
                        <p className="font-medium">{selectedApp.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">MSSV</p>
                        <p className="font-medium">{selectedApp.studentId}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedApp.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Số điện thoại</p>
                        <p className="font-medium">{selectedApp.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Khoa - Lớp</p>
                        <p className="font-medium">{selectedApp.faculty} - {selectedApp.class}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Điểm ưu tiên</p>
                        <p className="font-medium">{selectedApp.priority}/100</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Nguyện vọng</p>
                        <p className="font-medium">{selectedApp.roomType} - {selectedApp.building}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Ngày nộp</p>
                        <p className="font-medium">{selectedApp.submittedAt}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Trạng thái hồ sơ</p>
                    <StatusBadge status={selectedApp.status} />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Đóng
              </Button>
              {selectedApp?.status === "pending" && (
                <>
                  <Button variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Từ chối
                  </Button>
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Duyệt hồ sơ
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Auto Assign Dialog */}
        <Dialog open={showAutoAssign} onOpenChange={setShowAutoAssign}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Phân phòng tự động</DialogTitle>
              <DialogDescription>
                Hệ thống sẽ tự động phân phòng dựa trên điểm ưu tiên và nguyện vọng
                của sinh viên
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm">
                  <strong>Lưu ý:</strong> Quá trình này sẽ phân phòng cho tất cả hồ
                  sơ đã được duyệt nhưng chưa có phòng.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAutoAssign(false)}>
                Hủy
              </Button>
              <Button onClick={() => setShowAutoAssign(false)}>
                <Wand2 className="h-4 w-4 mr-2" />
                Bắt đầu phân phòng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminSidebar>
  );
}
