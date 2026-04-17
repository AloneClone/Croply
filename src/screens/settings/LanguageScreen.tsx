import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from '../../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius } from '../../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export default function LanguageScreen() {
  const navigation = useNavigation<any>();
  const { profile, updateProfile } = useAuth();

  const currentLanguage = profile?.language || 'English';

  const handleSelectLanguage = (langName: string) => {
    updateProfile({ language: langName });
    // Go back after selection
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Language</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Select your preferred language. The app interface and farming tasks will be translated instantly.
        </Text>

        <View style={styles.card}>
          {LANGUAGES.map((lang, index) => {
            const isSelected = currentLanguage === lang.name;
            return (
              <React.Fragment key={lang.code}>
                <TouchableOpacity 
                  style={[styles.row, isSelected && styles.rowSelected]} 
                  onPress={() => handleSelectLanguage(lang.name)}
                >
                  <View>
                    <Text style={[styles.langName, isSelected && styles.textSelected]}>{lang.nativeName}</Text>
                    <Text style={styles.langEngName}>{lang.name}</Text>
                  </View>
                  {isSelected && <Check size={20} color={Colors.primary} />}
                </TouchableOpacity>
                {index < LANGUAGES.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.text.primary },
  content: { padding: Spacing.md, paddingBottom: 60 },
  description: { fontSize: 14, color: Colors.text.secondary, marginBottom: Spacing.xl, lineHeight: 20 },
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.lg },
  rowSelected: { backgroundColor: '#F0FDF4' },
  langName: { fontSize: 16, fontWeight: 'bold', color: Colors.text.primary },
  textSelected: { color: Colors.primary },
  langEngName: { fontSize: 13, color: Colors.text.secondary, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginLeft: Spacing.lg },
});
