import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {ListItem} from './ListItem';
import {Transitioning, Transition} from 'react-native-reanimated';

const ListData = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const transitionRef = useRef();
  const transition = <Transition.Change interpolation="easeInOut" />;

  const onPress = () => {
    transitionRef.current.animateNextTransition();
  };

  const getUsers = () => {
    setIsLoading(true);
    axios
      .get(`https://api.thecatapi.com/v1/breeds?limit=10&page=${currentPage}`)
      .then(res => {
        setUsers([...users, ...res.data]);
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.lans}>
          <View style={styles.itemWrapperStyle}>
            <View style={styles.contentWrapperStyle}>
              <Text style={styles.txtNameStyle}>{item.name}</Text>
              <Text style={styles.txtEmailStyle}>{item.origin}</Text>
            </View>
          </View>
          <View>
            <ListItem item={item} onPress={onPress} />
          </View>
        </View>
      </>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  return (
    <>
      <Transitioning.View
        ref={transitionRef}
        transition={transition}
        style={{flex: 1}}>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </Transitioning.View>
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  lans: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default ListData;
