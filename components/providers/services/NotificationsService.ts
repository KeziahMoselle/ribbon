import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';

class NotificationsService {
  constructor() {
    Notifications.addListener(this.listener);
  }

  STORAGE_NOTIFICATIONS_HOUR_KEY = '@Bookmarks:NotificationsHour';

  listener = (notification) => {
    console.log(notification);
  }

  bootstrapNotificationsData = async () => {
    const localNotificationsHour = await AsyncStorage.getItem(this.STORAGE_NOTIFICATIONS_HOUR_KEY);

    if (!localNotificationsHour) {
      throw 'No user data';
    }

    return localNotificationsHour;
  }

  askPermissions = async () => {
    if (!Constants.isDevice) return true; // Emulator -> Skip permissions
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') return true;
    return false;
  }
}

export default new NotificationsService();