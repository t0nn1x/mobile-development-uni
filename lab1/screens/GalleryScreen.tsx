import React from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import PhotoItem from '../components/PhotoItem';
import FooterInfo from '../components/FooterInfo';

const GalleryScreen: React.FC = () => {
  // Create an array of 10 photo items
  const photos = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index.toString(),
    }));

  return (
    <SafeAreaView style={styles.container}>
      <Header title="FirstMobileApp" />

      <View style={styles.content}>
        <FlatList
          data={photos}
          renderItem={({item, index}) => <PhotoItem index={index} />}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.photoGrid}
        />
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
  photoGrid: {
    padding: 5,
  },
});

export default GalleryScreen;
