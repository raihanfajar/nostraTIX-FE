"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOrganizerProfile } from "@/hooks/organizer/useOrganizerProfile";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: profile, isLoading, error } = useOrganizerProfile();
  const queryClient = useQueryClient();
  const { accessToken } = useAuthStore();

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  });

  /* password-dialog fields */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwDialog, setPwDialog] = useState(false);

  /* sync fetched data */
  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  /* save profile */
  const handleSave = async () => {
    try {
      await axiosInstance.patch("/organizer/profile", form, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      queryClient.invalidateQueries({ queryKey: ["organizerProfile"] });
      setEdit(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Save failed");
    }
  };

  /* change-password */
  const handlePwSave = async () => {
    if (!currentPw || !newPw) {
      toast.error("Both fields required");
      return;
    }
    try {
      await axiosInstance.patch(
        "/organizer/change-password",
        { currentPassword: currentPw, newPassword: newPw },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      toast.success("Password updated");
      setCurrentPw("");
      setNewPw("");
    } catch {
      toast.error("Change password failed");
    }
  };

  if (isLoading) return <p className="p-6 text-white">Loading…</p>;
  if (error) return <p className="p-6 text-red-400">Error loading profile</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={profile?.profilePicture || "/avatar-placeholder.jpg"}
          />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          size="sm"
          className="border-[#E67F3C] text-[#E67F3C]"
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Photo
        </Button>
      </div>

      {/* Account Info Card */}
      <Card className="border-[#2D4C51] bg-[#173236]">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Account Info</CardTitle>
          {!edit && (
            <Button
              variant="ghost"
              size="sm"
              className="text-[#E67F3C]"
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div>
            <Label className="text-sm font-medium text-[#DDDEDF]">Name</Label>
            {edit ? (
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-fit bg-[#F5DFAD] text-[#173236]"
              />
            ) : (
              <p className="mt-1 font-medium">{profile?.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-medium text-[#DDDEDF]">Email</Label>
            {edit ? (
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-fit bg-[#F5DFAD] text-[#173236]"
              />
            ) : (
              <p className="mt-1 font-medium">{profile?.email}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-[#DDDEDF]">
              Description
            </Label>
            {edit ? (
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="min-h-fit bg-[#F5DFAD] text-[#173236]"
              />
            ) : (
              <p className="mt-1 font-medium">{profile?.description}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label className="text-sm font-medium text-[#DDDEDF]">
              Password
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPwDialog(true)}
              className="mt-1 border-[#E67F3C] text-[#E67F3C]"
            >
              Change Password
            </Button>
          </div>

          {edit && (
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="bg-[#E67F3C]">
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (profile) setForm(profile);
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog open={pwDialog} onOpenChange={setPwDialog}>
        <DialogContent className="border-[#2D4C51] bg-[#173236] text-white">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Current password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setPwDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePwSave} className="bg-[#E67F3C]">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
