import bcrypt from "bcrypt";

export const encrypt = async (query: string, salt = 10): Promise<string> => {
	const hashedPassword = await bcrypt.hash(query, salt);

	return hashedPassword;
};

export const compareEncrypted = async (
	query: string,
	queryEncrypted: string
): Promise<boolean> => {
	const isEqual = await bcrypt.compare(query, queryEncrypted);

	return isEqual;
};
