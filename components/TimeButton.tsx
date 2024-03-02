import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useEffect, useState} from 'react';
interface TimeButtonProps {
  date: string;
  adder: (date: string) => void;
  remover: (date: string) => void;
  disable: boolean;
}
const TimeButton: React.FC<TimeButtonProps> = ({
  date,
  adder,
  remover,
  disable,
}) => {
  useEffect(() => {
    const todayString = new Date().toISOString().split('T')[0];
    date === todayString ? setItsToday(true) : setItsToday(false);
  }, [date]);
  const [itsToday, setItsToday] = useState<boolean>();
  return (
    <View style={timeStyles.container}>
      <View>
        <IconButton
          onPress={() => remover(date)}
          icon="chevron-left"
          size={20}
        />
      </View>
      <Text style={timeStyles.date}>{itsToday ? 'Today' : date}</Text>
      <View>
        <IconButton
          onPress={() => adder(date!)}
          icon="chevron-right"
          size={20}
          disabled={disable}
        />
      </View>
    </View>
  );
};

const timeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 250,
    height: 60,
    borderRadius: 45,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  date: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default TimeButton;
