import { FileText, CreditCard, ShieldCheck, Camera, Info, ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DocumentChecklistProps {
  onProceed: () => void;
}

const documents = [
  {
    id: 1,
    title: "Thẻ Căn cước công dân / Căn cước",
    description: "Có thể sử dụng hình ảnh thẻ được trích xuất từ VNeID",
    icon: CreditCard,
  },
  {
    id: 2,
    title: "Thẻ Bảo hiểm Y tế",
    description: "Có thể lấy từ ứng dụng VssID, VNeID hoặc chụp hình thẻ giấy",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Hình ảnh minh chứng trúng tuyển, nhập học / thẻ sinh viên",
    description: "",
    icon: FileText,
  },
  {
    id: 4,
    title: "Ảnh chân dung",
    description: "Ảnh rõ mặt, nền sáng, đúng chuẩn để phục vụ công tác quản lý",
    icon: Camera,
  },
];

export function DocumentChecklist({ onProceed }: DocumentChecklistProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-none bg-primary text-primary-foreground">
          <CardContent className="p-6 flex items-center gap-4">
            <FileText className="h-8 w-8 shrink-0" />
            <div>
              <h1 className="text-xl font-bold">
                Lưu ý hồ sơ cần chuẩn bị trước khi điền thông tin đăng ký ở Ký túc xá trực tuyến
              </h1>
            </div>
          </CardContent>
        </Card>

        {/* Info banner */}
        <Card className="mb-6 border-primary/20 bg-accent">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Để đảm bảo quá trình đăng ký được thuận tiện và nhanh chóng, sinh viên vui lòng chuẩn bị đầy đủ các file hình ảnh sau:
            </p>
          </CardContent>
        </Card>

        {/* Document list */}
        <Card className="mb-6">
          <CardContent className="p-0 divide-y divide-border">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-start gap-4 p-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  {doc.id}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{doc.title}</p>
                  {doc.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">({doc.description})</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="mb-8 border-warning/30 bg-warning/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-warning mb-2">Lưu ý:</p>
                <p className="text-sm text-foreground mb-2">
                  Sinh viên tải minh chứng đã làm thủ tục nhập học tại CSĐT:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-foreground">Tân sinh viên:</span>{" "}
                    Hình giấy xác nhận nhập học trên cổng thông tin của Bộ Giáo dục & Đào tạo, biên nhận hồ sơ nhập học, giấy xác nhận nhập học, đơn đăng ký ở KTX, giấy giới thiệu, giấy xác nhận, giấy chứng nhận của CSĐT, biên nhận tiền, thẻ sinh viên,…
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Sinh viên năm 2 trở lên:</span>{" "}
                    Hình thẻ sinh viên
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action */}
        <div className="flex justify-end">
          <Button size="lg" onClick={onProceed} className="gap-2">
            Tiến hành đăng ký
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
