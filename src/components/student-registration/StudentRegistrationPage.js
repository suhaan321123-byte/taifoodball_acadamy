// app/student-registration/page.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import RegistrationStepper from "./RegistrationStepper";
import PersonalProfileStep from "./PersonalProfileStep";
import CourseSelectionStep, { getPlanPricing } from "./CourseSelectionStep";
import AdmissionDetailsStep from "./AdmissionDetailsStep";
import AdmissionSuccessPage from "./AdmissionSuccessPage";
import {
  getGroupsOfCoursesApi,
  registerCourseApi,
  verifyCourseSubscriptionPaymentApi,
} from "../../api/businessWebsite/classRoom/customers/customersApis";
import { uploadImageApi } from "../../api/cloudinary/cloudinary";
import { useRouter } from "next/navigation";
import { getStudentBranchesApi } from "../../api/businessWebsite/studentApi/studentApi";

const accountTypeId = process.env.NEXT_PUBLIC_ACCOUNT_TYPE_ID || "";

const normalizeMoney = (value) => {
  const amount = Number(value || 0);
  if (!Number.isFinite(amount)) return 0;
  return Math.max(amount, 0);
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const initialForm = {
  courseFlowType: "new_course",
  studentId: "",
  branchIds: "",
  courseId: "",
  planId: "",
  startDate: new Date().toISOString().slice(0, 10),
  name: "",
  gender: "",
  dateOfBirth: "",
  admissionDate: "",
  image: "",
  countryCode: "+91",
  contact: "",
  email: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  relationship: "",
  bloodGroup: "",
  guardianName: "",
  guardianPhone: "",
  guardianRelationship: "",
  notes: "",
  estimatedDurationCount: "1",
  workingDays: [],
  profilePhoto: null,
  paymentOption: "online",
};

export default function StudentRegistrationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();
  const [error, setError] = useState(null);

  const selectedPlan = useMemo(() => {
    if (!selectedCourse) return null;
    return (
      selectedCourse.subscriptionPlans?.find((plan) => String(plan?._id) === String(form.planId)) ||
      selectedCourse.subscriptionPlans?.[0] ||
      null
    );
  }, [selectedCourse, form.planId]);

  const isRecurringCourse = useMemo(() => {
    if (!selectedCourse) return false;
    return (
      String(selectedCourse?.billingConfig?.feeModel || "")
        .trim()
        .toLowerCase() === "recurring"
    );
  }, [selectedCourse]);

  const pricingSummary = useMemo(
    () => getPlanPricing(selectedPlan, selectedCourse, isRecurringCourse, form.estimatedDurationCount),
    [form.estimatedDurationCount, isRecurringCourse, selectedCourse, selectedPlan],
  );

  const fetchCourses = async () => {
    try {
      const response = await getGroupsOfCoursesApi({
        accountTypeId,
        limit: 50,
      });

      if (response?.success && response.data && response.data.length > 0) {
        setCourses(response.data);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Error fetching popular courses:", err);
      setCourses([]);
    }
  };

  const getBranches = async () => {
    try {
      const response = await getStudentBranchesApi({
        accountTypeId,
      });
      if (response.success) {
        const branchList = response?.branches;
        setBranches(
          Array.isArray(branchList)
            ? branchList
            : Array.isArray(branchList?.data)
              ? branchList.data
              : [],
        );
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    Promise.all([getBranches(), fetchCourses()]).finally(() => setLoadingOptions(false));
  }, []);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.name || !form.name.trim()) {
      errors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!form.contact || form.contact.length < 10) {
      errors.contact = "Valid 10-digit phone number is required";
    }

    if (!form.email || !form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!form.gender) {
      errors.gender = "Please select your gender";
    }

    if (!form.guardianName || !form.guardianName.trim()) {
      errors.guardianName = "Guardian name is required";
    }

    if (!form.guardianRelationship || !form.guardianRelationship.trim()) {
      errors.guardianRelationship = "Please select guardian relationship";
    }

    if (!form.branchIds) {
      errors.branchIds = "Please select a branch";
    }

    if (!form.courseId) {
      errors.courseId = "Please select a course";
    }

    if (!form.planId) {
      errors.planId = "Please select a package";
    }

    if (form.emergencyContactName && !form.emergencyContactName.trim()) {
      errors.emergencyContactName = "Emergency contact name is required if provided";
    }

    if (form.emergencyContactPhone && form.emergencyContactPhone.length < 10) {
      errors.emergencyContactPhone = "Valid 10-digit phone number is required";
    }

    return errors;
  };

  const handleSubmit = async () => {
    setError(null);
    setImageError(null);
    setValidationErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      setLoading(true);
      setImageError(null);

      let uploadedImageUrl = null;
      if (form?.profilePhoto) {
        const file = form?.profilePhoto;
        try {
          uploadedImageUrl = await uploadImageApi(
            file,
            "class-room/student-images",
            `student-${Date.now()}-${file.name || "photo"}`,
          );
          if (!uploadedImageUrl) {
            throw new Error("Unable to upload the student photo.");
          }
        } catch (uploadError) {
          setImageError(uploadError?.message || "Unable to upload the student photo.");
          setLoading(false);
          return;
        }
      }

      const requestData = {
        accountTypeId,
        courseFlowType: form.courseFlowType,
        studentId: form.studentId || undefined,
        courseId: form.courseId || undefined,
        planId: form.planId || undefined,
        startDate: form.startDate || undefined,
        estimatedDurationCount: isRecurringCourse
          ? Math.max(1, Number.parseInt(form.estimatedDurationCount || "1", 10) || 1)
          : undefined,
        workingDays: isRecurringCourse ? form.workingDays : undefined,
        branchIds: form.branchIds ? [form.branchIds] : [],
        studentData: {
          name: form.name.trim(),
          contact: form.contact,
          countryCode: form.countryCode,
          email: form.email.trim().toLowerCase(),
          address: form.address ? form.address.trim() : "",
          image: uploadedImageUrl || form.image,
          admissionDate: form.admissionDate || undefined,
          branchIds: form.branchIds ? [form.branchIds] : [],
          educationProfile: {
            gender: form.gender,
            dateOfBirth: form.dateOfBirth || null,
            admissionDate: form.admissionDate || null,
            emergencyContactName: form.emergencyContactName ? form.emergencyContactName.trim() : "",
            emergencyContactPhone: form.emergencyContactPhone || "",
            relationship: form.relationship || "",
            bloodGroup: form.bloodGroup || "",
            guardianName: form.guardianName.trim(),
            guardianPhone: form.guardianPhone || "",
            guardianRelationship: form.guardianRelationship || "",
            notes: form.notes ? form.notes.trim() : "",
          },
        },
        paymentMethodType:
          form.courseFlowType === "new_course" && form.paymentOption === "online" ? "online" : "none",
        paymentMethod: form.paymentOption === "pay_later" ? "Cash" : "Online",
        paymentAmount:
          form.courseFlowType === "new_course" && form.paymentOption === "online"
            ? normalizeMoney(pricingSummary.firstPaymentAmount)
            : 0,
        transactionId: "",
        notes: form.notes ? form.notes.trim() : "",
      };

      const response = await registerCourseApi(requestData);

      if (!response?.success && response?.message !== "success") {
        throw new Error(response?.message || "Unable to continue.");
      }

      if (response?.paymentAction === "online" && response?.paymentSession) {
        const paymentSession = response.paymentSession;

        if (String(paymentSession?.gateway || "").toLowerCase() === "razorpay") {
          const sdkLoaded = await loadRazorpayScript();
          if (!sdkLoaded || !window.Razorpay) {
            throw new Error("Unable to load online payment gateway.");
          }

          const optionsData = paymentSession?.sessionData || {};
          const options = {
            key: optionsData.keyId,
            amount: optionsData.amount,
            currency: optionsData.currency,
            name: optionsData.businessName || "Course Payment",
            order_id: optionsData.order_id,
            handler: async (razorpayResponse) => {
              setVerifyingPayment(true);
              try {
                const verifyResponse = await verifyCourseSubscriptionPaymentApi({
                  razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                  razorpay_order_id: razorpayResponse.razorpay_order_id,
                  razorpay_signature: razorpayResponse.razorpay_signature,
                  paymentAttemptId: optionsData.paymentAttemptId,
                });

                if (verifyResponse?.success || verifyResponse?.message === "success") {
                  setRegistrationSuccess({
                    student: response.student,
                    subscription: response.subscription,
                    paymentChoice: "online",
                    paymentStatus: "Paid and verified",
                    paymentVerified: true,
                    paymentGatewayUnavailable: false,
                  });
                  setLoading(false);
                  setVerifyingPayment(false);
                } else {
                  throw new Error(
                    verifyResponse?.message || "Payment verification failed. Please try again.",
                  );
                }
              } catch (error) {
                console.error("Payment verification error:", error);
                setError(error?.message || "Payment verification failed. Please try again.");
                setLoading(false);
                setVerifyingPayment(false);
              }
            },
            modal: {
              ondismiss: function () {
                setError("Checkout was closed before payment completed. You can submit again to retry.");
                setLoading(false);
                setVerifyingPayment(false);
              },
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
          setLoading(false);
        } else if (String(paymentSession?.gateway || "").toLowerCase() === "stripe") {
          if (paymentSession?.sessionData?.paymentUrl) {
            window.location.href = paymentSession.sessionData.paymentUrl;
          } else {
            throw new Error("The payment provider did not return a checkout link.");
          }
        } else {
          throw new Error("The selected online payment method is not supported.");
        }
      } else {
        setLoading(false);
        setRegistrationSuccess({
          student: response.student,
          subscription: response.subscription,
          paymentChoice: form.paymentOption,
          paymentStatus: response.paymentGatewayUnavailable
            ? "Payment pending - gateway unavailable"
            : form.paymentOption === "pay_later" ? "Pay later at the academy" : "No payment due",
          paymentVerified: false,
          paymentGatewayUnavailable: Boolean(response.paymentGatewayUnavailable),
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error?.message || "An error occurred during registration. Please try again.");
      setLoading(false);
    }
  };

  if (verifyingPayment) {
    return (
      <main className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-pitch px-6 text-foreground">
        <section className="w-full max-w-md text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full border border-neon/30 bg-neon/10"><Loader2 className="size-9 animate-spin text-neon" /></span>
          <p className="eyebrow mt-7">Payment received</p>
          <h1 className="mt-2 font-display text-4xl uppercase">Verifying your payment</h1>
          <p className="mt-3 text-sm leading-6 text-foreground/55">Please keep this page open while we confirm your payment and prepare your admission form.</p>
        </section>
      </main>
    );
  }

  if (registrationSuccess) {
    return (
      <AdmissionSuccessPage
        form={form}
        student={registrationSuccess.student}
        subscription={registrationSuccess.subscription}
        course={selectedCourse}
        plan={selectedPlan}
        branchName={branches.find((branch) => String(branch._id) === String(form.branchIds))?.name}
        pricing={pricingSummary}
        paymentChoice={registrationSuccess.paymentChoice}
        paymentStatus={registrationSuccess.paymentStatus}
        paymentVerified={registrationSuccess.paymentVerified}
        paymentGatewayUnavailable={registrationSuccess.paymentGatewayUnavailable}
        onGoToPortal={() => router.push("/auth")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HEADER (mirrors SiteHeader style tokens) ── */}
      {/* ── STEPPER ── */}
      <div className="border-b border-border bg-pitch/40">
        <div className="mx-auto max-w-6xl">
          <RegistrationStepper step={step} />
        </div>
      </div>

      {/* ── ERROR BANNER ── */}
      {error && (
        <div className="mx-auto max-w-[620px] px-3 pt-3 sm:px-5 sm:pt-4">
          <div className="flex items-center gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-red-400 sm:p-4">
            <AlertCircle className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <p className="text-xs sm:text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 transition-colors hover:text-red-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── IMAGE UPLOAD ERROR ── */}
      {imageError && (
        <div className="mx-auto max-w-[620px] px-3 pt-3 sm:px-5 sm:pt-4">
          <div className="flex items-center gap-2 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-yellow-400 sm:p-4">
            <AlertCircle className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <p className="text-xs sm:text-sm">{imageError}</p>
            <button
              onClick={() => setImageError(null)}
              className="ml-auto text-yellow-400 transition-colors hover:text-yellow-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── FORM CONTENT ── */}
      <main className="mx-auto max-w-[620px] px-3 pb-[110px] pt-4 sm:px-5 sm:pt-7">
        {step === 1 && (
          <PersonalProfileStep form={form} updateForm={updateForm} errors={validationErrors} />
        )}
        {step === 2 && (
          <CourseSelectionStep
            form={form}
            updateForm={updateForm}
            branches={branches}
            courses={courses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            selectedPlan={selectedPlan}
            pricingSummary={pricingSummary}
            isRecurringCourse={isRecurringCourse}
            loadingData={loadingOptions}
            selectedBranch={branches.find((branch) => String(branch._id) === String(form.branchIds))}
            errors={validationErrors}
          />
        )}
        {step === 3 && (
          <AdmissionDetailsStep form={form} updateForm={updateForm} errors={validationErrors} />
        )}
      </main>

      {/* ── BOTTOM NAVIGATION ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-pitch/95 px-3 py-3 shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex max-w-[620px] gap-2 sm:gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={previousStep}
              disabled={loading}
              className="flex h-[44px] min-w-[70px] items-center justify-center gap-1 rounded-full border border-border bg-transparent px-3 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-neon hover:text-neon disabled:cursor-not-allowed disabled:opacity-50 sm:h-[50px] sm:min-w-[100px] sm:gap-2 sm:px-5 sm:text-sm"
            >
              <ArrowLeft size={14} className="sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={loading}
              className="flex h-[44px] flex-1 items-center justify-center gap-1 rounded-full bg-neon px-4 text-xs font-bold uppercase tracking-widest text-pitch transition-colors hover:bg-neon/90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[50px] sm:gap-2 sm:px-6 sm:text-sm"
            >
              <span>Next</span>
              <ArrowRight size={14} className="sm:h-4 sm:w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex h-[44px] flex-1 items-center justify-center gap-1 rounded-full bg-neon px-4 text-xs font-bold uppercase tracking-widest text-pitch transition-colors hover:bg-neon/90 disabled:cursor-not-allowed disabled:opacity-70 sm:h-[50px] sm:gap-2 sm:px-6 sm:text-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Processing...</span>
                </>
              ) : (
                <>
                  <Check size={14} className="sm:h-4 sm:w-4" />
                  <span>Submit</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── SUCCESS MODAL ── */}
    </div>
  );
}
