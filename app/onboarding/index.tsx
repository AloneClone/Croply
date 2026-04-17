import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from '../../src/components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/constants/Theme';
import { useAuth } from '../../src/context/AuthContext';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react-native';

const LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Kannada', 'Tamil'];
const CROPS = ['Wheat', 'Rice', 'Tomato', 'Sugar Cane', 'Cotton', 'Maize'];

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: 'English',
    name: '',
    village: '',
    region: '',
    cropTypes: [] as string[],
    farmSize: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Synchronous — profile is set instantly, router picks it up
      completeOnboarding(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleCrop = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop)
        ? prev.cropTypes.filter(c => c !== crop)
        : [...prev.cropTypes, crop]
    }));
  };

  const canProceed = () => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return formData.village.trim().length > 0;
    if (step === 3) return formData.cropTypes.length > 0;
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressBarTrack}>
           <View style={[styles.progressBarFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
        <View style={styles.headerRow}>
          {step > 1 ? (
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
              <ChevronLeft size={20} color={Colors.text.primary} />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          ) : <View />}
          <Text style={styles.stepText}>Step {step} of 3</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {step === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Welcome! Choose your language</Text>
            <View style={styles.chipGrid}>
              {LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang}
                  style={[styles.chip, formData.language === lang && styles.activeChip]}
                  onPress={() => setFormData({...formData, language: lang})}
                >
                  <Text style={[styles.chipText, formData.language === lang && styles.activeChipText]}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 40 }]}>What's your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(t) => setFormData({...formData, name: t})}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Where is your farm located?</Text>
            <TextInput
              style={styles.input}
              placeholder="Village Name"
              placeholderTextColor="#999"
              value={formData.village}
              onChangeText={(t) => setFormData({...formData, village: t})}
            />
            <TextInput
              style={[styles.input, { marginTop: 15 }]}
              placeholder="State / Region"
              placeholderTextColor="#999"
              value={formData.region}
              onChangeText={(t) => setFormData({...formData, region: t})}
            />
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.sectionTitle}>Which crops do you grow?</Text>
            <Text style={styles.sectionSubtitle}>Select at least one</Text>
            <View style={styles.chipGrid}>
              {CROPS.map(crop => {
                const isSelected = formData.cropTypes.includes(crop);
                return (
                  <TouchableOpacity
                    key={crop}
                    style={[styles.chip, isSelected && styles.activeChip]}
                    onPress={() => toggleCrop(crop)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{crop}</Text>
                    {isSelected && <Check size={14} color={Colors.white} style={{marginLeft: 4}} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Farm Size (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 5 Acres"
              placeholderTextColor="#999"
              value={formData.farmSize}
              onChangeText={(t) => setFormData({...formData, farmSize: t})}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.disabledButton]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>{step === 3 ? 'Start Farming 🚜' : 'Next'}</Text>
          {step < 3 && <ChevronRight size={20} color={Colors.white} strokeWidth={3} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg },
  progressBarTrack: { height: 6, backgroundColor: '#E4E7EC', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
  stepText: { fontSize: 12, fontWeight: 'bold', color: Colors.text.secondary },
  scrollContent: { paddingHorizontal: Spacing.xl, paddingTop: 40, paddingBottom: 120 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 20 },
  sectionSubtitle: { fontSize: 14, color: Colors.text.secondary, marginTop: -16, marginBottom: 16 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  chip: {
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: BorderRadius.full,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: '#E4E7EC',
    flexDirection: 'row', alignItems: 'center',
  },
  activeChip: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 14, fontWeight: '600', color: Colors.text.secondary },
  activeChipText: { color: Colors.white },
  input: {
    backgroundColor: Colors.white, paddingHorizontal: 16, paddingVertical: 18,
    borderRadius: BorderRadius.md, fontSize: 16, color: Colors.text.primary,
    borderWidth: 1, borderColor: '#E4E7EC',
  },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: Spacing.xl, backgroundColor: Colors.background,
  },
  nextButton: {
    backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 18, borderRadius: BorderRadius.lg, ...Shadows.soft,
  },
  disabledButton: { backgroundColor: '#98A2B3' },
  nextButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold', marginRight: 8 },
});
