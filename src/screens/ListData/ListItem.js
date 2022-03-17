/**
 * @flow
 * Created by Dima Portenko on 28.05.2020
 */
import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const ListItem = ({item, onPress}) => {
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    onPress();
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity style={styles.wrap} onPress={onItemPress}>
      <View style={styles.itemWrapperStyle}>
        <View style={styles.contentWrapperStyle}>
          <Text
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: 5,
              marginBottom: 10,
              borderRadius: 5,
            }}>
            LIHAT
          </Text>
        </View>
      </View>

      {expanded && (
        <View style={styles.foto}>
          <Image style={styles.itemImageStyle} source={{uri: item.image.url}} />
          <Text style={[styles.details, styles.text]}>{item.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
  },
  container: {flexDirection: 'row'},
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  textContainer: {justifyContent: 'space-around'},
  details: {margin: 10},
  text: {opacity: 0.7},
  itemWrapperStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  itemImageStyle: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  foto: {
    alignItems: 'center',
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
    color: '#777',
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
