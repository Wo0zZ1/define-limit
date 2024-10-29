import Layout from '../layout/main'

import LimitForm from '../components/LimitForm'
import DefinitionForm from '../components/DefinitionForm'

const LimitToDefinition = () => {
	return (
		<Layout>
			<LimitForm type='input' />
			<DefinitionForm type='display' />
		</Layout>
	)
}
export default LimitToDefinition
