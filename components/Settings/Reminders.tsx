import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Section from './Section';
import ReminderBtn from './ReminderBtn';

const STORAGE_REMINDER_KEY = '@Bookmarks:Reminders';

function Reminders () {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isPermissionAllowed, setIsPermissionAllowed] = useState(false);
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    updateReminders();
    askPermissions();
  }, [])

  async function updateReminders() {
    const date = await AsyncStorage.getItem(STORAGE_REMINDER_KEY);
    if (!date) return
    setReminder(new Date(date));
  }

  async function askPermissions() {
    if (Constants.isDevice) return
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') return setIsPermissionAllowed(true);
    setIsPermissionAllowed(false);
    alert('The app will NOT be able to send notifications.')
  }

  async function updateReminder(event, date: Date) {
    // Close the datePicker
    setIsOpen(false);
    if (event.type === 'dismissed') return;
    if (!date) return;
    // Save the reminder
    setReminder(date);

    await Notifications.cancelAllScheduledNotificationsAsync();

    AsyncStorage.setItem(STORAGE_REMINDER_KEY, date.toString());
  }

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
