import bellaImg from '../assets/images/dashboard-bella.png';
import miloImg from '../assets/images/dashboard-milo.png';
import cocoImg from '../assets/images/dashboard-coco.png';

// Product images
import salmonImg from '../assets/images/product-salmon.png';
import lambToyImg from '../assets/images/product-lamb-toy.png';
import puppyFoodImg from '../assets/images/product-puppy-food.png';
import frisbeeImg from '../assets/images/product-frisbee.png';
import jointSupportImg from '../assets/images/product-joint-chews.png';
import shampooImg from '../assets/images/product-shampoo.png';
import indoorCatImg from '../assets/images/product-indoor-cat.png';
import seniorCatImg from '../assets/images/product-senior-cat.png';

export const pets = [
  { id: 'bella', name: 'Bella', image: bellaImg, breed: 'Golden Retriever', age: '3 yrs', size: 'Large breed', count: 6 },
  { id: 'milo', name: 'Milo', image: miloImg, breed: 'British Shorthair', age: '5 yrs', size: 'Medium breed', count: 3 },
  { id: 'coco', name: 'Coco', image: cocoImg, breed: 'Shih Tzu', age: '1 yr', size: 'Small breed', count: 6 },
];

export const recommendations = {
  bella: [
    {
      id: 1,
      brand: 'Wildroot',
      category: 'Food',
      name: 'Grain-Free Salmon Adult Formula',
      rating: 4.8,
      reviews: 312,
      price: 58,
      subscribePrice: 49,
      matchReason: "Matches Bella's adult large-breed needs",
      image: salmonImg,
      petType: 'Dog'
    },
    {
      id: 2,
      brand: 'Pawnest',
      category: 'Toys',
      name: 'Plush Lamb Comfort Toy',
      rating: 4.9,
      reviews: 521,
      price: 18,
      subscribePrice: 16,
      matchReason: "Great for Bella's large-breed playtime",
      image: lambToyImg,
      petType: 'Dog'
    },
    {
      id: 3,
      brand: 'Wildroot',
      category: 'Food',
      name: 'Puppy Growth Chicken & Duck',
      rating: 4.6,
      reviews: 143,
      price: 46,
      subscribePrice: 39,
      matchReason: "Matches Bella's large-breed nutrition needs.",
      image: puppyFoodImg,
      petType: 'Dog'
    },
    {
      id: 4,
      brand: 'Pawnest',
      category: 'Toys',
      name: 'Fetch Pro Rubber Frisbee',
      rating: 4.5,
      reviews: 97,
      price: 22,
      subscribePrice: 20,
      matchReason: "Matches Bella's large-breed lifestyle.",
      image: frisbeeImg,
      petType: 'Dog'
    },
    {
      id: 5,
      brand: 'Vetbloom',
      category: 'Health',
      name: 'Daily Joint Support Chews',
      rating: 4.8,
      reviews: 276,
      price: 32,
      subscribePrice: 27,
      matchReason: "Matches Bella's large-breed lifestyle.",
      image: jointSupportImg,
      petType: 'Dog'
    },
    {
      id: 6,
      brand: 'Pawnest',
      category: 'Grooming',
      name: 'Pure Oat Calming Shampoo',
      rating: 4.7,
      reviews: 210,
      price: 28,
      subscribePrice: 24,
      matchReason: "Any Pet product for Bella's skin",
      image: shampooImg,
      petType: 'Any Pet'
    }
  ],
  milo: [
    {
      id: 7,
      brand: 'Whiskerly',
      category: 'Food',
      name: 'Indoor Cat Chicken Dinner',
      rating: 4.7,
      reviews: 189,
      price: 34,
      subscribePrice: 29,
      matchReason: "Tailored for Milo's indoor routine",
      image: indoorCatImg,
      petType: 'Cat'
    },
    {
      id: 8,
      brand: 'Pawnest',
      category: 'Grooming',
      name: 'Pure Oat Calming Shampoo',
      rating: 4.7,
      reviews: 210,
      price: 24,
      subscribePrice: 21,
      matchReason: "Matches Milo's medium-breed lifestyle.",
      image: shampooImg,
      petType: 'Any Pet'
    },
    {
      id: 9,
      brand: 'Whiskerly',
      category: 'Health',
      name: 'Senior Cat Kidney Care',
      rating: 4.6,
      reviews: 88,
      price: 38,
      subscribePrice: 33,
      matchReason: "Matches Milo's medium-breed lifestyle.",
      image: seniorCatImg,
      petType: 'Cat'
    }
  ],
  coco: [
    {
      id: 10,
      brand: 'Wildroot',
      category: 'Food',
      name: 'Grain-Free Salmon Adult Formula',
      rating: 4.8,
      reviews: 312,
      price: 58,
      subscribePrice: 49,
      matchReason: "Matches Coco's adult small-breed needs",
      image: salmonImg,
      petType: 'Dog'
    },
    {
      id: 11,
      brand: 'Pawnest',
      category: 'Toys',
      name: 'Plush Lamb Comfort Toy',
      rating: 4.9,
      reviews: 521,
      price: 18,
      subscribePrice: 16,
      matchReason: "Great for Coco's small-breed playtime",
      image: lambToyImg,
      petType: 'Dog'
    },
    {
      id: 12,
      brand: 'Wildroot',
      category: 'Food',
      name: 'Puppy Growth Chicken & Duck',
      rating: 4.6,
      reviews: 143,
      price: 46,
      subscribePrice: 39,
      matchReason: "Matches Coco's small-breed nutrition needs.",
      image: puppyFoodImg,
      petType: 'Dog'
    },
    {
      id: 13,
      brand: 'Pawnest',
      category: 'Toys',
      name: 'Fetch Pro Rubber Frisbee',
      rating: 4.5,
      reviews: 97,
      price: 22,
      subscribePrice: 20,
      matchReason: "Matches Coco's small-breed lifestyle.",
      image: frisbeeImg,
      petType: 'Dog'
    },
    {
      id: 14,
      brand: 'Vetbloom',
      category: 'Health',
      name: 'Daily Joint Support Chews',
      rating: 4.8,
      reviews: 276,
      price: 32,
      subscribePrice: 27,
      matchReason: "Matches Coco's small-breed lifestyle.",
      image: jointSupportImg,
      petType: 'Dog'
    },
    {
      id: 15,
      brand: 'Pawnest',
      category: 'Grooming',
      name: 'Pure Oat Calming Shampoo',
      rating: 4.7,
      reviews: 210,
      price: 28,
      subscribePrice: 24,
      matchReason: "Any Pet product for Coco's skin",
      image: shampooImg,
      petType: 'Any Pet'
    }
  ]
};
