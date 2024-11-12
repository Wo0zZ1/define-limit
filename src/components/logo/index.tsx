import { Link } from 'react-router-dom'

import Logo from '/vite.svg'

import styles from './index.module.scss'

const index = () => {
	return (
		<div className={styles.link}>
			<img src={Logo} alt='logo' />
			<span>Define Limit</span>
		</div>
	)
}
export default index
