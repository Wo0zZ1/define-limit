// TODO Обобщить
export interface IFormProps {
	type: 'input' | 'display'
}

export type path = 'definition-to-limit' | 'limit-to-definition'

export interface ILimitState {
	to: string
	func: string
	equal: string
	correct: boolean
}

export interface IDefinitionState {
	delta: string
	eps: string
	correct: boolean
}

export interface globalState {
	functionChar: string
	argumentChar: string
	limitForm: ILimitState
	definitionForm: IDefinitionState
}
