import * as Yup from "yup";

export const registerOrganizerVS = Yup.object().shape({
    name: Yup.string().required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
        .min(6, "at least 6 chars")
        .required("required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "not matching")
        .required("required"),
});

export const registerUserVS = Yup.object().shape({
    fullName: Yup.string().required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
        .min(6, "at least 6 chars")
        .required("required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "not matching")
        .required("required"),
    refCode: Yup.string(),
});

export const loginUserVS = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
        .min(6, "at least 6 chars")
        .required("required"),
})