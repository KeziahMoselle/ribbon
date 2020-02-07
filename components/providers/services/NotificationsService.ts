import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';

class NotificationsService {

  /**
   * Creates an instance of NotificationsService.
   * - Register a listener for notifications
   * - Fetch the notification queue
   */
  constructor() {
    Notifications.addListener(this.listener);
    this.getNotificationsQueue();
  }

  STORAGE_NOTIFICATIONS_ENABLED_KEY = '@Bookmarks:NotificationsEnabled';
  STORAGE_NOTIFICATIONS_HOUR_KEY = '@Bookmarks:NotificationsHour';
  STORAGE_NOTIFICATIONS_QUEUE_KEY = '@Bookmarks:NotificationsQueue';

  notificationsHour = null;
  notificationsQueue = [];
  

  /**
   * Listener for notifications actions
   */
  listener = (notification) => {
    console.log(notification);
  }

  getNotificationsEnabled = async (): Promise<boolean> => {
    const isEnabled = await AsyncStorage.getItem(this.STORAGE_NOTIFICATIONS_ENABLED_KEY);
    if (isEnabled === 'true') return true;
    return false;
  }

  setNotificationsEnabled = async (isEnabled: boolean) => {
    await AsyncStorage.setItem(this.STORAGE_NOTIFICATIONS_ENABLED_KEY, String(isEnabled));
  }

  /**
   * Get the notification hour date
   */
  getNotificationsHour = async (): Promise<Date | null> => {
    // Return the property directly
    if (this.notificationsHour) return this.notificationsHour;

    // If it's not there, fetch it in the AsyncStorage
    const localNotificationsHour = await AsyncStorage.getItem(this.STORAGE_NOTIFICATIONS_HOUR_KEY);

    if (!localNotificationsHour) {
      return null;
    }

    const hour = new Date(localNotificationsHour);
    this.notificationsHour = hour;
    return hour;
  }


  /**
   * Set the notification hour date
   */
  setNotificationsHour = async (date: Date) => {
    this.notificationsHour = date;
    await AsyncStorage.setItem(this.STORAGE_NOTIFICATIONS_HOUR_KEY, date.toString());
  }


  /**
   * Return true or false wether the app has the notification permission
   * If it's an emulator -> return true
   */
  askPermissions = async (): Promise<boolean> => {
    if (!Constants.isDevice) return true; // Emulator -> Skip permissions
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') return true;
    return false;
  }


  /**
   * Get the notification queue
   */
  getNotificationsQueue = async () => {
    const localNotificationsQueue = await AsyncStorage.getItem(this.STORAGE_NOTIFICATIONS_QUEUE_KEY);
    
    if (!localNotificationsQueue) {
      return null;
    }

    const queue = JSON.parse(localNotificationsQueue);
    this.notificationsQueue = queue
    return queue;
  }
  

  /**
   * Queue a new notification when a pinned bookmark has been added
   */
  queueNotification = async (title) => {
    const date = await this.getNotificationsHour();

    const notification = {
      title: 'Read this bookmark if you have some spare time !',
      body: title
    }

    console.log(notification);
    console.log(date);

    await Notifications.scheduleLocalNotificationAsync(notification, {
      time: date
    });
  }
}

export default new NotificationsService();