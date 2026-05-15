import { useMemo, useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Search, Check, X, Wand2, Eye, FileText, Star, User, Mail, Phone,
  Building2, Calendar, Trophy, Users, Target, ScanLine, GraduationCap,
  HeartHandshake, MapPin, AlertTriangle, Sparkles, Crown, UserPlus, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

// ----- Mock đợt đăng ký -----
const currentBatch = {
  name: "Đợt 1 - Năm học 2024-2025",
  openDate: "01/07/2024",
  closeDate: "31/07/2024",
  quota: 50,
  status: "scoring" as "open" | "scoring" | "closed", // scoring = đã đóng đăng ký, đang chấm/xếp hạng
};

const mockFaceImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
];

// Cấu trúc điểm: tổng 100
// - Đối tượng ưu tiên (con liệt sĩ, vùng sâu, hộ nghèo...): 40
// - Học lực (GPA): 30
// - Khoảng cách nhà tới trường: 20
// - Hoàn thiện hồ sơ + OCR hợp lệ: 10
type App = {
  id: number;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  faculty: string;
  class: string;
  roomType: string;
  building: string;
  submittedAt: string;
  faceImage: string;
  type: "new" | "extension"; // đăng ký lần đầu / gia hạn
  currentRoom?: string;       // phòng hiện tại (gia hạn)
  currentBuilding?: string;   // tòa hiện tại (gia hạn)
  semestersStayed?: number;   // số kỳ đã ở (gia hạn)
  score: {
    priority: number;   // /40
    gpa: number;        // /30
    distance: number;   // /20
    documents: number;  // /10
  };
  ocr: { cccd: boolean; bhyt: boolean; enrollment: boolean; portrait: boolean };
  status: "scored" | "approved" | "rejected" | "waitlist";
};

const baseApps: App[] = [
  { id: 1, studentId: "SV240001", name: "Nguyễn Văn An",  email: "an.nv@s.edu.vn",  phone: "0912345678", faculty: "CNTT", class: "K24-CNTT1", roomType: "8 người", building: "Tòa A", submittedAt: "15/07/2024", faceImage: mockFaceImages[0], type: "new", score: { priority: 35, gpa: 27, distance: 18, documents: 10 }, ocr: { cccd: true, bhyt: true, enrollment: true, portrait: true }, status: "scored" },
  { id: 2, studentId: "SV240002", name: "Trần Thị Bình",  email: "binh.tt@s.edu.vn", phone: "0923456789", faculty: "Kinh tế", class: "K24-KT2", roomType: "6 người", building: "Tòa B", submittedAt: "14/07/2024", faceImage: mockFaceImages[1], type: "extension", currentRoom: "B305", currentBuilding: "Tòa B", semestersStayed: 2, score: { priority: 28, gpa: 25, distance: 16, documents: 10 }, ocr: { cccd: true, bhyt: true, enrollment: true, portrait: true }, status: "scored" },
  { id: 3, studentId: "SV240003", name: "Lê Văn Cường",   email: "cuong.lv@s.edu.vn",phone: "0934567890", faculty: "Cơ khí", class: "K24-CK1", roomType: "8 người", building: "Tòa A", submittedAt: "13/07/2024", faceImage: mockFaceImages[2], type: "new", score: { priority: 40, gpa: 28, distance: 20, documents: 10 }, ocr: { cccd: true, bhyt: true, enrollment: true, portrait: true }, status: "scored" },
  { id: 4, studentId: "SV240004", name: "Phạm Thị Dung",  email: "dung.pt@s.edu.vn", phone: "0945678901", faculty: "Ngoại ngữ", class: "K24-NN1", roomType: "4 người", building: "Tòa C", submittedAt: "12/07/2024", faceImage: mockFaceImages[3], type: "extension", currentRoom: "C201", currentBuilding: "Tòa C", semestersStayed: 4, score: { priority: 15, gpa: 20, distance: 12, documents: 8 }, ocr: { cccd: true, bhyt: false, enrollment: true, portrait: true }, status: "scored" },
  { id: 5, studentId: "SV240005", name: "Hoàng Văn Em",   email: "em.hv@s.edu.vn",   phone: "0956789012", faculty: "Điện tử", class: "K24-DDT1", roomType: "8 người", building: "Tòa A", submittedAt: "11/07/2024", faceImage: mockFaceImages[4], type: "new", score: { priority: 30, gpa: 26, distance: 19, documents: 10 }, ocr: { cccd: true, bhyt: true, enrollment: true, portrait: true }, status: "scored" },
  { id: 6, studentId: "SV240006", name: "Đỗ Thị Phương",  email: "phuong.dt@s.edu.vn",phone: "0967890123", faculty: "CNTT", class: "K24-CNTT2", roomType: "6 người", building: "Tòa B", submittedAt: "10/07/2024", faceImage: mockFaceImages[5], type: "extension", currentRoom: "B112", currentBuilding: "Tòa B", semestersStayed: 1, score: { priority: 22, gpa: 24, distance: 14, documents: 10 }, ocr: { cccd: true, bhyt: true, enrollment: true, portrait: true }, status: "scored" },
  { id: 7, studentId: "SV240007", name: "Vũ Minh Quang",  email: "quang.vm@s.edu.vn",phone: "0978901234", faculty: "Kinh tế", class: "K24-KT1", roomType: "8 người", building: "Tòa A", submittedAt: "09/07/2024", faceImage: mockFaceImages[6], type: "new", score: { priority: 10, gpa: 22, distance: 10, documents: 7 }, ocr: { cccd: true, bhyt: false, enrollment: false, portrait: true }, status: "scored" },
];

