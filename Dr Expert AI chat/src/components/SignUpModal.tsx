import { useState, useRef, useEffect } from "react";

const EDUCATION_OPTIONS = [
  "High School",
  "12th Grade",
  "Bachelor's Degree",
  "NEET Repeater",
  "MBBS",
  "MD",
  "Other",
];

const COUNTRY_CODES = [
  { code: "IN", dial: "+91" },
  { code: "US", dial: "+1" },
  { code: "GB", dial: "+44" },
  { code: "AE", dial: "+971" },
  { code: "SA", dial: "+966" },
];

const SIGNUP_STORAGE_KEY = "drexpert_signup_user";
const JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/users";

export interface FormState {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  education: string;
  place: string;
}

export function getStoredSignUpData(): FormState | null {
  try {
    const raw = localStorage.getItem(SIGNUP_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as FormState;
    return data?.email ? data : null;
  } catch {
    return null;
  }
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    countryCode: "IN +91",
    mobile: "",
    education: "",
    place: "",
  });
  const [eduOpen, setEduOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const eduRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (eduRef.current && !eduRef.current.contains(e.target as Node)) setEduOpen(false);
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form };
    try {
      localStorage.setItem(SIGNUP_STORAGE_KEY, JSON.stringify(payload));
      await fetch(JSONPLACEHOLDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.countryCode + " " + payload.mobile,
          address: { city: payload.place },
          company: { name: payload.education },
        }),
      });
    } catch (err) {
      console.warn("SignUp save error:", err);
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] rounded-2xl p-7 z-10 max-h-[95vh] overflow-y-auto bg-gray-100 border border-gray-400 shadow-xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-gray-800 text-2xl font-semibold mb-7">Sign up to continue</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="What's your name?"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-200 border border-gray-400 rounded-xl px-4 py-3.5
                text-gray-800 placeholder-gray-500 text-sm outline-none
                focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="What's your email address?"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-gray-200 border border-gray-400 rounded-xl px-4 py-3.5
                text-gray-800 placeholder-gray-500 text-sm outline-none
                focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-2">Mobile</label>
            <div className="flex gap-2">
              {/* Country code dropdown */}
              <div className="relative" ref={countryRef}>
                <button
                  type="button"
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-2 bg-gray-200 border border-gray-400 rounded-xl
                    px-3 py-3.5 text-gray-800 text-sm outline-none hover:border-gray-500
                    transition-colors whitespace-nowrap min-w-[90px] justify-between"
                >
                  <span>{form.countryCode}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {countryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-36 rounded-xl border border-gray-400 bg-gray-200 z-20 overflow-hidden shadow-lg">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, countryCode: `${c.code} ${c.dial}` });
                          setCountryOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-amber-100/80 transition-colors"
                      >
                        {c.code} {c.dial}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Number input */}
              <input
                type="tel"
                placeholder="Contact Number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="flex-1 bg-gray-200 border border-gray-400 rounded-xl px-4 py-3.5
                  text-gray-800 placeholder-gray-500 text-sm outline-none
                  focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
              />
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-2">Education</label>
            <div className="relative" ref={eduRef}>
              <button
                type="button"
                onClick={() => setEduOpen(!eduOpen)}
                className={`w-full flex items-center justify-between bg-gray-200 border rounded-xl
                  px-4 py-3.5 text-sm outline-none transition-colors text-left
                  ${eduOpen ? "border-amber-500 ring-1 ring-amber-500/30" : "border-gray-400 hover:border-gray-500"}
                  ${form.education ? "text-gray-800" : "text-gray-500"}`}
              >
                <span>{form.education || "Choose..."}</span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${eduOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {eduOpen && (
                <div className="absolute top-full left-0 right-0 mt-0 rounded-b-xl border border-t-0 border-gray-400 bg-gray-200 z-20 overflow-hidden shadow-lg">
                  {EDUCATION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setForm({ ...form, education: opt });
                        setEduOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-amber-100/80 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-2">Place</label>
            <input
              type="text"
              placeholder="Your Place"
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
              className="w-full bg-gray-200 border border-gray-400 rounded-xl px-4 py-3.5
                text-gray-800 placeholder-gray-500 text-sm outline-none
                focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-4 rounded-xl text-base
              hover:bg-amber-600 transition-colors mt-2"
          >
            Sign up
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-gray-600 pt-1">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-amber-600 transition-colors">
              Terms of service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-amber-600 transition-colors">
              Privacy policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
