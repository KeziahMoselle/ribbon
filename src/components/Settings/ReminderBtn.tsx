import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple, Text } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'

interface Props {
  onPress: (bool: boolean) => void;
  reminder: Date | null;
  disabled: boolean;
}

function ReminderBtn ({ onPress, reminder = null, disabled = false }: Props) {
  return (
    <TouchableRipple
      onPress={() => onPress(true)}
      style={[styles.reminderBtn, disabled ? styles.disabledStyle : null]}
      disabled={disabled}
    >
      <View style={styles.reminderContent}>
        <Text style={styles.reminderText}>{
          reminder ? format(reminder, 'p')
            : 'Add a reminder'
        }</Text>

        <Feather name={reminder ? 'clock' : 'plus'} size={16} />
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  disabledStyle: {
    backgroundColor: '#ACACAC',
    opacity: 0.2
  },
  reminderBtn: {
    backgroundColor: '#EEE',
    borderRadius: 4,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18
  },
  reminderContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  reminderText: {
    fontSize: 16
  }
})

export default ReminderBtn
