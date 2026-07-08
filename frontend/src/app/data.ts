export type Pet = {
  id: string;
  name: string;
  type: "Dog" | "Cat";
  breed: string;
  age: string;
  weight: string;
  size: "Small" | "Medium" | "Large";
  avatar: string;
};

export type Product = {
  id: string;
  _id?: string;
  name: string;
  brand: string;
  price: number;
  subPrice: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  petType: "Dog" | "Cat" | "All";
  category: "Food" | "Toys" | "Health" | "Grooming";
  ageGroup: "Puppy" | "Adult" | "Senior" | "All";
  size: "Small" | "Medium" | "Large" | "All";
  description: string;
  recommendedFor?: string;
  recommendReason?: string;
};

export const pets: Pet[] = [
  {
    id: "p1",
    name: "Bella",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 yrs",
    weight: "28 kg",
    size: "Large",
    avatar:
      "https://images.unsplash.com/photo-1767381604151-bae00f2fb337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: "p2",
    name: "Milo",
    type: "Cat",
    breed: "British Shorthair",
    age: "5 yrs",
    weight: "4.2 kg",
    size: "Medium",
    avatar:
      "https://images.unsplash.com/photo-1702914954859-f037fc75b760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
  {
    id: "p3",
    name: "Coco",
    type: "Dog",
    breed: "Shih Tzu",
    age: "1 yr",
    weight: "6 kg",
    size: "Small",
    avatar:
      "https://images.unsplash.com/photo-1579202329218-972f8911ee7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
  },
];

export const products: Product[] = [
  {
    id: "pr1",
    name: "Grain-Free Salmon Adult Formula",
    brand: "Wildroot",
    price: 58,
    subPrice: 49,
    rating: 4.8,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1725696866074-3a7f63fe004d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Grain-Free", "Omega-3", "Large Breed"],
    petType: "Dog",
    category: "Food",
    ageGroup: "Adult",
    size: "Large",
    description:
      "A nutrient-dense salmon recipe crafted for active adult dogs. High-quality protein, rich omega fats, and zero filler grains.",
    recommendedFor: "Bella",
    recommendReason: "Matches Bella's adult large-breed needs",
  },
  {
    id: "pr2",
    name: "Indoor Cat Chicken Dinner",
    brand: "Whiskerly",
    price: 34,
    subPrice: 29,
    rating: 4.7,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1736367536182-51ffce2eee0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Hairball Care", "Indoor", "Real Chicken"],
    petType: "Cat",
    category: "Food",
    ageGroup: "Adult",
    size: "Medium",
    description:
      "Complete daily nutrition for indoor adult cats. Supports healthy digestion with prebiotic fiber and natural hairball control.",
    recommendedFor: "Milo",
    recommendReason: "Tailored for Milo's indoor routine",
  },
  {
    id: "pr3",
    name: "Plush Lamb Comfort Toy",
    brand: "Pawnest",
    price: 18,
    subPrice: 16,
    rating: 4.9,
    reviews: 521,
    image:
      "https://images.unsplash.com/photo-1764936510280-5be0d339dda6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Soft", "Squeaker", "Small Breeds"],
    petType: "Dog",
    category: "Toys",
    ageGroup: "Puppy",
    size: "Small",
    description:
      "A soft, cuddly lamb companion with a gentle squeaker — perfect for puppies and small-breed snugglers.",
    recommendedFor: "Coco",
    recommendReason: "Great for Coco's small-breed playtime",
  },
  {
    id: "pr4",
    name: "Puppy Growth Chicken & Duck",
    brand: "Wildroot",
    price: 46,
    subPrice: 39,
    rating: 4.6,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1684882726821-2999db517441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Puppy", "DHA", "Joint Support"],
    petType: "Dog",
    category: "Food",
    ageGroup: "Puppy",
    size: "All",
    description:
      "A premium puppy recipe with DHA for brain development and balanced minerals for growing bones.",
  },
  {
    id: "pr5",
    name: "Fetch Pro Rubber Frisbee",
    brand: "Pawnest",
    price: 22,
    subPrice: 20,
    rating: 4.5,
    reviews: 97,
    image:
      "https://images.unsplash.com/photo-1678652231344-109ed2855ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Durable", "Floats", "Outdoor"],
    petType: "Dog",
    category: "Toys",
    ageGroup: "Adult",
    size: "Medium",
    description:
      "Tough natural rubber frisbee designed for long fetch sessions. Floats, flies straight, and gentle on teeth.",
  },
  {
    id: "pr6",
    name: "Daily Joint Support Chews",
    brand: "Vetbloom",
    price: 32,
    subPrice: 27,
    rating: 4.8,
    reviews: 276,
    image:
      "https://images.unsplash.com/photo-1645649835084-dc1d1eb24b49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Glucosamine", "Senior", "Vet Formulated"],
    petType: "Dog",
    category: "Health",
    ageGroup: "Senior",
    size: "All",
    description:
      "Soft chews with glucosamine, chondroitin, and turmeric to support joint mobility in adult and senior dogs.",
  },
  {
    id: "pr7",
    name: "Pure Oat Calming Shampoo",
    brand: "Pawnest",
    price: 24,
    subPrice: 21,
    rating: 4.7,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1647616350787-6428e907a7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Sensitive Skin", "Natural", "pH-Balanced"],
    petType: "All",
    category: "Grooming",
    ageGroup: "All",
    size: "All",
    description:
      "Gentle oat and aloe shampoo formulated for sensitive skin. Leaves coats soft, shiny, and beautifully clean.",
  },
  {
    id: "pr8",
    name: "Senior Cat Kidney Care",
    brand: "Whiskerly",
    price: 38,
    subPrice: 33,
    rating: 4.6,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1623420797910-c7c3498d74fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    tags: ["Senior", "Kidney Health", "Low Phosphorus"],
    petType: "Cat",
    category: "Health",
    ageGroup: "Senior",
    size: "Medium",
    description:
      "Vet-formulated senior cat food with controlled phosphorus and antioxidants for long-term kidney wellness.",
  },
];

