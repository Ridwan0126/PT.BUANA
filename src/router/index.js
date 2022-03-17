import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Login, Splash, ListData, SearchPage} from '../screens';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import React, {Component} from 'react';

import {Header} from '../components';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

class AuthStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 16,
              color: 'white',
            },
            tabBarStyle: {
              backgroundColor: 'blue',
            },
            tabBarIndicatorStyle: {
              borderBottomColor: 'white',
              borderBottomWidth: 2.5,
            },
            tabBarPressColor: 'blue',
          }}
          style={{backgroundColor: 'blue'}}
          timingConfig={{duration: 200}}
          initialLayout={{width: Dimensions.get('window').width}}>
          <Tab.Screen name="List" children={props => <ListData {...props} />} />
          <Tab.Screen
            name="Search"
            children={props => <SearchPage {...props} />}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

class RootStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          {!this.props.loginStatus ? (
            <>
              <RootStack.Screen name="Splash" component={Splash} />
              <RootStack.Screen name="Auth" component={AuthStackScreen} />
            </>
          ) : (
            <>
              <RootStack.Screen
                name="Home"
                children={props => (
                  <Home {...props} userLogin={this.props.userLogin} />
                )}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.auth.loginStatus,
  userLogin: state.auth.userLogin,
});

export default connect(mapStateToProps)(RootStackScreen);
