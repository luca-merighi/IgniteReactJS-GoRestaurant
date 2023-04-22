import FoodCard from '../FoodCard'
import { useFoods } from '@/hooks/foods'

import styles from './styles.module.scss'

interface FoodMenuProps {
    openModal: () => void
}

export default function FoodMenu(props: FoodMenuProps) {
    const {foods} = useFoods()

    function openModal() {
        props.openModal()
    }

    return (
        <main className={styles.foodMenu}>
            <section className={styles.container}>
                {foods.map(food => {
                    return (
                        <FoodCard
                        key={food.id}
                        id={food.id}
                        image={food.image}
                        title={food.name}
                        description={food.description}
                        price={food.price}
                        available={food.available}
                        openModal={openModal} />
                    )
                })}
            </section>
        </main>
    )
}