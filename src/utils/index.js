export const getInputWidth = length => {
	return Math.max(16, length * 15.5) + 'px'
}

export const inputSelectHandler = e => {
	e.target.select()
}
