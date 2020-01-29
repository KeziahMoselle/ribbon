import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading } from 'react-native-paper';

function Section({ children, title }) {
  return (
    <View style={styles.container}>
      <Subheading style={styles.subheading}>{ title }</Subheading>

      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18
  },
  subheading: {
    marginBottom: 12
  }
});

export default Section;