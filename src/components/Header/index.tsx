import { type FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { reset } from '../../store/slices/globalSlice'

import { path } from '../../types'

import LogoIcon from '../../assets/vite.svg?react'

import styles from './index.module.scss'

const Header: FC = () => {
	const dispatch = useDispatch()

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
		<>
			<header className='z-50 sticky top-0 w-full py-2 bg-white shadow-md font-bold text-base sm:text-xl md:text-2xl lg:text-3xl uppercase'>
				<div className='container flex gap-2 flex-col xs:flex-row justify-between items-center h-full'>
					<div
						className={styles.logo}
						onClick={() => dispatch(reset())}>
						<LogoIcon />
						<span>Define Limit</span>
					</div>
					<Link to={`/${link}`} className={styles.button}>
						<span>Switch</span>
					</Link>
				</div>
			</header>
		</>
	)
}
export default Header
