import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  CollapsibleContent,
  CollapsibleHeader,
  CollapsibleWrapper,
} from 'react-native-reanimated-collapsible-header';

export default function App() {
  return (
    <>
      <CollapsibleWrapper>
        <CollapsibleHeader>
          <View style={styles.header}>
            {}
            <Text>Header</Text>
          </View>
        </CollapsibleHeader>
        <CollapsibleContent>
          <View style={styles.content}>
            <Text>Content</Text>
          </View>
        </CollapsibleContent>
      </CollapsibleWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 400,
    backgroundColor: 'red',
  },
  content: {
    height: 1000,
    backgroundColor: 'green',
  },
});
