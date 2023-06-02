import * as yup from 'yup';
export const itemSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    deadline: yup.date().nullable(),
    status: yup.string().oneOf(['active', 'completed', 'cancelled']).required('Status is required'),
});