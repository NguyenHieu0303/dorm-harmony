import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Home,
  Users,
  DoorOpen,
  DoorClosed,
  Eye,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Room {
  id: number;
  roomNumber: string;
  building: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  pricePerMonth: number;
  status: "available" | "full" | "maintenance";
  students: { name: string; studentId: string }[];
}

const rooms: Room[] = [
  {
    id: 1,
    roomNumber: "A101",
    building: "Tòa A",
    floor: 1,
    capacity: 8,
    currentOccupancy: 8,
    pricePerMonth: 350000,
    status: "full",
    students: [
      { name: "Nguyễn Văn An", studentId: "SV240001" },
      { name: "Trần Văn Bình", studentId: "SV240002" },
      { name: "Lê Văn Cường", studentId: "SV240003" },
      { name: "Phạm Văn Dũng", studentId: "SV240004" },
      { name: "Hoàng Văn Em", studentId: "SV240005" },
      { name: "Ngô Văn Phúc", studentId: "SV240006" },
      { name: "Đỗ Văn Giang", studentId: "SV240007" },
      { name: "Vũ Văn Hải", studentId: "SV240008" },
    ],
  },
  {
    id: 2,
    roomNumber: "A102",
    building: "Tòa A",
    floor: 1,
    capacity: 8,
    currentOccupancy: 6,
    pricePerMonth: 350000,
    status: "available",
    students: [
      { name: "Nguyễn Thị Hoa", studentId: "SV240009" },
      { name: "Trần Thị Lan", studentId: "SV240010" },
      { name: "Lê Thị Mai", studentId: "SV240011" },
      { name: "Phạm Thị Nga", studentId: "SV240012" },
      { name: "Hoàng Thị Oanh", studentId: "SV240013" },
      { name: "Ngô Thị Phương", studentId: "SV240014" },
    ],
  },
  {
    id: 3,
    roomNumber: "A201",
    building: "Tòa A",
    floor: 2,
    capacity: 6,
    currentOccupancy: 6,
    pricePerMonth: 450000,
    status: "full",
    students: [
      { name: "Đặng Văn Quang", studentId: "SV240015" },
      { name: "Bùi Văn Sơn", studentId: "SV240016" },
      { name: "Lý Văn Tâm", studentId: "SV240017" },
      { name: "Cao Văn Uy", studentId: "SV240018" },
      { name: "Đinh Văn Vinh", studentId: "SV240019" },
      { name: "Hồ Văn Xuân", studentId: "SV240020" },
    ],
  },
  {
    id: 4,
    roomNumber: "B101",
    building: "Tòa B",
    floor: 1,
    capacity: 4,
    currentOccupancy: 2,
    pricePerMonth: 600000,
    status: "available",
    students: [
      { name: "Nguyễn Văn Yến", studentId: "SV240021" },
      { name: "Trần Văn Zũng", studentId: "SV240022" },
    ],
  },
  {
    id: 5,
    roomNumber: "B102",
    building: "Tòa B",
    floor: 1,
    capacity: 4,
    currentOccupancy: 0,
    pricePerMonth: 600000,
    status: "available",
    students: [],
  },
  {
    id: 6,
    roomNumber: "C301",
    building: "Tòa C",
    floor: 3,
    capacity: 8,
    currentOccupancy: 0,
    pricePerMonth: 350000,
    status: "maintenance",
    students: [],
  },
];

const statusConfig = {
  available: {
    label: "Còn chỗ",
    className: "bg-success/15 text-success border-success/30",
    icon: DoorOpen,
  },
  full: {
    label: "Đã đầy",
    className: "bg-destructive/15 text-destructive border-destructive/30",
    icon: DoorClosed,
  },
  maintenance: {
    label: "Đang sửa",
    className: "bg-warning/15 text-warning border-warning/30",
    icon: Home,
  },
};

