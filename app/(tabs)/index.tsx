import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calculator, CircleAlert as AlertCircle } from 'lucide-react-native';

interface CalculationResult {
  alkalinity: number;
  targetAlkalinity: number;
  difference: number;
  alkaPlusKilos: number;
}

export default function PoolCalculator() {
  const [tablets, setTablets] = useState('');
  const [sampleVolume, setSampleVolume] = useState<50 | 100>(50);
  const [poolVolume, setPoolVolume] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const calculateAlkalinity = (tabletsCount: number, sampleMl: number): number => {
    if (sampleMl === 50) {
      return tabletsCount * 40 - 20;
    } else if (sampleMl === 100) {
      return tabletsCount * 20 - 10;
    } else {
      throw new Error('Debes elegir  si tu muestra es 50ml o 100 ml');
    }
  };

  const calculateAlkaPlusKilos = (differencePpm: number, volumeM3: number): number => {
    // 1.8 kg of ALKA+ raises 10 ppm in 100 m³
    // Formula: kilos = (difference_ppm * volume_m3 * 1.8) / (10 * 100)
    return Math.round((differencePpm * volumeM3 * 1.8) / 1000 * 100) / 100;
  };

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!tablets || isNaN(Number(tablets)) || Number(tablets) < 0) {
      newErrors.tablets = 'Por favor, ingresa un numero correcto de pastillas.';
    }

    if (!poolVolume || isNaN(Number(poolVolume)) || Number(poolVolume) <= 0) {
      newErrors.poolVolume = 'Ingresa los metros cúbicos del vaso de la piscina';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    try {
      const tabletsCount = Number(tablets);
      const volumeM3 = Number(poolVolume);
      const alkalinity = calculateAlkalinity(tabletsCount, sampleVolume);
      const targetAlkalinity = 125; // ppm recommended
      const difference = Math.max(0, targetAlkalinity - alkalinity);
      const alkaPlusKilos = calculateAlkaPlusKilos(difference, volumeM3);

      setResult({
        alkalinity,
        targetAlkalinity,
        difference,
        alkaPlusKilos,
      });
    } catch (error) {
      Alert.alert('Error', 'Algo ha fallado...:(');
    }
  };

  const handleReset = () => {
    setTablets('');
    setPoolVolume('');
    setSampleVolume(50);
    setResult(null);
    setErrors({});
  };

  const SampleVolumeButton = ({ volume, selected, onPress }: { volume: 50 | 100; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.sampleButton, selected && styles.sampleButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.sampleButtonText, selected && styles.sampleButtonTextSelected]}>
        {volume} ml
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.headerTitle}>Calculadora de Alcalinidad</Text>
            <Text style={styles.headerSubtitle}>FONTANERÍA GAVILÁN</Text>
          </View>

          {/* Input Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resultados:</Text>
            
            {/* Tablets Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cantidad de pastillas usadas</Text>
              <TextInput
                style={[styles.input, errors.tablets && styles.inputError]}
                value={tablets}
                onChangeText={setTablets}
                placeholder="Cantidad de pastillas usadas"
                keyboardType="numeric"
                returnKeyType="next"
              />
              {errors.tablets && (
                <View style={styles.errorContainer}>
                  <AlertCircle size={16} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.tablets}</Text>
                </View>
              )}
            </View>

            {/* Sample Volume Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Muestra</Text>
              <View style={styles.sampleVolumeContainer}>
                <SampleVolumeButton
                  volume={50}
                  selected={sampleVolume === 50}
                  onPress={() => setSampleVolume(50)}
                />
                <SampleVolumeButton
                  volume={100}
                  selected={sampleVolume === 100}
                  onPress={() => setSampleVolume(100)}
                />
              </View>
            </View>

            {/* Pool Volume Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Volumen de piscina (m³)</Text>
              <TextInput
                style={[styles.input, errors.poolVolume && styles.inputError]}
                value={poolVolume}
                onChangeText={setPoolVolume}
                placeholder="Ingresa en metros cúbicos el volumen de la piscina"
                keyboardType="numeric"
                returnKeyType="done"
              />
              {errors.poolVolume && (
                <View style={styles.errorContainer}>
                  <AlertCircle size={16} color="#ef4444" />
                  <Text style={styles.errorText}>{errors.poolVolume}</Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                <Calculator size={20} color="#ffffff" />
                <Text style={styles.calculateButtonText}>Calcular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Results Section */}
          {result && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Resultado</Text>
              
              <View style={styles.resultContainer}>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Alcalinidad calculada</Text>
                  <Text style={styles.resultValue}>{result.alkalinity} ppm</Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Alcalinidad objetivo</Text>
                  <Text style={styles.resultValue}>{result.targetAlkalinity} ppm</Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Diferencia</Text>
                  <Text style={[styles.resultValue, result.difference > 0 ? styles.resultValueWarning : styles.resultValueSuccess]}>
                    {result.difference} ppm
                  </Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.recommendationContainer}>
                  <Text style={styles.recommendationTitle}>Dosis recomendada</Text>
                  <Text style={styles.recommendationValue}>
                    {result.alkaPlusKilos} kg de ALKA+
                  </Text>
                  {result.difference === 0 && (
                    <Text style={styles.recommendationNote}>
                      ✅ Todo perfecto, no necesitas bicarbonato.
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#1e40af',
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#93c5fd',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 2,
    borderColor: '#475569',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginLeft: 8,
  },
  sampleVolumeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sampleButton: {
    flex: 1,
    backgroundColor: '#475569',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#475569',
  },
  sampleButtonSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  sampleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  sampleButtonTextSelected: {
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  calculateButton: {
    flex: 2,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#475569',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    gap: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultValueWarning: {
    color: '#f59e0b',
  },
  resultValueSuccess: {
    color: '#10b981',
  },
  divider: {
    height: 1,
    backgroundColor: '#475569',
    marginVertical: 8,
  },
  recommendationContainer: {
    backgroundColor: '#1e40af',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  recommendationValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#60a5fa',
    textAlign: 'center',
  },
  recommendationNote: {
    fontSize: 14,
    color: '#93c5fd',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});