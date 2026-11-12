import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { MfaMethodSetup } from "@/components/auth/MfaMethodSetup";
import { CodeField, MfaHeader, MfaNotice, ResendLine, useCooldown } from "@/components/auth/MfaParts";

const PROOF_RESEND_SECONDS = 30;
const METHOD_LABEL = { totp: "Authenticator app", sms: "Text message" };

// Factor management: the card MfaPage shows once sign-in opens management (MfaFlow's onManage).
// Lists enrolled methods, adds one via MfaMethodSetup, or removes one after a fresh code proves
// it's the account owner. The server refuses to remove the last method, so the control is hidden
// below two it leaves one enrolled.
// shortcut: assumes session.status() answers { mfa_methods, phone_hint } like a sign-in challenge
// does — adjust the field names here if Base44's real response differs.
export function MfaManage({ session, returnTo }) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(null);
  const [removing, setRemoving] = useState(null);

  const refresh = () => session.status().then(setStatus).catch(setError);
  useEffect(refresh, []);

  if (adding) {
    return (
      <MfaMethodSetup
        session={session}
        method={adding}
        signInPath="/mfa"
        onBack={() => setAdding(null)}
        onDone={() => {
          setAdding(null);
          refresh();
        }}
      />
    );
  }

  if (removing) {
    return (
      <RemoveMethod
        session={session}
        method={removing}
        proofMethod={status.mfa_methods.includes("totp") && removing !== "totp" ? "totp" : "sms"}
        onBack={() => setRemoving(null)}
        onDone={() => {
          setRemoving(null);
          refresh();
        }}
      />
    );
  }

  return (
    <>
      <MfaHeader title="Two-factor authentication" description="Manage how you verify sign-ins." />
      <MfaNotice error={error} signInPath="/mfa" />
      {!status && !error && <Loader2 className="mx-auto w-6 h-6 animate-spin text-muted-foreground" aria-hidden="true" />}
      {status && (
        <div className="space-y-3">
          {status.mfa_methods.map((method) => (
            <div key={method} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                {METHOD_LABEL[method] || method}
              </span>
              {status.mfa_methods.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => setRemoving(method)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          {!status.mfa_methods.includes("totp") && (
            <Button variant="outline" className="w-full h-11" onClick={() => setAdding("totp")}>
              Add authenticator app
            </Button>
          )}
          {!status.mfa_methods.includes("sms") && (
            <Button variant="outline" className="w-full h-11" onClick={() => setAdding("sms")}>
              Add text message
            </Button>
          )}
          <Button variant="outline" className="w-full h-11" asChild>
            <a href={returnTo || "/"}>Done</a>
          </Button>
        </div>
      )}
    </>
  );
}

function RemoveMethod({ session, method, proofMethod, onBack, onDone }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useCooldown();
  const sent = useRef(false);

  const sendProof = () =>
    session
      .sendProofCode()
      .then(() => setCooldown(PROOF_RESEND_SECONDS))
      .catch(setError);

  useEffect(() => {
    if (proofMethod !== "sms" || sent.current) return;
    sent.current = true;
    sendProof();
  }, []);

  const confirm = async (value = code) => {
    if (busy || value.length < 6) return;
    setBusy(true);
    setError(null);
    try {
      await session.removeMethod(method, value, proofMethod);
      onDone();
    } catch (err) {
      setError(err);
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <MfaHeader
        title={`Remove ${METHOD_LABEL[method] || method}`}
        description={
          proofMethod === "totp"
            ? "Enter a code from your authenticator app to confirm."
            : "Enter the code sent to your phone to confirm."
        }
      />
      <div className="space-y-4">
        <MfaNotice error={error} signInPath="/mfa" />
        <CodeField id="mfa-remove-code" value={code} onChange={setCode} onComplete={confirm} />
        {proofMethod === "sms" && <ResendLine cooldown={cooldown} disabled={busy} onResend={sendProof} />}
        <Button className="w-full h-11" disabled={busy || code.length < 6} onClick={() => confirm()}>
          {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
          Confirm removal
        </Button>
        <Button variant="outline" className="w-full h-11" disabled={busy} onClick={onBack}>
          Cancel
        </Button>
      </div>
    </>
  );
}
