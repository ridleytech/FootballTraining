import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

class Home extends Component {
  startWorkout = () => {
    this.props.navigation.navigate('ViewWeek');
  };

  render() {
    return (
      <>
        <View style={styles.main}>
          <View style={styles.content}>
            <View>
              <View style={styles.h1View}>
                <Text style={styles.h1Txt}>Training Progress</Text>
              </View>

              <View style={styles.listCell}>
                <Text style={styles.listCellHeader}>Current Phase</Text>
                <Text style={styles.listCellSub}>
                  {this.props.phase} - Week {this.props.week}
                </Text>
              </View>

              <View style={styles.listCell}>
                <Text style={styles.listCellHeader}>
                  Last Completed Workout
                </Text>
                <Text style={styles.listCellSub}>
                  {this.props.lastCompletedDay}
                </Text>
              </View>

              <View style={styles.listCell}>
                <Text style={styles.listCellHeader}>Average Workout Time</Text>
                <Text style={styles.listCellSub}>
                  {this.props.avgWorkoutTime}
                </Text>
              </View>
            </View>

            <View style={styles.submitView}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.startWorkout()}>
                <Text style={styles.submitTxt}>WORKOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    phase: state.phase,
    week: state.week,
    userid: state.userid,
    lastCompletedDay: state.lastCompletedDay,
    avgWorkoutTime: state.avgWorkoutTime,
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  submitView: {
    bottom: 80,
    position: 'absolute',
  },
  submitBtn: {
    height: 80,
    width: 300,
    backgroundColor: '#7FBF30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  submitTxt: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  listCell: {
    height: 80,
    justifyContent: 'center',
    paddingLeft: 20,
    borderStyle: 'solid',
    borderColor: '#C4C2C2',
    borderWidth: 0.3,
  },
  listCellHeader: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
  },
  listCellSub: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    color: '#5C5C5C',
  },

  main: {backgroundColor: 'white'},
  h1View: {
    height: 65,
    backgroundColor: '#EFEFEF',

    paddingTop: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  h1Txt: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    width: 300,
    height: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
});