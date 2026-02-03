import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  RefreshCw,
  Check,
  AlertCircle,
  User,
  Lightbulb,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FaceVerificationProps {
  onCapture: (imageData: string) => void;
  onBack?: () => void;
  capturedImage?: string;
}

type VerificationStatus = "idle" | "detecting" | "success" | "error";

export function FaceVerification({ onCapture, onBack, capturedImage }: FaceVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [localCapturedImage, setLocalCapturedImage] = useState<string | null>(capturedImage || null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStatus("detecting");
    } catch (err) {
      setError("Không thể truy cập camera. Vui lòng cấp quyền truy cập camera.");
      setStatus("error");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    if (!capturedImage) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, []);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL("image/jpeg", 0.9);
      setLocalCapturedImage(imageData);
      setStatus("success");
      stopCamera();
    }
  };

  const retake = () => {
    setLocalCapturedImage(null);
    setStatus("idle");
    startCamera();
  };

  const confirmCapture = () => {
    if (localCapturedImage) {
      onCapture(localCapturedImage);
    }
  };

  const guidelines = [
    { icon: Eye, text: "Nhìn thẳng vào camera" },
    { icon: User, text: "Chỉ có một người trong khung hình" },
    { icon: Lightbulb, text: "Đảm bảo đủ ánh sáng" },
    { icon: AlertCircle, text: "Không che mặt" },
  ];

  return (
    <div className="space-y-6">
      {/* Guidelines */}
      <Card className="bg-accent/30 border-accent">
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3">Hướng dẫn chụp ảnh</h3>
          <div className="grid grid-cols-2 gap-3">
            {guidelines.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Camera / Captured Image */}
      <div className="relative aspect-[4/3] max-w-md mx-auto rounded-2xl overflow-hidden bg-muted">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-destructive font-medium">{error}</p>
            <Button onClick={startCamera} variant="outline" className="mt-4">
              Thử lại
            </Button>
          </div>
        ) : localCapturedImage ? (
          <img
            src={localCapturedImage}
            alt="Captured face"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Face Detection Frame */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={cn(
                  "w-48 h-60 border-4 rounded-[50%] transition-colors duration-300",
                  status === "detecting" ? "border-primary animate-pulse" : "border-white/50"
                )}
              />
            </div>
            {/* Status Indicator */}
            {status === "detecting" && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 px-4 py-2 rounded-full text-sm">
                <span className="text-primary font-medium">Đang nhận diện khuôn mặt...</span>
              </div>
            )}
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {localCapturedImage ? (
          <>
            <Button variant="outline" onClick={retake}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Chụp lại
            </Button>
            <Button onClick={confirmCapture}>
              <Check className="h-4 w-4 mr-2" />
              Xác nhận & Hoàn tất
            </Button>
          </>
        ) : (
          <Button onClick={captureImage} disabled={status === "error" || status === "idle"} size="lg">
            <Camera className="h-5 w-5 mr-2" />
            Chụp ảnh khuôn mặt
          </Button>
        )}
      </div>

      {/* Success Message */}
      {localCapturedImage && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm">
            <Check className="h-4 w-4" />
            <span>Ảnh khuôn mặt đã được chụp thành công</span>
          </div>
        </div>
      )}
    </div>
  );
}
