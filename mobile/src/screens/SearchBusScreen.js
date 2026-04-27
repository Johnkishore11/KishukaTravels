import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../utils/constants';

const SearchBusScreen = ({ navigation }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(''); // Simple text for now, could use datetime picker

  const handleSearch = () => {
    if (!source || !destination) {
      Alert.alert('Error', 'Please enter source and destination');
      return;
    }
    
    navigation.navigate('BusList', {
      source,
      destination,
      date: date || new Date().toISOString().split('T')[0]
    });
  };

  const swapLocations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        <View style={styles.inputContainer}>
          <CustomInput
            icon="location-outline"
            placeholder="From"
            value={source}
            onChangeText={setSource}
            style={styles.input}
          />
          
          <TouchableOpacity style={styles.swapButton} onPress={swapLocations}>
            <Ionicons name="swap-vertical" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          
          <CustomInput
            icon="location"
            placeholder="To"
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
          />
        </View>

        <CustomInput
          icon="calendar-outline"
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />

        <CustomButton
          title="Search Buses"
          onPress={handleSearch}
          style={styles.searchButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  searchCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    marginBottom: 0, // Reset margin to handle custom spacing
  },
  swapButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.peach,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  searchButton: {
    marginTop: 20,
  },
});

export default SearchBusScreen;
