import { AsyncStorage } from 'react-native';

const PREFIX: string = '@Bookmarks'

class Store {
  static async setItem(key: string, value: object) {
    return AsyncStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  }
  
  static async getItem(key: string) {
    const result = await AsyncStorage.getItem(`${PREFIX}:${key}`)
    return JSON.parse(result)
  }

  static async removeItem(key: string) {
    return AsyncStorage.removeItem(key)
  }
}

export default Store;