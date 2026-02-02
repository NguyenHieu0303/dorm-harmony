import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Zap, CreditCard, TrendingDown, Eye } from "lucide-react";

const electricityData = [
  {
    month: "01/2024",
    consumption: 45,
    amount: 125000,
    status: "pending" as const,
  },
  {
    month: "12/2023",
    consumption: 52,
    amount: 145000,
    status: "approved" as const,
  },
  {
    month: "11/2023",
    consumption: 38,
    amount: 105000,
    status: "approved" as const,
  },
  {
    month: "10/2023",
    consumption: 41,
    amount: 115000,
    status: "approved" as const,
  },
  {
    month: "09/2023",
    consumption: 35,
    amount: 95000,
    status: "approved" as const,
  },
];

export default function Electricity() {
  return (
    <StudentSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Quản lý tiền điện
          </h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi và thanh toán tiền điện phòng ký túc xá
          </p>
        </div>

        {/* Current Month Highlight */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-primary p-6 text-primary-foreground">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">
                  Tiền điện tháng 01/2024
                </p>
                <h2 className="text-4xl font-bold mt-1">125.000đ</h2>
                <p className="text-primary-foreground/80 mt-2">
                  Phòng A305 • 45 kWh tiêu thụ
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <StatusBadge status="pending" className="self-start md:self-end" />
                <p className="text-sm text-primary-foreground/80">
                  Hạn nộp: 25/01/2024
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-4 flex gap-3">
            <Button className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Thanh toán ngay
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Chi tiết
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Tiêu thụ tháng này"
            value="45 kWh"
            icon={Zap}
            trend={{ value: 13, isPositive: false }}
          />
          <StatCard
            title="Trung bình 6 tháng"
            value="42 kWh"
            icon={TrendingDown}
          />
          <StatCard
            title="Tổng đã thanh toán"
            value="460.000đ"
            icon={CreditCard}
            description="Từ tháng 09/2023"
          />
        </div>

        {/* History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử tiền điện</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tháng</TableHead>
                  <TableHead>Số điện (kWh)</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {electricityData.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell>{item.consumption} kWh</TableCell>
                    <TableCell>
                      {item.amount.toLocaleString("vi-VN")}đ
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={item.status === "approved" ? "completed" : "pending"}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </StudentSidebar>
  );
}
