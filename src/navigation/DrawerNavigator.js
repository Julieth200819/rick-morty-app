import { View, Text, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import AboutScreen from '../screens/AboutScreen';
import { colors } from '../theme';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="planet" size={40} color={colors.background} />
        </View>
        <Text style={styles.title}>Rick & Morty</Text>
        <Text style={styles.subtitle}>Explorador del multiverso</Text>
      </View>
      <View style={{ paddingTop: 12 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.primary,
        headerTitleStyle: { color: colors.text, fontWeight: 'bold' },
        drawerStyle: { backgroundColor: colors.background, width: 280 },
        drawerActiveTintColor: colors.background,
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontWeight: '600', marginLeft: -8 },
        drawerItemStyle: { borderRadius: 12, marginHorizontal: 12 },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Acerca de"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.card,
    padding: 24,
    paddingTop: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: colors.muted, marginTop: 2 },
});