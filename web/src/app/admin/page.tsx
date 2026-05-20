import { redirect } from "next/navigation";
import { AdminSiteEditor } from "@/components/admin/AdminSiteEditor";
import { isBlobConfigured } from "@/lib/blob-env";
import {
  getAdminSessionToken,
  validateAdminSession,
} from "@/lib/admin-auth";
import { isRedisConfigured } from "@/lib/redis";

export default async function AdminDashboardPage() {
  const token = await getAdminSessionToken();
  if (!(await validateAdminSession(token))) {
    redirect("/admin/login");
  }

  return (
    <AdminSiteEditor
      redisConfigured={isRedisConfigured()}
      blobConfigured={isBlobConfigured()}
    />
  );
}
