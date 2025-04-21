import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';

interface PhotoItemProps {
  index: number;
}

const {width} = Dimensions.get('window');
const itemSize = (width - 30) / 2; // 2 columns with 10px padding and 10px gap

const PhotoItem: React.FC<PhotoItemProps> = ({index}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/placeholder.webp')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: itemSize,
    height: itemSize,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default PhotoItem;
