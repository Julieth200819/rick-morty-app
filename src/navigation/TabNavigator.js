import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CharactersStack from './CharactersStack';
import EpisodesScreen from '../screens/EpisodesScreen';
import MenuButton from './MenuButton';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Personajes"
        component={CharactersStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Episodios"
        component={EpisodesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerLeftContainerStyle: { paddingLeft: 16 },
          tabBarIcon: ({ color, size }) => <Ionicons name="tv" size={size} color={color} />,
        })}
      />
    </Tab.Navigator>
  );
}