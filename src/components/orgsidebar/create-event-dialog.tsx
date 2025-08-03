"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export function CreateEventDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    console.log(payload); // ← wire to API later
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#E67F3C] text-white hover:bg-[#FF944D]">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg rounded-2xl border border-[#2D4C51] bg-[#173236] text-[#DDDEDF] shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Event
          </DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" required placeholder="Summer Music Fest" />
          </div>

          <div>
            <Label>Date</Label>
            <Input name="date" type="date" required />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              name="location"
              required
              placeholder="Jakarta Convention Center"
            />
          </div>

          <div>
            <Label>Price (Rp)</Label>
            <Input
              name="price"
              type="number"
              min="0"
              required
              placeholder="250000"
            />
          </div>

          <div>
            <Label>Quota</Label>
            <Input
              name="quota"
              type="number"
              min="1"
              required
              placeholder="500"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              rows={3}
              placeholder="Short event description…"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#E67F3C]">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
