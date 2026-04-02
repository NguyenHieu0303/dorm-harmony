import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/student/Registration";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import RoomResult from "./pages/student/RoomResult";
import Electricity from "./pages/student/Electricity";
import RepairReport from "./pages/student/RepairReport";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ApplicationManagement from "./pages/admin/ApplicationManagement";
import RoomManagement from "./pages/admin/RoomManagement";
import BillingManagement from "./pages/admin/BillingManagement";
import RepairManagement from "./pages/admin/RepairManagement";
import AdminProfile from "./pages/admin/AdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          
          {/* Student Routes */}
          <Route path="/student/profile" element={<StudentDashboard />} />
          <Route path="/student/register" element={<Registration />} />
          <Route path="/student/room" element={<RoomResult />} />
          <Route path="/student/electricity" element={<Electricity />} />
          <Route path="/student/repair" element={<RepairReport />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<ApplicationManagement />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/billing" element={<BillingManagement />} />
          <Route path="/admin/repairs" element={<RepairManagement />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
