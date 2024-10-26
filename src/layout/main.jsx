import Header from '../components/Header'

const main = ({ children }) => {
	return (
		<>
			<Header />
			<div className='glass rounded-xl'>{children}</div>
		</>
	)
}

export default main
