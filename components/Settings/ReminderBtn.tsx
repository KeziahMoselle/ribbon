import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import format from 'date-fns/format'

interface Props {
  onPress: (bool: boolean) => void;
  reminder: Date | null;
  disabled: boolean;
}

function ReminderBtn({ onPress, reminder = null, disabled = false }: Props) {


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
  reminderBtn: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#EEE',
    borderRadius: 4
  },
  reminderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  reminderText: {
    fontSize: 16
  },
  disabledStyle: {
    backgroundColor: '#ACACAC',
    opacity: 0.2
  }
});

export default ReminderBtn;