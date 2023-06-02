import * as yup from 'yup';

export const shareSchema = yup.object().shape({
    email: yup.string().required('Share User ID is required'),
});
