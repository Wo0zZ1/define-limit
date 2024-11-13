import { type FC } from 'react'
import { useDispatch } from 'react-redux'

import { reset } from '../../store/slices/globalSlice'

import LogoIcon from '../../assets/vite.svg?react'

import styles from './index.module.scss'

const Logo: FC = () => {
	const dispatch = useDispatch()

	return (
		<div
			className={styles.link}
			onClick={() => dispatch(reset())}>
			<LogoIcon />
			<span>Define Limit</span>
		</div>
	)
}

export default Logo
