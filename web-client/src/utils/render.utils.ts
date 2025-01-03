export const delayForDisplay = async <T>(promise: Promise<T>) => {
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
    });
    return promise;
};
