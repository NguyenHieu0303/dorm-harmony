import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2, Bell, BookOpen, Info, Phone, LogIn, ArrowRight, Sparkles,
  Users, MessageSquare, Star, Wifi, ShirtIcon, Car, UtensilsCrossed,
  GraduationCap, Dumbbell, ShieldCheck, Camera, Calendar, FileText,
  Upload, CreditCard, KeyRound, MapPin, Mail, Clock, Facebook,
  CheckCircle2, AlertCircle, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/dorm-hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const nav = [
  { label: "Trang chủ", href: "#home" },
  { label: "Thông báo", href: "#announcements" },
  { label: "Hướng dẫn đăng ký", href: "#guide" },
  { label: "Giới thiệu", href: "#services" },
  { label: "Liên hệ", href: "#contact" },
];

const stats = [
  { icon: Building2, value: "1200+", label: "Chỗ ở", color: "text-primary bg-primary/10" },
  { icon: GraduationCap, value: "980", label: "Sinh viên đang ở", color: "text-secondary bg-secondary/10" },
  { icon: Bell, value: "15", label: "Thông báo mới", color: "text-warning bg-warning/10" },
  { icon: Star, value: "98%", label: "Mức độ hài lòng", color: "text-success bg-success/10" },
];

const announcements = [
  { title: "Thông báo mở đăng ký KTX học kỳ I 2026-2027", date: "01/07/2026", type: "Tuyển sinh", badge: { label: "Mới", variant: "default" as const }, summary: "Nhà trường thông báo mở cổng đăng ký KTX trực tuyến cho sinh viên toàn trường từ ngày 01/07/2026.", icon: Sparkles },
  { title: "Danh sách sinh viên đủ điều kiện ở KTX đợt 1", date: "12/07/2026", type: "Xét duyệt", badge: { label: "Quan trọng", variant: "secondary" as const }, summary: "Phòng Công tác Sinh viên công bố danh sách sinh viên đạt điểm xét duyệt được phân phòng đợt 1.", icon: CheckCircle2 },
  { title: "Đóng cổng đăng ký KTX trực tuyến", date: "05/07/2026", type: "Thông báo", badge: { label: "Khẩn", variant: "destructive" as const }, summary: "Hệ thống sẽ đóng cổng đăng ký lúc 23:59 ngày 05/07/2026. Sinh viên hoàn tất hồ sơ trước hạn.", icon: AlertCircle },
  { title: "Lịch thanh toán tiền phòng học kỳ I", date: "20/07/2026", type: "Tài chính", badge: { label: "Mới", variant: "default" as const }, summary: "Hướng dẫn các phương thức thanh toán online qua VNPay, MoMo và chuyển khoản ngân hàng.", icon: CreditCard },
  { title: "Lịch kiểm tra phòng định kỳ tháng 8", date: "25/07/2026", type: "Quản lý", badge: { label: "Quan trọng", variant: "secondary" as const }, summary: "Cán bộ KTX sẽ kiểm tra vệ sinh, an toàn PCCC tại các phòng trong tuần cuối tháng 8.", icon: ShieldCheck },
  { title: "Hướng dẫn nhận phòng và bàn giao tài sản", date: "25/07/2026", type: "Hướng dẫn", badge: { label: "Mới", variant: "default" as const }, summary: "Quy trình nhận phòng, kiểm kê tài sản và ký biên bản bàn giao tại văn phòng KTX.", icon: KeyRound },
];

const timeline = [
  { date: "01/07", title: "Mở đăng ký", icon: Sparkles },
  { date: "05/07", title: "Hạn cuối đăng ký", icon: AlertCircle },
  { date: "10/07", title: "Xét duyệt hồ sơ", icon: FileText },
  { date: "15/07", title: "Công bố kết quả", icon: CheckCircle2 },
  { date: "20/07", title: "Thanh toán", icon: CreditCard },
  { date: "25/07", title: "Nhận phòng", icon: KeyRound },
];

const steps = [
  { n: 1, title: "Đăng nhập", desc: "Sử dụng tài khoản sinh viên do nhà trường cấp", icon: LogIn },
  { n: 2, title: "Điền hồ sơ", desc: "Khai báo thông tin cá nhân, gia đình và nguyện vọng", icon: FileText },
  { n: 3, title: "Tải minh chứng", desc: "Upload giấy tờ ưu tiên, hộ khẩu, ảnh thẻ", icon: Upload },
  { n: 4, title: "Theo dõi xét duyệt", desc: "Nhận thông báo trạng thái hồ sơ realtime", icon: Bell },
  { n: 5, title: "Thanh toán & nhận phòng", desc: "Thanh toán online và đến nhận phòng", icon: KeyRound },
];

