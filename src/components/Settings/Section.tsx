import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Subheading } from 'react-native-paper'

function Section ({ children, title, headerChildren = null }) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Subheading style={styles.subheading}>{ title }</Subheading>

        { headerChildren }
      </View>

      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18
  },
  sectionHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subheading: {
    marginBottom: 12
  }
})

export default Section
