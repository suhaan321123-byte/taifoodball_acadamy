// components/student-registration/PersonalProfileStep.jsx
import { countryOptions } from "../../utils/countryOptions/countryOptions";
import { AlertCircle } from "lucide-react";

export default function PersonalProfileStep({ form, updateForm, errors = {} }) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="font-display text-[20px] uppercase tracking-tighter text-foreground sm:text-[22px]">
          Personal Profile
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
        {/* Full Name */}
        <div className="space-y-1.5 sm:space-y-2" data-field="name">
          <FormLabel required>Full Name</FormLabel>
          <input
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
            placeholder="e.g. Arun Kumar"
            className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
              errors.name ? "border-red-500 bg-red-500/10" : "border-border"
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2" data-field="contact">
            <FormLabel required>Phone Number</FormLabel>
            <div className="grid grid-cols-[90px_1fr] gap-2 sm:grid-cols-[110px_1fr] sm:gap-3">
              <select
                value={form.countryCode}
                onChange={(event) => updateForm("countryCode", event.target.value)}
                className="h-11 rounded-2xl border border-border bg-pitch/40 px-2 text-xs text-foreground outline-none transition focus:border-neon sm:h-12 sm:px-3 sm:text-sm"
              >
                {countryOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={form.contact}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  updateForm("contact", onlyDigits);
                }}
                placeholder="10-digit mobile"
                inputMode="numeric"
                className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
                  errors.contact ? "border-red-500 bg-red-500/10" : "border-border"
                }`}
              />
            </div>
            {errors.contact && (
              <p className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={12} />
                {errors.contact}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2" data-field="email">
            <FormLabel required>Email</FormLabel>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              placeholder="you@example.com"
              className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
                errors.email ? "border-red-500 bg-red-500/10" : "border-border"
              }`}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={12} />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Gender + DOB */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2" data-field="gender">
            <FormLabel required>Gender</FormLabel>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {["Male", "Female", "Other"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => updateForm("gender", gender)}
                  className={`h-10 rounded-2xl border-2 text-xs font-semibold uppercase tracking-widest transition sm:h-12 sm:text-sm ${
                    form.gender === gender
                      ? "border-neon bg-neon text-pitch shadow-sm shadow-neon/20"
                      : errors.gender
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-border bg-pitch/40 text-foreground/60 hover:border-neon/50 hover:text-neon"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
            {errors.gender && (
              <p className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={12} />
                {errors.gender}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <FormLabel>Date of Birth</FormLabel>
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => updateForm("dateOfBirth", e.target.value)}
              className="h-11 w-full rounded-2xl border border-border bg-pitch/40 px-3 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5 sm:space-y-2">
          <FormLabel>Address</FormLabel>
          <textarea
            value={form.address}
            onChange={(e) => updateForm("address", e.target.value)}
            placeholder="House name, street, town..."
            rows={3}
            className="w-full resize-none rounded-2xl border border-border bg-pitch/40 px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:px-4 sm:py-3"
          />
        </div>

        {/* Guardian Name + Phone */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2" data-field="guardianName">
            <FormLabel required>Guardian Name</FormLabel>
            <input
              value={form.guardianName}
              required
              onChange={(e) => updateForm("guardianName", e.target.value)}
              placeholder="Parent / guardian"
              className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
                errors.guardianName ? "border-red-500 bg-red-500/10" : "border-border"
              }`}
            />
            {errors.guardianName && (
              <p className="flex items-center gap-1 text-xs text-red-400">
                <AlertCircle size={12} />
                {errors.guardianName}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <FormLabel>Guardian Number</FormLabel>
            <input
              type="tel"
              value={form.guardianPhone}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                updateForm("guardianPhone", onlyDigits);
              }}
              placeholder="10-digit mobile"
              inputMode="numeric"
              className="h-11 w-full rounded-2xl border border-border bg-pitch/40 px-3 text-sm text-foreground outline-none transition placeholder:text-foreground/30 focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4"
            />
          </div>
        </div>

        {/* Guardian Relationship */}
        <div className="space-y-1.5 sm:space-y-2" data-field="guardianRelationship">
          <FormLabel required>Guardian Relationship</FormLabel>
          <select
            value={form.guardianRelationship}
            onChange={(e) => updateForm("guardianRelationship", e.target.value)}
            className={`h-11 w-full rounded-2xl border bg-pitch/40 px-3 text-sm text-foreground outline-none transition focus:border-neon focus:ring-1 focus:ring-neon/30 sm:h-12 sm:px-4 ${
              errors.guardianRelationship ? "border-red-500 bg-red-500/10" : "border-border"
            }`}
          >
            <option value="">Select relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Spouse">Spouse</option>
            <option value="Other">Other</option>
          </select>
          {errors.guardianRelationship && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} />
              {errors.guardianRelationship}
            </p>
          )}
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