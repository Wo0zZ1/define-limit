import { type FC } from 'react'
import { useDispatch } from 'react-redux'

import { reset } from '../../store/slices/globalSlice'

import Logo from '/vite.svg'

import styles from './index.module.scss'

const index: FC = () => {
	const dispatch = useDispatch()

	return (
		<div
			className={styles.link}
			onClick={() => dispatch(reset())}>
			<img src={Logo} alt='logo' />
			<span>Define Limit</span>
		</div>
	)
}
export default index
