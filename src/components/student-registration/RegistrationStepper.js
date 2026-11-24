// components/student-registration/RegistrationStepper.jsx
import { Check, BookOpen, CalendarDays, UserRound } from "lucide-react";

const steps = [
  { id: 1, label: "Profile", icon: UserRound },
  { id: 2, label: "Course", icon: BookOpen },
  { id: 3, label: "Admission", icon: CalendarDays },
];

export default function RegistrationStepper({ step }) {
  return (
    <div className="mx-auto flex items-center justify-center px-2 py-3 sm:px-4 sm:py-5">
      {steps.map((item, index) => {
        const Icon = item.icon;
        const completed = step > item.id;
        const active = step === item.id;

        return (
          <div key={item.id} className="flex flex-1 flex-col items-center">
            {/* Circle */}
            <div
              className={`grid h-8 w-8 place-items-center rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10 ${
                completed || active
                  ? "border-neon bg-neon text-pitch shadow-md shadow-neon/20"
                  : "border-border bg-pitch/40 text-foreground/40"
              }`}
            >
              {completed ? (
                <Check size={14} className="sm:h-5 sm:w-5" strokeWidth={3} />
              ) : (
                <Icon size={14} className="sm:h-[19px] sm:w-[19px]" />
              )}
            </div>

            {/* Label */}
            <span
              className={`mt-1.5 text-[8px] font-bold uppercase tracking-widest sm:mt-2 sm:text-[10px] ${
                active || completed ? "text-neon" : "text-foreground/40"
              }`}
            >
              {item.label}
            </span>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`hidden h-[2px] flex-1 transition-all duration-500 sm:block ${
                  step > item.id ? "bg-neon" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}