import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import useNotifications from '../providers/hooks/useNotifications';
import { Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Section from './Section';
import ReminderBtn from './ReminderBtn';

function Reminders () {

  return (
    <Section
      title="Reminders"
      headerChildren={
      <Switch
        value={isNotificationsEnabled}
        onValueChange={setIsNotificationsEnabled}
        disabled={!isPermissionAllowed}
        color="#000"
      />}
    >


      <View style={{ flexDirection: 'row' }}>
        <ReminderBtn
          onPress={setIsOpen}
          reminder={reminder}
          disabled={!isNotificationsEnabled}
        />
      </View>

      {isOpen && (
        <DateTimePicker
          value={reminder || new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={updateReminder}
        />
      )}

    </Section>
  )
}

export default Reminders;
