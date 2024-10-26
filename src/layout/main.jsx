import Header from '../components/Header'

const main = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default main
