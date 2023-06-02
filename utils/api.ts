
export const YupErrorsToResponse = (error: any): Object => {
    if (error.inner){
        const errors = error.inner.reduce((acc: any, validationError: any) => {
            acc[validationError.path] = validationError.message;
            return acc;
        }, {});
        return {message: "There is error", error: errors };
    }
    return {message:error.message, error};
}
