import { cn } from "@/lib/utils";

type StatusType = "pending" | "approved" | "rejected" | "processing" | "completed";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: "Chờ duyệt",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  approved: {
    label: "Đã duyệt",
    className: "bg-success/15 text-success border-success/30",
  },
  rejected: {
    label: "Từ chối",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  processing: {
    label: "Đang xử lý",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  completed: {
    label: "Hoàn thành",
    className: "bg-success/15 text-success border-success/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
