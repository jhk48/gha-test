export default function updateArray<T>(
	array: T[] | null | undefined,
	newElement: T,
	replacePredicate: (element: T, index?: number) => boolean
) {
	if (!array || array.length === 0) return [newElement];
	if (!isMatchingElemExist(array, replacePredicate)) return [...array, newElement];
	return array.map((element, index) => {
		if (replacePredicate(element, index)) return newElement;
		return element;
	});
}

function isMatchingElemExist<T>(
	array: T[],
	replacePredicate: (element: T, index?: number) => boolean
) {
	return array.filter((el, idx) => replacePredicate(el, idx)).length > 0;
}