const services = [
  { icon: Wifi, label: "Wifi tốc độ cao" },
  { icon: ShirtIcon, label: "Giặt sấy tự động" },
  { icon: Car, label: "Nhà xe có mái che" },
  { icon: UtensilsCrossed, label: "Căng tin sinh viên" },
  { icon: BookOpen, label: "Phòng tự học" },
  { icon: Dumbbell, label: "Khu thể thao" },
  { icon: ShieldCheck, label: "An ninh 24/7" },
  { icon: Camera, label: "Camera giám sát" },
];

const gallery = [
  { src: g1, alt: "Khuôn viên KTX", className: "row-span-2" },
  { src: g2, alt: "Phòng ở sinh viên", className: "" },
  { src: g3, alt: "Căng tin", className: "" },
  { src: g4, alt: "Sân thể thao", className: "row-span-2" },
  { src: g5, alt: "Phòng tự học", className: "" },
  { src: g6, alt: "Nhà xe", className: "" },
];

const faqs = [
  { q: "Điều kiện đăng ký ở KTX là gì?", a: "Sinh viên chính quy đang theo học tại trường, có nhu cầu ở KTX và cam kết tuân thủ nội quy ký túc xá." },
  { q: "Đối tượng nào được ưu tiên xét duyệt?", a: "Sinh viên thuộc diện chính sách, con thương binh liệt sĩ, hộ nghèo, sinh viên vùng sâu vùng xa, sinh viên có thành tích học tập xuất sắc." },
  { q: "Hồ sơ đăng ký cần những giấy tờ gì?", a: "Đơn đăng ký (theo mẫu), bản scan CCCD, ảnh thẻ 3x4, giấy tờ chứng minh đối tượng ưu tiên (nếu có)." },
  { q: "Sinh viên có thể đổi phòng sau khi nhận không?", a: "Có thể, sinh viên nộp đơn xin đổi phòng tại văn phòng KTX và được xem xét tùy theo tình trạng phòng trống." },
  { q: "Các phương thức thanh toán tiền phòng?", a: "Thanh toán online qua VNPay, MoMo, ZaloPay, chuyển khoản ngân hàng hoặc nộp trực tiếp tại văn phòng KTX." },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-card shrink-0">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight min-w-0 hidden sm:block">
              <p className="text-[11px] font-semibold tracking-wider text-primary uppercase truncate">
                Smart Dormitory
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                ĐH Sư phạm Kỹ thuật
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link to="/login">
                <LogIn className="h-4 w-4" />
                Đăng nhập
              </Link>
            </Button>
            <Button asChild size="sm" className="hidden md:inline-flex shadow-card">
              <Link to="/register">
                Đăng ký KTX
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/60 animate-fade-in">
            <div className="container py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                >
                  {n.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link to="/register">Đăng ký KTX</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-background to-background" />
          <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary py-1.5 px-3">
              <Sparkles className="h-3.5 w-3.5" />
              Đăng ký KTX học kỳ I 2026-2027 đã mở
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Chào mừng đến với{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Hệ thống Quản lý Ký túc xá Thông minh
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Đăng ký ký túc xá trực tuyến, theo dõi hồ sơ, nhận thông báo,
              thanh toán online và quản lý chỗ ở nhanh chóng, minh bạch.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-elevated">
                <Link to="/register">
                  Đăng ký KTX <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#announcements">
                  <Bell className="h-4 w-4" /> Xem thông báo
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                100% online
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Minh bạch
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Realtime
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-20" />
            <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-elevated">
              <img
                src={heroImg}
                alt="Khu ký túc xá hiện đại"
                width={1280}
                height={960}
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-xl rounded-2xl p-4 border border-border/60 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-success/15 text-success flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">Đang nhận đăng ký</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Còn 220 chỗ trống cho học kỳ I
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground">Live</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container -mt-6 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s, i) => (
            <Card
              key={s.label}
              className="group border-border/60 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardContent className="p-6">
                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", s.color)}>
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section id="announcements" className="container mb-24">
        <SectionHeader
          eyebrow="Thông báo"
          title="Thông báo mới nhất"
          desc="Cập nhật liên tục các tin tức quan trọng từ Ban Quản lý Ký túc xá"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((a) => (
            <Card key={a.title} className="group border-border/60 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <Badge variant={a.badge.variant}>{a.badge.label}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {a.date}
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>{a.type}</span>
                </div>
                <h3 className="font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{a.summary}</p>
                <Button variant="ghost" size="sm" className="mt-auto self-start px-0 hover:bg-transparent hover:text-primary">
                  Xem chi tiết <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-gradient-to-b from-accent/30 to-transparent py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Lịch trình"
            title="Lịch đăng ký KTX"
            desc="Các mốc thời gian quan trọng sinh viên cần ghi nhớ"
          />
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {timeline.map((t, i) => (
                <div key={t.date} className="relative flex flex-col items-center text-center group">
                  <div className="h-16 w-16 rounded-2xl bg-card border-2 border-primary/30 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-card flex items-center justify-center transition-all duration-300 relative z-10">
                    <t.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-lg font-bold text-primary">{t.date}</p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                  {i < timeline.length - 1 && (
                    <ArrowRight className="hidden md:block lg:hidden absolute -right-3 top-6 h-4 w-4 text-primary/40" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE STEPS */}
      <section id="guide" className="container py-24">
        <SectionHeader
          eyebrow="Hướng dẫn"
          title="5 bước đăng ký dễ dàng"
          desc="Quy trình đăng ký KTX trực tuyến đơn giản, nhanh chóng"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s) => (
            <Card key={s.n} className="relative overflow-hidden border-border/60 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <span className="absolute -top-2 -right-2 text-7xl font-bold text-primary/5 select-none">
                  {s.n}
                </span>
                <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-card mb-4">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-1">
                  Bước {s.n}
                </p>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container pb-24">
        <SectionHeader
          eyebrow="Dịch vụ"
          title="Tiện ích Ký túc xá"
          desc="Đầy đủ tiện nghi hiện đại phục vụ sinh viên sinh hoạt và học tập"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s) => (
            <Card key={s.label} className="group border-border/60 shadow-card hover:shadow-elevated hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-14 w-14 mx-auto rounded-2xl bg-accent text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="font-medium text-sm">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="container pb-24">
        <SectionHeader
          eyebrow="Thư viện"
          title="Hình ảnh ký túc xá"
          desc="Khám phá khuôn viên và cơ sở vật chất hiện đại"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
          {gallery.map((g) => (
            <div
              key={g.alt}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border/60 shadow-card group cursor-pointer",
                g.className,
              )}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="absolute bottom-3 left-4 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {g.alt}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-transparent to-accent/30 py-24">
        <div className="container max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Câu hỏi thường gặp"
            desc="Những thắc mắc phổ biến của sinh viên và phụ huynh"
          />
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-2 md:p-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border/60 last:border-0">
                    <AccordionTrigger className="px-4 text-left font-medium hover:no-underline hover:text-primary">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container py-24">
        <SectionHeader
          eyebrow="Liên hệ"
          title="Thông tin liên hệ"
          desc="Liên hệ Ban Quản lý Ký túc xá để được hỗ trợ"
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border/60 shadow-card">
            <CardContent className="p-8 space-y-5">
              <ContactRow icon={MapPin} label="Địa chỉ" value="01 Võ Văn Ngân, Thủ Đức, TP. Hồ Chí Minh" />
              <ContactRow icon={Phone} label="Điện thoại" value="(028) 3896 8641" />
              <ContactRow icon={Mail} label="Email" value="ktx@hcmute.edu.vn" />
              <ContactRow icon={Clock} label="Giờ làm việc" value="Thứ 2 - Thứ 6: 7:30 - 17:00" />
              <div className="flex gap-3 pt-2">
                <Button asChild>
                  <Link to="/register">Đăng ký ngay <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4" /> Gửi tin nhắn
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-card overflow-hidden">
            <div className="relative h-full min-h-[320px] bg-accent/40 flex items-center justify-center">
              <iframe
                title="Bản đồ KTX"
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.7686%2C10.8492%2C106.7726%2C10.8512&layer=mapnik"
                className="w-full h-full min-h-[320px] border-0"
                loading="lazy"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-card/50">
        <div className="container py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Smart Dormitory</p>
                <p className="text-xs text-muted-foreground">ĐH Sư phạm Kỹ thuật</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Hệ thống quản lý ký túc xá hiện đại, minh bạch và thân thiện với sinh viên.
            </p>
          </div>
          <FooterCol title="Liên kết nhanh" items={["Trang chủ", "Thông báo", "Hướng dẫn đăng ký", "Liên hệ"]} />
          <FooterCol title="Pháp lý" items={["Điều khoản sử dụng", "Chính sách bảo mật", "Nội quy KTX", "Quy chế đăng ký"]} />
          <div className="space-y-3">
            <p className="text-sm font-semibold">Kết nối</p>
            <div className="flex gap-2">
              <a href="#" className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Hotline: <span className="font-medium text-foreground">1900 1234</span></p>
            <p className="text-sm text-muted-foreground">Email: <span className="font-medium text-foreground">ktx@hcmute.edu.vn</span></p>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© 2026 Trường Đại học Sư phạm Kỹ thuật. All rights reserved.</p>
            <p>Made with care for HCMUTE students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-2xl mb-10">
      <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
