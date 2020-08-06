import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {saveProfile} from '../thunks';

class Profile extends Component {
  state = {
    name: this.props.name,
    height: this.props.height,
    weight: this.props.weight,
  };

  saveProfile = () => {
    this.props.saveProfile(
      this.state.name,
      this.state.height,
      this.state.weight,
      this.props.userid,
      this.props.url,
    );
  };

  render() {
    return (
      <>
        <View style={styles.main}>
          <View style={styles.content}>
            <View>
              <View style={styles.h1View}>
                <Text style={styles.h1Txt}>Profile</Text>
              </View>

              <Text style={styles.fieldHeader}>Name</Text>

              <View style={styles.listCell}>
                <TextInput
                  style={styles.listCellSub}
                  value={this.state.name}
                  onChangeText={(name) => this.setState({name})}></TextInput>
              </View>

              <Text style={styles.fieldHeader}>Height</Text>

              <View style={styles.listCell}>
                <TextInput
                  style={styles.listCellSub}
                  value={this.state.height}
                  onChangeText={(height) =>
                    this.setState({height})
                  }></TextInput>
              </View>

              <Text style={styles.fieldHeader}>Weight</Text>

              <View style={styles.listCell}>
                <TextInput
                  style={styles.listCellSub}
                  value={this.state.weight}
                  onChangeText={(weight) =>
                    this.setState({weight})
                  }></TextInput>
              </View>
            </View>

            <View style={styles.submitView}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.saveProfile()}>
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
    userid: state.userid,
  };
};

export default connect(mapStateToProps, {
  saveProfile,
})(Profile);

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
  fieldHeader: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#5C5C5C',
  },
  listCellSub: {
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

export default Profile;
