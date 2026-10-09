import { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, statusColor } from '../theme';

const FALLBACK_IMAGE = require('../../assets/default.png');

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={20} color={colors.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

export default function CharacterDetailScreen({ route }) {
  const { character } = route.params;
  const [retryCount, setRetryCount] = useState(0);
  const [imageSource, setImageSource] = useState(character.image ? { uri: character.image } : FALLBACK_IMAGE);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageError = () => {
    if (retryCount < 2) {
      setRetryCount((prev) => prev + 1);
      setImageSource(character.image ? { uri: character.image } : FALLBACK_IMAGE);
      return;
    }

    setImageSource(FALLBACK_IMAGE);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.hero}>
        <View style={[styles.imagePlaceholder, isImageLoading && styles.imageLoading]}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
            onError={handleImageError}
            onLoad={() => setIsImageLoading(false)}
          />
        </View>
        <Text style={styles.name}>{character.name}</Text>
        <View style={[styles.badge, { backgroundColor: statusColor(character.status) }]}>
          <Text style={styles.badgeText}>{character.status}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <InfoRow icon="paw" label="Especie" value={character.species} />
        <InfoRow icon="male-female" label="Género" value={character.gender} />
        <InfoRow icon="earth" label="Origen" value={character.origin.name} />
        <InfoRow icon="location" label="Última ubicación" value={character.location.name} />
        <InfoRow icon="film" label="Episodios" value={`${character.episode.length} apariciones`} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    alignItems: 'center',
    paddingVertical: 28,
    backgroundColor: colors.card,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  imagePlaceholder: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 4,
    borderColor: colors.primary,
    marginBottom: 16,
    backgroundColor: '#2c2f35',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageLoading: {
    backgroundColor: '#3a3d42',
  },
  name: { color: colors.text, fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  badge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  label: { color: colors.muted, fontSize: 12 },
  value: { color: colors.text, fontSize: 16, fontWeight: '600' },
});