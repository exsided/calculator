export const PHONE_VALIDATION = (value: string): boolean => {
	const regex = /^((\+7|7|8)+ \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2})$|^((8)+ \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2})$|^[+]{1}[0-9]{16}$/;
	return regex.test(value);
};
