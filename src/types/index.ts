// TODO Обобщить
export interface IFormProps {
	type: 'input' | 'display'
}

export type path = 'definition-to-limit' | 'limit-to-definition'

export interface ILimitState {
	to: string
	func: string
	equal: string
}

export interface IDefinitionState {
	gamma: string
	eps: string
}

export interface globalState {
	functionChar: string
	argumentChar: string
	limitForm: ILimitState
	definitionForm: IDefinitionState
}
