import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useCart } from '../context/CartContext';
import { RESTAURANTS, type MenuItem } from '../data/restaurants';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantDetail'>;

export function RestaurantDetailScreen({ navigation, route }: Props) {
  const { id, name } = route.params;
  const { addItem, count } = useCart();
  const insets = useSafeAreaInsets();
  const restaurant = RESTAURANTS.find((r) => r.id === id);

  const [flashId, setFlashId] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const cartPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 1600);
    return () => clearTimeout(t);
  }, [toastVisible]);

  const showAddedFeedback = (menuItemId: string) => {
    setFlashId(menuItemId);
    setToastVisible(true);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(cartPulse, {
          toValue: 1.06,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(cartPulse, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    setTimeout(() => setFlashId(null), 500);
  };

  if (!restaurant) {
    return (
      <View style={styles.center}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  const handleAdd = (item: MenuItem) => {
    addItem({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: item.price,
      restaurantName: restaurant.name,
    });
    showAddedFeedback(item.id);
  };

  const bottomPad = Math.max(insets.bottom, 16) + 72;

  const renderItem = ({ item }: { item: MenuItem }) => {
    const isFlashing = flashId === item.id;
    return (
      <View style={[styles.menuRow, isFlashing && styles.menuRowFlash]}>
        {item.image ? (
          <Image source={item.image} style={styles.menuImage} />
        ) : (
          <View style={styles.menuPlaceholder}>
            <Ionicons name="fast-food-outline" size={28} color={colors.textMuted} />
          </View>
        )}
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.menuPrice}>Rs. {item.price}</Text>
        </View>
        <Pressable style={[styles.addBtn, isFlashing && styles.addBtnFlash]} onPress={() => handleAdd(item)}>
          <Ionicons name={isFlashing ? 'checkmark' : 'add'} size={22} color={colors.white} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurant.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Image source={restaurant.image} style={styles.hero} />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.metaText}>{restaurant.rating}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Ionicons name="time-outline" size={15} color={colors.textMuted} />
                <Text style={styles.metaText}>{restaurant.deliveryMins} mins</Text>
                <Text style={styles.metaDot}>·</Text>
                <Ionicons name="location-outline" size={15} color={colors.textMuted} />
                <Text style={styles.metaText}>{restaurant.location}</Text>
              </View>
            </View>
            <Text style={styles.menuTitle}>Menu</Text>
          </>
        }
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
      />

      {toastVisible ? (
        <Animated.View style={[styles.toast, { opacity: toastOpacity, top: insets.top + 8 }]}>
          <Ionicons name="checkmark-circle" size={20} color={colors.white} />
          <Text style={styles.toastText}>Added to cart</Text>
        </Animated.View>
      ) : null}

      <Animated.View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
          { transform: [{ scale: cartPulse }] },
        ]}>
        <Pressable style={styles.cartLink} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={20} color={colors.white} />
          <Text style={styles.cartLinkText}>
            View Cart {count > 0 ? `(${count})` : ''}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { width: '100%', height: 200 },
  info: {
    backgroundColor: colors.card,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  name: { fontSize: 22, fontWeight: '700', color: colors.text },
  cuisine: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10, flexWrap: 'wrap' },
  metaText: { fontSize: 13, color: colors.text },
  metaDot: { color: colors.textMuted },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: { paddingHorizontal: 16 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  menuRowFlash: {
    backgroundColor: '#FFF4ED',
    borderColor: colors.primary,
  },
  menuImage: { width: 72, height: 72, borderRadius: 10 },
  menuPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuInfo: { flex: 1 },
  menuName: { fontSize: 16, fontWeight: '600', color: colors.text },
  menuDesc: { fontSize: 12, color: colors.textMuted, marginTop: 4, lineHeight: 17 },
  menuPrice: { fontSize: 15, fontWeight: '700', color: colors.primary, marginTop: 6 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnFlash: {
    backgroundColor: '#C2410C',
  },
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.header,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    zIndex: 10,
  },
  toastText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cartLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.header,
    paddingVertical: 14,
    borderRadius: 10,
  },
  cartLinkText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});
