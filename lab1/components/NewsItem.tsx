import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface NewsItemProps {
  title: string;
  date: string;
  summary: string;
}

const NewsItem: React.FC<NewsItemProps> = ({title, date, summary}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/placeholder.webp')}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.summary}>{summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  summary: {
    fontSize: 14,
    color: '#333',
  },
});

export default NewsItem;