export default function RoomManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms = rooms.filter((room) => {
    const matchSearch = room.roomNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchBuilding =
      buildingFilter === "all" || room.building === buildingFilter;
    const matchStatus = statusFilter === "all" || room.status === statusFilter;
    return matchSearch && matchBuilding && matchStatus;
  });

  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === "available").length,
    full: rooms.filter((r) => r.status === "full").length,
    maintenance: rooms.filter((r) => r.status === "maintenance").length,
    totalBeds: rooms.reduce((acc, r) => acc + r.capacity, 0),
    occupiedBeds: rooms.reduce((acc, r) => acc + r.currentOccupancy, 0),
  };

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Quản lý phòng</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi tình trạng phòng và số lượng sinh viên
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Tổng phòng</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <DoorOpen className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.available}</p>
                <p className="text-xs text-muted-foreground">Còn chỗ</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <DoorClosed className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.full}</p>
                <p className="text-xs text-muted-foreground">Đã đầy</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Home className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.maintenance}</p>
                <p className="text-xs text-muted-foreground">Đang sửa</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.occupiedBeds}</p>
                <p className="text-xs text-muted-foreground">Đang ở</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalBeds}</p>
                <p className="text-xs text-muted-foreground">Tổng chỗ</p>
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
                  placeholder="Tìm theo số phòng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={buildingFilter} onValueChange={setBuildingFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tòa nhà" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả tòa</SelectItem>
                  <SelectItem value="Tòa A">Tòa A</SelectItem>
                  <SelectItem value="Tòa B">Tòa B</SelectItem>
                  <SelectItem value="Tòa C">Tòa C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="available">Còn chỗ</SelectItem>
                  <SelectItem value="full">Đã đầy</SelectItem>
                  <SelectItem value="maintenance">Đang sửa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Room Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              Danh sách phòng ({filteredRooms.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phòng</TableHead>
                    <TableHead>Tòa nhà</TableHead>
                    <TableHead>Tầng</TableHead>
                    <TableHead>Sức chứa</TableHead>
                    <TableHead>Đang ở</TableHead>
                    <TableHead>Giá/tháng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => {
                    const config = statusConfig[room.status];
                    const StatusIcon = config.icon;
                    return (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">
                          {room.roomNumber}
                        </TableCell>
                        <TableCell>{room.building}</TableCell>
                        <TableCell>{room.floor}</TableCell>
                        <TableCell>{room.capacity} người</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "font-semibold",
                              room.currentOccupancy === room.capacity
                                ? "text-destructive"
                                : room.currentOccupancy > 0
                                ? "text-warning"
                                : "text-muted-foreground"
                            )}
                          >
                            {room.currentOccupancy}/{room.capacity}
                          </span>
                        </TableCell>
                        <TableCell>
                          {room.pricePerMonth.toLocaleString("vi-VN")}đ
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
                              config.className
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedRoom(room)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Room Detail Dialog */}
        <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi tiết phòng {selectedRoom?.roomNumber}</DialogTitle>
              <DialogDescription>
                {selectedRoom?.building} - Tầng {selectedRoom?.floor}
              </DialogDescription>
            </DialogHeader>
            {selectedRoom && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sức chứa</p>
                    <p className="font-medium">{selectedRoom.capacity} người</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Đang ở</p>
                    <p className="font-medium">
                      {selectedRoom.currentOccupancy} người
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Giá phòng</p>
                    <p className="font-medium">
                      {selectedRoom.pricePerMonth.toLocaleString("vi-VN")}đ/tháng
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border mt-1",
                        statusConfig[selectedRoom.status].className
                      )}
                    >
                      {statusConfig[selectedRoom.status].label}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Danh sách sinh viên ({selectedRoom.students.length})
                  </p>
                  {selectedRoom.students.length > 0 ? (
                    <div className="border rounded-lg divide-y">
                      {selectedRoom.students.map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {student.studentId}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Chưa có sinh viên nào trong phòng
                    </p>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminSidebar>
  );
}
