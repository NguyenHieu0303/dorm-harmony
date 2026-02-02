import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Star, Users, MapPin, Calendar } from "lucide-react";

export default function RoomResult() {
  const applicationStatus = "approved" as "pending" | "approved" | "rejected";

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

        {/* Priority Score Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              Chi tiết điểm đánh giá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Khoảng cách từ nhà đến trường", score: 25, max: 30 },
                { label: "Hoàn cảnh gia đình", score: 20, max: 25 },
                { label: "Thành tích học tập", score: 15, max: 20 },
                { label: "Hoạt động ngoại khóa", score: 10, max: 15 },
                { label: "Các tiêu chí khác", score: 15, max: 10 },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">
                      {item.score}/{item.max}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Room (Only shown when approved) */}
        {applicationStatus === "approved" && (
          <Card className="border-success/30 bg-success/5">
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
    </StudentSidebar>
  );
}
