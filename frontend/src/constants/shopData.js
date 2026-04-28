import salmonImg from '../assets/images/product-salmon.png';
import chickenImg from '../assets/images/product-cat-chicken.png';
import toyImg from '../assets/images/product-lamb-toy.png';
import puppyImg from '../assets/images/product-puppy-food.png';
import frisbeeImg from '../assets/images/product-frisbee.png';
import jointImg from '../assets/images/product-joint-chews.png';
import shampooImg from '../assets/images/product-shampoo.png';
import seniorImg from '../assets/images/product-senior-cat.png';

export const products = [
  {
    id: 1,
    name: 'Grain-Free Salmon Adult Formula',
    brand: 'Wildroot',
    category: 'Food',
    petType: 'Dog',
    ageGroup: 'Adult',
    size: 'Large',
    rating: 4.8,
    reviews: 312,
    price: 58,
    subscribePrice: 49,
    image: salmonImg,
    label: 'For Bella'
  },
  {
    id: 2,
    name: 'Indoor Cat Chicken Dinner',
    brand: 'Whiskerly',
    category: 'Food',
    petType: 'Cat',
    ageGroup: 'Adult',
    size: 'Medium',
    rating: 4.7,
    reviews: 189,
    price: 34,
    subscribePrice: 29,
    image: chickenImg,
    label: 'For Milo'
  },
  {
    id: 3,
    name: 'Plush Lamb Comfort Toy',
    brand: 'Pawnest',
    category: 'Toys',
    petType: 'Dog',
    ageGroup: 'All',
    size: 'Small',
    rating: 4.9,
    reviews: 521,
    price: 18,
    subscribePrice: 16,
    image: toyImg,
    label: 'For Coco'
  },
  {
    id: 4,
    name: 'Puppy Growth Chicken & Duck',
    brand: 'Wildroot',
    category: 'Food',
    petType: 'Dog',
    ageGroup: 'Puppy',
    size: 'Medium',
    rating: 4.6,
    reviews: 143,
    price: 46,
    subscribePrice: 39,
    image: puppyImg
  },
  {
    id: 5,
    name: 'Fetch Pro Rubber Frisbee',
    brand: 'Pawnest',
    category: 'Toys',
    petType: 'Dog',
    ageGroup: 'All',
    size: 'Medium',
    rating: 4.5,
    reviews: 97,
    price: 22,
    subscribePrice: 20,
    image: frisbeeImg
  },
  {
    id: 6,
    name: 'Daily Joint Support Chews',
    brand: 'Vetbloom',
    category: 'Health',
    petType: 'Dog',
    ageGroup: 'Senior',
    size: 'Large',
    rating: 4.8,
    reviews: 276,
    price: 32,
    subscribePrice: 27,
    image: jointImg
  },
  {
    id: 7,
    name: 'Pure Oat Calming Shampoo',
    brand: 'Pawnest',
    category: 'Grooming',
    petType: 'Any Pet',
    ageGroup: 'All',
    size: 'Small',
    rating: 4.7,
    reviews: 210,
    price: 24,
    subscribePrice: 21,
    image: shampooImg
  },
  {
    id: 8,
    name: 'Senior Cat Kidney Care',
    brand: 'Vetbloom',
    category: 'Food',
    petType: 'Cat',
    ageGroup: 'Senior',
    size: 'Medium',
    rating: 4.8,
    reviews: 312,
    price: 42,
    subscribePrice: 36,
    image: seniorImg
  }
];
