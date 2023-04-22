import api from '@/services/api'
import {ReactNode, createContext, useContext, useState, useEffect} from 'react'

interface Food {
    id: string,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
}

type FoodCreate = Omit<Food, 'id' | 'available'>

interface FoodsContextData {
    foods: Food[],
    editingFood: Food,
    setEditingFood,
    loading: boolean,
    handleDeleteFood: (foodId: string) => Promise<void>,
    handleAddFood: (food: FoodCreate) => Promise<void>,
    handleEditFood: (food: Food) => Promise<void>,
    handleUpdateFood: (food: Food) => Promise<void>,
    toggleAvaliable: (food: Food) => Promise<void>
}

interface FoodsProviderProps {
    children: ReactNode
}

const FoodsContext = createContext<FoodsContextData>(
    {} as FoodsContextData
)

export function FoodsProvider(props: FoodsProviderProps) {
    const [foods, setFoods] = useState<Food[]>([])
    const [editingFood, setEditingFood] = useState<Food>()
    const [loading, setLoading] = useState(false)

    async function handleAddFood(food: FoodCreate) {
        const newFood = {
            ...food,
            id: String(foods[foods.length - 1] ? foods[foods.length - 1].id + 1 : 1,),
            available: true
        }

        await api.post('/foods', newFood)
        setFoods([
            ...foods,
            newFood
        ])
    }

    async function handleEditFood(food: Food) {
        setEditingFood(food)
        setLoading(true)
    }

    async function handleUpdateFood(food: Food) {
        const newFoodList = foods.map(currentFood => {
            if(currentFood.id !== editingFood.id) {
                return currentFood
            }
            return {
                ...food,
                id: editingFood.id,
                available: editingFood.available
            }
        })
        await api.put(`/foods/${editingFood.id}`, {
            ...food,
            id: editingFood.id,
            available: editingFood.available
        })
        setFoods(newFoodList)
        setEditingFood(null)
        setLoading(false)
    }   

    async function handleDeleteFood(id: string) {
        await api.delete('/foods/' + id)
        const newFoods = foods.filter(food => food.id !== id)
        setFoods(newFoods)
    }

    async function toggleAvaliable(food: Food) {
        await api.put(`/foods/${food.id}`, {
            ...food,
            available: !food.available
        })
        const foodsList = await api.get('/foods')
        setFoods(foodsList.data)
    }

    useEffect(() => {
        async function loadFoodsMenu() {
            const foodsList = await api.get('/foods')
            setFoods(foodsList.data)
        }

        loadFoodsMenu()
    }, [])

    return (
        <FoodsContext.Provider value={{
            foods,
            editingFood,
            setEditingFood,
            loading,
            handleAddFood,
            handleDeleteFood,
            handleEditFood,
            handleUpdateFood,
            toggleAvaliable
        }}>
            {props.children}
        </FoodsContext.Provider>
    )
}

export function useFoods() {
    const context = useContext(FoodsContext)
    return context
}