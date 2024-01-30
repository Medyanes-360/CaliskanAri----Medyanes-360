import * as Yup from 'yup';

const teacherValidationSchema = Yup.object({

    email: Yup.string()
    .required('e mail boş bırakılamaz.')
    .email('Geçerli bir e mail adresi giriniz.'),

    password: Yup.string()
    .required('Şifre boş bırakılamaz!')
});

export default teacherValidationSchema;