export default function isValidRealNumber(value: string) {
	if (value.match(/[^.0-9]/g)) return false;
	if ((value.match(/\./g)?.length ?? 0) > 1) return false;
	return true;
}
