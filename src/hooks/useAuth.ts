import { useEffect, useState } from "react";
import { getStudentSession, TOKEN_EVENT } from "@/utils/tokenKey";

type StudentSession = {
  token?: string;
  authMethod?: string;
  data?: Record<string, any>;
  selectedStudent?: Record<string, any> | null;
  [key: string]: any;
};

function getSessionUser(session: StudentSession | null) {
  const student = session?.selectedStudent
    ?? session?.data?.["students"]?.[0]
    ?? session?.data?.["student"]
    ?? (Array.isArray(session?.data) ? session.data[0] : null);
  const email = session?.["email"] || session?.data?.["email"];
  return student
    ? { id: student["_id"], name: student["name"], email: student["email"] }
    : email
      ? {
          id: email,
          name: session?.data?.["name"] || email,
          email,
        }
      : null;
}

export function useAuth() {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncSession = () => {
      setSession(getStudentSession());
      setLoading(false);
    };
    syncSession();
    window.addEventListener(TOKEN_EVENT, syncSession);
    window.addEventListener("storage", syncSession);
    return () => {
      window.removeEventListener(TOKEN_EVENT, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return { session, user: getSessionUser(session), loading };
}
