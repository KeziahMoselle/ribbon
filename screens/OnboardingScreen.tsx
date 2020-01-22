import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import Title from '../components/Title';
import { useAuth } from '../components/providers/AuthProvider';

function OnboardingScreen () {
  const { login } = useAuth();

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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF'
  },
  description: {
    fontSize: 16
  },
  illustration: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
})

export default OnboardingScreen;
