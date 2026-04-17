import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from '../components/common/Touchable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/Theme';
import { Mail, Phone, Sparkles } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
             <Sparkles size={48} color={Colors.white} />
          </View>
          <Text style={styles.appName}>Croply</Text>
          <Text style={styles.tagline}>Smart Farming, Gamified.</Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.ssoButton} onPress={signIn}>
            <Mail size={24} color={Colors.text.primary} />
            <Text style={styles.ssoText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ssoButton, styles.phoneButton]} onPress={signIn}>
            <Phone size={24} color={Colors.white} />
            <Text style={[styles.ssoText, styles.whiteText]}>Use Phone Number</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By continuing, you agree to Croply's Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.glowGreen,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  tagline: {
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '500',
  },
  buttonSection: {
    width: '100%',
    gap: Spacing.md,
  },
  ssoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: BorderRadius.lg,
    ...Shadows.soft,
    width: '100%',
  },
  phoneButton: {
    backgroundColor: Colors.accent.navy,
  },
  ssoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginLeft: 12,
  },
  whiteText: {
    color: Colors.white,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
    lineHeight: 18,
  }
});
