import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Zap,
  Droplets,
  Wallet,
  Check,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingRecord {
  id: number;
  roomNumber: string;
  building: string;
  month: string;
  electricityUsage: number;
  electricityAmount: number;
  waterUsage: number;
  waterAmount: number;
  totalAmount: number;
  status: "pending" | "approved" | "rejected";
  paidAt?: string;
}

interface DepositRecord {
  id: number;
  studentId: string;
  studentName: string;
  roomNumber: string;
  semester: string;
  depositAmount: number;
  status: "active" | "refunded" | "extended";
  createdAt: string;
  refundedAt?: string;
}

const billingRecords: BillingRecord[] = [
  {
    id: 1,
    roomNumber: "A101",
    building: "Tòa A",
    month: "01/2024",
    electricityUsage: 120,
    electricityAmount: 360000,
    waterUsage: 15,
    waterAmount: 150000,
    totalAmount: 510000,
    status: "approved",
    paidAt: "15/01/2024",
  },
  {
    id: 2,
    roomNumber: "A102",
    building: "Tòa A",
    month: "01/2024",
    electricityUsage: 95,
    electricityAmount: 285000,
    waterUsage: 12,
    waterAmount: 120000,
    totalAmount: 405000,
    status: "pending",
  },
  {
    id: 3,
    roomNumber: "A201",
    building: "Tòa A",
    month: "01/2024",
    electricityUsage: 85,
    electricityAmount: 255000,
    waterUsage: 10,
    waterAmount: 100000,
    totalAmount: 355000,
    status: "approved",
    paidAt: "12/01/2024",
  },
  {
    id: 4,
    roomNumber: "B101",
    building: "Tòa B",
    month: "01/2024",
    electricityUsage: 45,
    electricityAmount: 135000,
    waterUsage: 6,
    waterAmount: 60000,
    totalAmount: 195000,
    status: "pending",
  },
  {
    id: 5,
    roomNumber: "B102",
    building: "Tòa B",
    month: "01/2024",
    electricityUsage: 0,
    electricityAmount: 0,
    waterUsage: 0,
    waterAmount: 0,
    totalAmount: 0,
    status: "approved",
  },
];

const depositRecords: DepositRecord[] = [
  {
    id: 1,
    studentId: "SV240001",
    studentName: "Nguyễn Văn An",
    roomNumber: "A101",
    semester: "HK1 2024-2025",
    depositAmount: 100000,
    status: "active",
    createdAt: "01/09/2024",
  },
  {
    id: 2,
    studentId: "SV240002",
    studentName: "Trần Thị Bình",
    roomNumber: "A101",
    semester: "HK1 2024-2025",
    depositAmount: 100000,
    status: "extended",
    createdAt: "01/09/2024",
  },
  {
    id: 3,
    studentId: "SV240003",
    studentName: "Lê Văn Cường",
    roomNumber: "A102",
    semester: "HK1 2023-2024",
    depositAmount: 100000,
    status: "refunded",
    createdAt: "01/09/2023",
    refundedAt: "30/06/2024",
  },
  {
    id: 4,
    studentId: "SV240004",
    studentName: "Phạm Thị Dung",
    roomNumber: "B101",
    semester: "HK1 2024-2025",
    depositAmount: 100000,
    status: "active",
    createdAt: "01/09/2024",
  },
];

