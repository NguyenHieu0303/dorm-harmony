import { useMemo, useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  GraduationCap,
  Wrench,
  Search,
  Edit,
  Trash2,
  Key,
  Lock,
  Unlock,
  Mail,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Role = "admin" | "manager" | "tech" | "student";
type Status = "active" | "locked";

type Permission =
  | "user.manage"
  | "application.review"
  | "room.manage"
  | "billing.manage"
  | "repair.manage"
  | "report.view";

const ALL_PERMISSIONS: { key: Permission; label: string; group: string }[] = [
  { key: "user.manage", label: "Quản lý tài khoản & phân quyền", group: "Hệ thống" },
  { key: "application.review", label: "Xét duyệt hồ sơ đăng ký", group: "Hồ sơ" },
  { key: "room.manage", label: "Quản lý phòng & tòa", group: "Phòng ở" },
  { key: "billing.manage", label: "Quản lý điện nước, tiền cọc", group: "Tài chính" },
  { key: "repair.manage", label: "Tiếp nhận & xử lý sửa chữa", group: "Sửa chữa" },
  { key: "report.view", label: "Xem báo cáo, thống kê", group: "Báo cáo" },
];

const ROLE_DEFAULTS: Record<Role, Permission[]> = {
  admin: ALL_PERMISSIONS.map((p) => p.key),
  manager: ["application.review", "room.manage", "billing.manage", "repair.manage", "report.view"],
  tech: ["repair.manage"],
  student: [],
};

const roleMeta: Record<Role, { label: string; color: string; icon: any }> = {
  admin: { label: "Quản trị viên", color: "bg-red-500/10 text-red-600 border-red-200", icon: ShieldCheck },
  manager: { label: "Quản lý KTX", color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: Shield },
  tech: { label: "Nhân viên kỹ thuật", color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Wrench },
  student: { label: "Sinh viên", color: "bg-emerald-500/10 text-emerald-600 border-emerald-200", icon: GraduationCap },
};

type UserRow = {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  createdAt: string;
  lastLogin: string;
  permissions: Permission[];
};

const seedUsers: UserRow[] = [
  { id: "u1", name: "Nguyễn Văn Admin", code: "AD0001", email: "admin@ktx.edu.vn", phone: "0901111111", role: "admin", status: "active", createdAt: "01/01/2023", lastLogin: "Hôm nay, 09:12", permissions: ROLE_DEFAULTS.admin },
  { id: "u2", name: "Trần Thị B", code: "CB00123", email: "tranthib@ktx.edu.vn", phone: "0902222222", role: "manager", status: "active", createdAt: "15/03/2023", lastLogin: "Hôm nay, 08:40", permissions: ROLE_DEFAULTS.manager },
  { id: "u3", name: "Lê Văn C", code: "CB00211", email: "levanc@ktx.edu.vn", phone: "0903333333", role: "manager", status: "active", createdAt: "20/05/2023", lastLogin: "Hôm qua, 17:20", permissions: ROLE_DEFAULTS.manager },
  { id: "u4", name: "Phạm Minh Kỹ", code: "KT0007", email: "kythuat1@ktx.edu.vn", phone: "0904444444", role: "tech", status: "active", createdAt: "10/06/2023", lastLogin: "2 ngày trước", permissions: ROLE_DEFAULTS.tech },
  { id: "u5", name: "Hoàng Văn Tech", code: "KT0008", email: "kythuat2@ktx.edu.vn", phone: "0905555555", role: "tech", status: "locked", createdAt: "12/06/2023", lastLogin: "1 tuần trước", permissions: ROLE_DEFAULTS.tech },
  { id: "u6", name: "Nguyễn Thị Sinh", code: "SV21001", email: "sv21001@student.edu.vn", phone: "0906666666", role: "student", status: "active", createdAt: "01/09/2024", lastLogin: "Hôm nay, 10:05", permissions: ROLE_DEFAULTS.student },
  { id: "u7", name: "Trần Văn Viên", code: "SV21002", email: "sv21002@student.edu.vn", phone: "0907777777", role: "student", status: "active", createdAt: "01/09/2024", lastLogin: "Hôm qua, 22:30", permissions: ROLE_DEFAULTS.student },
  { id: "u8", name: "Đỗ Thị Hồng", code: "SV22045", email: "sv22045@student.edu.vn", phone: "0908888888", role: "student", status: "locked", createdAt: "05/09/2024", lastLogin: "3 ngày trước", permissions: ROLE_DEFAULTS.student },
];

export default function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>(seedUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");

  const [openCreate, setOpenCreate] = useState(false);
  const [editUser, setEditUser] = useState<UserRow | null>(null);
  const [permUser, setPermUser] = useState<UserRow | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserRow | null>(null);

  const [form, setForm] = useState<Partial<UserRow>>({ role: "student", status: "active" });

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return users.filter((u) => {
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.code.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchR = roleFilter === "all" || u.role === roleFilter;
      const matchS = statusFilter === "all" || u.status === statusFilter;
      return matchQ && matchR && matchS;
    });
  }, [users, search, roleFilter, statusFilter]);

  const counts = useMemo(() => ({
    total: users.length,
    admins: users.filter((u) => u.role === "admin" || u.role === "manager").length,
    tech: users.filter((u) => u.role === "tech").length,
    students: users.filter((u) => u.role === "student").length,
    locked: users.filter((u) => u.status === "locked").length,
  }), [users]);

  const handleCreate = () => {
    if (!form.name || !form.email || !form.code) {
      toast({ title: "Thiếu thông tin", description: "Vui lòng nhập đủ Họ tên, Mã, Email", variant: "destructive" });
      return;
    }
    const role = (form.role as Role) || "student";
    const newU: UserRow = {
      id: `u${Date.now()}`,
      name: form.name!,
      code: form.code!,
      email: form.email!,
      phone: form.phone || "",
      role,
      status: (form.status as Status) || "active",
      createdAt: new Date().toLocaleDateString("vi-VN"),
      lastLogin: "Chưa đăng nhập",
      permissions: ROLE_DEFAULTS[role],
    };
    setUsers((p) => [newU, ...p]);
    setOpenCreate(false);
    setForm({ role: "student", status: "active" });
    toast({ title: "Đã tạo tài khoản", description: `Tài khoản ${newU.name} đã được khởi tạo.` });
  };

  const handleSaveEdit = () => {
    if (!editUser) return;
    setUsers((p) => p.map((u) => (u.id === editUser.id ? editUser : u)));
    toast({ title: "Cập nhật thành công", description: `Đã lưu thay đổi cho ${editUser.name}.` });
    setEditUser(null);
  };

  const toggleStatus = (u: UserRow) => {
    setUsers((p) => p.map((x) => (x.id === u.id ? { ...x, status: x.status === "active" ? "locked" : "active" } : x)));
    toast({ title: u.status === "active" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản", description: u.name });
  };

  const resetPassword = (u: UserRow) => {
    toast({ title: "Đặt lại mật khẩu", description: `Email khôi phục đã được gửi tới ${u.email}` });
  };

  const handleDelete = () => {
    if (!deleteUser) return;
    setUsers((p) => p.filter((u) => u.id !== deleteUser.id));
    toast({ title: "Đã xóa tài khoản", description: deleteUser.name, variant: "destructive" });
    setDeleteUser(null);
  };

  const togglePerm = (perm: Permission) => {
    if (!permUser) return;
    const has = permUser.permissions.includes(perm);
    const next = has ? permUser.permissions.filter((p) => p !== perm) : [...permUser.permissions, perm];
    setPermUser({ ...permUser, permissions: next });
  };

  const savePerms = () => {
    if (!permUser) return;
    setUsers((p) => p.map((u) => (u.id === permUser.id ? permUser : u)));
    toast({ title: "Đã lưu phân quyền", description: `Cập nhật quyền cho ${permUser.name}.` });
    setPermUser(null);
  };

  return (
    <AdminSidebar>
      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý tài khoản & phân quyền</h1>
            <p className="text-muted-foreground mt-1">
              Tạo, chỉnh sửa, khóa và phân quyền cho người dùng trong hệ thống KTX.
            </p>
          </div>
          <Button size="lg" onClick={() => setOpenCreate(true)} className="gap-2">
            <UserPlus className="h-4 w-4" /> Thêm tài khoản
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Tổng tài khoản" value={counts.total} icon={Users} />
          <StatCard title="Quản trị / Quản lý" value={counts.admins} icon={ShieldCheck} />
          <StatCard title="Nhân viên kỹ thuật" value={counts.tech} icon={Wrench} />
          <StatCard title="Sinh viên" value={counts.students} icon={GraduationCap} />
          <StatCard title="Đang bị khóa" value={counts.locked} icon={Lock} />
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên, mã số, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as any)}>
              <SelectTrigger className="lg:w-56"><SelectValue placeholder="Vai trò" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="manager">Quản lý KTX</SelectItem>
                <SelectItem value="tech">Nhân viên kỹ thuật</SelectItem>
                <SelectItem value="student">Sinh viên</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="lg:w-48"><SelectValue placeholder="Trạng thái" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang hoạt động</SelectItem>
                <SelectItem value="locked">Đã khóa</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Liên hệ</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Quyền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Đăng nhập gần nhất</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((u) => {
                    const meta = roleMeta[u.role];
                    const Icon = meta.icon;
                    return (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {u.name.split(" ").slice(-1)[0][0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{u.name}</div>
                              <div className="text-xs text-muted-foreground">{u.code}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{u.email}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5"><Phone className="h-3 w-3" />{u.phone || "—"}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("gap-1.5", meta.color)}>
                            <Icon className="h-3.5 w-3.5" />
                            {meta.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{u.permissions.length} quyền</Badge>
                        </TableCell>
                        <TableCell>
                          {u.status === "active" ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-200 hover:bg-emerald-500/10">
                              <Unlock className="h-3 w-3 mr-1" /> Hoạt động
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
                              <Lock className="h-3 w-3 mr-1" /> Đã khóa
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{u.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button size="sm" variant="ghost" onClick={() => setPermUser(u)} title="Phân quyền">
                              <Shield className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditUser({ ...u })} title="Chỉnh sửa">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => resetPassword(u)} title="Đặt lại mật khẩu">
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => toggleStatus(u)} title={u.status === "active" ? "Khóa" : "Mở khóa"}>
                              {u.status === "active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setDeleteUser(u)} title="Xóa">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                        Không tìm thấy tài khoản phù hợp.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create dialog */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Thêm tài khoản mới</DialogTitle>
            <DialogDescription>Khởi tạo tài khoản và gán vai trò cho người dùng.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Họ và tên</Label>
                <Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Mã số</Label>
                <Input value={form.code || ""} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="SV/CB/KT..." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label>Số điện thoại</Label>
                <Input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Vai trò</Label>
                <Select value={form.role as string} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="manager">Quản lý KTX</SelectItem>
                    <SelectItem value="tech">Nhân viên kỹ thuật</SelectItem>
                    <SelectItem value="student">Sinh viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex items-center justify-between w-full rounded-md border px-3 py-2">
                  <Label className="cursor-pointer">Kích hoạt</Label>
                  <Switch
                    checked={form.status === "active"}
                    onCheckedChange={(v) => setForm({ ...form, status: v ? "active" : "locked" })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenCreate(false)}>Hủy</Button>
            <Button onClick={handleCreate}>Tạo tài khoản</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={!!editUser} onOpenChange={(o) => !o && setEditUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Họ tên</Label>
                  <Input value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                </div>
                <div>
                  <Label>Mã số</Label>
                  <Input value={editUser.code} onChange={(e) => setEditUser({ ...editUser, code: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Email</Label>
                  <Input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Vai trò</Label>
                <Select
                  value={editUser.role}
                  onValueChange={(v) =>
                    setEditUser({ ...editUser, role: v as Role, permissions: ROLE_DEFAULTS[v as Role] })
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="manager">Quản lý KTX</SelectItem>
                    <SelectItem value="tech">Nhân viên kỹ thuật</SelectItem>
                    <SelectItem value="student">Sinh viên</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Thay đổi vai trò sẽ áp dụng lại bộ quyền mặc định của vai trò mới.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>Hủy</Button>
            <Button onClick={handleSaveEdit}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions dialog */}
      <Dialog open={!!permUser} onOpenChange={(o) => !o && setPermUser(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Phân quyền chi tiết
            </DialogTitle>
            <DialogDescription>
              {permUser && (
                <span>
                  Tài khoản: <strong>{permUser.name}</strong> · Vai trò: {roleMeta[permUser.role].label}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          {permUser && (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {ALL_PERMISSIONS.map((p) => {
                const checked = permUser.permissions.includes(p.key);
                return (
                  <label
                    key={p.key}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                      checked ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    )}
                  >
                    <Checkbox checked={checked} onCheckedChange={() => togglePerm(p.key)} className="mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{p.label}</div>
                      <div className="text-xs text-muted-foreground">Nhóm: {p.group} · Mã quyền: {p.key}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPermUser(null)}>Hủy</Button>
            <Button onClick={savePerms}>Lưu phân quyền</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteUser} onOpenChange={(o) => !o && setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa tài khoản?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Tài khoản{" "}
              <strong>{deleteUser?.name}</strong> ({deleteUser?.code}) sẽ bị xóa khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminSidebar>
  );
}
