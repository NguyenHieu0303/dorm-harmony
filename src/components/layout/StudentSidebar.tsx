import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  FileText,
  Home,
  Zap,
  Wrench,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Thông tin cá nhân", url: "/student/profile", icon: User },
  { title: "Đăng ký KTX", url: "/student/register", icon: FileText },
  { title: "Phòng của tôi", url: "/student/room", icon: Home },
  { title: "Tiền điện", url: "/student/electricity", icon: Zap },
  { title: "Báo cáo sửa chữa", url: "/student/repair", icon: Wrench },
];

interface StudentSidebarProps {
  children: React.ReactNode;
}

export function StudentSidebar({ children }: StudentSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 sticky top-0 h-screen",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-sm truncate">ĐẠI HỌC ABC</h1>
                <p className="text-xs text-sidebar-foreground/70">Ký túc xá</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border/30">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Đăng xuất</span>}
          </NavLink>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-card border border-border shadow-sm text-foreground hover:bg-muted"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </aside>

      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
