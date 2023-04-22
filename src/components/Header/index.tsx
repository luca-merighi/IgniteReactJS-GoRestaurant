import styles from './styles.module.scss'

import {FiPlus} from 'react-icons/fi'

interface HeaderProps {
    onRequestOpen: () => void
}

export default function Header(props: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src="/logo.svg" alt="Logo GoRestaurant" />

                <button onClick={props.onRequestOpen}>
                    <FiPlus />
                    <span>
                        Novo Prato
                    </span>
                </button>
            </div>
        </header>
    )
}