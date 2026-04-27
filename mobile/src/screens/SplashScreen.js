import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../utils/constants';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Logic for checking authentication is usually handled by a Navigator
      // Here we just delay a bit and let the root navigator decide based on context
      setTimeout(() => {
        // Will be handled by RootNavigator observing AuthContext
      }, 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <View style={styles.logoContainer}>
          {/* Using a placeholder view for the logo, representing the primary theme color */}
          <View style={styles.logoPlaceholder}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1008/1008064.png' }} 
              style={styles.logoImage} 
              resizeMode="contain" 
            />
          </View>
        </View>
        <Animated.Text style={styles.title}>Kishuka Travels</Animated.Text>
        <Animated.Text style={styles.subtitle}>Your Journey, Our Priority</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.peach,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 80,
    height: 80,
    tintColor: COLORS.primary, // Coloring the bus icon to match theme
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});

export default SplashScreen;
