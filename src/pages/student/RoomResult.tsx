import { useState } from "react";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Home,
  Star,
  Users,
  MapPin,
  Calendar,
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Banknote,
  QrCode,
  Building2,
  PartyPopper,
  Mail,
  Bell,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type PaymentMethod = "bank" | "momo" | "cash";

export default function RoomResult() {
  const applicationStatus = "approved" as "pending" | "approved" | "rejected";

  // Giả lập: sinh viên gia hạn sẽ không cần đóng tiền cọc nữa
  const isExtension = false;
  const roomFee = 1_200_000; // tiền phòng / kỳ
  const depositFee = isExtension ? 0 : 100_000; // tiền thế chấp
  const total = roomFee + depositFee;

  const [paid, setPaid] = useState(false);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("bank");

  const formatVND = (n: number) => n.toLocaleString("vi-VN") + "đ";

  const handleConfirmPayment = () => {
    setOpen(false);
    setPaid(true);
    toast.success("Thanh toán thành công!", {
      description: `Bạn đã thanh toán ${formatVND(total)} cho phòng A305.`,
    });
  };

  return (
    <StudentSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Kết quả duyệt & Phân phòng
          </h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi trạng thái hồ sơ đăng ký ký túc xá
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Trạng thái hồ sơ</span>
              <StatusBadge status={applicationStatus} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày nộp hồ sơ</p>
                  <p className="font-semibold">15/07/2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Star className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Điểm ưu tiên (AI)</p>
                  <p className="font-semibold">85/100</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nguyện vọng</p>
                  <p className="font-semibold">Phòng 8 người - Tòa A</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Room (Only shown when approved) */}
        {applicationStatus === "approved" && (
          <>
            <Card className="border-success/30 bg-success/5 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Home className="h-5 w-5" />
                  Phòng được phân công
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Số phòng</p>
                    <p className="text-2xl font-bold text-foreground">A305</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tòa nhà</p>
                    <p className="text-lg font-semibold">Tòa A</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tầng</p>
                    <p className="text-lg font-semibold">Tầng 3</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loại phòng</p>
                    <p className="text-lg font-semibold">8 người</p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-card border border-border">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Ngày nhận phòng</p>
                      <p className="text-sm text-muted-foreground">
                        01/09/2024 - Vui lòng mang theo CCCD và giấy báo trúng tuyển
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Card */}
            <Card className={paid ? "border-success/30 bg-success/5" : "border-primary/30"}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Thanh toán tiền phòng & tiền cọc
                  </span>
                  {paid ? (
                    <Badge className="bg-success/15 text-success border border-success/30 hover:bg-success/15">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Đã thanh toán
                    </Badge>
                  ) : (
                    <Badge className="bg-warning/15 text-warning border border-warning/30 hover:bg-warning/15">
                      Chưa thanh toán
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-card divide-y">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Home className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Tiền phòng (Học kỳ I)</p>
                        <p className="text-sm text-muted-foreground">
                          Phòng A305 - Tòa A - 8 người
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">{formatVND(roomFee)}</p>
                  </div>

                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <ShieldCheck className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Tiền thế chấp{" "}
                          {isExtension && (
                            <span className="text-xs text-success">
                              (Đã đóng kỳ trước)
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isExtension
                            ? "Sinh viên gia hạn không cần đóng lại"
                            : "Hoàn trả khi kết thúc nội trú"}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {depositFee === 0 ? (
                        <span className="text-success">Miễn</span>
                      ) : (
                        formatVND(depositFee)
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-foreground" />
                      <p className="font-semibold">Tổng cộng</p>
                    </div>
                    <p className="text-xl font-bold text-primary">
                      {formatVND(total)}
                    </p>
                  </div>
                </div>

                {!paid ? (
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Hạn thanh toán: <span className="font-medium text-foreground">25/08/2024</span>
                    </p>
                    <Button size="lg" onClick={() => setOpen(true)}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Thanh toán ngay
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/30 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-success">Thanh toán thành công</p>
                      <p className="text-sm text-muted-foreground">
                        Biên lai đã được gửi tới email của bạn. Vui lòng giữ để đối chiếu khi nhận phòng.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Rejected Message */}
        {applicationStatus === "rejected" && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="font-medium text-destructive">
                  Hồ sơ của bạn không được duyệt
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Lý do: Không đủ điều kiện về điểm ưu tiên. Vui lòng liên hệ ban
                  quản lý để biết thêm chi tiết.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Message */}
        {applicationStatus === "pending" && (
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="font-medium text-warning">
                  Hồ sơ đang được xét duyệt
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Dự kiến có kết quả trong vòng 7-14 ngày làm việc. Bạn sẽ nhận
                  được thông báo qua email khi có kết quả.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
            <DialogDescription>
              Tổng số tiền cần thanh toán:{" "}
              <span className="font-semibold text-primary">{formatVND(total)}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {[
              {
                id: "bank" as PaymentMethod,
                label: "Chuyển khoản ngân hàng",
                desc: "Vietcombank - 0123456789 - KTX ĐH ABC",
                icon: Building2,
              },
              {
                id: "momo" as PaymentMethod,
                label: "Ví MoMo / VNPay",
                desc: "Quét mã QR để thanh toán nhanh",
                icon: QrCode,
              },
              {
                id: "cash" as PaymentMethod,
                label: "Nộp tiền mặt tại văn phòng KTX",
                desc: "Phòng A101 - Tòa A, giờ hành chính",
                icon: Banknote,
              },
            ].map((opt) => {
              const Icon = opt.icon;
              const active = method === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className={`w-full text-left flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      active ? "bg-primary/15" : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        active ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  {active && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
              );
            })}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleConfirmPayment}>Xác nhận thanh toán</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentSidebar>
  );
}
