const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

export default function ContentField({ field, value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file) {
    if (!file) return;
    setUploading(true);
    try {
      const result = await db.integrations.Core.UploadPublicFile({ file });
      const url = result?.file_url;
      if (url) onChange(url);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const label = (
    <span className="mb-2 block text-[0.56rem] font-semibold  tracking-[0.2em] text-muted-foreground">
      {field.label}
    </span>
  );

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-3 py-2">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 accent-forest"
        />
        <span className="text-[0.85rem] text-foreground">{field.label}</span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block">
        {label}
        <select
          className="field"
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Not set</option>
          {(field.options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "number") {
    return (
      <label className="block">
        {label}
        <input
          type="number"
          className="field"
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value === "" ? null : Number(event.target.value))}
        />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="block">
        {label}
        <textarea
          className="field resize-y"
          rows={field.rows || 3}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  if (field.type === "list" || field.type === "imagelist") {
    const joined = Array.isArray(value) ? value.join("\n") : "";
    return (
      <div>
        {label}
        <textarea
          className="field resize-y font-mono text-[0.8rem]"
          rows={field.type === "imagelist" ? 4 : 5}
          value={joined}
          onChange={(event) =>
            onChange(
              event.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
          placeholder="One entry per line"
        />
        {field.type === "imagelist" ? (
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-[0.6rem] font-semibold  tracking-[0.18em] text-forest hover:border-gold"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              Upload image
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                if (!event.target.files?.[0]) return;
                upload(event.target.files[0]).then(() => {});
              }}
            />
            <span className="text-[0.68rem] text-muted-foreground">
              Adds the uploaded image URL to the list
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div>
        {label}
        <div className="flex gap-2">
          <input
            className="field"
            value={value ?? ""}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste an image URL or upload"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border px-3 text-[0.58rem] font-semibold  tracking-[0.16em] text-forest hover:border-gold"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            Upload
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              if (!event.target.files?.[0]) return;
              upload(event.target.files[0]);
            }}
          />
        </div>
        {value ? (
          <img
            src={value}
            alt=""
            className="mt-2 h-20 w-28 rounded-sm border border-border object-cover"
          />
        ) : null}
      </div>
    );
  }

  return (
    <label className="block">
      {label}
      <input
        className="field"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
      />
    </label>
  );
}