import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SupportScreen = () => {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I cancel my ticket?',
      answer: 'You can cancel your ticket by going to My Bookings > View Ticket > Cancel Ticket. Cancellation charges apply based on the time remaining for departure.'
    },
    {
      id: 2,
      question: 'When will I get my refund?',
      answer: 'Refunds are processed immediately from our end and typically reflect in your source account within 3-5 working days depending on your bank.'
    },
    {
      id: 3,
      question: 'Can I change my boarding point?',
      answer: 'Yes, you can change your boarding point up to 4 hours before departure by contacting our customer support.'
    },
    {
      id: 4,
      question: 'Do I need to carry a printed ticket?',
      answer: 'No, an M-ticket (SMS/WhatsApp) or showing the ticket on your app along with a valid ID proof is sufficient.'
    }
  ];

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contactSection}>
          <Text style={styles.title}>24/7 Customer Support</Text>
          <Text style={styles.subtitle}>We are here to help you</Text>

          <View style={styles.contactCards}>
            <TouchableOpacity style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="call" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.cardTitle}>Call Us</Text>
              <Text style={styles.cardDetail}>+91 98765 43210</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: COLORS.success + '20' }]}>
                <Ionicons name="mail" size={24} color={COLORS.success} />
              </View>
              <Text style={styles.cardTitle}>Email Us</Text>
              <Text style={styles.cardDetail}>support@kishuka.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.faqHeader}
                onPress={() => toggleExpand(faq.id)}
              >
                <Text style={styles.question}>{faq.question}</Text>
                <Ionicons 
                  name={expandedId === faq.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={COLORS.textLight} 
                />
              </TouchableOpacity>
              
              {expandedId === faq.id && (
                <View style={styles.faqBody}>
                  <Text style={styles.answer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contactSection: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  contactCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.peach,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  faqSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  faqItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginRight: 10,
  },
  faqBody: {
    padding: 16,
    paddingTop: 0,
  },
  answer: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
  },
});

export default SupportScreen;
