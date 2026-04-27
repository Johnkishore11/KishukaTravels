import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const features = [
    { id: 1, title: 'Bus Tickets', icon: 'bus', color: COLORS.primary },
    { id: 2, title: 'Offers', icon: 'pricetag', color: COLORS.success },
    { id: 3, title: 'Help', icon: 'help-circle', color: COLORS.blue },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Traveler'}!</Text>
          <Text style={styles.subtitle}>Where do you want to go?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchCard}>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('SearchBus')}
        >
          <Ionicons name="search" size={20} color={COLORS.textLight} />
          <Text style={styles.searchText}>Search for buses (e.g., Mumbai to Pune)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Services</Text>
        <View style={styles.featuresRow}>
          {features.map((item) => (
            <TouchableOpacity key={item.id} style={styles.featureItem} onPress={() => {
              if(item.title === 'Bus Tickets') navigation.navigate('SearchBus');
              if(item.title === 'Help') navigation.navigate('Support');
            }}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <Text style={styles.featureTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Mock Recent Searches */}
          {[1, 2].map((item) => (
            <TouchableOpacity key={item} style={styles.recentSearchCard}>
              <View style={styles.routeContainer}>
                <Text style={styles.cityText}>Mumbai</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.textLight} style={{ marginHorizontal: 8 }} />
                <Text style={styles.cityText}>Pune</Text>
              </View>
              <Text style={styles.dateText}>Tomorrow</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Get 20% Off</Text>
            <Text style={styles.bannerSub}>On your first booking</Text>
          </View>
          <Ionicons name="ticket" size={48} color={COLORS.white} style={{ opacity: 0.8 }} />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.peach,
    marginTop: 4,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCard: {
    marginTop: -25,
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
  },
  searchText: {
    marginLeft: 10,
    color: COLORS.textLight,
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    alignItems: 'center',
    width: '30%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  recentSearchCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 150,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  bannerContainer: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 20,
  },
  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 14,
    color: COLORS.peach,
  },
});

export default HomeScreen;
