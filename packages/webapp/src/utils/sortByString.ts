export default function sortByString(a: string, b: string) {
	return enCollator.compare(a, b);
}

const enCollator = new Intl.Collator('en');
