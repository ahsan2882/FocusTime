import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';

export const Focus = ({ addSubject }: { addSubject: any }) => {
  const [subject, setSubject] = useState('');
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        label="What would you like to focus on?"
        onChangeText={setSubject}
      />
      <View style={styles.button}>
        <RoundedButton
          title="+"
          size={75}
          onPress={() => addSubject(subject)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  button: {
    justifyContent: 'center',
  },
});
