export const CAMEL_TO_KEBAB = (string: string): string => {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

export const LOCAL_NUMBER_FORMATTER = (num: string | number) => Number(num).toLocaleString('RU-ru');

export const WAIT = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