export const orders = [
  {
    id: "ORD-10482",
    date: "Apr 18, 2026",
    status: "Delivered",
    total: 112.0,
    items: ["Grain-Free Salmon Adult", "Plush Lamb Comfort Toy"],
  },
  {
    id: "ORD-10471",
    date: "Apr 04, 2026",
    status: "Shipped",
    total: 58.0,
    items: ["Grain-Free Salmon Adult"],
  },
  {
    id: "ORD-10456",
    date: "Mar 21, 2026",
    status: "Processing",
    total: 69.0,
    items: ["Indoor Cat Chicken Dinner", "Oat Calming Shampoo"],
  },
  {
    id: "ORD-10433",
    date: "Mar 02, 2026",
    status: "Delivered",
    total: 92.0,
    items: ["Joint Support Chews", "Fetch Pro Frisbee"],
  },
];

export const subscriptions = [
  {
    id: "sub1",
    product: "Grain-Free Salmon Adult Formula",
    pet: "Bella",
    frequency: "Every 4 weeks",
    next: "May 12, 2026",
    status: "Active",
    price: 49,
  },
  {
    id: "sub2",
    product: "Indoor Cat Chicken Dinner",
    pet: "Milo",
    frequency: "Every 6 weeks",
    next: "May 28, 2026",
    status: "Active",
    price: 29,
  },
  {
    id: "sub3",
    product: "Daily Joint Support Chews",
    pet: "Bella",
    frequency: "Every 8 weeks",
    next: "Paused",
    status: "Paused",
    price: 27,
  },
];

export const reminders = [
  {
    id: "r1",
    title: "Bella's food is running low",
    product: "Grain-Free Salmon Adult Formula",
    left: "~6 days left",
    urgency: "high" as const,
    action: "Reorder now",
  },
  {
    id: "r2",
    title: "Milo's litter refill soon",
    product: "Indoor Cat Chicken Dinner",
    left: "~14 days left",
    urgency: "medium" as const,
    action: "Convert to subscription",
  },
  {
    id: "r3",
    title: "Coco's shampoo almost out",
    product: "Pure Oat Calming Shampoo",
    left: "~21 days left",
    urgency: "low" as const,
    action: "Reorder now",
  },
];
