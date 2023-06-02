import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Neplatný email').required('Email je povinný.'),
    password: Yup.string().required('Heslo je povinné.'),
})