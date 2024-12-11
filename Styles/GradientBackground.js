// GradientBackground.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['orange', 'pink']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default GradientBackground;
