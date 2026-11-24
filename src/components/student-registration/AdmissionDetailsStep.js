// components/student-registration/AdmissionDetailsStep.jsx
import { Camera, ImagePlus, AlertCircle } from "lucide-react";
import { useRef } from "react";

export default function AdmissionDetailsStep({ form, updateForm, errors = {} }) {
  const captureRef = useRef(null);
  const uploadRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateForm("profilePhoto", file);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="font-display text-[20px] uppercase tracking-tighter text-foreground sm:text-[22px]">
          Admission Details
        </h1>
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
        {/* Admission Date */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <FormLabel>Admission Date</FormLabel>
            <input
              type="date"
              value={form.admissionDate}
              onChange={(e) => updateForm("admissionDate", e.target.value)}
              className="h-11 w-full rounded-2xl border border-border bg-pitch/40 px-3 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-3 sm:space-y-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2" data-field="emergencyContactName">
              <FormLabel>Emergency Contact Name</FormLabel>
              <input
                value={form.emergencyContactName}
                onChange={(e) => updateForm("emergencyContactName", e.target.value)}
                placeholder="Full name"
                className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
                  errors.emergencyContactName
                    ? "border-red-500 bg-red-500/10"
                    : "border-border"
                }`}
              />
              {errors.emergencyContactName && (
                <p className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle size={12} />
                  {errors.emergencyContactName}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:space-y-2" data-field="emergencyContactPhone">
              <FormLabel>Emergency Contact Phone</FormLabel>
              <input
                type="tel"
                value={form.emergencyContactPhone}
                onChange={(e) => updateForm("emergencyContactPhone", e.target.value)}
                placeholder="10-digit mobile"
                className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
                  errors.emergencyContactPhone
                    ? "border-red-500 bg-red-500/10"
                    : "border-border"
                }`}
              />
              {errors.emergencyContactPhone && (
                <p className="flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle size={12} />
                  {errors.emergencyContactPhone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <FormLabel>Relationship</FormLabel>
            <select
              value={form.relationship}
              onChange={(e) => updateForm("relationship", e.target.value)}
              className="h-11 w-full rounded-2xl border border-border bg-pitch/40 px-3 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4"
            >
              <option value="">Select relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Spouse">Spouse</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Blood Group */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <FormLabel>Blood Group</FormLabel>
            <select
              value={form.bloodGroup}
              onChange={(e) => updateForm("bloodGroup", e.target.value)}
              className="h-11 w-full rounded-2xl border border-border bg-pitch/40 px-3 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4"
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5 sm:space-y-2">
          <FormLabel>Notes</FormLabel>
          <textarea
            value={form.notes}
            onChange={(e) => updateForm("notes", e.target.value)}
            placeholder="Any additional information or special requirements..."
            rows={3}
            className="w-full resize-none rounded-2xl border border-border bg-pitch/40 px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:px-4 sm:py-3"
          />
        </div>

        {/* Profile Photo */}
        <div className="space-y-1.5 sm:space-y-2">
          <FormLabel>Profile Photo</FormLabel>
          <div className="rounded-[20px] border-2 border-dashed border-border bg-pitch/40 p-4 sm:p-5">
            {form.profilePhoto ? (
              <div className="mb-3 flex justify-center sm:mb-4">
                <img
                  src={URL.createObjectURL(form.profilePhoto)}
                  alt="Profile preview"
                  className="h-20 w-20 rounded-full border-2 border-neon object-cover sm:h-28 sm:w-28"
                />
              </div>
            ) : (
              <div className="mb-3 flex justify-center sm:mb-4">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-pitch/60 text-foreground/40 sm:h-28 sm:w-28">
                  <Camera size={28} className="sm:h-10 sm:w-10" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => captureRef.current?.click()}
                className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-neon text-xs font-bold uppercase tracking-widest text-pitch transition-colors hover:bg-neon/90 sm:h-12 sm:gap-2 sm:text-sm"
              >
                <Camera size={14} className="sm:h-[17px] sm:w-[17px]" />
                Capture
              </button>

              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-border bg-transparent text-xs font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-neon hover:text-neon sm:h-12 sm:gap-2 sm:text-sm"
              >
                <ImagePlus size={14} className="sm:h-[17px] sm:w-[17px]" />
                Upload
              </button>
            </div>

            <input
              ref={captureRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImage}
              className="hidden"
            />

            <input
              ref={uploadRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </div>
        </div>
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