const total = (a: App) => a.score.priority + a.score.gpa + a.score.distance + a.score.documents;

export default function ApplicationManagement() {
  const [apps, setApps] = useState<App[]>(baseApps);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [showAutoAssign, setShowAutoAssign] = useState(false);

  // Sort by score desc & gán hạng
  const ranked = useMemo(() => {
    const sorted = [...apps].sort((a, b) => total(b) - total(a));
    return sorted.map((a, i) => ({ ...a, rank: i + 1 }));
  }, [apps]);

  const filtered = ranked.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const approvedCount = apps.filter((a) => a.status === "approved").length;
  const rejectedCount = apps.filter((a) => a.status === "rejected").length;
  const waitlistCount = apps.filter((a) => a.status === "waitlist").length;
  const remainingSlots = Math.max(0, currentBatch.quota - approvedCount);

  const runAutoAssign = () => {
    setApps((prev) => {
      const sorted = [...prev].sort((a, b) => total(b) - total(a));
      return sorted.map((a, i) => ({
        ...a,
        status: i < currentBatch.quota ? "approved" : "waitlist",
      }));
    });
    setShowAutoAssign(false);
    toast.success(`Đã duyệt ${currentBatch.quota} hồ sơ điểm cao nhất, các hồ sơ còn lại vào danh sách chờ.`);
  };

  const updateStatus = (id: number, status: App["status"]) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quản lý hồ sơ & Xét duyệt KTX</h1>
            <p className="text-muted-foreground mt-1">
              Hệ thống tự chấm điểm hồ sơ từ thông tin OCR và xếp hạng theo slot của đợt đăng ký
            </p>
          </div>
          <Button onClick={() => setShowAutoAssign(true)} disabled={currentBatch.status !== "scoring"}>
            <Wand2 className="h-4 w-4 mr-2" />
            Duyệt theo điểm (Top {currentBatch.quota})
          </Button>
        </div>

        {/* Batch Info */}
        <Card className="mb-6 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" /> Đợt đăng ký
                </div>
                <p className="font-semibold text-foreground">{currentBatch.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentBatch.openDate} → {currentBatch.closeDate}
                </p>
                <Badge className="mt-2" variant={currentBatch.status === "scoring" ? "default" : "secondary"}>
                  {currentBatch.status === "open" && "Đang mở đăng ký"}
                  {currentBatch.status === "scoring" && "Đã đóng – Đang xét duyệt"}
                  {currentBatch.status === "closed" && "Đã hoàn tất"}
                </Badge>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Target className="h-4 w-4" /> Chỉ tiêu (slot)
                </div>
                <p className="text-3xl font-bold text-primary">{currentBatch.quota}</p>
                <p className="text-xs text-muted-foreground">Số sinh viên được nhận đợt này</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Users className="h-4 w-4" /> Tổng hồ sơ
                </div>
                <p className="text-3xl font-bold text-foreground">{apps.length}</p>
                <div className="flex gap-2 mt-1 text-xs">
                  <span className="text-success">✓ {approvedCount} duyệt</span>
                  <span className="text-warning">⏳ {waitlistCount} chờ</span>
                  <span className="text-destructive">✕ {rejectedCount} loại</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Trophy className="h-4 w-4" /> Slot còn trống
                </div>
                <p className="text-3xl font-bold text-success">{remainingSlots}</p>
                <Progress value={(approvedCount / currentBatch.quota) * 100} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Rubric */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Cách hệ thống chấm điểm hồ sơ (tổng 100 điểm)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-0">
            <RubricItem icon={HeartHandshake} label="Đối tượng ưu tiên" max={40} desc="Con liệt sĩ, vùng sâu, hộ nghèo..." />
            <RubricItem icon={GraduationCap} label="Học lực (GPA)" max={30} desc="Theo bảng điểm OCR" />
            <RubricItem icon={MapPin} label="Khoảng cách nhà" max={20} desc="Tỉnh xa được điểm cao hơn" />
            <RubricItem icon={ScanLine} label="Hồ sơ & OCR" max={10} desc="Đầy đủ giấy tờ, OCR hợp lệ" />
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên hoặc MSSV..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-56">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="scored">Đã chấm – chờ xét</SelectItem>
                  <SelectItem value="approved">Đã duyệt</SelectItem>
                  <SelectItem value="waitlist">Danh sách chờ</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ranking Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Bảng xếp hạng hồ sơ ({filtered.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Hạng</TableHead>
                    <TableHead>Sinh viên</TableHead>
                    <TableHead>MSSV / Khoa</TableHead>
                    <TableHead>Phân tích điểm</TableHead>
                    <TableHead className="text-center">Tổng điểm</TableHead>
                    <TableHead>OCR</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((a) => {
                    const t = total(a);
                    const inSlot = a.rank <= currentBatch.quota;
                    return (
                      <TableRow key={a.id} className={inSlot ? "bg-success/5" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {a.rank <= 3 && <Crown className={`h-4 w-4 ${a.rank === 1 ? "text-warning" : "text-muted-foreground"}`} />}
                            <span className={`font-bold ${inSlot ? "text-success" : "text-muted-foreground"}`}>
                              #{a.rank}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={a.faceImage} alt={a.name} />
                              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium leading-tight">{a.name}</p>
                              <p className="text-xs text-muted-foreground">{a.roomType} · {a.building}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{a.studentId}</p>
                          <p className="text-xs text-muted-foreground">{a.faculty}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 text-xs">
                            <ScoreChip color="bg-rose-500/10 text-rose-700 dark:text-rose-300" label="ƯT" v={a.score.priority} m={40} />
                            <ScoreChip color="bg-blue-500/10 text-blue-700 dark:text-blue-300" label="GPA" v={a.score.gpa} m={30} />
                            <ScoreChip color="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" label="KC" v={a.score.distance} m={20} />
                            <ScoreChip color="bg-amber-500/10 text-amber-700 dark:text-amber-300" label="HS" v={a.score.documents} m={10} />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`text-lg font-bold ${t >= 80 ? "text-success" : t >= 60 ? "text-warning" : "text-destructive"}`}>
                            {t}
                          </span>
                          <span className="text-xs text-muted-foreground">/100</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <OcrDot ok={a.ocr.cccd} label="CCCD" />
                            <OcrDot ok={a.ocr.bhyt} label="BHYT" />
                            <OcrDot ok={a.ocr.enrollment} label="NH" />
                            <OcrDot ok={a.ocr.portrait} label="Ảnh" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {a.status === "scored" && <Badge variant="secondary">Chờ xét</Badge>}
                          {a.status === "approved" && <Badge className="bg-success text-success-foreground">Đã duyệt</Badge>}
                          {a.status === "waitlist" && <Badge variant="outline" className="border-warning text-warning">Chờ slot</Badge>}
                          {a.status === "rejected" && <StatusBadge status="rejected" />}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setSelectedApp(a)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {a.status !== "approved" && (
                              <Button variant="ghost" size="icon" className="text-success hover:text-success"
                                onClick={() => updateStatus(a.id, "approved")}>
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            {a.status !== "rejected" && (
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"
                                onClick={() => updateStatus(a.id, "rejected")}>
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted/40 text-xs text-muted-foreground flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <span>
                Dòng nền xanh là các hồ sơ <b>nằm trong top {currentBatch.quota}</b> theo điểm – sẽ được duyệt khi chạy "Duyệt theo điểm".
                Các hồ sơ ngoài top sẽ vào danh sách chờ và được xét bù khi có sinh viên trong top từ chối nhận phòng.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Chi tiết hồ sơ & bảng điểm</DialogTitle>
              <DialogDescription>
                Điểm được tính tự động từ thông tin sinh viên kê khai và dữ liệu OCR từ giấy tờ tải lên.
              </DialogDescription>
            </DialogHeader>
            {selectedApp && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                    <img src={selectedApp.faceImage} alt={selectedApp.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl border p-4 text-center bg-gradient-to-br from-primary/10 to-background">
                    <p className="text-xs text-muted-foreground mb-1">Tổng điểm xét duyệt</p>
                    <p className="text-4xl font-bold text-primary">{total(selectedApp)}<span className="text-base text-muted-foreground">/100</span></p>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Info icon={User}      label="Họ tên"     value={selectedApp.name} />
                    <Info icon={FileText}  label="MSSV"       value={selectedApp.studentId} />
                    <Info icon={Mail}      label="Email"      value={selectedApp.email} />
                    <Info icon={Phone}     label="SĐT"        value={selectedApp.phone} />
                    <Info icon={Building2} label="Khoa - Lớp" value={`${selectedApp.faculty} - ${selectedApp.class}`} />
                    <Info icon={Calendar}  label="Ngày nộp"   value={selectedApp.submittedAt} />
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Phân tích điểm
                    </p>
                    <ScoreBar label="Đối tượng ưu tiên" v={selectedApp.score.priority} m={40} />
                    <ScoreBar label="Học lực (GPA)" v={selectedApp.score.gpa} m={30} />
                    <ScoreBar label="Khoảng cách nhà" v={selectedApp.score.distance} m={20} />
                    <ScoreBar label="Hồ sơ & OCR" v={selectedApp.score.documents} m={10} />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedApp(null)}>Đóng</Button>
              {selectedApp && selectedApp.status !== "rejected" && (
                <Button variant="destructive" onClick={() => { updateStatus(selectedApp.id, "rejected"); setSelectedApp(null); }}>
                  <X className="h-4 w-4 mr-2" /> Từ chối
                </Button>
              )}
              {selectedApp && selectedApp.status !== "approved" && (
                <Button onClick={() => { updateStatus(selectedApp.id, "approved"); setSelectedApp(null); }}>
                  <Check className="h-4 w-4 mr-2" /> Duyệt hồ sơ
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Auto Assign Dialog */}
        <Dialog open={showAutoAssign} onOpenChange={setShowAutoAssign}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Duyệt hồ sơ theo điểm xếp hạng</DialogTitle>
              <DialogDescription>
                Hệ thống sẽ tự động chọn <b>{currentBatch.quota}</b> hồ sơ có điểm cao nhất để duyệt vào ở.
                Các hồ sơ còn lại sẽ chuyển sang <b>danh sách chờ</b>.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                <Trophy className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Đợt: {currentBatch.name}</p>
                  <p className="text-muted-foreground">Chỉ tiêu: {currentBatch.quota} slot · Tổng hồ sơ: {apps.length}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-sm flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <span>Hành động này sẽ ghi đè trạng thái duyệt hiện tại của tất cả hồ sơ trong đợt.</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAutoAssign(false)}>Hủy</Button>
              <Button onClick={runAutoAssign}>
                <Wand2 className="h-4 w-4 mr-2" /> Bắt đầu duyệt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminSidebar>
  );
}

function RubricItem({ icon: Icon, label, max, desc }: { icon: React.ElementType; label: string; max: number; desc: string }) {
  return (
    <div className="rounded-lg border p-3 flex gap-3">
      <Icon className="h-5 w-5 text-primary shrink-0" />
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{label}</p>
          <Badge variant="secondary" className="text-xs">/{max}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function ScoreChip({ color, label, v, m }: { color: string; label: string; v: number; m: number }) {
  return (
    <span className={`px-2 py-1 rounded font-medium ${color}`} title={`${label}: ${v}/${m}`}>
      {label} {v}<span className="opacity-60">/{m}</span>
    </span>
  );
}

function OcrDot({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      title={`${label}: ${ok ? "Hợp lệ" : "Thiếu/Lỗi"}`}
      className={`inline-flex items-center justify-center text-[10px] w-7 h-5 rounded font-medium ${
        ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
      }`}
    >
      {label}
    </span>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function ScoreBar({ label, v, m }: { label: string; v: number; m: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="font-medium">{v}/{m}</span>
      </div>
      <Progress value={(v / m) * 100} className="h-2" />
    </div>
  );
}
