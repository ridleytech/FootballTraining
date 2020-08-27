import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon2 from '../../images/edit-icon.png';
import Avatar1 from '../../images/a.png';
import DB from '../../images/db.png';
import Phase from '../../images/phase2.png';
import Max from '../../images/max.png';
import Profile from '../../images/profile.png';
import Logout from '../../images/logout.png';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {AuthContext} from '../components/context';

function DrawerContent(props) {
  const paperTheme = useTheme();

  //const {signOut, toggleTheme} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Avatar.Image source={Avatar1} size={50} />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                }}>
                <Title style={styles.title}>RANDALL RIDLEY</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                // <Icon name="home-outline" color={color} size={size} />
                <Image
                  source={DB}
                  color={color}
                  size={size}
                  style={styles.icon2}
                />
              )}
              label="TRAIN"
              labelStyle={{color: '#7FBF30'}}
              onPress={() => {
                props.navigation.navigate('Tabs');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                // <Icon name="account-outline" color={color} size={size} />
                <Image
                  source={Phase}
                  color={color}
                  size={size}
                  style={styles.icon2}
                />
              )}
              label="PHASES"
              labelStyle={{color: '#7FBF30'}}
              onPress={() => {
                props.navigation.navigate('PHASES');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                // <Icon name="bookmark-outline" color={color} size={size} />
                <Image
                  source={Max}
                  color={color}
                  size={size}
                  style={styles.icon3}
                />
              )}
              label="MAXES"
              labelStyle={{color: '#7FBF30'}}
              onPress={() => {
                props.navigation.navigate('MAXES');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                // <Icon name="settings-outline" color={color} size={size} />
                <Image source={Profile} style={styles.icon2} />
              )}
              label="PROFILE"
              labelStyle={{color: '#7FBF30'}}
              onPress={() => {
                props.navigation.navigate('PROFILE');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            // <Icon name="exit-to-app" color={color} size={size} />
            <Image
              source={Logout}
              color={color}
              size={size}
              style={styles.icon2}
            />
          )}
          label="SIGN OUT"
          labelStyle={{color: '#7FBF30'}}
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'black',
  },
  icon: {width: 20, height: 20},
  icon2: {width: 25, height: 25},
  icon3: {width: 24, height: 24, marginLeft: 1},
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 0.5,
    paddingTop: 10,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
