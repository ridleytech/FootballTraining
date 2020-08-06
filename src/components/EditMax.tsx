import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import {saveMax} from '../thunks';

class EditMax extends Component {
  state = {
    maxAmount: this.props.selectedMax.amount,
  };

  updateVal = () => {
    console.log(this.state.maxAmount);

    this.props.saveMax(
      this.props.selectedMax.id,
      this.state.maxAmount,
      this.props.userid,
      this.props.url,
    );

    this.props.navigation.navigate('Maxes');
  };

  render() {
    return (
      <>
        <View style={styles.main}>
          <View style={styles.content}>
            <View>
              <View style={styles.h1View}>
                <Text style={styles.h1Txt}>
                  {this.props.selectedMax.exercise}
                </Text>
              </View>

              <View style={styles.listCell}>
                <TextInput
                  value={this.state.maxAmount}
                  onChangeText={(maxAmount) => this.setState({maxAmount})}
                  style={styles.liftInput}></TextInput>
              </View>
            </View>

            <View style={styles.submitView}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.updateVal()}>
                <Text style={styles.submitTxt}>SAVE</Text>
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
    userid: state.userid,
    selectedMax: state.selectedMax,
  };
};

export default connect(mapStateToProps, {saveMax})(EditMax);

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
    borderStyle: 'solid',
    borderColor: '#C4C2C2',
    borderWidth: 0.3,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  liftInput: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7FBF30',
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
