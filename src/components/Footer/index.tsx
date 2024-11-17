import { FC } from 'react'
import { FaGithub, FaTelegram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

const Footer: FC = () => {
	return (
		<footer className='py-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
			<div className='container flex justify-center items-center h-full'>
				<div className='flex gap-4 flex-col xs:flex-row justify-between items-start xs:items-center xs:w-full'>
					<Link target='_blank' to='https://github.com/Wo0zZ1'>
						<div className={styles.github}>
							<FaGithub />
							<span>Visit my GitHub</span>
						</div>
					</Link>
					<Link target='_blank' to='tg://user?id=1749779085'>
						<div className={styles.telegram}>
							<span>Contact me</span>
							<FaTelegram />
						</div>
					</Link>
				</div>
			</div>
		</footer>
	)
}
export default Footer
