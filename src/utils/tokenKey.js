const TOKEN_EVENT = "student-session-changed";

function getSiteName() {
  if (typeof window === "undefined") return "default";
  return window.location.hostname.split(".")[0] || "default";
}

export function getCustomerTokenKey() {
  return `${getSiteName()}_accessToken`;
}

export function getCustomerToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(getCustomerTokenKey());
}

export function setCustomerToken(token) {
  if (typeof window === "undefined" || !token) return;
  window.localStorage.setItem(getCustomerTokenKey(), token);
}

export function removeCustomerToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getCustomerTokenKey());
}

export function getStudentSession() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("studentSession") || "null");
  } catch {
    return null;
  }
}

export function setStudentSession(session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("studentSession", JSON.stringify(session));
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

export function clearStudentSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("studentSession");
  removeCustomerToken();
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

export { TOKEN_EVENT };
