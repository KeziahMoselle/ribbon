import React from 'react'
import Wrapper from '../../components/Layout/Wrapper'
import Title from '../../components/Title'
import Services from '../../components/Settings/Services'
import Reminders from '../../components/Settings/Reminders'

function SettingsScreen () {
  return (
    <Wrapper>
      <Title>Settings</Title>

      <Services />

      <Reminders />

    </Wrapper>
  )
}

export default SettingsScreen
