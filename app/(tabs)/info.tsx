import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Droplets, CircleCheck as CheckCircle, User, Building2 } from 'lucide-react-native';

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Info size={32} color="#ffffff" />
          </View>
          <Text style={styles.headerTitle}>Guia de uso</Text>
          <Text style={styles.headerSubtitle}>Entendiendo la alcalinidad</Text>
        </View>

        {/* What is Alkalinity Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Droplets size={24} color="#3b82f6" />
            <Text style={styles.cardTitle}>Qué es esta movida?</Text>
          </View>
          <Text style={styles.cardText}>
            Es un indicador de la capacidad del agua para mantener estable el valor del pH. Da inercia al sistema para mantener el equilibrio quimico. 
          </Text>
        </View>

        {/* Ideal Levels Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CheckCircle size={24} color="#10b981" />
            <Text style={styles.cardTitle}>Valores ideales</Text>
          </View>
          <View style={styles.levelContainer}>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Recomendado:</Text>
              <Text style={styles.levelValue}>80-120 ppm</Text>
            </View>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Perfecto:</Text>
              <Text style={styles.levelValueOptimal}>125 ppm</Text>
            </View>
          </View>
          <Text style={styles.cardText}>
            Junto al pH y cloro libre es un parámetro importante de mantener en niveles correctos.
          </Text>
        </View>

        {/* ALKA+ Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre CTX ALKA+</Text>
          <Text style={styles.cardText}>
            CTX ALKA+ es bicarbonato, para incrementar la alcalinidad..
          </Text>
          <View style={styles.dosageInfo}>
            <Text style={styles.dosageTitle}>Dosis:</Text>
            <Text style={styles.dosageText}>• 1.8 kg sube 10 ppm en 100 m³</Text>
            <Text style={styles.dosageText}>• Esperar 4-6 horas para volver a medir</Text>
          </View>
        </View>

        {/* Credits Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <User size={24} color="#ef4444" />
            <Text style={styles.cardTitle}>Créditos</Text>
          </View>
          <View style={styles.creditsContainer}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.creditsText}>
              App creada por <Text style={styles.creditsHighlight}>David Carrillo</Text>
            </Text>
            <View style={styles.companyContainer}>
              <Building2 size={20} color="#3b82f6" />
              <Text style={styles.companyText}>
                Para usarla como herramienta en{'\n'}
                <Text style={styles.companyHighlight}>Fontanería Gavilán</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardText: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 24,
  },
  levelContainer: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelLabel: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  levelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  levelValueOptimal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  dosageInfo: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  dosageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  dosageText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
    marginBottom: 4,
  },
  creditsContainer: {
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    backgroundColor: '#334155',
    borderRadius: 50,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  creditsText: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
  },
  creditsHighlight: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
  },
  companyText: {
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 20,
  },
  companyHighlight: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSpacer: {
    height: 20,
  },
});