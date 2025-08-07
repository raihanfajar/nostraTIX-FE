"use client";

import { CityCombobox } from "@/components/CityComboBox";
import { CountryCombobox } from "@/components/CountryComboBox";
import { getEventCategories } from "@/services/getEvents";
import { useAuthStore } from "@/store/useAuthStore";
import { Category } from "@/types/event";
import { axiosInstance } from "@/utils/axiosInstance";
import { createEventVS } from "@/utils/validationSchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TicketCategory {
  name: string;
  description: string;
  price: number;
  seatQuota: number;
}

interface FormikTicketErrors {
  name?: string;
  description?: string;
  price?: string;
  seatQuota?: string;
}

interface FormikTicketTouched {
  name?: boolean;
  description?: boolean;
  price?: boolean;
  seatQuota?: boolean;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

const CreateEvent = () => {
  const { accessToken } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getEventCategories();
        console.log("Fetched categories:", result);
        setCategories(result || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const formik = useFormik<{
    name: string;
    description: string;
    category: string;
    countryId: number;
    cityId: number;
    location: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    banner: File | null;
    picture1: File | null;
    picture2: File | null;
    picture3: File | null;
    ticketCategories: TicketCategory[];
  }>({
    initialValues: {
      name: "",
      description: "",
      category: "",
      countryId: 0,
      cityId: 0,
      location: "",
      startDate: undefined,
      endDate: undefined,
      banner: null,
      picture1: null,
      picture2: null,
      picture3: null,
      ticketCategories: [
        {
          name: "",
          description: "",
          price: 0, // Change from string to number
          seatQuota: 1, // Change from string to number, min value 1
        },
      ],
    },
    validationSchema: createEventVS,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Starting form submission");
        setSubmitting(true);

        const fd = new FormData();
        // Log all values before creating FormData
        console.log("Form values:", values);

        // Add validation before submission
        if (!values.banner || !values.picture1) {
          toast.error("Banner and Picture 1 are required");
          return;
        }

        fd.append("name", values.name);
        fd.append("description", values.description);
        fd.append("category", values.category);
        fd.append("countryId", values.countryId.toString());
        fd.append("cityId", values.cityId.toString());
        fd.append("location", values.location);

        if (values.startDate)
          fd.append("startDate", values.startDate.toISOString());

        if (values.endDate) fd.append("endDate", values.endDate.toISOString());

        if (values.banner) fd.append("banner", values.banner);

        if (values.picture1) fd.append("picture1", values.picture1);

        if (values.picture2) fd.append("picture2", values.picture2);

        if (values.picture3) fd.append("picture3", values.picture3);

        fd.append("ticketCategories", JSON.stringify(values.ticketCategories));

        // Log the request before sending
        console.log(
          "Sending request to:",
          axiosInstance.defaults.baseURL + "events/create",
        );

        const response = await axiosInstance.post("/events/create", fd, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", response);
        toast.success("Event created successfully");
        router.push("/dashboard/events");
      } catch (error: unknown) {
        const err = error as ApiError;
        console.error("Submission error:", err);
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Failed to create event",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="mt-10 text-center text-3xl font-bold text-[#F5DFAD]">
        Create New Event
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Add this to prevent default form submission
          console.log("Form submitted");
          formik.handleSubmit(e);
        }}
        className="my-10 space-y-6 rounded-lg bg-white p-8 shadow"
      >
        {/* Event Basic Info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-sm text-red-600">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Category
            </label>
            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-sm text-red-600">
                {formik.errors.category}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-sm text-red-600">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* Location Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <CountryCombobox
                value={formik.values.countryId}
                onChange={(value) => {
                  formik.setFieldValue("countryId", value);
                  // Reset city when country changes
                  formik.setFieldValue("cityId", 0);
                }}
              />
              {formik.touched.countryId && formik.errors.countryId && (
                <div className="text-sm text-red-600">
                  {formik.errors.countryId}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <CityCombobox
                countryId={formik.values.countryId}
                value={formik.values.cityId}
                onChange={(value) => formik.setFieldValue("cityId", value)}
                disabled={
                  !formik.values.countryId || formik.values.countryId === 0
                }
              />
              {formik.touched.cityId && formik.errors.cityId && (
                <div className="text-sm text-red-600">
                  {formik.errors.cityId}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specific Location
            </label>
            <input
              type="text"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              disabled={!formik.values.cityId || formik.values.cityId === 0}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-sm text-red-600">
                {formik.errors.location}
              </div>
            )}
          </div>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={formik.values.startDate}
              onChange={(date) => formik.setFieldValue("startDate", date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              placeholderText="Select start date"
              onBlur={formik.handleBlur}
              name="startDate"
              showPopperArrow={false}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="text-sm text-red-600">
                {formik.errors.startDate}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <DatePicker
              selected={formik.values.endDate}
              onChange={(date) => formik.setFieldValue("endDate", date)}
              minDate={formik.values.startDate || new Date()}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              placeholderText="Select end date"
              onBlur={formik.handleBlur}
              name="endDate"
              showPopperArrow={false}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="text-sm text-red-600">
                {formik.errors.endDate}
              </div>
            )}
          </div>
        </div>

        {/* Image Uploads */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue(
                  "banner",
                  event.currentTarget.files?.[0] || null,
                );
              }}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((num) => (
              <div key={num}>
                <label className="block text-sm font-medium text-gray-700">
                  Picture {num}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue(
                      `picture${num}`,
                      event.currentTarget.files?.[0] || null,
                    );
                  }}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">
              Ticket Categories
            </h3>
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("ticketCategories", [
                  ...formik.values.ticketCategories,
                  {
                    name: "",
                    description: "",
                    price: 0,
                    seatQuota: 1,
                  } as TicketCategory,
                ])
              }
              className="rounded-md bg-[#224046] px-4 py-2 text-[#F5DFAD] hover:bg-[#224046]/80"
            >
              Add Ticket Category
            </button>
          </div>

          {/* Display array-level validation errors (e.g., "at least one category is required") */}
          {formik.touched.ticketCategories &&
            typeof formik.errors.ticketCategories === "string" && (
              <div className="text-sm text-red-600">
                {formik.errors.ticketCategories}
              </div>
            )}

          {formik.values.ticketCategories.map((ticket, index) => {
            // Type-safe error and touched handling
            const categoryErrors =
              (formik.errors.ticketCategories as FormikTicketErrors[])?.[
                index
              ] || {};
            const categoryTouched =
              (formik.touched.ticketCategories as FormikTicketTouched[])?.[
                index
              ] || {};

            return (
              <div
                key={index}
                className="rounded-lg border border-[#F5DFAD]/20 bg-white p-4 shadow"
              >
                <div className="mb-4 flex justify-between">
                  <h4 className="text-md font-medium text-gray-700">
                    Ticket Category #{index + 1}
                  </h4>
                  {formik.values.ticketCategories.length > 1 && ( // Allow removing if more than one exists
                    <button
                      type="button"
                      onClick={() => {
                        const newCategories =
                          formik.values.ticketCategories.filter(
                            (_, i) => i !== index,
                          );
                        formik.setFieldValue("ticketCategories", newCategories);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Ticket Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ticket Name
                    </label>
                    <input
                      type="text"
                      name={`ticketCategories.${index}.name`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={ticket.name}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                    {categoryTouched.name && categoryErrors.name && (
                      <div className="text-sm text-red-600">
                        {categoryErrors.name}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      name={`ticketCategories.${index}.description`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={ticket.description}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                    {categoryTouched.description &&
                      categoryErrors.description && (
                        <div className="text-sm text-red-600">
                          {categoryErrors.description}
                        </div>
                      )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      name={`ticketCategories.${index}.price`}
                      value={ticket.price}
                      onChange={(e) => {
                        const val =
                          e.target.value === "" ? "" : Number(e.target.value);
                        formik.setFieldValue(
                          `ticketCategories.${index}.price`,
                          val,
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                    {categoryTouched.price && categoryErrors.price && (
                      <div className="text-sm text-red-600">
                        {categoryErrors.price}
                      </div>
                    )}
                  </div>

                  {/* Seat Quota */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Seat Quota
                    </label>
                    <input
                      type="number"
                      min="1"
                      name={`ticketCategories.${index}.seatQuota`}
                      value={ticket.seatQuota}
                      onChange={(e) => {
                        const val =
                          e.target.value === "" ? "" : Number(e.target.value);
                        formik.setFieldValue(
                          `ticketCategories.${index}.seatQuota`,
                          val,
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                    {categoryTouched.seatQuota && categoryErrors.seatQuota && (
                      <div className="text-sm text-red-600">
                        {categoryErrors.seatQuota}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-5">
          {/* <pre className="text-xs text-red-500">
            {JSON.stringify(formik.errors, null, 2)}
          </pre> */}{" "}
          {/* Uncomment for debugging */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
