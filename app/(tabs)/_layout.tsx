import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from '../../src/components/common/Touchable';
import { CustomTabBar } from '../../src/components/common/CustomTabBar';
import { Colors, Spacing, BorderRadius, Shadows } from '../../src/constants/Theme';
import { Home, ClipboardList, Globe, User, Camera, Sparkles, CheckCircle } from 'lucide-react-native';
import { useAppContext } from '../../src/context/AppContext';

export default function TabLayout() {
  const { tasks, completeTask, updateXP } = useAppContext();
  const [showFabCamera, setShowFabCamera] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFabPress = () => {
    const pending = tasks.find(t => t.status === 'pending');
    if (pending) {
      setShowFabCamera(true);
    }
  };

  const handleFabCapture = () => {
    const pending = tasks.find(t => t.status === 'pending');
    if (!pending) return;
    setIsCapturing(true);
    const xp = pending.xpReward || 50;

    setTimeout(() => {
      completeTask(pending.id);
      updateXP(xp);
      setIsCapturing(false);
      setShowFabCamera(false);
      setSuccessMsg(`${pending.title} completed! +${xp} XP`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 600);
  };

  // FAB camera renders as full-screen overlay
  if (showFabCamera) {
    const pending = tasks.find(t => t.status === 'pending');
    return (
      <View style={styles.cam}>
        <View style={styles.camHeader}>
          <TouchableOpacity onPress={() => setShowFabCamera(false)} style={styles.camCancelBtn} activeOpacity={0.7}>
            <Text style={styles.camCancelText}>✕ Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.camTitle}>Quick Capture</Text>
          <View style={{ width: 80 }} />
        </View>
        <View style={styles.camBody}>
          <Text style={{ fontSize: 80 }}>📸</Text>
          <Text style={styles.camMainText}>Quick Farm Scan</Text>
          <Text style={styles.camTaskText}>{pending?.title || 'Next Quest'}</Text>
          <Text style={styles.camSub}>Completes your next pending quest</Text>
        </View>
        <TouchableOpacity style={[styles.shutter, isCapturing && styles.shutterActive]} onPress={handleFabCapture} disabled={isCapturing} activeOpacity={0.7}>
          <View style={[styles.shutterInner, isCapturing && styles.shutterInnerActive]} />
        </TouchableOpacity>
        {isCapturing && <Text style={styles.procText}>Processing...</Text>}
      </View>
    );
  }

  return (
    <>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Home size={24} color={color} /> }} />
        <Tabs.Screen name="tasks" options={{ title: 'Tasks', tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} /> }} />
        <Tabs.Screen name="leaderboard" options={{ title: 'Global', tabBarIcon: ({ color }) => <Globe size={24} color={color} /> }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <User size={24} color={color} /> }} />
      </Tabs>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.7} onPress={handleFabPress}>
        <Camera size={28} color={Colors.white} />
        <View style={styles.sparkle}><Sparkles size={12} color={Colors.white} /></View>
      </TouchableOpacity>

      {/* Success Toast from FAB */}
      {successMsg && (
        <TouchableOpacity style={styles.toast} onPress={() => setSuccessMsg(null)} activeOpacity={0.9}>
          <CheckCircle size={22} color={Colors.white} />
          <Text style={styles.toastText}>{successMsg}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: { height: 80, paddingTop: 10, paddingBottom: 25, borderTopWidth: 0, backgroundColor: Colors.white, elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10 },
  tabBarLabel: { fontSize: 10, fontWeight: 'bold', marginTop: 4 },
  fab: { position: 'absolute', bottom: 90, right: 20, width: 64, height: 64, borderRadius: 32, backgroundColor: '#1B263B', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  sparkle: { position: 'absolute', top: 14, right: 14 },

  cam: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'flex-end' },
  camHeader: { position: 'absolute', top: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 10 },
  camCancelBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20 },
  camCancelText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  camTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  camBody: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camMainText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  camTaskText: { color: Colors.primary, fontSize: 16, fontWeight: '600', marginTop: 12 },
  camSub: { color: '#666', fontSize: 13, marginTop: 8 },
  shutter: { marginBottom: 60, width: 84, height: 84, borderRadius: 42, borderWidth: 5, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  shutterActive: { borderColor: Colors.primary },
  shutterInner: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#FFF' },
  shutterInnerActive: { backgroundColor: Colors.primary },
  procText: { position: 'absolute', bottom: 30, color: '#888', fontSize: 14, fontWeight: '600' },

  toast: { position: 'absolute', bottom: 100, left: Spacing.md, right: Spacing.md, backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', ...Shadows.soft },
  toastText: { color: Colors.white, fontSize: 15, fontWeight: 'bold', marginLeft: 12, flex: 1 },
});
