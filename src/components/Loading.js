import React, {Component} from 'react';
import {Text, View, Button, ActivityIndicator} from 'react-native';

class Loading extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#7DC11E',
        }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          GATHERING DATA
        </Text>
        <ActivityIndicator
          size="large"
          color={'black'}
          style={{marginTop: 20}}
        />
      </View>
    );
  }
}

export default Loading;
