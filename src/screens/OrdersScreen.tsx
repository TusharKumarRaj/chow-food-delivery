import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { useCart } from '../context/CartContext';

export function OrdersScreen() {
  const { placedOrders, count } = useCart();

  if (placedOrders.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="receipt-outline" size={48} color={colors.border} />
        <Text style={styles.title}>Your Orders</Text>
        <Text style={styles.body}>
          {count > 0
            ? `You have ${count} item(s) in your cart. Go to Cart to place your order.`
            : 'No orders yet. Add dishes from a restaurant and place your order.'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={placedOrders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.header}>Your Orders</Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
            <Text style={styles.cardTitle}>Order placed</Text>
            <Text style={styles.cardTotal}>Rs. {item.total}</Text>
          </View>
          {item.items.map((line) => (
            <View key={line.id} style={styles.line}>
              <Text style={styles.lineName}>{line.name}</Text>
              <Text style={styles.linePrice}>Rs. {line.price}</Text>
            </View>
          ))}
          {item.items[0]?.restaurantName ? (
            <Text style={styles.restaurant}>{item.items[0].restaurantName}</Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 24,
    textAlign: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  lineName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  linePrice: {
    fontSize: 14,
    color: colors.textMuted,
  },
  restaurant: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
});
