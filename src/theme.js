export const colors = {
  background: '#0b0f14',
  card: '#161c24',
  border: '#232b36',
  primary: '#97ce4c',
  text: '#f2f5f7',
  muted: '#8b98a5',
  alive: '#55cc44',
  dead: '#d63d2e',
  unknown: '#9e9e9e',
};

export const getStatusColor = (status) => {
  const normalizedStatus = String(status ?? '').trim().toLowerCase();

  if (normalizedStatus === 'alive') return colors.alive;
  if (normalizedStatus === 'dead') return colors.dead;

  return colors.unknown;
};

export const statusColor = getStatusColor;