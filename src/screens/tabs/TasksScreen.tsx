import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from '../../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { TaskCard } from '../../components/dashboard/TaskCard';
import { useAppContext } from '../../context/AppContext';
import { ListFilter, CheckCircle } from 'lucide-react-native';

const CATEGORIES = ['All', 'Water', 'Soil', 'Crop', 'Pest'];

export default function TasksScreen() {
  const { tasks, completeTask, updateXP } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cameraTaskId, setCameraTaskId] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredTasks = activeCategory === 'All'
    ? tasks
    : tasks.filter(t => t.category === activeCategory);

  const handleStartTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task?.status === 'completed') return;
    setCameraTaskId(taskId);
  };

  const handleCapture = () => {
    if (!cameraTaskId) return;
    setIsCapturing(true);
    const task = tasks.find(t => t.id === cameraTaskId);
    const xp = task?.xpReward || 50;

    setTimeout(() => {
      completeTask(cameraTaskId);
      updateXP(xp);
      setIsCapturing(false);
      setCameraTaskId(null);
      setSuccessMsg(`${task?.title || 'Task'} completed! +${xp} XP`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 600);
  };

  // Camera overlay replaces entire screen
  if (cameraTaskId) {
    const activeTask = tasks.find(t => t.id === cameraTaskId);
    return (
      <View style={styles.cam}>
        <View style={styles.camHeader}>
          <TouchableOpacity onPress={() => setCameraTaskId(null)} style={styles.camCancelBtn} activeOpacity={0.7}>
            <Text style={styles.camCancelText}>✕ Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.camTitle}>Capture Proof</Text>
          <View style={{ width: 80 }} />
        </View>
        <View style={styles.camBody}>
          <Text style={{ fontSize: 80 }}>📸</Text>
          <Text style={styles.camMainText}>Point at your field</Text>
          <Text style={styles.camTaskText}>{activeTask?.title}</Text>
        </View>
        <TouchableOpacity style={[styles.shutter, isCapturing && styles.shutterActive]} onPress={handleCapture} disabled={isCapturing} activeOpacity={0.7}>
          <View style={[styles.shutterInner, isCapturing && styles.shutterInnerActive]} />
        </TouchableOpacity>
        {isCapturing && <Text style={styles.procText}>Processing...</Text>}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Quests</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setActiveCategory('All')} activeOpacity={0.7}>
          <ListFilter size={20} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.tab, activeCategory === cat && styles.activeTab]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeCategory === cat && styles.activeTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Missions</Text>
          <Text style={styles.missionCount}>{filteredTasks.length} available</Text>
        </View>

        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onPress={() => handleStartTask(task.id)} />
        ))}

        <View style={[styles.sectionHeader, { marginTop: Spacing.xl }]}>
          <Text style={styles.sectionTitle}>Weekly Challenges</Text>
        </View>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Complete 5 daily missions to unlock weekly rewards!</Text>
        </View>
      </ScrollView>

      {successMsg && (
        <TouchableOpacity style={styles.toast} onPress={() => setSuccessMsg(null)} activeOpacity={0.9}>
          <CheckCircle size={22} color={Colors.white} />
          <Text style={styles.toastText}>{successMsg}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.text.primary },
  filterBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  tabContainer: { paddingVertical: Spacing.sm },
  tabScroll: { paddingHorizontal: Spacing.md },
  tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: BorderRadius.full, backgroundColor: Colors.white, marginRight: 10, borderWidth: 1, borderColor: 'transparent' },
  activeTab: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: 'bold', color: Colors.text.secondary },
  activeTabText: { color: Colors.white },
  scrollContent: { paddingBottom: 100 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, marginTop: Spacing.lg, marginBottom: Spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary },
  missionCount: { fontSize: 12, color: Colors.text.secondary, fontWeight: '600' },
  emptyCard: { backgroundColor: Colors.white, marginHorizontal: Spacing.md, padding: Spacing.xl, borderRadius: BorderRadius.lg, borderWidth: 1, borderStyle: 'dashed', borderColor: '#D0D5DD', alignItems: 'center' },
  emptyText: { textAlign: 'center', color: Colors.text.secondary, fontSize: 14, lineHeight: 20 },

  // Camera
  cam: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'flex-end' },
  camHeader: { position: 'absolute', top: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 10 },
  camCancelBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20 },
  camCancelText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  camTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  camBody: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camMainText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  camTaskText: { color: Colors.primary, fontSize: 16, fontWeight: '600', marginTop: 12 },
  shutter: { marginBottom: 60, width: 84, height: 84, borderRadius: 42, borderWidth: 5, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  shutterActive: { borderColor: Colors.primary },
  shutterInner: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#FFF' },
  shutterInnerActive: { backgroundColor: Colors.primary },
  procText: { position: 'absolute', bottom: 30, color: '#888', fontSize: 14, fontWeight: '600' },

  // Toast
  toast: { position: 'absolute', bottom: 100, left: Spacing.md, right: Spacing.md, backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', ...Shadows.soft },
  toastText: { color: Colors.white, fontSize: 15, fontWeight: 'bold', marginLeft: 12, flex: 1 },
});
