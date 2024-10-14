export const getInputWidth = length => {
	return Math.max(18, length * 15.5) + 'px'
}

export const inputSelectHandler = e => {
	e.target.select()
}
