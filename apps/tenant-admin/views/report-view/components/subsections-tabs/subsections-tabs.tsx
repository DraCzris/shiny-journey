import { useState } from 'react'

import { ActionsPerTicketList } from './actions-per-ticket-list'
import { InterventionsList } from './interventions-list'
import { Tabs } from './tabs'

export const SubsectionsTabs = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <>
      <Tabs currentIndex={currentIndex} setIndex={setCurrentIndex} />
      {currentIndex === 0 && <InterventionsList />}
      {currentIndex === 1 && <ActionsPerTicketList />}
    </>
  )
}
