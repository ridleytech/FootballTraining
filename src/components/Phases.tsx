import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ListItem, Left, Body, Right, Title} from 'native-base';
import {connect} from 'react-redux';
import WeekItem from './WeekItem';
import {selectPhase} from '../actions';

import {getWeekExercises} from '../thunks';
import ChevronIcon from '../images/chevron-icon.png';
import ProgressComplete from '../images/week-cell-progress-complete.png';
import ProgressBlank from '../images/week-cell-progress-blank.png';

class Phases extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  selectItem = (item) => {
    this.props.selectPhase(item);
  };

  savePhase = (item) => {
    console.log('endWorkout: ' + JSON.stringify(item));

    this.props.completeDay(
      this.props.phase.order,
      this.props.week,
      this.props.day,
      this.state.completedExercises,
      this.props.userid,
      this.props.url,
    );
  };

  renderItem2 = ({item}) => {
    return (
      <ListItem style={styles.listitem2}>
        <Body style={styles.cellInfo}>
          <View>
            <Text style={styles.exerciseCell1}>{item.name}</Text>
          </View>
          <TouchableOpacity onPress={() => this.selectItem(item)}>
            <Image
              source={
                item.order === this.props.phase.order
                  ? ProgressComplete
                  : ProgressBlank
              }
              style={styles.progressIcon}
            />
          </TouchableOpacity>
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.phases}
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
    phases: state.phases,
    userid: state.userid,
    phase: state.phase,
  };
};

export default connect(mapStateToProps, {
  getWeekExercises,
  selectPhase,
})(Phases);

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
  progressIcon: {
    right: 20,
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
    fontSize: 20,
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
