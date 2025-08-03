"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";

type Profile = {
  name: string;
  email: string;
  location: string;
  description: string;
  password: string;
};

export default function ProfilePage() {
  const [profile] = useState<Profile>({
    name: "Babi Bakar Epeng",
    email: "babi@mail.com",
    location: "Kandang Babi",
    description:
      "We are the best babi in town! We organize events regarding babi and food!",
    password: "Admin123!",
  });

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const [pwDialog, setPwDialog] = useState(false);

  const handleSave = () => {
    console.log("PATCH /api/organizers/me", form);
    setEdit(false);
  };

  const handlePwSave = () => {
    console.log("Change password submitted");
    setPwDialog(false);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* Avatar row */}
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/avatar-placeholder.jpg" />
          <AvatarFallback>Fallback</AvatarFallback>
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
              <p className="mt-1 font-medium">{profile.name}</p>
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
              <p className="mt-1 font-medium">{profile.email}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Label className="text-sm font-medium text-[#DDDEDF]">
              Location
            </Label>
            {edit ? (
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="h-fit bg-[#F5DFAD] text-[#173236]"
              />
            ) : (
              <p className="mt-1 font-medium">{profile.location}</p>
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
                className="min-h-[60px] bg-[#F5DFAD] text-[#173236]"
              />
            ) : (
              <p className="mt-1 font-medium">{profile.description}</p>
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

          {/* Save / Cancel */}
          {edit && (
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="bg-[#E67F3C]">
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setForm(profile);
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
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
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
