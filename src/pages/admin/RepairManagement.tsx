import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const repairRequests = [
  {
    id: 1,
    room: "A305",
    building: "Tòa A",
    type: "Điện",
    description: "Ổ cắm điện bị hỏng, không sử dụng được",
    reporter: "Nguyễn Văn A",
    priority: "high",
    status: "pending" as const,
    createdAt: "10/01/2024",
    image: null,
  },
  {
    id: 2,
    room: "B201",
    building: "Tòa B",
    type: "Nước",
    description: "Vòi nước lavabo bị rò rỉ, nước chảy liên tục",
    reporter: "Trần Thị B",
    priority: "medium",
    status: "processing" as const,
    createdAt: "09/01/2024",
    image: null,
  },
  {
    id: 3,
    room: "C102",
    building: "Tòa C",
    type: "Quạt",
    description: "Quạt trần không hoạt động, đã thử bật nhiều lần",
    reporter: "Lê Văn C",
    priority: "low",
    status: "completed" as const,
    createdAt: "08/01/2024",
    image: null,
  },
  {
    id: 4,
    room: "A410",
    building: "Tòa A",
    type: "Giường",
    description: "Giường tầng bị lung lay, có tiếng kêu khi nằm",
    reporter: "Phạm Thị D",
    priority: "high",
    status: "pending" as const,
    createdAt: "08/01/2024",
    image: null,
  },
  {
    id: 5,
    room: "B315",
    building: "Tòa B",
    type: "Điện",
    description: "Đèn trong phòng nhấp nháy liên tục",
    reporter: "Hoàng Văn E",
    priority: "medium",
    status: "processing" as const,
    createdAt: "07/01/2024",
    image: null,
  },
];

const priorityConfig = {
  high: { label: "Cao", className: "bg-destructive/15 text-destructive" },
  medium: { label: "Trung bình", className: "bg-warning/15 text-warning" },
  low: { label: "Thấp", className: "bg-muted text-muted-foreground" },
};

export default function RepairManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<(typeof repairRequests)[0] | null>(null);
  const [note, setNote] = useState("");

  const filteredRequests = repairRequests.filter((req) => {
    const matchSearch =
      req.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || req.status === statusFilter;
    const matchPriority = priorityFilter === "all" || req.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Quản lý yêu cầu sửa chữa
          </h1>
          <p className="text-muted-foreground mt-1">
            Tiếp nhận và xử lý yêu cầu sửa chữa từ sinh viên
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Chờ tiếp nhận</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Đang xử lý</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Đã hoàn thành</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">168</p>
                <p className="text-xs text-muted-foreground">Tổng yêu cầu</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo phòng hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ tiếp nhận</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="low">Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Request Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredRequests.map((request) => (
            <Card
              key={request.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setSelectedRequest(request)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{request.room}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.building}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        priorityConfig[request.priority as keyof typeof priorityConfig].className
                      )}
                    >
                      {priorityConfig[request.priority as keyof typeof priorityConfig].label}
                    </span>
                    <StatusBadge status={request.status} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-muted text-xs">
                      {request.type}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {request.createdAt}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">
                    {request.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Báo cáo bởi: {request.reporter}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Request Detail Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết yêu cầu sửa chữa</DialogTitle>
              <DialogDescription>
                Xem và cập nhật trạng thái xử lý
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phòng</p>
                    <p className="font-medium">
                      {selectedRequest.room} - {selectedRequest.building}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loại sự cố</p>
                    <p className="font-medium">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Người báo cáo</p>
                    <p className="font-medium">{selectedRequest.reporter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày tạo</p>
                    <p className="font-medium">{selectedRequest.createdAt}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mô tả</p>
                  <p className="p-3 rounded-lg bg-muted/50">
                    {selectedRequest.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-update">Cập nhật trạng thái</Label>
                  <Select defaultValue={selectedRequest.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ tiếp nhận</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Ghi chú xử lý
                  </Label>
                  <Textarea
                    id="note"
                    placeholder="Thêm ghi chú về tiến độ xử lý..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                Hủy
              </Button>
              <Button onClick={() => setSelectedRequest(null)}>
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminSidebar>
  );
}
