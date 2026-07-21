import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min: number) => min * 1000 * 60;
const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
export const Countdown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd,
}: {
  minutes: number;
  isPaused: boolean;
  onProgress: (arg: number) => any;
  onEnd: (arg: () => void) => any;
}) => {
  const interval = React.useRef<number>(null);

  const [millis, setMillis] = useState(0);

  const reset = useCallback(
    () => setMillis(minutesToMillis(minutes)),
    [minutes],
  );

  const countDown = useCallback(() => {
    setMillis(time => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  }, [onEnd, reset]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis, minutes, onProgress]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [countDown, isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
