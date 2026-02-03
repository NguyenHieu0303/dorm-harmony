import { Card, CardContent } from "@/components/ui/card";
import { User, Check, AlertCircle, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface FacePreviewCardProps {
  imageData?: string;
  isVerified?: boolean;
  className?: string;
}

export function FacePreviewCard({ imageData, isVerified, className }: FacePreviewCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Xác thực khuôn mặt
        </h3>

        <div className="aspect-square max-w-[200px] mx-auto rounded-xl overflow-hidden bg-muted mb-4">
          {imageData ? (
            <img
              src={imageData}
              alt="Face preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <User className="h-16 w-16 mb-2 opacity-50" />
              <span className="text-sm">Chưa có ảnh</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="text-center">
          {isVerified ? (
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm">
              <Check className="h-4 w-4" />
              <span>Đã xác thực thành công</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Chưa xác thực</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
