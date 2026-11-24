// components/ui/SuccessModal.jsx
"use client";
import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Success!",
  message = "Registration completed successfully!",
  redirectUrl = "/auth?mode=login",
  autoCloseDelay = 3000,
  showCountdown = true,
}) {
  const [countdown, setCountdown] = useState(autoCloseDelay / 1000);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(autoCloseDelay / 1000);
      return;
    }

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      onClose();
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    }, autoCloseDelay);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [isOpen, autoCloseDelay, onClose, redirectUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative w-full max-w-[95%] animate-scaleIn rounded-3xl border border-border bg-pitch p-5 shadow-2xl sm:max-w-md sm:p-8">
        {/* Close */}
        <button
          onClick={() => {
            onClose();
            if (redirectUrl) {
              window.location.href = redirectUrl;
            }
          }}
          className="absolute right-2 top-2 rounded-full p-1.5 text-foreground/40 transition-colors hover:bg-border/40 hover:text-foreground sm:right-4 sm:top-4"
        >
          <X size={18} className="sm:h-5 sm:w-5" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neon/15 sm:mb-4 sm:h-20 sm:w-20">
            <CheckCircle className="h-8 w-8 text-neon sm:h-10 sm:w-10" />
          </div>

          {/* Title */}
          <h2 className="mb-1.5 font-display text-xl uppercase tracking-tighter text-foreground sm:mb-2 sm:text-2xl">
            {title}
          </h2>

          {/* Message */}
          <p className="mb-4 text-xs uppercase tracking-widest text-foreground/50 sm:mb-6 sm:text-sm">
            {message}
          </p>

          {/* Countdown */}
          {showCountdown && countdown > 0 && (
            <div className="mb-4 sm:mb-6">
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-neon transition-all duration-1000"
                  style={{
                    width: `${(countdown / (autoCloseDelay / 1000)) * 100}%`,
                    transition: "width 1s linear",
                  }}
                />
              </div>
              <p className="mt-1.5 text-[10px] uppercase tracking-widest text-foreground/40 sm:mt-2 sm:text-xs">
                Redirecting to the student portal in {countdown} second{countdown > 1 ? "s" : ""}...
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              onClick={() => {
                onClose();
                if (redirectUrl) {
                  window.location.href = redirectUrl;
                }
              }}
              className="h-10 flex-1 rounded-full bg-neon text-sm font-bold uppercase tracking-widest text-pitch transition-colors hover:bg-neon/90 sm:h-12 sm:text-base"
            >
              Go to Student Portal
            </button>
            <button
              onClick={() => onClose()}
              className="h-10 flex-1 rounded-full border border-border bg-transparent text-sm font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-neon hover:text-neon sm:h-12 sm:text-base"
            >
              Stay Here
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
