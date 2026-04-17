import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { TouchableOpacity } from '../../src/components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius } from '../../src/constants/Theme';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  
  const [settings, setSettings] = useState({
    dailyReminders: true,
    weatherAlerts: true,
    community: false,
    newQuests: true,
    sound: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Choose which notifications you want to receive to stay updated on your farm and quests.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>Daily Reminders</Text>
              <Text style={styles.rowSub}>Don't miss your daily quests</Text>
            </View>
            <Switch 
              value={settings.dailyReminders} 
              onValueChange={() => toggle('dailyReminders')}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>Weather & Crop Alerts</Text>
              <Text style={styles.rowSub}>Important farming conditions</Text>
            </View>
            <Switch 
              value={settings.weatherAlerts} 
              onValueChange={() => toggle('weatherAlerts')}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>New Quests</Text>
              <Text style={styles.rowSub}>When seasonal quests are added</Text>
            </View>
            <Switch 
              value={settings.newQuests} 
              onValueChange={() => toggle('newQuests')}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>Community Updates</Text>
              <Text style={styles.rowSub}>Leaderboard and village news</Text>
            </View>
            <Switch 
              value={settings.community} 
              onValueChange={() => toggle('community')}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>In-App Sounds</Text>
              <Text style={styles.rowSub}>Play sound when completing tasks</Text>
            </View>
            <Switch 
              value={settings.sound} 
              onValueChange={() => toggle('sound')}
              trackColor={{ false: '#D1D5DB', true: Colors.primary }}
            />
          </View>
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
  rowLeft: { flex: 1, paddingRight: 16 },
  rowText: { fontSize: 16, fontWeight: '600', color: Colors.text.primary },
  rowSub: { fontSize: 13, color: Colors.text.secondary, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginLeft: Spacing.lg },
});
