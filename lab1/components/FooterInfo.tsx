import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface FooterInfoProps {
  info?: string;
}

const FooterInfo: React.FC<FooterInfoProps> = ({
  info = "Хробуст Антон, ІПЗ-21-5",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
});

export default FooterInfo;
