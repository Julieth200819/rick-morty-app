import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharactersScreen from '../screens/CharactersScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import MenuButton from './MenuButton';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export default function CharactersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="CharactersList"
        component={CharactersScreen}
        options={({ navigation }) => ({
          title: 'Personajes',
          headerLeft: () => <MenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={({ route }) => ({ title: route.params.character.name })}
      />
    </Stack.Navigator>
  );
}