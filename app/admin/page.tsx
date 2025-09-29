import { requireAdmin } from '@/lib/auth';
import { getAdminData } from '@/lib/actions/admin-actions';
import AdminDashboardClient from './admin-dashboard-client';

export default async function AdminDashboard() {
  // This will redirect if user is not authenticated or not an admin
  await requireAdmin();

  // Fetch all admin data on the server
  const adminData = await getAdminData();

  return <AdminDashboardClient initialData={adminData} />;
}
