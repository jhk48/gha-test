export default function isValidInteger(value: string) {
	if (value.match(/[^0-9]/g)) return false;
	return true;
}
