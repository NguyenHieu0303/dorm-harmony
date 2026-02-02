import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

const applications = [
  {
    id: 1,
    studentId: "SV240001",
    name: "Nguyễn Văn An",
    email: "an.nv@student.edu.vn",
    faculty: "CNTT",
    priority: 85,
    roomType: "8 người",
    status: "pending" as const,
    submittedAt: "15/07/2024",
  },
  {
    id: 2,
    studentId: "SV240002",
    name: "Trần Thị Bình",
    email: "binh.tt@student.edu.vn",
    faculty: "Kinh tế",
    priority: 78,
    roomType: "6 người",
    status: "pending" as const,
    submittedAt: "14/07/2024",
  },
  {
    id: 3,
    studentId: "SV240003",
    name: "Lê Văn Cường",
    email: "cuong.lv@student.edu.vn",
    faculty: "Cơ khí",
    priority: 92,
    roomType: "8 người",
    status: "approved" as const,
    submittedAt: "13/07/2024",
  },
  {
    id: 4,
    studentId: "SV240004",
    name: "Phạm Thị Dung",
    email: "dung.pt@student.edu.vn",
    faculty: "Ngoại ngữ",
    priority: 65,
    roomType: "4 người",
    status: "rejected" as const,
    submittedAt: "12/07/2024",
  },
  {
    id: 5,
    studentId: "SV240005",
    name: "Hoàng Văn Em",
    email: "em.hv@student.edu.vn",
    faculty: "Điện - Điện tử",
    priority: 88,
    roomType: "8 người",
    status: "pending" as const,
    submittedAt: "11/07/2024",
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
                    <TableHead>MSSV</TableHead>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Khoa</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Điểm UT
                      </div>
                    </TableHead>
                    <TableHead>Loại phòng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày nộp</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.studentId}</TableCell>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.faculty}</TableCell>
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
                      <TableCell>{app.roomType}</TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell>{app.submittedAt}</TableCell>
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết hồ sơ</DialogTitle>
              <DialogDescription>
                Thông tin đầy đủ về hồ sơ đăng ký ký túc xá
              </DialogDescription>
            </DialogHeader>
            {selectedApp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">MSSV</p>
                  <p className="font-medium">{selectedApp.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Họ tên</p>
                  <p className="font-medium">{selectedApp.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Khoa</p>
                  <p className="font-medium">{selectedApp.faculty}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Điểm ưu tiên</p>
                  <p className="font-medium">{selectedApp.priority}/100</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loại phòng</p>
                  <p className="font-medium">{selectedApp.roomType}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Đóng
              </Button>
              {selectedApp?.status === "pending" && (
                <>
                  <Button variant="destructive">Từ chối</Button>
                  <Button>Duyệt hồ sơ</Button>
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
