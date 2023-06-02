import * as Yup from "yup";

export const signupSchema = Yup.object({
    email: Yup.string()
        .email('Neplatný email')
        .required('Email je povinný.'),
    password: Yup.string()
        .required('Heslo je povinné.')
        .min(5, 'Heslo musí obsahovať aspoň 5 znakov.')
        .matches(/[0-9]/, 'Heslo musí obsahovať aspoň jedno číslo.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Heslá sa nezhodujú.')
        .required('Potvrdiť heslo je povinné.'),
});