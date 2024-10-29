import Layout from '../layout/main'

import LimitForm from '../components/LimitForm'
import DefinitionForm from '../components/DefinitionForm'

const LimitToDefinition = () => {
	return (
		<Layout>
			<LimitForm />
			<DefinitionForm type='inputt' />
		</Layout>
	)
}
export default LimitToDefinition
