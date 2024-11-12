import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Logo from '../logo'

import styles from './index.module.scss'

export type path = 'definition-to-limit' | 'limit-to-definition'

const index = () => {
	const history = useLocation()

	const [link, setLink] = useState<path>('definition-to-limit')

	useEffect(() => {
		const currentLink = history.pathname.split('/')[1]
		if (currentLink === 'definition-to-limit')
			setLink('limit-to-definition')
		else if (currentLink === 'definition-to-limit')
			setLink('definition-to-limit')
	}, [history])

	return (
		<header className='w-full bg-white h-24 shadow-md'>
			<div className='hidden container w-full m-auto h-full sm:flex justify-between items-center'>
				<Logo />
				<Link to={`/${link}`} className={styles.link}>
					<span>
						Go to&nbsp;
						{link === 'limit-to-definition'
							? 'definition'
							: 'limit'}
					</span>
				</Link>
			</div>
		</header>
	)
}
export default index
