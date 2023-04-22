import React, { useState } from 'react'
import Head from 'next/head'
import Modal from 'react-modal'
import { FoodsProvider } from '@/hooks/foods'

import Header from '@/components/Header'
import FoodMenu from '@/components/FoodMenu'
import FoodModal from '@/components/FoodModal'

Modal.setAppElement('#__next')

export default function Home() {
  const [isFoodModalOpen, setFoodModalOpen] = useState(false)

  function handleOpenFoodModal() {
    setFoodModalOpen(true)
  }

  function handleCloseFoodModal() {
    setFoodModalOpen(false)
  }

  return (
    <FoodsProvider>
      <Head>
        <title>GoRestaurant</title>
      </Head>

      <Header
        onRequestOpen={handleOpenFoodModal} />

      <FoodMenu openModal={handleOpenFoodModal} />

      <FoodModal
        isOpen={isFoodModalOpen}
        onRequestClose={handleCloseFoodModal} />
    </FoodsProvider>
  )
}