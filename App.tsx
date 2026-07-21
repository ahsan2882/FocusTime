/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Focus } from './src/features/Focus';
import { FocusHistory } from './src/features/FocusHistory';
import { Timer } from './src/features/Timer';
import { colors } from './src/utils/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [currentSubject, setCurrentSubject] = useState<string>();
  const [history, setHistory] = useState<string[]>([]);
  return (
    <>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={subject => {
            setHistory([...history, subject]);
          }}
          clearSubject={() => setCurrentSubject('')}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  text: { color: colors.white },
});

export default App;
