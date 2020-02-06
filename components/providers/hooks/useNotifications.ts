import React, { useState, useEffect } from 'react';
import NotificationsService from '../services/NotificationsService';

function useNotifications() {
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
    const isAllowed = await NotificationsService.askPermissions()
    setIsPermissionAllowed(isAllowed);
    if (!isAllowed) {
      alert('The app will NOT be able to send notifications.')
    }
  }

  async function updateReminder(event, date: Date) {
    // Close the datePicker
    setIsOpen(false);
    if (event.type === 'dismissed') return;
    if (!date) return;
    // Save the reminder
    setReminder(date);

    // Fetch the notifications queue
    
    // Clear notifications

    // Reschedule all the notifications

    AsyncStorage.setItem(STORAGE_REMINDER_KEY, date.toString());
  }

}