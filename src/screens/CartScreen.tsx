import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useCart } from '../context/CartContext';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Cart'>;

export function CartScreen({ navigation }: Props) {
  const { items, placeOrder } = useCart();
  const insets = useSafeAreaInsets();
  const [ordered, setOrdered] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    const order = placeOrder();
    if (!order) return;

    setOrdered(true);
    const tabNav = navigation.getParent();

    tabNav?.navigate('Orders');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name={ordered ? 'checkmark-circle-outline' : 'cart-outline'}
            size={64}
            color={ordered ? colors.primary : colors.border}
          />
          <Text style={styles.emptyTitle}>
            {ordered ? 'Order placed!' : 'Your cart is empty'}
          </Text>
          <Text style={styles.emptySub}>
            {ordered
              ? 'See your order on the Orders tab.'
              : 'Add dishes from a restaurant menu'}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (ordered) {
                navigation.getParent()?.navigate('Orders');
              } else {
                navigation.goBack();
              }
            }}>
            <Text style={styles.buttonText}>
              {ordered ? 'View Orders' : 'Browse restaurants'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Ionicons name="fast-food-outline" size={22} color={colors.primary} />
                </View>
                <View style={styles.rowBody}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.restaurantName ? (
                    <Text style={styles.itemFrom}>{item.restaurantName}</Text>
                  ) : null}
                </View>
                <Text style={styles.itemPrice}>Rs. {item.price}</Text>
              </View>
            )}
          />
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>Rs. {total}</Text>
            </View>
            <Pressable style={styles.button} onPress={handleCheckout}>
              <Ionicons name="checkmark-circle-outline" size={22} color={colors.white} />
              <Text style={styles.buttonText}>Place Order</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  emptySub: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  list: { padding: 16, paddingBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBody: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600', color: colors.text },
  itemFrom: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: '700', color: colors.primary },
  footer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  totalLabel: { fontSize: 16, color: colors.textMuted },
  total: { fontSize: 20, fontWeight: '700', color: colors.text },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: { color: colors.white, fontSize: 17, fontWeight: '600' },
});
