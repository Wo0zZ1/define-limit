export const getInputWidth = (
	length: number,
	k: number,
	minSize: number = 0,
) => {
	return Math.max(k * minSize, (length + 1) * (16 * k)) + 'px'
}

export const inputSelectHandler = e => {
	e.target.select()
}
