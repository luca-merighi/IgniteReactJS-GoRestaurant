import {useState} from 'react'
import { useFoods } from '@/hooks/foods'
import {FiEdit, FiTrash} from 'react-icons/fi'

import styles from './styles.module.scss'

interface FoodCardProps {
    image: string,
    title: string,
    description: string,
    price: string,
    available: boolean,
    id: string,
    openModal: () => void
}

export default function FoodCard(props: FoodCardProps) {
    const {handleDeleteFood, handleEditFood, toggleAvaliable} = useFoods()

    const food = {
        id: props.id,
        name: props.title,
        description: props.description,
        price: props.price,
        image: props.image,
        available: props.available
    }

    async function editFood() {
        await handleEditFood({...food})
        
        props.openModal()
    }

    async function changeAvailability() {
        await toggleAvaliable({...food})
    }
    
    return (
        <div className={styles.foodCard}>
            <figure>
                <img 
                src={props.image} 
                alt={`Imagem demonstrativa do prato ${props.title}`}
                className={props.available === true ? '' : `${styles.isFoodAvailable}`} />
            </figure>

            <div className={styles.info}>
                <h3>
                    {props.title}
                </h3>
                <p>
                    {props.description}
                </p>
                <span className={styles.price}>
                    R$ {props.price}
                </span>
            </div>

            <footer>
                <div className={styles.buttons}>
                    <button onClick={editFood}>
                        <FiEdit />
                    </button>
                    <button onClick={() => handleDeleteFood(props.id)}>
                        <FiTrash />
                    </button>
                </div>

                <div className={styles.availabilityContainer}>
                    <p className={props.available === true ? '' : `${styles.isFoodAvailable}`}> 
                        {props.available === true ? 'Disponível' : 'Indisponível'}
                    </p>

                    <label className={styles.switch}>
                        <input 
                        type="checkbox" 
                        checked={props.available}
                        onChange={changeAvailability} />
                        <span className={styles.slider} />
                    </label>
                </div>
            </footer>
        </div>
    )
}