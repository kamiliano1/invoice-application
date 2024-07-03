"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export default function UserSettingsLogoutButton() {
  const logoutUser = async () => {
    await logout();
  };
  return (
    <Button
      onClick={logoutUser}
      variant="red"
      className="mt-auto py-3"
      size="full"
    >
      Logout
    </Button>
  );
}
