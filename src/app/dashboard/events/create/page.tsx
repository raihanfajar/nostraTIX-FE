import { CityCombobox } from "@/components/CityComboBox";
import { CountryCombobox } from "@/components/CountryComboBox";
import { getEventCategories } from "@/services/getEvents";
import { useAuthStore } from "@/store/useAuthStore";
import { Category } from "@/types/event";
import { axiosInstance } from "@/utils/axiosInstance";
import { createEventVS } from "@/utils/validationSchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

const createEvent = () => {
  const { accessToken } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);

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

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      countryId: 0,
      cityId: 0,
      location: "",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      banner: null,
      picture1: null,
      picture2: null,
      picture3: null,
      ticketCategories: [
        {
          name: "",
          description: "",
          price: 0,
          seatQuota: 0,
        },
      ],
    },
    validationSchema: createEventVS,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const fd = new FormData();

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

        await axiosInstance.post("/events", fd, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("FormData content (Corrected):");
        for (let [key, value] of fd.entries()) {
          console.log(key, value);
        }

        setSubmitting(false);
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setSubmitting(false); // Ensure submitting state is reset
      }
    },
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="mt-10 text-center text-3xl font-bold text-[#F5DFAD]">
        Create New Event
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow"
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
              <div className="text-sm text-red-600">{formik.errors.category}</div>
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
            <div className="text-sm text-red-600">{formik.errors.description}</div>
          )}
        </div>

        {/* Location Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <CountryCombobox
                value={formik.values.countryId}
                onChange={(value) => {
                  formik.setFieldValue("countryId", value);
                  // Reset city when country changes
                  formik.setFieldValue("cityId", 0);
                }}
              />
              {formik.touched.countryId && formik.errors.countryId && (
                <div className="text-sm text-red-600">{formik.errors.countryId}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <CityCombobox
                countryId={formik.values.countryId}
                value={formik.values.cityId}
                onChange={(value) => formik.setFieldValue("cityId", value)}
                disabled={!formik.values.countryId || formik.values.countryId === 0}
              />
              {formik.touched.cityId && formik.errors.cityId && (
                <div className="text-sm text-red-600">{formik.errors.cityId}</div>
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
              <div className="text-sm text-red-600">{formik.errors.location}</div>
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
                  event.currentTarget.files?.[0] || null
                );
              }}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
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
                      event.currentTarget.files?.[0] || null
                    );
                  }}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-5">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors 
              hover:bg-blue-700 disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default createEvent;
