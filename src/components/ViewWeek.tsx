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
import {addCompletedItem} from '../actions';
import {getWeekExercises} from '../thunks';
import ProgressComplete from '../images/week-cell-progress-complete.png';
import ProgressBlank from '../images/week-cell-progress-blank.png';

class ViewWeek extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.props.getWeekExercises(
      this.props.phase,
      this.props.week,
      this.props.userid,
      this.props.url,
    );
  }

  completeItem = (item: any) => {
    if (!item.completed) {
      this.props.addCompletedItem(item);
    }
  };

  endWorkout = (item: any) => {
    this.props.completeDay(
      this.props.phase,
      this.props.week,
      this.props.day,
      this.state.completedExercises,
      this.props.userid,
      this.props.url,
    );
  };

  renderItem2 = ({item}) => {
    if (item.header) {
      return (
        <ListItem style={styles.listitem}>
          <Text style={styles.headerLbl}>{item.day}</Text>
        </ListItem>
      );
    } else if (!item.header) {
      return (
        <ListItem style={styles.listitem2}>
          <Body style={styles.cellInfo}>
            <View>
              <Text style={styles.exerciseCell1}>{item.exercise}</Text>
              <Text style={styles.exerciseCell}>{item.lifts}</Text>
            </View>
            <TouchableOpacity onPress={() => this.completeItem(item)}>
              <Image
                source={item.completed ? ProgressComplete : ProgressBlank}
                style={styles.progressIcon}
              />
            </TouchableOpacity>
          </Body>
        </ListItem>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.weekExercises}
          renderItem={this.renderItem2}
          keyExtractor={(item, index) => index.toString()}
          weekHeaderIndices={this.props.weekHeaderIndices}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    completedExercises: state.completedExercises,
    weekExercises: state.weekExercises,
    weekHeaderIndices: state.weekHeaderIndices,
    phase: state.phase,
    week: state.week,
    day: state.day,
    userid: state.userid,
  };
};

export default connect(mapStateToProps, {
  getWeekExercises,
  addCompletedItem,
})(ViewWeek);

const styles = StyleSheet.create({
  cellInfo: {flexDirection: 'row', alignItems: 'center'},

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
    fontSize: 16,
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
