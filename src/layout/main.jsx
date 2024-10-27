import Header from '../components/Header'

const main = ({ children }) => {
	return (
		<>
			<Header />
			<div className='container w-full mx-auto mt-24'>
				<main className='flex flex-col items-center gap-12 p-4 md:p-8 lg:p-12 glass rounded-3xl shadow-md'>
					{children}
				</main>
			</div>
		</>
	)
}

export default main
