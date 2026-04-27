import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../utils/constants';

const SeatSelectionScreen = ({ route, navigation }) => {
  const { bus } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Mock seat layout (30 seats, 2x2 layout)
  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= 8; row++) {
      const rowSeats = [];
      for (let col = 1; col <= 4; col++) {
        // Leave a gap for aisle
        if (col === 3) {
          rowSeats.push(<View key={`gap-${row}`} style={styles.aisleGap} />);
        }
        const seatId = `${row}${String.fromCharCode(64 + col)}`;
        const isSelected = selectedSeats.includes(seatId);
        
        rowSeats.push(
          <TouchableOpacity
            key={seatId}
            style={[
              styles.seat,
              isSelected && styles.selectedSeat
            ]}
            onPress={() => toggleSeat(seatId)}
          >
            <Text style={[styles.seatText, isSelected && styles.selectedSeatText]}>
              {seatId}
            </Text>
          </TouchableOpacity>
        );
      }
      seats.push(
        <View key={`row-${row}`} style={styles.row}>
          {rowSeats}
        </View>
      );
    }
    return seats;
  };

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        Alert.alert('Limit Exceeded', 'You can only select up to 6 seats.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Error', 'Please select at least one seat to continue.');
      return;
    }
    
    navigation.navigate('PassengerDetails', {
      bus,
      selectedSeats,
      totalAmount: selectedSeats.length * bus.price
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.availableBox]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.selectedBox]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.bookedBox]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.seatMapContainer}>
        <View style={styles.steeringWheel}>
          <Text>Driver</Text>
        </View>
        {renderSeats()}
      </ScrollView>

      {selectedSeats.length > 0 && (
        <View style={styles.footer}>
          <View>
            <Text style={styles.selectedSeatsText}>
              Seats: {selectedSeats.join(', ')}
            </Text>
            <Text style={styles.totalPrice}>
              Total: ₹ {selectedSeats.length * bus.price}
            </Text>
          </View>
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  availableBox: {
    backgroundColor: COLORS.white,
  },
  selectedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  bookedBox: {
    backgroundColor: COLORS.textLight,
  },
  legendText: {
    fontSize: 14,
    color: COLORS.text,
  },
  seatMapContainer: {
    padding: 30,
    alignItems: 'center',
  },
  steeringWheel: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: COLORS.textLight,
    borderRadius: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  aisleGap: {
    width: 40, // Space for aisle
  },
  seat: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedSeat: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  seatText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  selectedSeatText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedSeatsText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  continueButton: {
    width: 140,
    marginVertical: 0,
  },
});

export default SeatSelectionScreen;
