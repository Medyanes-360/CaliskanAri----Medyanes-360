import * as Yup from 'yup';

const forgotPasswordValidationSchema = Yup.object({

    email: Yup.string()
    .required('e mail boş bırakılamaz.')
    .email('Geçerli bir e mail adresi giriniz.'),
});

export default forgotPasswordValidationSchema;