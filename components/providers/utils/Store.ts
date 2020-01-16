import { AsyncStorage } from 'react-native';

const PREFIX = '@Bookmarks'

class Store {
  static async setItem(key, value) {
    return AsyncStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  }
  
  static async getItem(key) {
    const result = await AsyncStorage.getItem(`${PREFIX}:${key}`)
    return result
  }
}

export default Store;