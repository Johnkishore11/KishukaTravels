import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import api from '../api/api';
import { COLORS } from '../utils/constants';

const PaymentScreen = ({ route, navigation }) => {
  const { bus, selectedSeats, passengers, contactInfo, totalAmount } = route.params;
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const bookingData = {
        busId: bus._id,
        seats: selectedSeats,
        passengers,
        contactEmail: contactInfo.email,
        contactPhone: contactInfo.phone,
        totalAmount,
        paymentMethod: selectedMethod,
      };

      const response = await api.post('/api/bookings', bookingData);

      if (response.data) {
        navigation.navigate('BookingSuccess', { bookingDetails: response.data });
      }
    } catch (error) {
      console.log('Booking error:', error);
      Alert.alert('Payment Failed', 'There was an error processing your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline' },
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'netbanking', name: 'Net Banking', icon: 'business-outline' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Amount to Pay</Text>
          <Text style={styles.amount}>₹ {totalAmount}</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.selectedMethodCard
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <Ionicons 
                name={method.icon} 
                size={24} 
                color={selectedMethod === method.id ? COLORS.primary : COLORS.textLight} 
              />
              <Text style={[
                styles.methodName,
                selectedMethod === method.id && styles.selectedMethodName
              ]}>
                {method.name}
              </Text>
            </View>
            <Ionicons 
              name={selectedMethod === method.id ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={selectedMethod === method.id ? COLORS.primary : COLORS.border} 
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={`Pay ₹ ${totalAmount}`}
          onPress={handlePayment}
          loading={loading}
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
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedMethodCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.peach,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  selectedMethodName: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default PaymentScreen;
