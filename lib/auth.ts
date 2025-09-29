import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/src/db/queries";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  return userId;
}

export async function requireAdmin() {
  const userId = await requireAuth();
  
  const isAdmin = await isUserAdmin(userId);
  
  if (!isAdmin) {
    redirect("/");
  }
  
  return userId;
}

export async function getCurrentUser() {
  const { userId } = await auth();
  return userId;
}

export async function isCurrentUserAdmin() {
  const userId = await getCurrentUser();
  
  if (!userId) {
    return false;
  }
  
  return await isUserAdmin(userId);
}
