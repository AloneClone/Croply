import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { TouchableOpacity } from '../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/Theme';
import { Header } from '../components/dashboard/Header';
import { ProgressCard } from '../components/dashboard/ProgressCard';
import { BonusBanner } from '../components/dashboard/BonusBanner';
import { TaskCard } from '../components/dashboard/TaskCard';
import { LeaderboardReel } from '../components/dashboard/LeaderboardReel';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import {
  CheckCircle, TrendingUp, Gift, X,
  AlertTriangle, Info, Award, Flame
} from 'lucide-react-native';

export default function HomeScreen() {
  const { tasks, dailyProgress, rewardSummary, announcements, markAnnouncementRead, completeTask, updateXP } = useAppContext();
  const navigation = useNavigation<any>();

  const [cameraTaskId, setCameraTaskId] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const unreadAnnouncements = announcements.filter(a => !a.read);

  const handleStartTask = (taskId: string) => {
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

  // If camera overlay is open, render it INSTEAD of the dashboard
  if (cameraTaskId) {
    const activeTask = tasks.find(t => t.id === cameraTaskId);
    return (
      <View style={styles.cameraOverlay}>
        <View style={styles.cameraHeader}>
          <TouchableOpacity onPress={() => setCameraTaskId(null)} style={styles.cancelButton}>
            <Text style={styles.cancelText}>✕ Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Capture Proof</Text>
          <View style={{ width: 80 }} />
        </View>

        <View style={styles.cameraBody}>
          <Text style={{ fontSize: 80 }}>📸</Text>
          <Text style={styles.cameraMainText}>Point at your field</Text>
          <Text style={styles.cameraSub}>{activeTask?.title}</Text>
          <Text style={styles.cameraSub2}>GPS & timestamp are recorded automatically</Text>
        </View>

        <TouchableOpacity
          style={[styles.shutterButton, isCapturing && styles.shutterCapturing]}
          onPress={handleCapture}
          disabled={isCapturing}
          activeOpacity={0.7}
        >
          <View style={[styles.shutterInner, isCapturing && styles.shutterInnerCapturing]} />
        </TouchableOpacity>

        {isCapturing && <Text style={styles.processingLabel}>Processing...</Text>}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* 1. Personalized Header */}
        <Header />

        {/* 2. Daily Progress Summary */}
        <Card style={styles.progressSummary}>
          <View style={styles.progRow}>
            <View>
              <Text style={styles.progLabel}>Today's Progress</Text>
              <Text style={styles.progValue}>{dailyProgress.completed}/{dailyProgress.total} tasks</Text>
            </View>
            <View style={styles.progCircle}>
              <Text style={styles.progPct}>
                {dailyProgress.total > 0 ? Math.round((dailyProgress.completed / dailyProgress.total) * 100) : 0}%
              </Text>
            </View>
          </View>
          <ProgressBar
            progress={dailyProgress.total > 0 ? dailyProgress.completed / dailyProgress.total : 0}
            height={8}
            color={dailyProgress.bonusEarned ? Colors.primary : Colors.secondary}
          />
          {dailyProgress.bonusEarned && (
            <View style={styles.bonusRow}>
              <CheckCircle size={14} color={Colors.primary} />
              <Text style={styles.bonusText}>Daily bonus unlocked! +50 XP</Text>
            </View>
          )}
        </Card>

        {/* 3. XP / Level Display */}
        <ProgressCard />

        {/* 4. Bonus Banner */}
        <BonusBanner />

        {/* 5. Alerts */}
        {unreadAnnouncements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📢 Alerts</Text>
            {unreadAnnouncements.map(ann => (
              <TouchableOpacity
                key={ann.id}
                style={[styles.alertCard, ann.type === 'warning' && styles.alertWarn, ann.type === 'reward' && styles.alertGreen]}
                onPress={() => markAnnouncementRead(ann.id)}
                activeOpacity={0.6}
              >
                <View style={styles.alertIcon}>
                  {ann.type === 'warning' && <AlertTriangle size={20} color="#D97706" />}
                  {ann.type === 'info' && <Info size={20} color={Colors.secondary} />}
                  {ann.type === 'reward' && <Award size={20} color={Colors.primary} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.alertTitle}>{ann.title}</Text>
                  <Text style={styles.alertBody}>{ann.body}</Text>
                </View>
                <Text style={styles.dismissText}>Dismiss</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 6. Daily Quests */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          <TouchableOpacity style={styles.viewAllBtn} onPress={() => navigation.navigate('Tasks')} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View all →</Text>
          </TouchableOpacity>
        </View>

        {pendingTasks.length > 0 ? (
          pendingTasks.slice(0, 3).map(task => (
            <TaskCard key={task.id} task={task} onPress={() => handleStartTask(task.id)} />
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <CheckCircle size={32} color={Colors.primary} />
            <Text style={styles.emptyTitle}>All done for today! 🎉</Text>
            <Text style={styles.emptySub}>Come back tomorrow for new quests</Text>
          </Card>
        )}

        {completedTasks.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { paddingHorizontal: Spacing.md, marginTop: Spacing.lg }]}>Completed ✅</Text>
            {completedTasks.map(task => (
              <TaskCard key={task.id} task={task} onPress={() => {}} />
            ))}
          </>
        )}

        {/* 7. Rewards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎁 Rewards</Text>
          <Card style={{ padding: Spacing.md }}>
            <View style={styles.rewardRow}>
              <View style={styles.rewardItem}>
                <TrendingUp size={20} color={Colors.secondary} />
                <Text style={styles.rewardVal}>{rewardSummary.totalEarned}</Text>
                <Text style={styles.rewardLbl}>Total XP</Text>
              </View>
              <View style={styles.rewardDiv} />
              <View style={styles.rewardItem}>
                <Flame size={20} color="#E67E22" />
                <Text style={styles.rewardVal}>{rewardSummary.streak}d</Text>
                <Text style={styles.rewardLbl}>Streak</Text>
              </View>
              <View style={styles.rewardDiv} />
              <View style={styles.rewardItem}>
                <Gift size={20} color={Colors.primary} />
                <Text style={styles.rewardVal} numberOfLines={1}>{rewardSummary.nextReward}</Text>
                <Text style={styles.rewardLbl}>Next Reward</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* 8. Leaderboard */}
        <LeaderboardReel />
      </ScrollView>

      {/* Success Toast */}
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
  scrollContent: { paddingBottom: 120 },

  // Progress Summary
  progressSummary: { marginHorizontal: Spacing.md, padding: Spacing.md },
  progRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progLabel: { fontSize: 12, fontWeight: '600', color: Colors.text.secondary },
  progValue: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary },
  progCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.accent.lightGreen, justifyContent: 'center', alignItems: 'center' },
  progPct: { fontSize: 14, fontWeight: 'bold', color: Colors.primary },
  bonusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  bonusText: { fontSize: 12, fontWeight: '600', color: Colors.primary, marginLeft: 6 },

  // Sections
  section: { marginTop: Spacing.lg, paddingHorizontal: Spacing.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary, marginBottom: Spacing.sm },
  viewAllBtn: { backgroundColor: Colors.accent.lightBlue, paddingHorizontal: 16, paddingVertical: 8, borderRadius: BorderRadius.full },
  viewAllText: { fontSize: 13, fontWeight: '700', color: Colors.secondary },

  // Alerts
  alertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.accent.lightBlue, padding: 14, borderRadius: BorderRadius.md, marginBottom: Spacing.sm },
  alertWarn: { backgroundColor: '#FEF3C7' },
  alertGreen: { backgroundColor: Colors.accent.lightGreen },
  alertIcon: { marginRight: 12 },
  alertTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.text.primary },
  alertBody: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  dismissText: { fontSize: 11, fontWeight: '600', color: Colors.text.secondary, marginLeft: 8 },

  // Empty
  emptyCard: { marginHorizontal: Spacing.md, alignItems: 'center', paddingVertical: Spacing.xl },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary, marginTop: 12 },
  emptySub: { fontSize: 13, color: Colors.text.secondary, marginTop: 4 },

  // Rewards
  rewardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rewardItem: { flex: 1, alignItems: 'center' },
  rewardVal: { fontSize: 14, fontWeight: 'bold', color: Colors.text.primary, marginTop: 6, textAlign: 'center' },
  rewardLbl: { fontSize: 11, color: Colors.text.secondary, marginTop: 2 },
  rewardDiv: { width: 1, height: 40, backgroundColor: '#E4E7EC' },

  // Camera Overlay (replaces Modal)
  cameraOverlay: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'flex-end' },
  cameraHeader: { position: 'absolute', top: 50, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, zIndex: 10 },
  cancelButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20 },
  cancelText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  cameraTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cameraBody: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cameraMainText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  cameraSub: { color: Colors.primary, fontSize: 16, fontWeight: '600', marginTop: 12 },
  cameraSub2: { color: '#666', fontSize: 13, marginTop: 8 },
  shutterButton: { marginBottom: 60, width: 84, height: 84, borderRadius: 42, borderWidth: 5, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  shutterCapturing: { borderColor: Colors.primary },
  shutterInner: { width: 66, height: 66, borderRadius: 33, backgroundColor: '#FFF' },
  shutterInnerCapturing: { backgroundColor: Colors.primary },
  processingLabel: { position: 'absolute', bottom: 30, color: '#888', fontSize: 14, fontWeight: '600' },

  // Toast
  toast: { position: 'absolute', bottom: 100, left: Spacing.md, right: Spacing.md, backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', ...Shadows.soft },
  toastText: { color: Colors.white, fontSize: 15, fontWeight: 'bold', marginLeft: 12, flex: 1 },
});
