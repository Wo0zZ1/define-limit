import { Link } from 'react-router-dom'
import Logo from '/vite.svg'

const index = () => {
	return (
		<>
			<Link
				to='/limit-to-definition'
				className='flex gap-5 rounded-xl px-5 py-3 bg-[#DE8DE8bd] hover:bg-[#DE8DE8]'>
				<img src={Logo} alt='logo' />
				<span className='text-3xl font-bold uppercase'>
					Define Limit
				</span>
			</Link>
		</>
	)
}
export default index
