import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Image, StyleSheet} from 'react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Loading from './Loading';
import Logout from './Logout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {authUser} from '../actions';
import HamburgerImg from '../images/hamburger-menu.png';
import HeaderBack from '../images/header-back-icon.png';
import HeaderImg from '../images/header-img.png';
import Home from './Home';
import ViewWeek from './ViewWeek';
import Phases from './Phases';
import Maxes from './Maxes';
import EditMax from './EditMax';
import Profile from './Profile';

const menuBtn = (props) => {
  return (
    <View style={{marginLeft: 20, marginBottom: 0}}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image source={HamburgerImg} />
      </TouchableOpacity>
    </View>
  );
};

const backBtn = (props, screen) => {
  return (
    <View style={{marginLeft: 17, marginBottom: 0}}>
      <TouchableOpacity onPress={() => props.navigation.navigate(screen)}>
        <Image source={HeaderBack} style={styles.headerImg} />
      </TouchableOpacity>
    </View>
  );
};

//maxes

const MaxesStack = createStackNavigator();
const MaxesStackScreen = (props) => (
  <MaxesStack.Navigator>
    <MaxesStack.Screen
      name="Maxes"
      component={Maxes}
      options={{
        headerTitle: <Image source={HeaderImg} />,
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
        },
        headerStyle: {
          height: 95,
          backgroundColor: '#7FBF30',
        },
        headerLeft: () => menuBtn(props),
      }}
    />
    <MaxesStack.Screen
      name="EditMax"
      component={EditMax}
      options={{
        headerTitle: <Image source={HeaderImg} />,
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
        },
        headerStyle: {
          height: 95,
          backgroundColor: '#7FBF30',
        },
        headerLeft: () => backBtn(props, 'Maxes'),
      }}
    />
  </MaxesStack.Navigator>
);

//view week

const ViewWeekStack = createStackNavigator();
const ViewWeekStackScreen = (props) => (
  <ViewWeekStack.Navigator>
    <ViewWeekStack.Screen
      name="Home"
      component={Home}
      options={{
        //headerTitle: 'HOME',
        headerTitle: <Image source={HeaderImg} />,
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
        },
        headerStyle: {
          height: 95,
          backgroundColor: '#7FBF30',
        },
        headerLeft: () => menuBtn(props),
      }}
    />
    <ViewWeekStack.Screen
      name="ViewWeek"
      component={ViewWeek}
      options={{
        headerTitle: <Image source={HeaderImg} />,
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue-Medium',
          fontSize: 21,
          letterSpacing: 0.93,
        },
        headerStyle: {
          height: 95,
          backgroundColor: '#7FBF30',
        },
        headerLeft: () => backBtn(props, 'Home'),
      }}
    />
  </ViewWeekStack.Navigator>
);

//phases

const PhasesStack = createStackNavigator();
const PhasesStackScreen = (props) => {
  return (
    <PhasesStack.Navigator>
      <AuthStack.Screen
        name="Phases"
        component={Phases}
        options={{
          headerTitle: <Image source={HeaderImg} />,
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'HelveticaNeue-Medium',
            fontSize: 21,
            letterSpacing: 0.93,
          },
          headerStyle: {
            height: 95,
            backgroundColor: '#7FBF30',
          },
          headerLeft: () => menuBtn(props),
        }}
      />
    </PhasesStack.Navigator>
  );
};

//profile

const ProfileStack = createStackNavigator();
const ProfileStackScreen = (props) => {
  return (
    <ProfileStack.Navigator>
      <AuthStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: <Image source={HeaderImg} />,
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'HelveticaNeue-Medium',
            fontSize: 21,
            letterSpacing: 0.93,
          },
          headerStyle: {
            height: 95,
            backgroundColor: '#7FBF30',
          },
          headerLeft: () => menuBtn(props),
        }}
      />
    </ProfileStack.Navigator>
  );
};

//authentication screens

const AuthStack = createStackNavigator();
const AuthStackScreen = (props) => {
  //console.log('AuthStackScreen props: ' + JSON.stringify(props));

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Sign In" component={SignIn} />
      <AuthStack.Screen name="Sign Up" component={SignUp} />
    </AuthStack.Navigator>
  );
};

//menu navigation

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator
    drawerPosition="left"
    drawerType="back"
    drawerContentOptions={{
      activeTintColor: 'rgb(62,28,74)',
    }}>
    <AppDrawer.Screen
      name="Tabs"
      component={ViewWeekStackScreen}
      options={{drawerLabel: 'HOME'}}
    />
    <AppDrawer.Screen name="PHASES" component={PhasesStackScreen} />
    <AppDrawer.Screen name="MAXES" component={MaxesStackScreen} />
    <AppDrawer.Screen name="PROFILE" component={ProfileStackScreen} />
    <AppDrawer.Screen name="LOGOUT" component={Logout} />
  </AppDrawer.Navigator>
);

class Navigation extends Component {
  constructor(props: Props) {
    super(props);
  }

  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: !this.state.isLoading,
      });

      this.props.authUser({username: 'ridley1224', password: '1224'});
    }, 500);
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.isLoading ? (
          <Loading />
        ) : this.props.user ? (
          <AppDrawerScreen />
        ) : (
          <AuthStackScreen />
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    backScreen: state.backScreen,
  };
};

const styles = StyleSheet.create({
  headerImg: {
    width: 20,
    height: 20,
  },
});

export default connect(mapStateToProps, {authUser})(Navigation);
