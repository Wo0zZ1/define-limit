import { Header, Footer } from '../components'

const main = ({ children }: { children: any }) => {
	return (
		<>
			<Header />
			<div className='container my-12 w-full flex-grow'>
				<main
					style={{
						background:
							'linear-gradient(128deg, #DE8DE875, #8D98E975)',
					}}
					className='flex flex-col items-center gap-12 p-4 md:p-8 lg:p-12 glass rounded-3xl shadow-md'>
					{children}
				</main>
			</div>
			<Footer />
		</>
	)
}

export default main
