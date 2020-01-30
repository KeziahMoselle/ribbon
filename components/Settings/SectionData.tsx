import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import {
  Button
} from 'react-native-paper';
import Section from './Section';

function SectionData() {
  const { reset } = useAuth();

  async function clearData() {
    await reset();
  }
  
  return (
    <Section title="Data">

      <Button
        onPress={clearData}
        mode="contained"
        color="#FF6961"
      >
        Reset your data
      </Button>

    </Section>
  )
}

export default SectionData;