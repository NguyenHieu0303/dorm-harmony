import { useState } from "react";
import { Camera, QrCode, CheckCircle, XCircle, Clock, Calendar, History } from "lucide-react";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const attendanceHistory = [
  { id: 1, date: "20/01/2024", time: "22:15", method: "Khuôn mặt", status: "completed" },
  { id: 2, date: "19/01/2024", time: "21:45", method: "QR Code", status: "completed" },
  { id: 3, date: "18/01/2024", time: "23:30", method: "Khuôn mặt", status: "completed" },
  { id: 4, date: "17/01/2024", time: "-", method: "-", status: "rejected" },
  { id: 5, date: "16/01/2024", time: "22:00", method: "Khuôn mặt", status: "completed" },
];

export default function Attendance() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null);
  const todayCheckedIn = true;
  const checkInTime = "22:15";

  const handleFaceRecognition = () => {
    setIsScanning(true);
    setScanResult(null);
    // Simulate face recognition
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("success");
    }, 2000);
  };

  const handleQRScan = () => {
    setIsScanning(true);
    setScanResult(null);
    // Simulate QR scan
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("success");
    }, 2000);
  };

  return (
    <StudentSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Điểm danh KTX</h1>
          <p className="text-muted-foreground mt-1">
            Thực hiện điểm danh hàng ngày bằng nhận diện khuôn mặt hoặc QR Code
          </p>
        </div>

        {/* Today's Status Card */}
        <Card className="mb-8 overflow-hidden">
          <div className={`p-6 ${todayCheckedIn ? "bg-success/10" : "bg-warning/10"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${todayCheckedIn ? "bg-success/20" : "bg-warning/20"}`}>
                  {todayCheckedIn ? (
                    <CheckCircle className="h-8 w-8 text-success" />
                  ) : (
                    <Clock className="h-8 w-8 text-warning" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {todayCheckedIn ? "Đã điểm danh hôm nay" : "Chưa điểm danh hôm nay"}
                  </h2>
                  <p className="text-muted-foreground">
                    {todayCheckedIn 
                      ? `Thời gian: ${checkInTime} - Ngày ${new Date().toLocaleDateString("vi-VN")}`
                      : "Vui lòng điểm danh trước 23:00"
                    }
                  </p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm text-muted-foreground">Phòng</p>
                <p className="text-2xl font-bold text-foreground">A305</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Check-in Methods */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Thực hiện điểm danh</CardTitle>
            <CardDescription>
              Chọn phương thức điểm danh phù hợp với bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="face" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="face" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Nhận diện khuôn mặt
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Quét QR Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="face">
                <div className="flex flex-col items-center py-8">
                  <div className={`w-64 h-64 rounded-2xl border-4 border-dashed flex items-center justify-center mb-6 transition-all ${
                    isScanning 
                      ? "border-primary bg-primary/5 animate-pulse" 
                      : scanResult === "success"
                      ? "border-success bg-success/5"
                      : scanResult === "error"
                      ? "border-destructive bg-destructive/5"
                      : "border-muted-foreground/30 bg-muted/30"
                  }`}>
                    {isScanning ? (
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-primary mx-auto mb-2 animate-pulse" />
                        <p className="text-sm text-muted-foreground">Đang nhận diện...</p>
                      </div>
                    ) : scanResult === "success" ? (
                      <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-success mx-auto mb-2" />
                        <p className="text-sm text-success font-medium">Điểm danh thành công!</p>
                      </div>
                    ) : scanResult === "error" ? (
                      <div className="text-center">
                        <XCircle className="h-16 w-16 text-destructive mx-auto mb-2" />
                        <p className="text-sm text-destructive font-medium">Không nhận diện được</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Camera preview</p>
                      </div>
                    )}
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleFaceRecognition}
                    disabled={isScanning || todayCheckedIn}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    {todayCheckedIn ? "Đã điểm danh" : isScanning ? "Đang xử lý..." : "Bắt đầu nhận diện"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Đảm bảo khuôn mặt nằm trong khung hình và đủ ánh sáng
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="qr">
                <div className="flex flex-col items-center py-8">
                  <div className={`w-64 h-64 rounded-2xl border-4 border-dashed flex items-center justify-center mb-6 transition-all ${
                    isScanning 
                      ? "border-primary bg-primary/5 animate-pulse" 
                      : scanResult === "success"
                      ? "border-success bg-success/5"
                      : scanResult === "error"
                      ? "border-destructive bg-destructive/5"
                      : "border-muted-foreground/30 bg-muted/30"
                  }`}>
                    {isScanning ? (
                      <div className="text-center">
                        <QrCode className="h-16 w-16 text-primary mx-auto mb-2 animate-pulse" />
                        <p className="text-sm text-muted-foreground">Đang quét mã...</p>
                      </div>
                    ) : scanResult === "success" ? (
                      <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-success mx-auto mb-2" />
                        <p className="text-sm text-success font-medium">Điểm danh thành công!</p>
                      </div>
                    ) : scanResult === "error" ? (
                      <div className="text-center">
                        <XCircle className="h-16 w-16 text-destructive mx-auto mb-2" />
                        <p className="text-sm text-destructive font-medium">Mã không hợp lệ</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Đưa mã QR vào khung</p>
                      </div>
                    )}
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleQRScan}
                    disabled={isScanning || todayCheckedIn}
                  >
                    <QrCode className="h-5 w-5 mr-2" />
                    {todayCheckedIn ? "Đã điểm danh" : isScanning ? "Đang xử lý..." : "Quét mã QR"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Quét mã QR được cung cấp tại sảnh ký túc xá
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Attendance History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Lịch sử điểm danh
              </CardTitle>
              <CardDescription>7 ngày gần nhất</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Xem tất cả
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>{record.method}</TableCell>
                    <TableCell>
                      <StatusBadge status={record.status as "completed" | "rejected"} />
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
