export interface FormDataType {
  // Step 1: Personal Information
  fullName: string;
  fatherName: string;
  dob: string;
  gender: "Male" | "Female" | "Other" | "";
  cnic: string;
  bloodGroup: string;
  nationality: string;
  religion: string;

  // Step 2: Contact & Address Details
  email: string;
  phone: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;
  sameAsPresent: boolean;
  city: string;
  province: string;
  postalCode: string;

  // Step 3: Parent / Guardian Details
  guardianName: string;
  guardianRelation: string;
  guardianCnic: string;
  guardianPhone: string;
  guardianOccupation: string;
  guardianIncome: string;
  guardianAddress: string;

  // Step 4: Academic Records
  matricBoard: string;
  matricRollNo: string;
  matricYear: string;
  matricTotalMarks: string;
  matricObtMarks: string;
  matricPercentage: string;

  interBoard: string;
  interRollNo: string;
  interYear: string;
  interGroup: string;
  interTotalMarks: string;
  interObtMarks: string;
  interPercentage: string;

  // Step 5: Program & Degree Selection
  degreeLevel: string;
  program: string;
  secondaryProgram: string;
  referralSource: string;
  shift: "Morning" | "Evening" | "";

  // Step 6: Documents Upload
  photoUrl: string;
  cnicDocUrl: string;
  guardianCnicDocUrl: string;
  matricDocUrl: string;
  interDocUrl: string;

  // Step 7: Undertaking
  agreeTerms: boolean;
  accuracyDeclaration: boolean;
}

export const initialFormData: FormDataType = {
  fullName: "",
  fatherName: "",
  dob: "",
  gender: "",
  cnic: "",
  bloodGroup: "",
  nationality: "Pakistani",
  religion: "Islam",

  email: "",
  phone: "",
  emergencyContact: "",
  presentAddress: "",
  permanentAddress: "",
  sameAsPresent: false,
  city: "Lahore",
  province: "Punjab",
  postalCode: "",

  guardianName: "",
  guardianRelation: "Father",
  guardianCnic: "",
  guardianPhone: "",
  guardianOccupation: "",
  guardianIncome: "",
  guardianAddress: "",

  matricBoard: "BISE Lahore",
  matricRollNo: "",
  matricYear: "2024",
  matricTotalMarks: "1100",
  matricObtMarks: "",
  matricPercentage: "0",

  interBoard: "BISE Lahore",
  interRollNo: "",
  interYear: "2026",
  interGroup: "Pre-Engineering",
  interTotalMarks: "1100",
  interObtMarks: "",
  interPercentage: "0",

  degreeLevel: "Undergraduate (BS - 4 Years)",
  program: "BS Computer Science",
  secondaryProgram: "BS Software Engineering",
  referralSource: "University Website / Search",
  shift: "Morning",

  photoUrl: "",
  cnicDocUrl: "",
  guardianCnicDocUrl: "",
  matricDocUrl: "",
  interDocUrl: "",

  agreeTerms: false,
  accuracyDeclaration: false,
};

export interface StepItem {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
}

export const FORM_STEPS: StepItem[] = [
  { id: 1, title: "Personal Details", shortTitle: "Personal", description: "Name, CNIC & DOB" },
  { id: 2, title: "Contact & Address", shortTitle: "Contact", description: "Phone, Email & City" },
  { id: 3, title: "Guardian Details", shortTitle: "Guardian", description: "Parent / Sponsor Info" },
  { id: 4, title: "Academic Records", shortTitle: "Academic", description: "Matric & Inter Marks" },
  { id: 5, title: "Program Selection", shortTitle: "Program", description: "Choice of Degree" },
  { id: 6, title: "Upload Documents", shortTitle: "Documents", description: "Photo, CNIC & Docs" },
  { id: 7, title: "Review & Submit", shortTitle: "Review", description: "Verification & Undertaking" },
];
