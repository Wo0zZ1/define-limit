import Layout from '../layout/main'

import LimitForm from '../components/LimitForm'
import DefinitionForm from '../components/DefinitionForm'

const DefinitionToLimit = () => {
	return (
		<Layout>
			<DefinitionForm type='input' />
			<LimitForm type='display' />
		</Layout>
	)
}
export default DefinitionToLimit
