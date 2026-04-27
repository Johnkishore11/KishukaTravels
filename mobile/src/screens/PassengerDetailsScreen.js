import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../utils/constants';

const PassengerDetailsScreen = ({ route, navigation }) => {
  const { bus, selectedSeats, totalAmount } = route.params;

  // Initialize passenger data state based on selected seats
  const [passengers, setPassengers] = useState(
    selectedSeats.map(seat => ({ seat, name: '', age: '', gender: '' }))
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const updatePassenger = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleContinue = () => {
    // Basic validation
    const isValid = passengers.every(p => p.name && p.age) && email && phone;
    
    if (!isValid) {
      Alert.alert('Validation Error', 'Please fill in all passenger details and contact information.');
      return;
    }

    navigation.navigate('Payment', {
      bus,
      selectedSeats,
      passengers,
      contactInfo: { email, phone },
      totalAmount
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Journey Summary</Text>
          <Text style={styles.summaryRoute}>{bus.source} to {bus.destination}</Text>
          <Text style={styles.summaryText}>Seats: {selectedSeats.join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <CustomInput
            placeholder="Email ID (for e-ticket)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <CustomInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Details</Text>
          {passengers.map((passenger, index) => (
            <View key={passenger.seat} style={styles.passengerCard}>
              <Text style={styles.passengerHeader}>Passenger {index + 1} (Seat: {passenger.seat})</Text>
              <CustomInput
                placeholder="Full Name"
                value={passenger.name}
                onChangeText={(val) => updatePassenger(index, 'name', val)}
              />
              <CustomInput
                placeholder="Age"
                value={passenger.age}
                onChangeText={(val) => updatePassenger(index, 'age', val)}
                keyboardType="numeric"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>₹ {totalAmount}</Text>
        </View>
        <CustomButton
          title="Proceed to Pay"
          onPress={handleContinue}
          style={styles.payButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryTitle: {
    color: COLORS.peach,
    fontSize: 14,
    marginBottom: 4,
  },
  summaryRoute: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryText: {
    color: COLORS.white,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  passengerCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  passengerHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  payButton: {
    width: 160,
    marginVertical: 0,
  },
});

export default PassengerDetailsScreen;
