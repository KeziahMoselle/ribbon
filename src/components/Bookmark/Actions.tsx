import React from 'react'
import { View } from 'react-native'
import { FAB } from 'react-native-paper'
import styles from './BookmarkStyle'

export function PinAction ({ isPinned, onPress }) {
  let icon: string = ''
  let label: string = ''

  if (isPinned === null) {
    icon = 'pin'
    label = 'Unpin'
  }

  if (isPinned === true) {
    icon = 'pin'
    label = 'Unpin'
  }

  if (isPinned === false) {
    icon = 'pin-outline'
    label = 'Pin'
  }

  return (
    <View style={styles.leftAction}>
      <FAB
        icon={icon}
        label={label}
        color="#FFF"
        style={styles.leftActionBtn}
        onPress={onPress}
      />
    </View>
  )
}

export function UnsaveAction ({ onPress }) {
  return (
    <View style={styles.rightAction}>
      <FAB
        icon="delete"
        label="Unsave"
        color="#FFF"
        style={styles.rightActionBtn}
        onPress={onPress}
      />
    </View>
  )
}
