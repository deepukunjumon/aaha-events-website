const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useCallback, useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { invalidateSiteContent } from "@/lib/server-fns";
import ContentField from "@/components/studio/ContentField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function blankRecord(fields) {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.type === "boolean" ? false : field.type === "list" || field.type === "imagelist" ? [] : field.type === "number" ? null : "",
    ])
  );
}

export default function RecordManager({ collection }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const page = await db.entities[collection.entity].list({
        sort: collection.single ? "-created_date" : collection.sort || "sort_order",
        limit: 200,
      });
      const items = page?.items ?? page ?? [];
      setRecords(Array.isArray(items) ? items : []);
    } catch (loadError) {
      setError("Could not load this content. Check that you are signed in as an admin.");
    } finally {
      setLoading(false);
    }
  }, [collection.entity, collection.sort]);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => setDraft({ ...blankRecord(collection.fields) });

  const openEdit = (record) => setDraft({ ...blankRecord(collection.fields), ...record });

  async function save() {
    if (!draft) return;
    setSaving(true);
    try {
      const payload = { ...draft };
      delete payload.id;
      delete payload.created_date;
      delete payload.updated_date;
      delete payload.created_by_id;
      delete payload.created_by;

      if (draft.id) {
        await db.entities[collection.entity].update(draft.id, payload);
      } else {
        await db.entities[collection.entity].create(payload);
      }
      invalidateSiteContent();
      toast.success("Saved");
      setDraft(null);
      await load();
    } catch (saveError) {
      toast.error("That didn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(record) {
    const label = record[collection.titleField] || "this entry";
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    try {
      await db.entities[collection.entity].delete(record.id);
      invalidateSiteContent();
      toast.success("Deleted");
      await load();
    } catch (deleteError) {
      toast.error("Could not delete that entry.");
    }
  }

  if (collection.single) {
    const record = records[0];
    const values = draft || (record ? { ...blankRecord(collection.fields), ...record } : blankRecord(collection.fields));

    return (
      <div className="border border-border bg-card p-6 sm:p-8">
        {loading ? (
          <p className="flex items-center gap-2 text-[0.85rem] text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading your content…
          </p>
        ) : (
          <>
            {error ? <p className="mb-4 text-[0.85rem] text-destructive">{error}</p> : null}
            <div className="grid gap-4 sm:grid-cols-2">
              {collection.fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                  <ContentField
                    field={field}
                    value={(draft || record || {})[field.name]}
                    onChange={(nextValue) => setDraft({ ...values, [field.name]: nextValue })}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <Button
                type="button"
                onClick={async () => {
                  setSaving(true);
                  try {
                    const payload = { ...values, key: "main" };
                    delete payload.id;
                    delete payload.created_date;
                    delete payload.updated_date;
                    delete payload.created_by_id;
                    delete payload.created_by;
                    if (record?.id) {
                      await db.entities.SiteSettings.update(record.id, payload);
                    } else {
                      await db.entities.SiteSettings.create(payload);
                    }
                    invalidateSiteContent();
                    toast.success("Site content saved");
                    setDraft(null);
                    await load();
                  } catch (saveError) {
                    toast.error("That didn't save. Please try again.");
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className="h-11 rounded-sm bg-forest px-6 text-[0.6rem] font-semibold  tracking-[0.2em] text-bone hover:bg-forest/90"
              >
                {saving ? "Saving…" : "Save changes"}
              </Button>
              {draft ? (
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="text-[0.6rem] font-semibold  tracking-[0.18em] text-muted-foreground hover:text-forest"
                >
                  Discard
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[0.8rem] text-muted-foreground">
          {loading ? "Loading…" : `${records.length} ${records.length === 1 ? "entry" : "entries"}`}
        </p>
        <Button
          type="button"
          onClick={openNew}
          className="h-10 rounded-sm bg-forest px-5 text-[0.58rem] font-semibold  tracking-[0.2em] text-bone hover:bg-forest/90"
        >
          <Plus className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          New
        </Button>
      </div>

      {error ? <p className="mt-4 text-[0.85rem] text-destructive">{error}</p> : null}

      <div className="mt-4 divide-y divide-border border border-border bg-card">
        {records.map((record) => (
          <div key={record.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-[0.92rem] text-foreground">
                {record[collection.titleField] || "Untitled"}
              </p>
              <p className="mt-0.5 truncate text-[0.72rem] text-muted-foreground">
                {[record[collection.subtitleField], record.status, record.event_date]
                  .filter(Boolean)
                  .join(" · ") || "—"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => openEdit(record)}
                aria-label="Edit"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground hover:border-gold hover:text-forest"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => remove(record)}
                aria-label="Delete"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
        {!records.length && !loading ? (
          <p className="px-5 py-8 text-center text-[0.85rem] text-muted-foreground">
            Nothing here yet. Use “New” to add the first entry.
          </p>
        ) : null}
      </div>

      {draft ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/50 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-2xl border border-border bg-bone shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <p className="font-display text-[1.2rem] text-foreground">
                {draft.id ? "Edit" : "New"} {collection.label.toLowerCase().replace(/s$/, "")}
              </p>
              <button
                type="button"
                onClick={() => setDraft(null)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-forest"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[64vh] overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {collection.fields.map((field) => (
                  <div
                    key={field.name}
                    className={cn(field.type === "textarea" || field.type === "list" || field.type === "imagelist" ? "sm:col-span-2" : "")}
                  >
                    <ContentField
                      field={field}
                      value={draft[field.name]}
                      onChange={(nextValue) => setDraft({ ...draft, [field.name]: nextValue })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="text-[0.6rem] font-semibold  tracking-[0.18em] text-muted-foreground hover:text-forest"
              >
                Cancel
              </button>
              <Button
                type="button"
                onClick={save}
                disabled={saving}
                className="h-10 rounded-sm bg-forest px-6 text-[0.58rem] font-semibold  tracking-[0.2em] text-bone hover:bg-forest/90"
              >
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}