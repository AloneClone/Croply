import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { TouchableOpacity } from '../../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius } from '../../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Bell, Globe, Shield, HelpCircle, FileText, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [offlineMode, setOfflineMode] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Notifications')}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: Colors.accent.lightBlue }]}>
                  <Bell size={20} color={Colors.secondary} />
                </View>
                <Text style={styles.rowText}>Notification Settings</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.secondary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Language')}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: Colors.accent.lightGreen }]}>
                  <Globe size={20} color={Colors.primary} />
                </View>
                <Text style={styles.rowText}>Language</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Features</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#F3F4F6' }]}>
                  <Shield size={20} color={Colors.text.primary} />
                </View>
                <View>
                  <Text style={styles.rowText}>Offline Mode</Text>
                  <Text style={styles.rowSub}>Save data for local sync</Text>
                </View>
              </View>
              <Switch 
                value={offlineMode} 
                onValueChange={setOfflineMode}
                trackColor={{ false: '#D1D5DB', true: Colors.primary }}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                  <HelpCircle size={20} color="#D97706" />
                </View>
                <Text style={styles.rowText}>Help & FAQ</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.secondary} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconBox, { backgroundColor: '#F3F4F6' }]}>
                  <FileText size={20} color={Colors.text.primary} />
                </View>
                <Text style={styles.rowText}>Terms & Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.version}>Croply App v1.0.0</Text>
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
  section: { marginBottom: Spacing.xl },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.text.secondary, marginBottom: Spacing.md, textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.md },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  rowText: { fontSize: 16, fontWeight: '600', color: Colors.text.primary },
  rowSub: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginLeft: 64 },
  version: { textAlign: 'center', color: Colors.text.secondary, fontSize: 12, marginTop: Spacing.xl }
});
