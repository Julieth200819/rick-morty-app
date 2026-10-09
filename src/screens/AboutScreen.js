import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const appFeatures = [
  { icon: 'layers', label: 'Stack' },
  { icon: 'albums', label: 'Tabs' },
  { icon: 'menu', label: 'Drawer' },
];

const FeatureChip = ({ icon, label }) => (
  <View style={styles.chip}>
    <Ionicons name={icon} size={16} color={colors.primary} />
    <Text style={styles.chipText}>{label}</Text>
  </View>
);

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="planet" size={64} color={colors.background} />
      </View>

      <Text style={styles.title}>Rick & Morty App</Text>

      <View style={styles.chips}>
        {appFeatures.map((feature) => (
          <FeatureChip key={feature.label} icon={feature.icon} label={feature.label} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  chips: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    color: colors.text,
    fontWeight: '600',
  },
});