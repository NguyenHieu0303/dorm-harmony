import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Check, Upload, X, FileText, ArrowRight, CreditCard, ShieldCheck, Camera, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ChatSupport } from "@/components/registration/ChatSupport";
import { DocumentChecklist } from "@/components/registration/DocumentChecklist";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { RegistrationSuccess } from "@/components/registration/RegistrationSuccess";

export interface FormData {
  studentId: string;
  fullName: string;
  dob: string;
  gender: string;
  cccd: string;
  class: string;
  faculty: string;
  email: string;
  phone: string;
  address: string;
  roomType: string;
  building: string;
  selectedRoom: string;
  // Family emergency contact
  familyName: string;
  familyRelation: string;
  familyPhone: string;
  familyAddress: string;
  // Extension info
  isExtension: boolean;
  currentRoom: string;
  currentBuilding: string;
  semestersStayed: number;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  category: string;
}

export default function Registration() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"checklist" | "form" | "success">("checklist");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    fullName: "",
    dob: "",
    gender: "",
    cccd: "",
    class: "",
    faculty: "",
    email: "",
    phone: "",
    address: "",
    roomType: "8",
    building: "",
    familyName: "",
    familyRelation: "",
    familyPhone: "",
    familyAddress: "",
    isExtension: false,
    currentRoom: "",
    currentBuilding: "",
    semestersStayed: 0,
  });

  const handleSubmit = () => {
    setStep("success");
  };

  if (step === "success") {
    return (
      <>
        <RegistrationSuccess formData={formData} navigate={navigate} />
        <ChatSupport />
      </>
    );
  }

  if (step === "form") {
    return (
      <>
        <RegistrationForm
          formData={formData}
          setFormData={setFormData}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          onSubmit={handleSubmit}
          onBack={() => setStep("checklist")}
        />
        <ChatSupport />
      </>
    );
  }

  return (
    <>
      <DocumentChecklist onProceed={() => setStep("form")} />
      <ChatSupport />
    </>
  );
}
