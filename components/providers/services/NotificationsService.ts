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
    this.getNotificationsQueue();
  }

  STORAGE_NOTIFICATIONS_ENABLED_KEY = '@Bookmarks:NotificationsEnabled';
  STORAGE_NOTIFICATIONS_HOUR_KEY = '@Bookmarks:NotificationsHour';
  STORAGE_NOTIFICATIONS_QUEUE_KEY = '@Bookmarks:NotificationsQueue';

  notificationsHour = null;
  notificationsQueue: NotificationQueueItem[] = [];
  

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
   * Set a new value for the notification queue in AsyncStorage
   */
  setNotificationQueue = async (newQueue) => {
    await AsyncStorage.setItem(
      this.STORAGE_NOTIFICATIONS_QUEUE_KEY,
      JSON.stringify(newQueue)
    );
  }


  /**
   * Remove the notification from the queue
   * Set the new array in AsyncStorage
   */
  removeFromNotificationQueue = async (id: string) => {
    // Find the index to get the notificationId
    const notificationIndex = this.notificationsQueue.findIndex(
      notification => notification.id === id
    )
    const notificationId = this.notificationsQueue[notificationIndex].notificationId;

    // Remove the notification from the queue
    const filteredQueue = this.notificationsQueue.filter(
      notification => notification.id !== id
    );
    // Remove the notification from the OS
    await Notifications.dismissNotificationAsync(notificationId);

    // Update
    this.notificationsQueue = filteredQueue;
    this.setNotificationQueue(this.notificationsQueue);
  }
  

  /**
   * Queue a new notification when a pinned bookmark has been added
   */
  queueNotification = async ({ id, body, permalink }) => {
    const time = await this.getNotificationsHour();

    const notification: NotificationQueueItem = {
      id,
      title: 'Read this bookmark if you have some spare time !',
      body,
      permalink,
      time
    }

    const notificationId = await Notifications.scheduleLocalNotificationAsync({
      title: notification.title,
      body: notification.body,
      android: {
        link: notification.permalink
      }
    }, {
      time: notification.time
    });

    this.notificationsQueue.push({
      ...notification,
      notificationId
    });
    
    this.setNotificationQueue(this.notificationsQueue);
  }
}

export default new NotificationsService();