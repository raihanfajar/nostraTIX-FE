import * as Yup from "yup";

export const registerOrganizerVS = Yup.object().shape({
  name: Yup.string().required("required"),
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string().min(6, "at least 6 chars").required("required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "not matching")
    .required("required"),
});

export const registerUserVS = Yup.object().shape({
  fullName: Yup.string().required("required"),
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string().min(6, "at least 6 chars").required("required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "not matching")
    .required("required"),
  refCode: Yup.string(),
});

export const loginUserVS = Yup.object().shape({
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string().min(6, "at least 6 chars").required("required"),
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const SUPPORTED_IMAGE_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Ini adalah validator dasar untuk satu file
const fileValidator = Yup.mixed<File>()
  .test(
    "fileSize",
    "Ukuran file maksimal 5MB",
    // Validasi hanya berjalan jika ada file (value tidak kosong)
    (value) => !value || (value && value.size <= MAX_FILE_SIZE),
  )
  .test(
    "fileType",
    "Format file tidak didukung",
    // Validasi hanya berjalan jika ada file
    (value) =>
      !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type)),
  );

export const createEventVS = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  description: Yup.string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),

  category: Yup.string().required("Category is required"),

  countryId: Yup.number().required("Country is required"),

  cityId: Yup.number().required("City is required"),

  startDate: Yup.date()
    .required("Start date is required")
    .min(today, "Start date cannot be in the past"),

  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date cannot be before the start date"),

  // Required file fields
  banner: fileValidator.required("A banner image is required."),

  picture1: fileValidator.required("Picture 1 is required."),

  // Optional file fields
  picture2: fileValidator.nullable(), // boleh null
  picture3: fileValidator.nullable(), // boleh null

  ticketCategories: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Ticket category name is required."),

        description: Yup.string().required(
          "Ticket category description is required.",
        ),

        price: Yup.number()
          .typeError("Price must be a number.")
          .required("Price is required. (use 0 for free tickets)")
          .min(0, "Price must be 0 or higher"),

        seatQuota: Yup.number()
          .typeError("Seat quota must be a number.")
          .integer("Seat quota must be an integer.")
          .min(1, "Seat quota must be at least 1.")
          .required("Seat quota is required."),
      }),
    )
    .min(1, "At least one ticket category is required.")
    .required("Ticket categories are required."),
});
