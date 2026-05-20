"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { defaultSiteConfig } from "@/config/default-site-config";
import { siteConfigSchema } from "@/config/site-config-schema";

type Props = {
  redisConfigured: boolean;
  blobConfigured: boolean;
};

export function AdminSiteEditor({ redisConfigured, blobConfigured }: Props) {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastUploadUrl, setLastUploadUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/config", { credentials: "include" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const j = await res.json();
      if (!cancelled) {
        setText(JSON.stringify(j, null, 2));
        setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const validate = useCallback((): boolean => {
    try {
      const data: unknown = JSON.parse(text);
      const r = siteConfigSchema.safeParse(data);
      if (!r.success) {
        setError(JSON.stringify(r.error.flatten(), null, 2));
        return false;
      }
      setError(null);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      return false;
    }
  }, [text]);

  async function save() {
    if (!validate()) return;
    setSaving(true);
    setError(null);
    try {
      const data = JSON.parse(text);
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(JSON.stringify(j, null, 2));
        return;
      }
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  }

  async function onUpload(file: File) {
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const j = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) {
      setError(j.error ?? "Upload failed");
      return;
    }
    if (j.url) setLastUploadUrl(j.url);
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold">Site admin</h1>
            <p className="text-sm text-zinc-500">
              Edit JSON, save to Upstash Redis. Homepage reads this config on each
              request.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50"
            >
              View site
            </Link>
            <button
              type="button"
              className="rounded-lg bg-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-300"
              onClick={() =>
                setText(JSON.stringify(defaultSiteConfig, null, 2))
              }
            >
              Reset editor to defaults
            </button>
            <button
              type="button"
              className="rounded-lg bg-zinc-200 px-3 py-2 text-sm font-medium hover:bg-zinc-300"
              onClick={validate}
            >
              Validate
            </button>
            <button
              type="button"
              disabled={saving || !redisConfigured}
              className="rounded-lg bg-[#0b111d] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              onClick={save}
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="mx-auto mt-3 flex max-w-5xl flex-wrap gap-2 text-xs">
          <span
            className={`rounded-full px-2 py-0.5 ${redisConfigured ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}
          >
            Redis: {redisConfigured ? "configured" : "missing env"}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 ${blobConfigured ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-700"}`}
          >
            Blob: {blobConfigured ? "uploads enabled" : "optional"}
          </span>
          {!redisConfigured && (
            <span className="text-amber-800">
              Add Upstash Redis on Vercel and set UPSTASH_REDIS_REST_URL /
              UPSTASH_REDIS_REST_TOKEN — save will fail until then.
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
        {!loaded && (
          <p className="text-sm text-zinc-500">Loading current config…</p>
        )}

        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <label className="text-sm font-semibold">Upload image or video file</label>
          <p className="mt-1 text-xs text-zinc-500">
            Requires BLOB_READ_WRITE_TOKEN. Copy the URL into{" "}
            <code className="rounded bg-zinc-100 px-1">videoEmbedSrc</code> or{" "}
            <code className="rounded bg-zinc-100 px-1">story.imageLargeUrl</code>{" "}
            etc.
          </p>
          <input
            type="file"
            className="mt-2 block w-full text-sm"
            accept="image/*,video/*"
            disabled={!blobConfigured}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onUpload(f);
              e.target.value = "";
            }}
          />
          {lastUploadUrl && (
            <div className="mt-2 flex flex-col gap-1 text-sm">
              <span className="text-zinc-600">Last upload URL:</span>
              <input
                readOnly
                className="w-full rounded border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-xs"
                value={lastUploadUrl}
                onFocus={(e) => e.target.select()}
              />
            </div>
          )}
        </div>

        {error && (
          <pre className="max-h-48 overflow-auto rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-900">
            {error}
          </pre>
        )}

        <textarea
          className="min-h-[70vh] w-full rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm leading-relaxed shadow-inner"
          spellCheck={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!loaded}
        />

        <p className="text-xs text-zinc-500">
          Schema: <code>src/config/site-config-schema.ts</code>. Icons: Lucide
          export names (e.g. Phone, Shield). Use{" "}
          <code>__BRAND__</code> and <code>__COMPANY__</code> in{" "}
          <code>hero.headlineAfter</code> and <code>footer.copyright</code>.
        </p>
      </div>
    </div>
  );
}
