import React from 'react'
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native'
import Title from '../../components/Title'
import { useAuth } from '../../components/providers/AuthProvider'

function OnboardingScreen () {
  const { login } = useAuth()

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Title>Welcome !</Title>
        <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil totam doloribus animi voluptates architecto neque culpa dolor ad iste quo labore iure sunt aliquam accusantium, recusandae, eum expedita incidunt est!</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Image
          style={styles.illustration}
          resizeMode="contain"
          source={require('../assets/onboarding.png')}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => login()}>
        <Text style={styles.btnText}>Login with Reddit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'space-between'
  },
  description: {
    fontSize: 16
  },
  illustration: {
    flex: 1,
    height: undefined,
    width: undefined
  }
})

export default OnboardingScreen
