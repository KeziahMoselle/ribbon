import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

function Wrapper({ children }) {
  return (
    <View style={styles.wrapper}>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 24,
    marginRight: 24
  }
})

export default Wrapper;
