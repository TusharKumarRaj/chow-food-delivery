import { ImageSourcePropType } from 'react-native';
import { getFoodImage } from './images';

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageKey?: string;
  image?: ImageSourcePropType;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryMins: number;
  priceForTwo: number;
  discount: string;
  location: string;
  image: ImageSourcePropType;
  items: MenuItem[];
};

function item(
  restaurantId: string,
  index: number,
  name: string,
  price: number,
  description: string,
  imageKey?: string,
): MenuItem {
  const image = imageKey ? getFoodImage(imageKey) : undefined;
  return {
    id: `${restaurantId}-${index}`,
    name,
    price,
    description,
    imageKey,
    image,
  };
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger House',
    cuisine: 'American, Burgers',
    rating: 4.5,
    deliveryMins: 25,
    priceForTwo: 350,
    discount: '30% OFF',
    location: 'Downtown',
    image: getFoodImage('burger')!,
    items: [
      item('1', 1, 'Classic Smash Burger', 130, 'Beef patty, cheddar, house sauce', 'burger'),
      item('1', 2, 'Bacon BBQ Burger', 150, 'Smoky bacon, onion rings, BBQ glaze', 'burger2'),
      item('1', 3, 'Veggie Grill Burger', 115, 'Grilled patty, avocado, lettuce', 'burger'),
      item('1', 4, 'Truffle Fries', 60, 'Crispy fries, truffle oil', 'burger2'),
    ],
  },
  {
    id: '2',
    name: 'Pizza Palace',
    cuisine: 'Italian, Pizza',
    rating: 4.3,
    deliveryMins: 30,
    priceForTwo: 400,
    discount: '50% OFF',
    location: 'West Side',
    image: getFoodImage('pizza')!,
    items: [
      item('2', 1, 'Margherita', 135, 'Tomato, mozzarella, basil', 'pizza'),
      item('2', 2, 'Pepperoni Feast', 160, 'Double pepperoni, extra cheese', 'pizza2'),
      item('2', 3, 'Four Cheese', 145, 'Mozzarella, gouda, parmesan, feta', 'pizza'),
      item('2', 4, 'Garlic Bread', 70, 'Buttery garlic knots', 'pizza2'),
    ],
  },
  {
    id: '3',
    name: 'Dragon Wok',
    cuisine: 'Chinese, Noodles',
    rating: 4.6,
    deliveryMins: 22,
    priceForTwo: 320,
    discount: '40% OFF',
    location: 'Chinatown',
    image: getFoodImage('chinese')!,
    items: [
      item('3', 1, 'Kung Pao Chicken', 113, 'Spicy wok-tossed chicken', 'chinese'),
      item('3', 2, 'Hakka Noodles', 110, 'Stir-fried veg noodles', 'chinese2'),
      item('3', 3, 'Manchurian Bowl', 125, 'Crispy balls in tangy sauce', 'chinese'),
      item('3', 4, 'Spring Rolls (6pc)', 80, 'Crispy vegetable rolls', 'chinese2'),
    ],
  },
  {
    id: '4',
    name: 'Spice Route',
    cuisine: 'Indian, Curry',
    rating: 4.4,
    deliveryMins: 28,
    priceForTwo: 380,
    discount: '35% OFF',
    location: 'Midtown',
    image: getFoodImage('indian')!,
    items: [
      item('4', 1, 'Butter Chicken', 138, 'Creamy tomato curry', 'indian'),
      item('4', 2, 'Paneer Tikka', 130, 'Char-grilled cottage cheese', 'indian2'),
      item('4', 3, 'Biryani Bowl', 143, 'Fragrant basmati, raita', 'indian'),
      item('4', 4, 'Garlic Naan', 50, 'Tandoor-baked flatbread', 'indian2'),
    ],
  },
  {
    id: '5',
    name: 'Pasta Corner',
    cuisine: 'Italian, Pasta',
    rating: 4.2,
    deliveryMins: 26,
    priceForTwo: 420,
    discount: '25% OFF',
    location: 'Riverside',
    image: getFoodImage('pasta')!,
    items: [
      item('5', 1, 'Creamy Alfredo', 150, 'Fettuccine, parmesan cream', 'pasta'),
      item('5', 2, 'Arrabiata Penne', 135, 'Spicy tomato, olives', 'pasta2'),
      item('5', 3, 'Pesto Linguine', 143, 'Basil pesto, pine nuts', 'pasta'),
      item('5', 4, 'Tiramisu Cup', 65, 'Espresso mascarpone dessert', 'pasta2'),
    ],
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    cuisine: 'Mexican, Tacos',
    rating: 4.7,
    deliveryMins: 20,
    priceForTwo: 280,
    discount: '45% OFF',
    location: 'South Plaza',
    image: getFoodImage('tacos')!,
    items: [
      item('6', 1, 'Street Tacos (3)', 100, 'Corn tortillas, salsa verde', 'tacos'),
      item('6', 2, 'Loaded Burrito', 120, 'Rice, beans, guac, cheese', 'taco2'),
      item('6', 3, 'Quesadilla', 105, 'Melted cheese, jalapenos', 'tacos'),
      item('6', 4, 'Churros', 60, 'Cinnamon sugar, chocolate dip', 'taco2'),
    ],
  },
];

export const FAVOURITE_IDS = ['1', '2', '4'];
