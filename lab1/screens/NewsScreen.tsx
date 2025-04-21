import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import NewsItem from '../components/NewsItem';
import FooterInfo from '../components/FooterInfo';

const NewsScreen: React.FC = () => {
  // Mock news data
  const newsItems = Array(8)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
      title: 'Заголовок новини',
      date: 'Дата новини',
      summary: 'Короткий текст новини',
    }));

  return (
    <SafeAreaView style={styles.container}>
      <Header title="FirstMobileApp" />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Новини</Text>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {newsItems.map(item => (
            <NewsItem
              key={item.id}
              title={item.title}
              date={item.date}
              summary={item.summary}
            />
          ))}
        </ScrollView>
      </View>

      <FooterInfo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default NewsScreen;
