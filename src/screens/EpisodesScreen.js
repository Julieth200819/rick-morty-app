import { useEffect, useState } from 'react';
import { Text, FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getEpisodes } from '../services/api';
import { colors } from '../theme';

export default function EpisodesScreen() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadEpisodes = async (nextPage = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await getEpisodes(nextPage);
      const nextEpisodes = data.results || [];

      setEpisodes((current) => (append ? [...current, ...nextEpisodes] : nextEpisodes));
      setHasMore(true);
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
        return;
      }

      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadEpisodes(1);
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <FlatList
      style={styles.list}
      data={episodes}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!loadingMore && hasMore) {
          loadEpisodes(page + 1, true);
        }
      }}
      ListFooterComponent={() =>
        hasMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.footerText}>{loadingMore ? 'Cargando más...' : 'Cargando más episodios...'}</Text>
          </View>
        ) : (
          <Text style={styles.endText}>Ya no hay más episodios</Text>
        )
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.episode}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.dateRow}>
              <Ionicons name="calendar" size={14} color={colors.muted} />
              <Text style={styles.date}>{item.air_date}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  details: {
    flex: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 14,
  },
  badgeText: { color: colors.background, fontWeight: 'bold', fontSize: 13 },
  title: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  date: { color: colors.muted, fontSize: 13 },
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