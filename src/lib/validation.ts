import { FormDataType } from "@/types/form";

export function validateStep1(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Student Full Name is required.";
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  if (!data.fatherName.trim()) {
    errors.fatherName = "Father / Guardian Name is required.";
  } else if (data.fatherName.trim().length < 3) {
    errors.fatherName = "Father name must be at least 3 characters.";
  }

  if (!data.cnic.trim()) {
    errors.cnic = "CNIC / B-Form number is required.";
  } else if (data.cnic.length !== 15 || !/^\d{5}-\d{7}-\d{1}$/.test(data.cnic)) {
    errors.cnic = "Please enter a valid 13-digit CNIC (e.g. 35201-1234567-1).";
  }

  if (!data.dob) {
    errors.dob = "Date of Birth is required.";
  } else {
    const birthYear = new Date(data.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age < 14 || age > 50) {
      errors.dob = "Applicant age must be between 14 and 50 years.";
    }
  }

  if (!data.gender) {
    errors.gender = "Please select your gender.";
  }

  if (!data.bloodGroup) {
    errors.bloodGroup = "Please select your blood group.";
  }

  if (!data.nationality.trim()) {
    errors.nationality = "Nationality is required.";
  }

  if (!data.religion.trim()) {
    errors.religion = "Religion is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep2(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address (e.g. name@example.com).";
  }

  if (!data.phone.trim()) {
    errors.phone = "Mobile / WhatsApp number is required.";
  } else if (data.phone.length !== 12 || !/^\d{4}-\d{7}$/.test(data.phone)) {
    errors.phone = "Please enter a valid 11-digit mobile number (e.g. 0300-1234567).";
  }

  if (!data.emergencyContact.trim()) {
    errors.emergencyContact = "Emergency contact number is required.";
  } else if (data.emergencyContact.length !== 12 || !/^\d{4}-\d{7}$/.test(data.emergencyContact)) {
    errors.emergencyContact = "Please enter a valid 11-digit emergency phone number.";
  }

  if (!data.presentAddress.trim()) {
    errors.presentAddress = "Current residential address is required.";
  } else if (data.presentAddress.trim().length < 6) {
    errors.presentAddress = "Please provide complete street address (at least 6 characters).";
  }

  if (!data.sameAsPresent && !data.permanentAddress.trim()) {
    errors.permanentAddress = "Permanent address is required.";
  } else if (!data.sameAsPresent && data.permanentAddress.trim().length < 6) {
    errors.permanentAddress = "Permanent address must be at least 6 characters.";
  }

  if (!data.city) {
    errors.city = "Please select your city.";
  }

  if (!data.province) {
    errors.province = "Please select your province / region.";
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = "Postal Code (ZIP) is required.";
  } else if (data.postalCode.trim().length !== 5 || !/^\d{5}$/.test(data.postalCode.trim())) {
    errors.postalCode = "Please enter a valid 5-digit postal code (e.g. 54000).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep3(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.guardianRelation) {
    errors.guardianRelation = "Please select your relationship with the guardian.";
  }

  if (!data.guardianName.trim()) {
    errors.guardianName = "Guardian's full name is required.";
  } else if (
    data.guardianRelation === "Father" &&
    data.fatherName.trim() &&
    data.guardianName.trim().toLowerCase() !== data.fatherName.trim().toLowerCase()
  ) {
    errors.guardianName = `Guardian name must match Father's Name ("${data.fatherName}") entered in Step 1.`;
  } else if (
    data.guardianRelation === "Self" &&
    data.fullName.trim() &&
    data.guardianName.trim().toLowerCase() !== data.fullName.trim().toLowerCase()
  ) {
    errors.guardianName = `Guardian name must match Student Full Name ("${data.fullName}") entered in Step 1.`;
  }

  if (!data.guardianCnic.trim()) {
    errors.guardianCnic = "Guardian's CNIC number is required.";
  } else if (data.guardianCnic.length !== 15 || !/^\d{5}-\d{7}-\d{1}$/.test(data.guardianCnic)) {
    errors.guardianCnic = "Please enter a valid 13-digit CNIC (e.g. 35201-1234567-1).";
  }

  if (!data.guardianPhone.trim()) {
    errors.guardianPhone = "Guardian's mobile number is required.";
  } else if (data.guardianPhone.length !== 12 || !/^\d{4}-\d{7}$/.test(data.guardianPhone)) {
    errors.guardianPhone = "Please enter a valid 11-digit mobile number (e.g. 0300-1234567).";
  }

  if (!data.guardianOccupation) {
    errors.guardianOccupation = "Please select guardian's occupation.";
  }

  if (!data.guardianIncome) {
    errors.guardianIncome = "Please select monthly household income bracket.";
  }

  if (!data.guardianAddress.trim()) {
    errors.guardianAddress = "Guardian's workplace / office address is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep4(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.matricBoard) {
    errors.matricBoard = "Matric examination board is required.";
  }

  if (!data.matricRollNo.trim()) {
    errors.matricRollNo = "Matric roll number is required.";
  } else if (data.matricRollNo.trim().length < 4) {
    errors.matricRollNo = "Matric roll number must be at least 4 digits.";
  }

  if (!data.matricYear) {
    errors.matricYear = "Matric passing year is required.";
  }

  const matricObt = parseFloat(data.matricObtMarks);
  const matricTotal = parseFloat(data.matricTotalMarks);
  if (!data.matricTotalMarks.trim() || isNaN(matricTotal) || matricTotal <= 0) {
    errors.matricTotalMarks = "Total SSC marks are required.";
  }
  if (!data.matricObtMarks.trim() || isNaN(matricObt) || matricObt <= 0) {
    errors.matricObtMarks = "Please enter valid SSC obtained marks.";
  } else if (!isNaN(matricTotal) && matricObt > matricTotal) {
    errors.matricObtMarks = "Obtained marks cannot exceed total marks.";
  }

  if (!data.interBoard) {
    errors.interBoard = "Intermediate examination board is required.";
  }

  if (!data.interGroup) {
    errors.interGroup = "Intermediate academic group is required.";
  }

  if (!data.interRollNo.trim()) {
    errors.interRollNo = "Intermediate roll number is required.";
  } else if (data.interRollNo.trim().length < 4) {
    errors.interRollNo = "Intermediate roll number must be at least 4 digits.";
  }

  if (!data.interYear) {
    errors.interYear = "Intermediate passing year is required.";
  }

  const interObt = parseFloat(data.interObtMarks);
  const interTotal = parseFloat(data.interTotalMarks);
  if (!data.interTotalMarks.trim() || isNaN(interTotal) || interTotal <= 0) {
    errors.interTotalMarks = "Total HSSC marks are required.";
  }
  if (!data.interObtMarks.trim() || isNaN(interObt) || interObt <= 0) {
    errors.interObtMarks = "Please enter valid HSSC obtained marks.";
  } else if (!isNaN(interTotal) && interObt > interTotal) {
    errors.interObtMarks = "Obtained marks cannot exceed total marks.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep5(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.degreeLevel) {
    errors.degreeLevel = "Please select a degree level.";
  }

  if (!data.program) {
    errors.program = "Please select your primary program of choice.";
  }

  if (!data.secondaryProgram) {
    errors.secondaryProgram = "Please select a 2nd preference program.";
  }

  if (!data.referralSource) {
    errors.referralSource = "Please select how you learned about Christian College Business Arts & Technology (CCBAT).";
  }

  if (!data.shift) {
    errors.shift = "Please select morning or evening shift.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep6(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.photoUrl) {
    errors.photoUrl = "Passport-sized photograph is required.";
  }

  if (!data.cnicDocUrl) {
    errors.cnicDocUrl = "Applicant CNIC / B-Form copy is required.";
  }

  if (!data.guardianCnicDocUrl) {
    errors.guardianCnicDocUrl = "Father / Guardian CNIC copy is required.";
  }

  if (!data.matricDocUrl) {
    errors.matricDocUrl = "Matriculation (SSC) marksheet is required.";
  }

  if (!data.interDocUrl) {
    errors.interDocUrl = "Intermediate (HSSC) marksheet / Hope certificate is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep7(data: FormDataType): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.agreeTerms) {
    errors.agreeTerms = "You must agree to the institutional rules and terms of admission.";
  }

  if (!data.accuracyDeclaration) {
    errors.accuracyDeclaration = "You must confirm that all submitted details and records are accurate.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
