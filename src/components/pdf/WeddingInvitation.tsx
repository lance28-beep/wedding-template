import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Playfair',
  src: '/fonts/PlayfairDisplay-Regular.ttf',
});

Font.register({
  family: 'Playfair-Bold',
  src: '/fonts/PlayfairDisplay-Bold.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
  },
  border: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#C4A962',
  },
  cornerDecoration: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderStyle: 'solid',
    borderColor: '#C4A962',
  },
  topLeft: {
    top: 20,
    left: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 20,
    right: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  header: {
    marginTop: 50,
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#333333',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 30,
    marginVertical: 20,
  },
  preTitle: {
    fontFamily: 'Playfair',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  names: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    marginVertical: 15,
  },
  text: {
    fontFamily: 'Playfair',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 5,
  },
  dateTime: {
    fontFamily: 'Playfair-Bold',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginVertical: 5,
  },
  venue: {
    fontFamily: 'Playfair',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 5,
  },
  rsvp: {
    fontFamily: 'Playfair',
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  footerText: {
    fontFamily: 'Playfair',
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
  link: {
    fontFamily: 'Playfair',
    fontSize: 10,
    color: '#C4A962',
    textDecoration: 'none',
    textAlign: 'center',
  },
});

export const WeddingInvitation = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Border */}
      <View style={styles.border} />
      
      {/* Corner Decorations */}
      <View style={[styles.cornerDecoration, styles.topLeft]} />
      <View style={[styles.cornerDecoration, styles.topRight]} />
      <View style={[styles.cornerDecoration, styles.bottomLeft]} />
      <View style={[styles.cornerDecoration, styles.bottomRight]} />

      {/* Header */}
      <Text style={styles.header}>Wedding Invitation</Text>

      {/* Divider */}
      <Image 
        style={styles.divider}
        src="/img/divider.png"
      />

      {/* Content */}
      <Text style={styles.preTitle}>Together with their families</Text>
      
      <Text style={styles.names}>Daniel & Kathryn</Text>
      
      <Text style={styles.text}>request the honor of your presence</Text>
      <Text style={styles.text}>as they join in marriage</Text>

      {/* Date and Time */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.dateTime}>Saturday, the Twenty-Fifth of June</Text>
        <Text style={styles.dateTime}>Two Thousand and Twenty-Four</Text>
        <Text style={styles.dateTime}>at Four O'clock in the Afternoon</Text>
      </View>

      {/* Venue */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.venue}>The Grand Ballroom</Text>
        <Text style={styles.venue}>123 Wedding Avenue</Text>
        <Text style={styles.venue}>City, State 12345</Text>
      </View>

      {/* RSVP */}
      <View style={styles.rsvp}>
        <Text style={styles.text}>RSVP</Text>
        <Text style={styles.text}>Please respond by May 25, 2024</Text>
        <Text style={styles.text}>at www.danielandkathryn.com/rsvp</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>For more information, visit:</Text>
        <Link style={styles.link} src="https://www.danielandkathryn.com">
          www.danielandkathryn.com
        </Link>
      </View>
    </Page>
  </Document>
); 