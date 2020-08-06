import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Text, ListItem, Body} from 'native-base';
import {connect} from 'react-redux';
import {selectMax} from '../actions';
import {getMaxes} from '../thunks';

class Maxes extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.props.getMaxes(this.props.userid, this.props.url);
  }

  selectItem = (item) => {
    this.props.selectMax(item);
    this.props.navigation.push('EditMax');
  };

  renderItem2 = ({item}) => {
    return (
      <ListItem style={styles.listitem2} onPress={() => this.selectItem(item)}>
        <Body style={styles.cellInfo}>
          <View>
            <Text style={styles.exerciseCell1}>{item.exercise}</Text>
          </View>
          <Text style={styles.liftAmount}>{item.amount}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.maxList}
          renderItem={this.renderItem2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    maxList: state.maxList,
    userid: state.userid,
  };
};

export default connect(mapStateToProps, {
  getMaxes,
  selectMax,
})(Maxes);

const styles = StyleSheet.create({
  cellInfo: {flexDirection: 'row', alignItems: 'center', height: 60},
  headerTxt: {
    marginTop: 20,
  },
  listitem2: {
    marginLeft: 5,
    minHeight: 75,
    backgroundColor: 'white',
  },
  chevron: {
    color: 'rgb(116,138,157)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  liftAmount: {
    right: 20,
    fontSize: 18,
    color: '#5C5C5C',
  },
  listitem: {
    marginLeft: 5,
    backgroundColor: '#EFEFEF',
  },
  headerImg: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  headerLbl: {
    color: 'black',
    width: Dimensions.get('window').width,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  exerciseCell1: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Avenir Heavy',
    width: Dimensions.get('window').width - 55,
  },
  exerciseCell: {
    marginTop: 0,
    fontSize: 16,
    color: 'rgb(116,138,157)',
    fontFamily: 'Avenir Heavy',
    width: Dimensions.get('window').width - 55,
  },
  liftCell: {
    fontSize: 16,
    top: 10,
    color: '#333333',
    fontFamily: 'Avenir Book',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  body1: {
    marginRight: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
});
