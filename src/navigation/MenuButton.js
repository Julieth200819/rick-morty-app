import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function MenuButton({ navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 16 }}>
      <Ionicons name="menu" size={28} color={colors.primary} />
    </TouchableOpacity>
  );
}