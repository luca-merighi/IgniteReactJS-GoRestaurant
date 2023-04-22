import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import {FaRegCheckSquare} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import { useFoods } from '@/hooks/foods'

import styles from './styles.module.scss'
import ModalInput from './ModalInput'

interface FoodModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
}

export default function FoodModal(props: FoodModalProps) {
    const {handleAddFood, handleUpdateFood, editingFood, setEditingFood} = useFoods()
    const [imgLink, setImgLink] = useState(editingFood?.image ?? '')
    const [foodTitle, setFoodTitle] = useState(editingFood?.name ?? '')
    const [foodPrice, setFoodPrice] = useState(editingFood?.price ?? '')
    const [foodDescription, setFoodDescription] = useState(editingFood?.description ?? '')
    
    async function editFood() {
        if(imgLink == '' || foodTitle == '' || foodPrice == '' || foodDescription == '') {
            return 
        } else {
            await handleUpdateFood({
                id: editingFood.id,
                image: imgLink || editingFood?.image,
                name: foodTitle || editingFood?.name,
                price: foodPrice || editingFood?.price,
                description: foodDescription || editingFood?.description,
                available: editingFood.available
            })
            
            closeModal()
        }
    }
    

    async function createFood() {
        if(imgLink == '' || foodTitle == '' || foodPrice == '' || foodDescription == '') {
            return 
        } else {
            await handleAddFood({
                image: imgLink,
                name: foodTitle,
                price: foodPrice,
                description: foodDescription
            })
            
            closeModal()
        }
    }

    function closeModal() {
        setEditingFood('')
        setImgLink('')
        setFoodTitle('')
        setFoodPrice('')
        setFoodDescription('')
        props.onRequestClose()
    }

    useEffect(() => {
        if(editingFood) {
            setImgLink(String(editingFood?.image))
            setFoodTitle(String(editingFood?.name))
            setFoodPrice(String(editingFood?.price))
            setFoodDescription(String(editingFood?.description))
        } else {
            setEditingFood('')
            setImgLink('')
            setFoodTitle('')
            setFoodPrice('')
            setFoodDescription('')
        }
    }, [editingFood])

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={closeModal}
            overlayClassName={styles.reactModalOverlay}
            className={styles.reactModalContent}>
            <button 
            onClick={closeModal}
            className={styles.closeFoodModal}>
                <FiX />
            </button>

            <h2>
                {editingFood ? 'Editar Prato' : 'Adicionar Novo Prato'}
            </h2>

            <div className={styles.inputContainer}>
                <ModalInput
                    required={true}
                    placeholder="Imagem do Prato"
                    value={imgLink}
                    changeValue={setImgLink} />
                <ModalInput
                    required={true}
                    placeholder="Ex: Moda Italiana"
                    value={foodTitle}
                    changeValue={setFoodTitle} />
                <ModalInput
                    required={true}
                    placeholder="Ex: 19.90"
                    value={foodPrice}
                    changeValue={setFoodPrice} />
                <ModalInput
                    required={true}
                    placeholder="Descrição do Prato"
                    value={foodDescription}
                    changeValue={setFoodDescription} />
            </div>

            <button 
            onClick={editingFood ? editFood : createFood}
            className={styles.addFoodCard}>
                {editingFood ? 'Editar Prato' : 'Adicionar Prato'}
                <FaRegCheckSquare />
            </button>
        </Modal>
    )
}