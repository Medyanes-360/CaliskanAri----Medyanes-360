import * as Yup from 'yup';
const ValidationSchema = Yup.object({
    startBannerTime: Yup.string()
    .typeError('Yanlış bir değer girdiniz.')
    .trim('rol alanı boşluk içeremez.'),

    endBannerTime: Yup.string()
    .typeError('Yanlış bir değer girdiniz.')
    .trim('rol alanı boşluk içeremez.'),

    mainText: Yup.string()
    .typeError('Yanlış bir değer girdiniz.'),

    detailText: Yup.string()
    .typeError('Yanlış bir değer girdiniz.'),

    isActive: Yup.boolean()
    .typeError('Yanlış bir değer girdiniz.')
    .required('aktiflik alanı boş bırakılamaz'),

    mainTextColor: Yup.string()
    .typeError('Yanlış bir değer girdiniz.')
    .max(8, 'Renk kodu 8 karakterden uzun olamaz.'),

    underTextColor: Yup.string()
    .typeError('Yanlış bir değer girdiniz.')
    .max(8, 'Renk kodu 8 karakterden uzun olamaz.'),

    buttonColor: Yup.string()
    .typeError('Yanlış bir değer girdiniz.')
    .max(8, 'Renk kodu 8 karakterden uzun olamaz.'),

    backgroundColor: Yup.string()
    .typeError('Yanlış bir değer girdiniz.')
    .max(8, 'Renk kodu 8 karakterden uzun olamaz.'),

});

export default ValidationSchema;