const depositStatusConfig = {
  active: {
    label: "Đang giữ",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  refunded: {
    label: "Đã hoàn trả",
    className: "bg-success/15 text-success border-success/30",
  },
  extended: {
    label: "Gia hạn",
    className: "bg-secondary/15 text-secondary border-secondary/30",
  },
};

export default function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBilling, setSelectedBilling] = useState<BillingRecord | null>(null);
  const [selectedDeposit, setSelectedDeposit] = useState<DepositRecord | null>(null);

  const filteredBilling = billingRecords.filter((record) => {
    const matchSearch = record.roomNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || record.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const billingStats = {
    totalRooms: billingRecords.length,
    paid: billingRecords.filter((r) => r.status === "approved").length,
    pending: billingRecords.filter((r) => r.status === "pending").length,
    totalAmount: billingRecords.reduce((acc, r) => acc + r.totalAmount, 0),
    collectedAmount: billingRecords
      .filter((r) => r.status === "approved")
      .reduce((acc, r) => acc + r.totalAmount, 0),
  };

  const depositStats = {
    totalDeposits: depositRecords.length,
    active: depositRecords.filter((r) => r.status === "active").length,
    extended: depositRecords.filter((r) => r.status === "extended").length,
    refunded: depositRecords.filter((r) => r.status === "refunded").length,
    activeAmount: depositRecords
      .filter((r) => r.status === "active" || r.status === "extended")
      .reduce((acc, r) => acc + r.depositAmount, 0),
  };

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Quản lý tiền điện nước & Thế chấp
          </h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi thanh toán tiền điện, nước và tiền thế chấp của sinh viên
          </p>
        </div>

        <Tabs defaultValue="billing" className="space-y-6">
          <TabsList>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Tiền điện nước
            </TabsTrigger>
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Tiền thế chấp
            </TabsTrigger>
          </TabsList>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{billingStats.totalRooms}</p>
                    <p className="text-xs text-muted-foreground">Tổng phòng</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Check className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{billingStats.paid}</p>
                    <p className="text-xs text-muted-foreground">Đã thanh toán</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Droplets className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{billingStats.pending}</p>
                    <p className="text-xs text-muted-foreground">Chưa nộp</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <ArrowUpRight className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">
                      {(billingStats.collectedAmount / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-muted-foreground">Đã thu</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">
                      {(billingStats.totalAmount / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-muted-foreground">Tổng cộng</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <Card>
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="pending">Chưa nộp</SelectItem>
                      <SelectItem value="approved">Đã thanh toán</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Billing Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Bảng kê tiền điện nước tháng 01/2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Tòa</TableHead>
                        <TableHead>Điện (kWh)</TableHead>
                        <TableHead>Tiền điện</TableHead>
                        <TableHead>Nước (m³)</TableHead>
                        <TableHead>Tiền nước</TableHead>
                        <TableHead>Tổng cộng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBilling.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            {record.roomNumber}
                          </TableCell>
                          <TableCell>{record.building}</TableCell>
                          <TableCell>{record.electricityUsage}</TableCell>
                          <TableCell>
                            {record.electricityAmount.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell>{record.waterUsage}</TableCell>
                          <TableCell>
                            {record.waterAmount.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell className="font-semibold">
                            {record.totalAmount.toLocaleString("vi-VN")}đ
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              status={
                                record.status === "approved"
                                  ? "completed"
                                  : "pending"
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedBilling(record)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {record.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-success hover:text-success"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
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
          </TabsContent>

          {/* Deposit Tab */}
          <TabsContent value="deposit" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{depositStats.totalDeposits}</p>
                    <p className="text-xs text-muted-foreground">Tổng số</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ArrowDownLeft className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{depositStats.active}</p>
                    <p className="text-xs text-muted-foreground">Đang giữ</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <RefreshCw className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{depositStats.extended}</p>
                    <p className="text-xs text-muted-foreground">Gia hạn</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{depositStats.refunded}</p>
                    <p className="text-xs text-muted-foreground">Đã hoàn trả</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Wallet className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">
                      {depositStats.activeAmount.toLocaleString("vi-VN")}đ
                    </p>
                    <p className="text-xs text-muted-foreground">Đang giữ</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Info Card */}
            <Card className="bg-accent/30 border-accent">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Wallet className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      Quy định tiền thế chấp
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mỗi sinh viên nộp <strong>100.000đ</strong> tiền thế chấp khi
                      đăng ký ở KTX lần đầu. Nếu sinh viên <strong>gia hạn</strong>{" "}
                      ở kỳ tiếp theo thì không cần nộp lại. Khi sinh viên{" "}
                      <strong>không ở nữa</strong>, tiền thế chấp sẽ được hoàn trả.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Danh sách tiền thế chấp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>MSSV</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Học kỳ</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Ngày nộp</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {depositRecords.map((record) => {
                        const config = depositStatusConfig[record.status];
                        return (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">
                              {record.studentId}
                            </TableCell>
                            <TableCell>{record.studentName}</TableCell>
                            <TableCell>{record.roomNumber}</TableCell>
                            <TableCell>{record.semester}</TableCell>
                            <TableCell>
                              {record.depositAmount.toLocaleString("vi-VN")}đ
                            </TableCell>
                            <TableCell>{record.createdAt}</TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                                  config.className
                                )}
                              >
                                {config.label}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedDeposit(record)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {record.status === "active" && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-secondary hover:text-secondary"
                                      title="Gia hạn"
                                    >
                                      <RefreshCw className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-success hover:text-success"
                                      title="Hoàn trả"
                                    >
                                      <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Billing Detail Dialog */}
        <Dialog
          open={!!selectedBilling}
          onOpenChange={() => setSelectedBilling(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Chi tiết hóa đơn phòng {selectedBilling?.roomNumber}
              </DialogTitle>
              <DialogDescription>
                Tháng {selectedBilling?.month}
              </DialogDescription>
            </DialogHeader>
            {selectedBilling && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-warning" />
                      <span className="text-sm text-muted-foreground">
                        Tiền điện
                      </span>
                    </div>
                    <p className="text-lg font-semibold">
                      {selectedBilling.electricityUsage} kWh
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBilling.electricityAmount.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Tiền nước
                      </span>
                    </div>
                    <p className="text-lg font-semibold">
                      {selectedBilling.waterUsage} m³
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedBilling.waterAmount.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Tổng cộng</span>
                    <span className="text-xl font-bold text-primary">
                      {selectedBilling.totalAmount.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
                {selectedBilling.paidAt && (
                  <p className="text-sm text-muted-foreground text-center">
                    Đã thanh toán ngày {selectedBilling.paidAt}
                  </p>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedBilling(null)}>
                Đóng
              </Button>
              {selectedBilling?.status === "pending" && (
                <Button>
                  <Check className="h-4 w-4 mr-2" />
                  Xác nhận thanh toán
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Deposit Detail Dialog */}
        <Dialog
          open={!!selectedDeposit}
          onOpenChange={() => setSelectedDeposit(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chi tiết tiền thế chấp</DialogTitle>
              <DialogDescription>
                {selectedDeposit?.studentName} - {selectedDeposit?.studentId}
              </DialogDescription>
            </DialogHeader>
            {selectedDeposit && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phòng</p>
                    <p className="font-medium">{selectedDeposit.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Học kỳ</p>
                    <p className="font-medium">{selectedDeposit.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Số tiền</p>
                    <p className="font-medium">
                      {selectedDeposit.depositAmount.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày nộp</p>
                    <p className="font-medium">{selectedDeposit.createdAt}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Trạng thái</p>
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
                      depositStatusConfig[selectedDeposit.status].className
                    )}
                  >
                    {depositStatusConfig[selectedDeposit.status].label}
                  </span>
                </div>
                {selectedDeposit.refundedAt && (
                  <p className="text-sm text-muted-foreground">
                    Đã hoàn trả ngày {selectedDeposit.refundedAt}
                  </p>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedDeposit(null)}>
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminSidebar>
  );
}
