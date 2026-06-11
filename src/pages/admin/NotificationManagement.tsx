import { useMemo, useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Plus,
  Search,
  Edit,
  Trash2,
  Send,
  Eye,
  Save,
  Clock,
  Mail,
  MessageSquare,
  AlertTriangle,
  Megaphone,
  Zap,
  Wallet,
  Calendar as CalendarIcon,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

type NotiType = "general" | "urgent" | "tuition" | "utility" | "activity";
type Audience = "all" | "freshmen" | "building" | "room" | "students";
type Status = "draft" | "sent" | "scheduled";

type Notification = {
  id: string;
  title: string;
  content: string;
  type: NotiType;
  audience: Audience;
  building?: string;
  room?: string;
  studentIds?: string[];
  channels: { system: boolean; email: boolean; sms: boolean };
  status: Status;
  createdAt: string;
  sendAt?: string;
  createdBy: string;
};

const TYPE_META: Record<NotiType, { label: string; icon: any; cls: string }> = {
  general: { label: "Thông báo chung", icon: Megaphone, cls: "bg-blue-100 text-blue-700 border-blue-200" },
  urgent: { label: "Thông báo khẩn", icon: AlertTriangle, cls: "bg-red-100 text-red-700 border-red-200" },
  tuition: { label: "Học phí", icon: Wallet, cls: "bg-amber-100 text-amber-700 border-amber-200" },
  utility: { label: "Điện nước", icon: Zap, cls: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  activity: { label: "Hoạt động KTX", icon: Bell, cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
};

const AUDIENCE_LABEL: Record<Audience, string> = {
  all: "Tất cả sinh viên",
  freshmen: "Tất cả tân sinh viên",
  building: "Một khu nhà",
  room: "Một phòng cụ thể",
  students: "Sinh viên cụ thể",
};

const BUILDINGS = ["A1", "A2", "B1", "B2", "C1"];
const ROOMS_BY_BUILDING: Record<string, string[]> = {
  A1: ["A1-101", "A1-102", "A1-201", "A1-202"],
  A2: ["A2-101", "A2-102", "A2-201"],
  B1: ["B1-301", "B1-302"],
  B2: ["B2-101", "B2-102"],
  C1: ["C1-401", "C1-402"],
};

const MOCK_STUDENTS = [
  { id: "SV001", name: "Nguyễn Văn An", room: "A1-101" },
  { id: "SV002", name: "Trần Thị Bình", room: "A1-102" },
  { id: "SV003", name: "Lê Hoàng Cường", room: "A2-201" },
  { id: "SV004", name: "Phạm Minh Dũng", room: "B1-301" },
  { id: "SV005", name: "Hoàng Thị Em", room: "B2-101" },
  { id: "SV006", name: "Vũ Quốc Phong", room: "C1-401" },
];

const INITIAL: Notification[] = [
  {
    id: "TB001",
    title: "Lịch đóng tiền học phí HK1 2025-2026",
    content: "Sinh viên vui lòng hoàn tất đóng học phí trước ngày 30/06/2026.",
    type: "tuition",
    audience: "all",
    channels: { system: true, email: true, sms: false },
    status: "sent",
    createdAt: "2026-06-01 09:00",
    sendAt: "2026-06-01 09:05",
    createdBy: "Cán bộ QL",
  },
  {
    id: "TB002",
    title: "Cắt điện bảo trì khu A1",
    content: "Cắt điện từ 8h-11h sáng thứ 7 tuần này để bảo trì.",
    type: "utility",
    audience: "building",
    building: "A1",
    channels: { system: true, email: false, sms: true },
    status: "scheduled",
    createdAt: "2026-06-08 14:20",
    sendAt: "2026-06-12 07:00",
    createdBy: "Cán bộ QL",
  },
  {
    id: "TB003",
    title: "Họp phòng A1-101",
    content: "Phòng họp toàn thành viên lúc 19h tối nay.",
    type: "general",
    audience: "room",
    building: "A1",
    room: "A1-101",
    channels: { system: true, email: false, sms: false },
    status: "draft",
    createdAt: "2026-06-10 16:30",
    createdBy: "Cán bộ QL",
  },
];

type FormState = Omit<Notification, "id" | "createdAt" | "createdBy" | "status"> & {
  scheduled: boolean;
};

const emptyForm = (): FormState => ({
  title: "",
  content: "",
  type: "general",
  audience: "all",
  building: undefined,
  room: undefined,
  studentIds: [],
  channels: { system: true, email: false, sms: false },
  scheduled: false,
  sendAt: undefined,
});

export default function NotificationManagement() {
  const [items, setItems] = useState<Notification[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());

  const [viewing, setViewing] = useState<Notification | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [studentQuery, setStudentQuery] = useState("");

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const matchSearch =
        !search ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || n.type === typeFilter;
      const matchStatus = statusFilter === "all" || n.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [items, search, typeFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      total: items.length,
      sent: items.filter((i) => i.status === "sent").length,
      scheduled: items.filter((i) => i.status === "scheduled").length,
      draft: items.filter((i) => i.status === "draft").length,
    }),
    [items]
  );

  const studentResults = useMemo(() => {
    if (!studentQuery) return MOCK_STUDENTS;
    const q = studentQuery.toLowerCase();
    return MOCK_STUDENTS.filter(
      (s) => s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }, [studentQuery]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setOpen(true);
  };

  const openEdit = (n: Notification) => {
    setEditingId(n.id);
    setForm({
      title: n.title,
      content: n.content,
      type: n.type,
      audience: n.audience,
      building: n.building,
      room: n.room,
      studentIds: n.studentIds ?? [],
      channels: { ...n.channels },
      scheduled: n.status === "scheduled",
      sendAt: n.sendAt,
    });
    setOpen(true);
  };

  const validate = (): boolean => {
    if (!form.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return false;
    }
    if (!form.content.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return false;
    }
    if (form.audience === "building" && !form.building) {
      toast.error("Vui lòng chọn khu nhà");
      return false;
    }
    if (form.audience === "room" && (!form.building || !form.room)) {
      toast.error("Vui lòng chọn khu nhà và phòng");
      return false;
    }
    if (form.audience === "students" && (form.studentIds?.length ?? 0) === 0) {
      toast.error("Vui lòng chọn ít nhất 1 sinh viên");
      return false;
    }
    if (form.scheduled && !form.sendAt) {
      toast.error("Vui lòng chọn thời gian gửi");
      return false;
    }
    if (!form.channels.system && !form.channels.email && !form.channels.sms) {
      toast.error("Vui lòng chọn ít nhất 1 kênh gửi");
      return false;
    }
    return true;
  };

  const persist = (status: Status) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    if (editingId) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingId
            ? {
                ...i,
                title: form.title,
                content: form.content,
                type: form.type,
                audience: form.audience,
                building: form.building,
                room: form.room,
                studentIds: form.studentIds,
                channels: form.channels,
                status,
                sendAt: status === "scheduled" ? form.sendAt : status === "sent" ? now : undefined,
              }
            : i
        )
      );
    } else {
      const newItem: Notification = {
        id: `TB${String(items.length + 1).padStart(3, "0")}`,
        title: form.title,
        content: form.content,
        type: form.type,
        audience: form.audience,
        building: form.building,
        room: form.room,
        studentIds: form.studentIds,
        channels: form.channels,
        status,
        createdAt: now,
        sendAt: status === "scheduled" ? form.sendAt : status === "sent" ? now : undefined,
        createdBy: "Cán bộ QL",
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setOpen(false);
  };

  const handleSend = () => {
    if (!validate()) return;
    const status: Status = form.scheduled ? "scheduled" : "sent";
    persist(status);
    toast.success(
      status === "sent" ? "Đã gửi thông báo thành công" : "Đã lên lịch gửi thông báo"
    );
  };

  const handleSaveDraft = () => {
    if (!form.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề để lưu nháp");
      return;
    }
    persist("draft");
    toast.success("Đã lưu nháp");
  };

  const handleResend = (n: Notification) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setItems((prev) =>
      prev.map((i) => (i.id === n.id ? { ...i, status: "sent", sendAt: now } : i))
    );
    toast.success("Đã gửi lại thông báo");
  };

  const handleDelete = () => {
    if (!deletingId) return;
    setItems((prev) => prev.filter((i) => i.id !== deletingId));
    setDeletingId(null);
    toast.success("Đã xóa thông báo");
  };

  const toggleStudent = (id: string) => {
    setForm((f) => {
      const cur = new Set(f.studentIds ?? []);
      if (cur.has(id)) cur.delete(id);
      else cur.add(id);
      return { ...f, studentIds: Array.from(cur) };
    });
  };

  const audienceText = (n: Notification) => {
    switch (n.audience) {
      case "all":
        return "Tất cả sinh viên";
      case "freshmen":
        return "Tất cả tân sinh viên";
      case "building":
        return `Khu ${n.building}`;
      case "room":
        return `Phòng ${n.room}`;
      case "students":
        return `${n.studentIds?.length ?? 0} sinh viên`;
    }
  };

  const statusBadge = (s: Status) => {
    if (s === "sent")
      return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Đã gửi</Badge>;
    if (s === "scheduled")
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Đang chờ gửi</Badge>;
    return <Badge variant="secondary">Nháp</Badge>;
  };

  return (
    <AdminSidebar>
      <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Bell className="h-7 w-7 text-primary" />
              Quản lý thông báo
            </h1>
            <p className="text-muted-foreground mt-1">
              Tạo, chỉnh sửa và gửi thông báo đến sinh viên trong hệ thống
            </p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" /> Tạo thông báo mới
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Tổng thông báo" value={stats.total} icon={Bell} />
          <StatCard title="Đã gửi" value={stats.sent} icon={Send} />
          <StatCard title="Đang chờ gửi" value={stats.scheduled} icon={Clock} />
          <StatCard title="Bản nháp" value={stats.draft} icon={Save} />
        </div>

        {/* Filters + Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
              <CardTitle>Danh sách thông báo</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm theo tiêu đề..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Loại thông báo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    {Object.entries(TYPE_META).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="draft">Nháp</SelectItem>
                    <SelectItem value="scheduled">Đang chờ gửi</SelectItem>
                    <SelectItem value="sent">Đã gửi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">STT</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Đối tượng nhận</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Không có thông báo nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((n, idx) => {
                      const Meta = TYPE_META[n.type];
                      const Icon = Meta.icon;
                      return (
                        <TableRow key={n.id}>
                          <TableCell className="font-medium">{idx + 1}</TableCell>
                          <TableCell className="max-w-xs">
                            <div className="font-medium truncate">{n.title}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {n.content}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={Meta.cls}>
                              <Icon className="h-3 w-3 mr-1" />
                              {Meta.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{audienceText(n)}</TableCell>
                          <TableCell className="text-sm whitespace-nowrap">
                            {n.createdAt}
                          </TableCell>
                          <TableCell>{statusBadge(n.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewing(n)}
                                title="Xem chi tiết"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEdit(n)}
                                title="Chỉnh sửa"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {n.status === "sent" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleResend(n)}
                                  title="Gửi lại"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeletingId(n.id)}
                                title="Xóa"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Chỉnh sửa thông báo" : "Tạo thông báo mới"}
            </DialogTitle>
            <DialogDescription>
              Điền đầy đủ thông tin và chọn đối tượng nhận thông báo
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label>Tiêu đề thông báo *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="VD: Lịch đóng tiền học phí HK1..."
              />
            </div>

            <div className="space-y-2">
              <Label>Nội dung thông báo *</Label>
              <Textarea
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Nhập nội dung chi tiết..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại thông báo</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v as NotiType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPE_META).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Audience */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Đối tượng nhận thông báo
              </Label>
              <RadioGroup
                value={form.audience}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    audience: v as Audience,
                    building: undefined,
                    room: undefined,
                    studentIds: [],
                  })
                }
                className="grid sm:grid-cols-2 gap-2"
              >
                {(Object.keys(AUDIENCE_LABEL) as Audience[]).map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2 border rounded-md p-3 hover:bg-muted/50"
                  >
                    <RadioGroupItem value={a} id={`aud-${a}`} />
                    <Label htmlFor={`aud-${a}`} className="cursor-pointer font-normal">
                      {AUDIENCE_LABEL[a]}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Dynamic selectors */}
              {(form.audience === "building" || form.audience === "room") && (
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-2">
                    <Label>Khu nhà</Label>
                    <Select
                      value={form.building ?? ""}
                      onValueChange={(v) =>
                        setForm({ ...form, building: v, room: undefined })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khu nhà" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUILDINGS.map((b) => (
                          <SelectItem key={b} value={b}>
                            Khu {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {form.audience === "room" && (
                    <div className="space-y-2">
                      <Label>Phòng</Label>
                      <Select
                        value={form.room ?? ""}
                        onValueChange={(v) => setForm({ ...form, room: v })}
                        disabled={!form.building}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              form.building ? "Chọn phòng" : "Chọn khu nhà trước"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {(ROOMS_BY_BUILDING[form.building ?? ""] ?? []).map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {form.audience === "students" && (
                <div className="space-y-2 pt-2">
                  <Label>Tìm kiếm sinh viên</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm theo MSSV hoặc họ tên..."
                      value={studentQuery}
                      onChange={(e) => setStudentQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {(form.studentIds?.length ?? 0) > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {form.studentIds!.map((id) => {
                        const s = MOCK_STUDENTS.find((x) => x.id === id);
                        return (
                          <Badge key={id} variant="secondary" className="gap-1">
                            {s?.name ?? id}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => toggleStudent(id)}
                            />
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  <ScrollArea className="h-44 border rounded-md">
                    <div className="p-2 space-y-1">
                      {studentResults.map((s) => {
                        const checked = (form.studentIds ?? []).includes(s.id);
                        return (
                          <div
                            key={s.id}
                            className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-muted/50 cursor-pointer"
                            onClick={() => toggleStudent(s.id)}
                          >
                            <Checkbox checked={checked} />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">
                                {s.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {s.id} • {s.room}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {studentResults.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-6">
                          Không tìm thấy sinh viên
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="space-y-3 border-t pt-4">
              <Label>Thời điểm gửi</Label>
              <RadioGroup
                value={form.scheduled ? "scheduled" : "now"}
                onValueChange={(v) =>
                  setForm({ ...form, scheduled: v === "scheduled" })
                }
                className="grid sm:grid-cols-2 gap-2"
              >
                <div className="flex items-center gap-2 border rounded-md p-3">
                  <RadioGroupItem value="now" id="now" />
                  <Label htmlFor="now" className="cursor-pointer font-normal">
                    Gửi ngay
                  </Label>
                </div>
                <div className="flex items-center gap-2 border rounded-md p-3">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="cursor-pointer font-normal">
                    Lên lịch gửi
                  </Label>
                </div>
              </RadioGroup>
              {form.scheduled && (
                <div className="space-y-2">
                  <Label>Thời gian gửi</Label>
                  <Input
                    type="datetime-local"
                    value={form.sendAt ?? ""}
                    onChange={(e) => setForm({ ...form, sendAt: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Channels */}
            <div className="space-y-3 border-t pt-4">
              <Label>Kênh gửi</Label>
              <div className="grid sm:grid-cols-3 gap-2">
                <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                  <Checkbox
                    checked={form.channels.system}
                    onCheckedChange={(v) =>
                      setForm({
                        ...form,
                        channels: { ...form.channels, system: !!v },
                      })
                    }
                  />
                  <Bell className="h-4 w-4 text-primary" />
                  <span className="text-sm">Trong hệ thống</span>
                </label>
                <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                  <Checkbox
                    checked={form.channels.email}
                    onCheckedChange={(v) =>
                      setForm({
                        ...form,
                        channels: { ...form.channels, email: !!v },
                      })
                    }
                  />
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                  <Checkbox
                    checked={form.channels.sms}
                    onCheckedChange={(v) =>
                      setForm({
                        ...form,
                        channels: { ...form.channels, sms: !!v },
                      })
                    }
                  />
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm">SMS</span>
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
              <Save className="h-4 w-4" /> Lưu nháp
            </Button>
            <Button onClick={handleSend} className="gap-2">
              {form.scheduled ? (
                <>
                  <CalendarIcon className="h-4 w-4" /> Lên lịch gửi
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Gửi thông báo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          {viewing && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className={TYPE_META[viewing.type].cls}>
                    {TYPE_META[viewing.type].label}
                  </Badge>
                  {statusBadge(viewing.status)}
                </div>
                <DialogTitle className="text-xl pt-2">{viewing.title}</DialogTitle>
                <DialogDescription>
                  Tạo bởi {viewing.createdBy} • {viewing.createdAt}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="whitespace-pre-wrap text-sm">{viewing.content}</div>
                <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
                  <div>
                    <div className="text-muted-foreground">Đối tượng</div>
                    <div className="font-medium">{audienceText(viewing)}</div>
                  </div>
                  {viewing.sendAt && (
                    <div>
                      <div className="text-muted-foreground">
                        {viewing.status === "scheduled" ? "Lịch gửi" : "Đã gửi lúc"}
                      </div>
                      <div className="font-medium">{viewing.sendAt}</div>
                    </div>
                  )}
                  <div className="col-span-2">
                    <div className="text-muted-foreground mb-1">Kênh gửi</div>
                    <div className="flex gap-2">
                      {viewing.channels.system && <Badge variant="secondary">Hệ thống</Badge>}
                      {viewing.channels.email && <Badge variant="secondary">Email</Badge>}
                      {viewing.channels.sms && <Badge variant="secondary">SMS</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deletingId} onOpenChange={(v) => !v && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa thông báo</AlertDialogTitle>
            <AlertDialogDescription>
              Thông báo sẽ bị xóa vĩnh viễn. Bạn có chắc chắn?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminSidebar>
  );
}
