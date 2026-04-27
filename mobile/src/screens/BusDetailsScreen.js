import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../utils/constants';

const BusDetailsScreen = ({ route, navigation }) => {
  const { bus } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={styles.operatorName}>{bus.operatorName}</Text>
          <Text style={styles.busType}>{bus.busType}</Text>
          
          <View style={styles.routeContainer}>
            <View style={styles.timeLocation}>
              <Text style={styles.time}>{bus.departureTime}</Text>
              <Text style={styles.location}>{bus.source}</Text>
            </View>
            <View style={styles.durationLine}>
              <Text style={styles.durationText}>{bus.duration || '6h 30m'}</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.timeLocation}>
              <Text style={styles.time}>{bus.arrivalTime}</Text>
              <Text style={styles.location}>{bus.destination}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {bus.amenities?.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            )) || (
              <Text style={styles.textLight}>Standard amenities available</Text>
            )}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <Text style={styles.policyText}>
            • 100% refund if cancelled before 24 hours of journey.{'\n'}
            • 50% refund if cancelled between 12-24 hours.{'\n'}
            • No refund within 12 hours of journey.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>₹ {bus.price}</Text>
        </View>
        <CustomButton
          title="Select Seats"
          onPress={() => navigation.navigate('SeatSelection', { bus })}
          style={styles.bookButton}
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
  headerCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 10,
  },
  operatorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  busType: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeLocation: {
    alignItems: 'center',
    width: '30%',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  durationLine: {
    flex: 1,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  line: {
    height: 2,
    backgroundColor: COLORS.border,
    width: '100%',
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
  },
  policyText: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  textLight: {
    color: COLORS.textLight,
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
  priceLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bookButton: {
    width: 150,
    marginVertical: 0,
  },
});

export default BusDetailsScreen;
