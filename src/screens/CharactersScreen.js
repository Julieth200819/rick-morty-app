import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCharacters } from '../services/api';
import { colors, statusColor } from '../theme';

const FALLBACK_IMAGE = require('../../assets/default.png');

const CharacterImage = ({ uri }) => {
  const [retryCount, setRetryCount] = useState(0);
  const [imageSource, setImageSource] = useState(uri ? { uri } : FALLBACK_IMAGE);

  const handleError = () => {
    if (retryCount < 2) {
      setRetryCount((prev) => prev + 1);
      setImageSource(uri ? { uri } : FALLBACK_IMAGE);
      return;
    }

    setImageSource(FALLBACK_IMAGE);
  };

  return (
    <Image
      source={imageSource}
      style={styles.image}
      resizeMode="cover"
      onError={handleError}
    />
  );
};

export default function CharactersScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadCharacters = async (nextPage = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await getCharacters(nextPage);
      const nextCharacters = data.results || [];

      if (nextPage > data.info.pages) {
        setHasMore(false);
        return;
      }

      setCharacters((current) => (append ? [...current, ...nextCharacters] : nextCharacters));
      setHasMore(nextPage < data.info.pages);
      setPage(nextPage);
    } catch (e) {
      const statusCode = e?.status || e?.cause?.status;
      const isNetworkLimit =
        statusCode === 429 ||
        statusCode === 403 ||
        e?.message === 'Failed to fetch' ||
        e?.message === 'Network request failed';

      if (isNetworkLimit) {
        setHasMore(false);
        setError(null);
        return;
      }

      setError(e.message || 'Error al cargar personajes');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadCharacters(1);
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={48} color={colors.dead} />
        <Text style={styles.error}>{error}</Text>
      </View>
    );

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!loadingMore && hasMore) {
          loadCharacters(page + 1, true);
        }
      }}
      ListFooterComponent={() =>
        hasMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.footerText}>{loadingMore ? 'Cargando más...' : 'Cargando más personajes...'}</Text>
          </View>
        ) : (
          <Text style={styles.endText}>Ya no hay más personajes</Text>
        )
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => navigation.navigate('CharacterDetail', { character: item })}
        >
          <CharacterImage uri={item.image} />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style={styles.statusRow}>
              <View style={[styles.dot, { backgroundColor: statusColor(item.status) }]} />
              <Text style={styles.status}>{item.status} - {item.species}</Text>
            </View>
            <Text style={styles.label}>Ubicación</Text>
            <Text style={styles.location} numberOfLines={1}>{item.location.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.muted} style={styles.chevron} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  error: { color: colors.dead, marginTop: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 100, height: 110 },
  info: { flex: 1, padding: 12 },
  name: { color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dot: { width: 9, height: 9, borderRadius: 5, marginRight: 6 },
  status: { color: colors.text, fontSize: 13 },
  label: { color: colors.muted, fontSize: 11 },
  location: { color: colors.text, fontSize: 13 },
  chevron: { marginRight: 12 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  footerText: {
    color: colors.muted,
    fontSize: 13,
  },
  endText: {
    color: colors.muted,
    textAlign: 'center',
    paddingVertical: 12,
  },
});