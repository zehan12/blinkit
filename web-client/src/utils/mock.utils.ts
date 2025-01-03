export const _create_mock_response_ = <ResponseType, ErrorType>(
    response: ResponseType,
    errorData: ErrorType,
    shouldReject: boolean = false
): Promise<{ data: ResponseType } | never> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(errorData);
            } else {
                resolve({ data: response });
            }
        }, 3000);
    });
};