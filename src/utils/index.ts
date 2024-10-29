export const getInputWidth = (length: number, size: number) => {
	return Math.max(size, (length + 1) * 16) + 'px'
}

export const inputSelectHandler = e => {
	e.target.select()
}
