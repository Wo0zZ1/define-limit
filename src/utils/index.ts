export const getInputWidth = (length, size) => {
	return Math.max(size, (length + 1) * 16) + 'px'
}

export const inputSelectHandler = e => {
	e.target.select()
}
