"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/utils/axiosInstance";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Shadcn UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Icons
import { Star, Loader2 } from "lucide-react";

// --- TYPE DEFINITIONS (FIXED) ---
// This interface now matches the flat data structure from your API
interface ReviewableEvent {
  id: string; // This is the Event ID
  name: string;
  slug: string;
}

interface ApiResponse<T> {
  data: T;
}

interface ReviewPayload {
  eventId: string;
  rating: number;
  comment: string;
}

// --- STAR RATING COMPONENT (No changes needed) ---
const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className="h-8 w-8 transition-colors"
              fill={starValue <= (hover || rating) ? "#f5dfad" : "none"}
              stroke={
                starValue <= (hover || rating) ? "#f5dfad" : "currentColor"
              }
            />
          </button>
        );
      })}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function ReviewsPage() {
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // FIX: State now uses the correct interface
  const [selectedEvent, setSelectedEvent] = useState<ReviewableEvent | null>(
    null,
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: eventsToReview,
    isLoading,
    error,
  } = useQuery<ReviewableEvent[]>({
    // Use the correct interface here
    queryKey: ["eventsToReview"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<ReviewableEvent[]>>(
        "/reviews/to-review",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      return response.data.data;
    },
    enabled: !!accessToken,
  });

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async (payload: ReviewPayload) =>
      axiosInstance.post("/reviews", payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    onSuccess: () => {
      toast.success("Your review has been submitted.");
      queryClient.invalidateQueries({ queryKey: ["eventsToReview"] });
      setIsDialogOpen(false);
    },
    onError: (err: unknown) => {
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        // This handles most standard errors
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    },
  });

  const handleOpenReviewDialog = (item: ReviewableEvent) => {
    setSelectedEvent(item);
    setRating(0);
    setComment("");
    setIsDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.warn("Please provide a rating.");
      return;
    }
    if (!selectedEvent) return;

    // FIX: Pass the correct event ID
    submitReview({
      eventId: selectedEvent.id,
      rating,
      comment,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">Loading events to review...</div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-[#F5DFAD]">
        Events to Review
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="text-[#F5DFAD]">
            <TableHead className="text-[#F5DFAD]">Event Name</TableHead>
            <TableHead className="text-right text-[#F5DFAD]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventsToReview && eventsToReview.length > 0 ? (
            eventsToReview.map((item) => (
              <TableRow key={item.id}>
                {/* FIX: Access name directly from item */}
                <TableCell className="font-medium text-[#F5DFAD]">
                  {item.name}
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleOpenReviewDialog(item)}>
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                You have no events to review.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {/* FIX: Access name directly from selectedEvent */}
              Review: {selectedEvent?.name}
            </DialogTitle>
            <DialogDescription>
              Let us know what you thought of the event. Your feedback helps the
              organizer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Your Rating</Label>
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Tell us more about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReview} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
