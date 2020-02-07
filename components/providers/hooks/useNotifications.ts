import { useState, useEffect } from 'react';
import NotificationsService from '../services/NotificationsService';

function useNotifications() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isPermissionAllowed, setIsPermissionAllowed] = useState(false);
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    _getIsNotificationEnabled();
    _getCurrentReminders();
    _askPermissions();
  }, []);

  useEffect(() => {
    NotificationsService.setNotificationsEnabled(isNotificationsEnabled);
  }, [isNotificationsEnabled]);


  /**
   * Update `isNotificationsEnabled` state
   */
  async function _getIsNotificationEnabled() {
    const isEnabled = await NotificationsService.getNotificationsEnabled();
    setIsNotificationsEnabled(isEnabled);
  }


  /**
   * Update `reminder` state
   */
  async function _getCurrentReminders() {
    const date = await NotificationsService.getNotificationsHour();
    if (!date) return
    setReminder(date);
  }
  

  /**
   * Update `isPermissionAllowed` state
   */
  async function _askPermissions() {
    const isAllowed = await NotificationsService.askPermissions()
    setIsPermissionAllowed(isAllowed);
    if (!isAllowed) {
      alert('The app will NOT be able to send notifications.')
    }
  }


  /**
   * 
   */
  async function updateReminder(event, date: Date) {
    if (event.type === 'dismissed') return;
    if (!date) return;
    // Save the reminder
    setReminder(date);

    NotificationsService.setNotificationsHour(date);

    // Fetch the notifications queue
    
    // Clear notifications

    // Reschedule all the notifications
  }

  return {
    isNotificationsEnabled,
    setIsNotificationsEnabled,
    isPermissionAllowed,
    reminder,
    updateReminder,
    queueNotification: NotificationsService.queueNotification
  };
}

export default useNotifications;