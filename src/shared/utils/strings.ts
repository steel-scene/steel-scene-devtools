export const minimize = (input: string) => {
    if (!input || input.length < 1) {
        return input;
    }
    return input[0].toLowerCase() + input.substr(1, input.length - 1);
};

export const unsuffix = (input: string, suffix: string) => {
    const lastIndexOfSuffix = input.lastIndexOf(suffix);
    if (lastIndexOfSuffix === -1) {
        return input;
    }
    return input.substr(0, lastIndexOfSuffix);
};
