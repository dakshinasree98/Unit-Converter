import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';
import Button from '@/components/ui/Button';

export default function ConverterScreen() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lbs');
  const [result, setResult] = useState(0);
  const navigation = useNavigation();

  // Conversion formulas
  const convert = (value: number, from: string, to: string): number => {
    const conversions: Record<string, Record<string, number>> = {
      kg: { lbs: 2.20462 },
      lbs: { kg: 1 / 2.20462 },
      km: { miles: 0.621371 },
      miles: { km: 1 / 0.621371 },
      C: { F: (value * 9/5) + 32 },
      F: { C: (value - 32) * 5/9 }
    };
    return value * (conversions[from]?.[to] || 0);
  };

  // Real-time calculation
  useEffect(() => {
    const value = parseFloat(inputValue) || 0;
    setResult(convert(value, fromUnit, toUnit));
  }, [inputValue, fromUnit, toUnit]);

  // Save conversion to history
  const saveConversion = () => {
    navigation.navigate('history', {
      newEntry: `${inputValue} ${fromUnit} → ${result.toFixed(2)} ${toUnit}`
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fromUnit}
          onValueChange={setFromUnit}
          style={[styles.picker, { color: 'white' }]} // Add this
          dropdownIconColor="white" 
        >
          <Picker.Item label="Kilograms (kg)" value="kg" />
          <Picker.Item label="Pounds (lbs)" value="lbs" />
          <Picker.Item label="Kilometers (km)" value="km" />
          <Picker.Item label="Miles" value="miles" />
          <Picker.Item label="Celsius (°C)" value="C" />
          <Picker.Item label="Fahrenheit (°F)" value="F" />
        </Picker>

        <Text style={styles.arrow}>→</Text>

        <Picker
          selectedValue={toUnit}
          onValueChange={setToUnit}
          style={[styles.picker, { color: 'white' }]} 
          dropdownIconColor="white"
        >
          <Picker.Item label="Pounds (lbs)" value="lbs" />
          <Picker.Item label="Kilograms (kg)" value="kg" />
          <Picker.Item label="Miles" value="miles" />
          <Picker.Item label="Kilometers (km)" value="km" />
          <Picker.Item label="Fahrenheit (°F)" value="F" />
          <Picker.Item label="Celsius (°C)" value="C" />
        </Picker>
      </View>

      <Text style={styles.result}>
        {result.toFixed(2)} {toUnit}
      </Text>

      <Button 
        title="Save Conversion" 
        onPress={saveConversion}
        disabled={!inputValue}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white' // White text
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: 'white' // White text
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  picker: {
    flex: 1,
    height: 120,
    backgroundColor: '#1E1E1E'
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 10
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white'
  }
});