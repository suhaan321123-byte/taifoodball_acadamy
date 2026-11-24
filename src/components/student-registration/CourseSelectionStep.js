// components/student-registration/CourseSelectionStep.jsx
import { ChevronDown, AlertCircle } from "lucide-react";

export default function CourseSelectionStep({
  form,
  updateForm,
  branches,
  courses,
  selectedCourse,
  setSelectedCourse,
  selectedPlan,
  errors = {},
}) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="font-display text-[20px] uppercase tracking-tighter text-foreground sm:text-[22px]">
          Course Selection
        </h1>
        <p className="mt-1 text-xs uppercase tracking-widest text-foreground/50 sm:text-sm">
          Choose your preferred branch and course to get started.
        </p>
        {Object.keys(errors).length > 0 && (
          <div className="mt-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-3">
            <p className="text-xs font-medium text-red-400 sm:text-sm">
              Please fix the following errors:
            </p>
            <ul className="mt-1 list-inside list-disc text-xs text-red-400/80">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Branch */}
        <div className="space-y-1.5 sm:space-y-2" data-field="branchIds">
          <FormLabel required>Select Branch</FormLabel>
          <div className="relative">
            <select
              value={form.branchIds}
              onChange={(e) => updateForm("branchIds", e.target.value)}
              className={`h-11 w-full appearance-none rounded-2xl border bg-pitch/40 px-3 pr-8 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 sm:pr-10 ${
                errors.branchIds ? "border-red-500 bg-red-500/10" : "border-border"
              }`}
            >
              <option value="">Choose your branch...</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} • {branch.code}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/40 sm:right-3 sm:h-4 sm:w-4" />
          </div>
          {errors.branchIds && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} />
              {errors.branchIds}
            </p>
          )}
        </div>

        {/* Course */}
        <div className="space-y-1.5 sm:space-y-2" data-field="courseId">
          <FormLabel required>Select Course</FormLabel>
          <div className="relative">
            <select
              value={form.courseId}
              onChange={(e) => {
                const course = courses.find((course) => course._id === e.target.value);
                setSelectedCourse(course);
                updateForm("courseId", e.target.value);
                updateForm("planId", String(course?.subscriptionPlans?.[0]?._id || ""));
                updateForm(
                  "estimatedDurationCount",
                  course?.subscriptionPlans?.[0]?.duration?.value || 1,
                );
              }}
              className={`h-11 w-full appearance-none rounded-2xl border bg-pitch/40 px-3 pr-8 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 sm:pr-10 ${
                errors.courseId ? "border-red-500 bg-red-500/10" : "border-border"
              }`}
            >
              <option value="">Choose your course...</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/40 sm:right-3 sm:h-4 sm:w-4" />
          </div>
          {errors.courseId && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} />
              {errors.courseId}
            </p>
          )}
        </div>

        {/* Package */}
        {selectedCourse && (
          <div className="space-y-1.5 sm:space-y-2" data-field="planId">
            <FormLabel required>Select Package</FormLabel>
            <div className="relative">
              <select
                value={form.planId}
                onChange={(e) => {
                  const selectedPlan = selectedCourse.subscriptionPlans.find(
                    (plan) => plan._id === e.target.value,
                  );
                  updateForm("planId", e.target.value);
                  updateForm("estimatedDurationCount", selectedPlan?.duration?.value || 1);
                }}
                className={`h-11 w-full appearance-none rounded-2xl border bg-pitch/40 px-3 pr-8 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 sm:pr-10 ${
                  errors.planId ? "border-red-500 bg-red-500/10" : "border-border"
                }`}
              >
                <option value="">Choose your package</option>
                {(selectedCourse?.subscriptionPlans || []).map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/40 sm:right-3 sm:h-4 sm:w-4" />
            </div>
            {errors.planId && (
              <p className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={12} />
                {errors.planId}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FormLabel({ children, required = false }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-widest text-foreground/70 sm:text-sm">
      {children}
      {required && <span className="ml-1 text-neon">*</span>}
    </label>
  );
}
