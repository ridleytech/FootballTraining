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
import {addCompletedItem, removeCompletedItem} from '../actions';
import {getWeekExercises, saveProgress} from '../thunks';
import ProgressComplete from '../images/week-cell-progress-complete.png';
import ProgressBlank from '../images/week-cell-progress-blank.png';

class ViewWeek extends Component {
  constructor() {
    super();
  }

  state = {
    dataLoaded: false,
  };

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name={'user'} size={50} color={tintColor} />
    ),
  };

  componentDidMount() {
    if (this.props.weekExercises.length == 0) {
      this.props.getWeekExercises(
        this.props.phase.order,
        this.props.week,
        this.props.userid,
        this.props.url,
      );
    } else {
      setTimeout(this.goToDay, 500);
    }
  }

  goToDay = () => {
    var dayExs = this.props.weekExercises.filter((ob) => {
      return ob.day === this.props.currentDay;
    });

    console.log('currentDay: ' + this.props.currentDay);
    console.log('len weekExercises: ' + this.props.weekExercises.length);
    console.log('len dayEx: ' + dayExs.length);

    var scrollIndex = 0;

    for (var i = 0; i < this.props.weekExercises.length; i++) {
      var ob = this.props.weekExercises[i];

      //console.log('ob.day: ' + ob.day);

      if (ob.day === this.props.currentDay) {
        scrollIndex = i;
        break;
      }
    }

    console.log('scrollIndex: ' + scrollIndex);

    var si = scrollIndex;

    this.flatListRef.scrollToIndex({
      animated: true,
      index: scrollIndex,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.weekExercises != this.props.weekExercises &&
      this.state.dataLoaded === false
    ) {
      console.log('data loaded');

      this.setState({
        dataLoaded: true,
      });

      //randall to do
      //if monday =  index: dayExs.length,
      //if tuesday =  index: day1Exs.length + day2Exs.length...

      // this.flatListRef.scrollToIndex({
      //   animated: false,
      //   index: si,
      // });

      //setTimeout(this.goToDay, 500);
    }

    if (
      prevProps.completedExercises != this.props.completedExercises &&
      this.state.dataLoaded === true
    ) {
      //console.log('completed exercises changed');

      //     completedExercises: string,
      // userid: number,
      // url: string,
      // phase: string,
      // week: number,
      // day: number,
      // completed: boolean,

      // this.props.saveProgress(
      //   this.props.completedExercises,
      //   this.props.userid,
      //   this.props.url,
      //   this.props.phase,
      //   this.props.week,
      //   this.props.day,
      //   false,
      // );

      this.props.saveProgress();
    }
  }

  completeItem = (item: any) => {
    if (!item.completed) {
      this.props.addCompletedItem(item);
    } else {
      this.props.removeCompletedItem(item);
    }
  };

  endWorkout = (item: any) => {
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
    if (item.header) {
      return (
        <>
          <ListItem style={styles.listitem}>
            <Text style={styles.headerLbl}>{item.day}</Text>
          </ListItem>
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
        </>
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
        {this.props.weekError ? (
          <View style={{display: 'flex', alignItems: 'center', padding: 20}}>
            <Text>Please check your internet connection</Text>
          </View>
        ) : null}
        <FlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          style={styles.list}
          getItemLayout={(data, index) => ({
            length: 0,
            offset: 80.8 * index,
            index,
          })}
          // initialScrollIndex={8}
          // onScrollToIndexFailed={(info) => {
          //   console.log('fail');

          //   const wait = new Promise((resolve) => setTimeout(resolve, 500));
          //   wait.then(() => {
          //     this.flatListRef.current?.scrollToIndex({
          //       index: 8,
          //       animated: false,
          //     });
          //   });
          // }}
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
    weekError: state.weekError,
    currentDay: state.currentDay,
  };
};

export default connect(mapStateToProps, {
  getWeekExercises,
  addCompletedItem,
  saveProgress,
  removeCompletedItem,
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
