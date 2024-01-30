import * as Yup from 'yup';

const resetPasswordValidationSchema = Yup.object({
    
    password: Yup.string()
    .required('Şifre boş bırakılamaz!')
    .min(6, 'şifre çok kısa minumum 6 karakter giriniz!')
    .matches(/[a-zA-Z]/, 'Şifre en az bir harf içermelidir!'),

  passwordConfirm: Yup.string()
    .required('Şifre doğrulama boş bırakılamaz!')
    .oneOf([Yup.ref('password')], 'Şifre Eşleşmiyor!')
});

export default resetPasswordValidationSchema;