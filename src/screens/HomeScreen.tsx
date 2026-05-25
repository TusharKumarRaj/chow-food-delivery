import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { FAVOURITE_IDS, RESTAURANTS, type Restaurant } from '../data/restaurants';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const CATEGORIES = [
  { id: 'express', label: 'Express', icon: 'flash-outline' as const, color: '#3B82F6' },
  { id: 'health', label: 'Health Hub', icon: 'fitness-outline' as const, color: '#10B981' },
  { id: 'meat', label: 'Fresh Meat', icon: 'restaurant-outline' as const, color: '#EF4444' },
  { id: 'gourmet', label: 'Gourmet', icon: 'wine-outline' as const, color: '#8B5CF6' },
];

const POPULAR = [
  { label: 'Super', icon: 'star-outline' as const },
  { label: 'Veg only', icon: 'leaf-outline' as const },
  { label: 'Express', icon: 'bicycle-outline' as const },
  { label: 'Budget', icon: 'wallet-outline' as const },
];

function openRestaurant(navigation: Props['navigation'], r: Restaurant) {
  navigation.navigate('RestaurantDetail', { id: r.id, name: r.name });
}

export function HomeScreen({ navigation }: Props) {
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const topTwo = RESTAURANTS.slice(0, 2);
  const favourites = RESTAURANTS.filter((r) => FAVOURITE_IDS.includes(r.id));

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable style={styles.locationBlock}>
          <Ionicons name="location" size={22} color={colors.primary} />
          <View>
            <Text style={styles.locationTitle}>New Home</Text>
            <Text style={styles.locationSub} numberOfLines={1}>
              42 Food Street, Downtown
            </Text>
          </View>
          <Ionicons name="chevron-down" size={18} color={colors.text} />
        </Pressable>
        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            void logout();
          }}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.gridRow}>
          {topTwo.map((r, index) => (
            <Pressable
              key={r.id}
              style={[
                styles.bigTile,
                { backgroundColor: index === 0 ? colors.swiggyOrange : colors.primary },
              ]}
              onPress={() => openRestaurant(navigation, r)}>
              <Text style={styles.bigTileTitle} numberOfLines={1}>
                {r.name}
              </Text>
              <Text style={styles.bigTileSub} numberOfLines={1}>
                {r.cuisine}
              </Text>
              <Image source={r.image} style={styles.bigTileImg} />
            </Pressable>
          ))}
        </View>

        <View style={styles.smallGrid}>
          {CATEGORIES.map((c) => (
            <Pressable key={c.id} style={styles.smallTile}>
              <View style={[styles.smallIconWrap, { backgroundColor: c.color + '22' }]}>
                <Ionicons name={c.icon} size={22} color={c.color} />
              </View>
              <Text style={styles.smallLabel}>{c.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHead}>
          <Ionicons name="heart" size={18} color={colors.primary} />
          <Text style={styles.sectionTitle}>Restaurants You Love</Text>
        </View>
        <FlatList
          horizontal
          data={favourites}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
          renderItem={({ item }) => (
            <Pressable style={styles.favCard} onPress={() => openRestaurant(navigation, item)}>
              <Image source={item.image} style={styles.favImage} />
              <Text style={styles.favName} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.favMeta}>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                <Text style={styles.favTime}>{item.deliveryMins} mins</Text>
              </View>
            </Pressable>
          )}
        />

        <View style={styles.sectionHeadRow}>
          <Text style={styles.sectionTitle}>In the Spotlight</Text>
          <Pressable>
            <Text style={styles.seeAll}>SEE ALL</Text>
          </Pressable>
        </View>
        {RESTAURANTS.map((item) => (
          <Pressable
            key={item.id}
            style={styles.spotCard}
            onPress={() => openRestaurant(navigation, item)}>
            <View>
              <Image source={item.image} style={styles.spotImage} />
              <View style={styles.spotBadge}>
                <Text style={styles.spotBadgeText}>{item.discount}</Text>
              </View>
            </View>
            <View style={styles.spotBody}>
              <Text style={styles.spotName}>{item.name}</Text>
              <Text style={styles.spotCuisine}>{item.cuisine}</Text>
              <View style={styles.spotRow}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.spotMeta}>{item.rating}</Text>
                <Text style={styles.spotDot}>·</Text>
                <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                <Text style={styles.spotMeta}>{item.deliveryMins} mins</Text>
              </View>
              <Text style={styles.spotPrice}>Rs. {item.priceForTwo} for two</Text>
            </View>
          </Pressable>
        ))}

        <Text style={[styles.sectionTitle, styles.sectionGap]}>Coupons For You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {['60% OFF', 'FREE DELIVERY'].map((label) => (
            <View key={label} style={styles.couponCard}>
              <Ionicons name="ticket-outline" size={28} color={colors.primary} />
              <Text style={styles.couponTitle}>{label}</Text>
              <Text style={styles.couponSub}>On select restaurants</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.sectionGap]}>Popular Categories</Text>
        <View style={styles.popularRow}>
          {POPULAR.map((p) => (
            <View key={p.label} style={styles.popularItem}>
              <View style={styles.popularCircle}>
                <Ionicons name={p.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.popularLabel}>{p.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.deliveryCard}>
          <View style={styles.deliveryText}>
            <Text style={styles.deliveryTitle}>Fast food delivery</Text>
            <Text style={styles.deliverySub}>
              Hot meals from local restaurants, tracked to your door in minutes.
            </Text>
            <View style={styles.deliveryPerks}>
              <View style={styles.deliveryPerk}>
                <Ionicons name="timer-outline" size={18} color={colors.primary} />
                <Text style={styles.deliveryPerkText}>Quick delivery</Text>
              </View>
              <View style={styles.deliveryPerk}>
                <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
                <Text style={styles.deliveryPerkText}>Live order tracking</Text>
              </View>
            </View>
          </View>
          <Ionicons name="restaurant" size={64} color={colors.primary + '55'} />
        </View>

        <View style={styles.festBanner}>
          <Ionicons name="flame" size={32} color={colors.white} />
          <View>
            <Text style={styles.festTitle}>BIG HUNGER FEST</Text>
            <Text style={styles.festSub}>starting soon</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  locationBlock: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  locationTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  locationSub: { fontSize: 12, color: colors.textMuted, maxWidth: 200 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.header,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  scroll: { paddingBottom: 24 },
  gridRow: { flexDirection: 'row', padding: 16, gap: 12 },
  bigTile: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    padding: 14,
    overflow: 'hidden',
  },
  bigTileTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  bigTileSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  bigTileImg: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  smallGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  smallTile: { width: '22%', alignItems: 'center' },
  smallIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  smallLabel: { fontSize: 11, color: colors.text, marginTop: 6, textAlign: 'center' },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionHeadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  sectionGap: { paddingHorizontal: 16, marginTop: 20, marginBottom: 10 },
  seeAll: { fontSize: 13, fontWeight: '700', color: colors.primary },
  hList: { paddingHorizontal: 16, gap: 12, paddingBottom: 4 },
  favCard: { width: 140, marginRight: 12 },
  favImage: { width: 140, height: 140, borderRadius: 14 },
  favName: { fontSize: 14, fontWeight: '600', color: colors.text, marginTop: 8 },
  favMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  favTime: { fontSize: 12, color: colors.textMuted },
  spotCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: colors.card,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  spotImage: { width: 110, height: 110 },
  spotBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: colors.instamart,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  spotBadgeText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  spotBody: { flex: 1, padding: 12, justifyContent: 'center' },
  spotName: { fontSize: 16, fontWeight: '700', color: colors.text },
  spotCuisine: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  spotRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  spotMeta: { fontSize: 13, color: colors.text },
  spotDot: { color: colors.textMuted },
  spotPrice: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  couponCard: {
    width: 160,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  couponTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginTop: 8 },
  couponSub: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  popularRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  popularItem: { alignItems: 'center', width: 72 },
  popularCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  popularLabel: { fontSize: 11, color: colors.text, marginTop: 6, textAlign: 'center' },
  deliveryCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  deliveryText: { flex: 1 },
  deliveryTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  deliverySub: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: 12, lineHeight: 19 },
  deliveryPerks: { gap: 8 },
  deliveryPerk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryPerkText: { fontSize: 13, fontWeight: '600', color: colors.text },
  festBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.bannerPurple,
    borderRadius: 14,
    padding: 18,
  },
  festTitle: { color: colors.white, fontSize: 18, fontWeight: '800' },
  festSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
});
