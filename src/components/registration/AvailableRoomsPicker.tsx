import { useEffect, useMemo, useState } from "react";
import { Bed, RefreshCw, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Room {
  id: string;
  number: string;
  floor: number;
  capacity: number;
  occupied: number;
}

interface Props {
  building: string;
  roomType: string;
  selected: string;
  onSelect: (roomId: string) => void;
}

// Mock realtime data generator (deterministic per building+type, with random churn)
function generateRooms(building: string, roomType: string): Room[] {
  if (!building || !roomType) return [];
  const prefix = building.replace("Tòa ", "");
  const cap = parseInt(roomType);
  const rooms: Room[] = [];
  for (let floor = 1; floor <= 5; floor++) {
    for (let n = 1; n <= 6; n++) {
      const num = `${prefix}${floor}0${n}`;
      // Random occupied count, sometimes full
      const occupied = Math.min(cap, Math.floor(Math.random() * (cap + 1)));
      rooms.push({
        id: num,
        number: num,
        floor,
        capacity: cap,
        occupied,
      });
    }
  }
  return rooms;
}

export function AvailableRoomsPicker({ building, roomType, selected, onSelect }: Props) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = () => {
    if (!building || !roomType) {
      setRooms([]);
      return;
    }
    setLoading(true);
    // Simulate network/realtime fetch
    setTimeout(() => {
      setRooms(generateRooms(building, roomType));
      setLastUpdated(new Date());
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building, roomType]);

  // Realtime polling every 8s to mimic live updates
  useEffect(() => {
    if (!building || !roomType) return;
    const t = setInterval(() => {
      setRooms((prev) =>
        prev.map((r) => {
          // Slight occupancy fluctuation
          const delta = Math.random() < 0.15 ? (Math.random() < 0.5 ? -1 : 1) : 0;
          const occ = Math.max(0, Math.min(r.capacity, r.occupied + delta));
          return { ...r, occupied: occ };
        }),
      );
      setLastUpdated(new Date());
    }, 8000);
    return () => clearInterval(t);
  }, [building, roomType]);

  const available = useMemo(() => rooms.filter((r) => r.occupied < r.capacity), [rooms]);

  if (!building || !roomType) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-lg border border-dashed text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4" />
        Vui lòng chọn tòa nhà và loại phòng để xem các phòng còn trống.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          Cập nhật trực tiếp · Còn trống:{" "}
          <span className="font-semibold text-foreground">{available.length}</span> / {rooms.length} phòng
          {lastUpdated && (
            <span className="text-xs">
              · {lastUpdated.toLocaleTimeString("vi-VN")}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={refresh} disabled={loading} className="gap-1">
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          Làm mới
        </Button>
      </div>

      {loading && rooms.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {rooms.map((r) => {
            const full = r.occupied >= r.capacity;
            const isSelected = selected === r.id;
            const slots = r.capacity - r.occupied;
            return (
              <button
                key={r.id}
                type="button"
                disabled={full}
                onClick={() => onSelect(r.id)}
                className={cn(
                  "relative text-left border rounded-lg p-3 transition-all",
                  full && "opacity-50 cursor-not-allowed bg-muted",
                  !full && "hover:border-primary hover:shadow-sm cursor-pointer",
                  isSelected && "border-primary bg-primary/5 ring-2 ring-primary/30",
                )}
              >
                {isSelected && (
                  <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <Bed className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{r.number}</span>
                </div>
                <div className="text-xs text-muted-foreground">Tầng {r.floor}</div>
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <Users className="h-3 w-3" />
                  <span className={cn(full ? "text-destructive font-medium" : "text-success font-medium")}>
                    {full ? "Đã đầy" : `Còn ${slots}/${r.capacity} chỗ`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
