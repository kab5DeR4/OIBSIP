import { PizzaBase, Sauce, Cheese, Veggie, Meat, PizzaVariety } from '../lib/supabase';

export const PIZZA_BASES: PizzaBase[] = [
  { id: 'base-1', name: 'Thin Crust', description: 'Crispy and light, perfect for a classic pizza experience', price: 149, stock: 100, threshold: 10, image_url: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg', is_active: true },
  { id: 'base-2', name: 'Thick Crust', description: 'Soft and chewy, great for loading up toppings', price: 179, stock: 100, threshold: 10, image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', is_active: true },
  { id: 'base-3', name: 'Whole Wheat', description: 'Healthy and nutty flavour with extra fibre', price: 199, stock: 80, threshold: 10, image_url: 'https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg', is_active: true },
  { id: 'base-4', name: 'Gluten-Free', description: 'Rice flour base suitable for gluten intolerance', price: 229, stock: 50, threshold: 5, image_url: 'https://images.pexels.com/photos/4110255/pexels-photo-4110255.jpeg', is_active: true },
  { id: 'base-5', name: 'Cheese Stuffed', description: 'Crust filled with gooey mozzarella — indulgence guaranteed', price: 269, stock: 60, threshold: 8, image_url: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg', is_active: true },
];

export const SAUCES: Sauce[] = [
  { id: 'sauce-1', name: 'Classic Tomato', description: 'Rich San Marzano tomato base with herbs', price: 49, stock: 200, threshold: 20, image_url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg', is_active: true },
  { id: 'sauce-2', name: 'Basil Pesto', description: 'Fresh basil, pine nuts and parmesan blended smooth', price: 79, stock: 120, threshold: 15, image_url: 'https://images.pexels.com/photos/4194633/pexels-photo-4194633.jpeg', is_active: true },
  { id: 'sauce-3', name: 'Smoky BBQ', description: 'Tangy and smoky American-style BBQ sauce', price: 69, stock: 150, threshold: 15, image_url: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', is_active: true },
  { id: 'sauce-4', name: 'White Garlic', description: 'Creamy garlic-infused béchamel sauce', price: 69, stock: 130, threshold: 15, image_url: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', is_active: true },
  { id: 'sauce-5', name: 'Spicy Arrabbiata', description: 'Fiery tomato sauce with red chilli flakes', price: 59, stock: 100, threshold: 10, image_url: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg', is_active: true },
];

export const CHEESES: Cheese[] = [
  { id: 'cheese-1', name: 'Mozzarella', description: 'Classic stretchy Italian mozzarella', price: 89, stock: 200, threshold: 20, image_url: 'https://images.pexels.com/photos/1437268/pexels-photo-1437268.jpeg', is_active: true },
  { id: 'cheese-2', name: 'Cheddar', description: 'Sharp and creamy aged cheddar', price: 99, stock: 150, threshold: 15, image_url: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg', is_active: true },
  { id: 'cheese-3', name: 'Parmesan', description: 'Aged Italian hard cheese with nutty depth', price: 119, stock: 100, threshold: 10, image_url: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg', is_active: true },
  { id: 'cheese-4', name: 'Vegan Cheese', description: 'Cashew-based dairy-free alternative, melts beautifully', price: 129, stock: 70, threshold: 8, image_url: 'https://images.pexels.com/photos/4194629/pexels-photo-4194629.jpeg', is_active: true },
];

export const VEGGIES: Veggie[] = [
  { id: 'veggie-1', name: 'Bell Peppers', description: 'Colourful mix of red, yellow and green peppers', price: 29, stock: 300, threshold: 30, image_url: '', is_active: true },
  { id: 'veggie-2', name: 'Mushrooms', description: 'Earthy button mushrooms, sliced fresh', price: 35, stock: 250, threshold: 25, image_url: '', is_active: true },
  { id: 'veggie-3', name: 'Black Olives', description: 'Pitted Kalamata olives, tangy and rich', price: 39, stock: 200, threshold: 20, image_url: '', is_active: true },
  { id: 'veggie-4', name: 'Onions', description: 'Caramelised red onions, sweet and savoury', price: 19, stock: 350, threshold: 30, image_url: '', is_active: true },
  { id: 'veggie-5', name: 'Spinach', description: 'Baby spinach leaves, wilted to perfection', price: 25, stock: 200, threshold: 20, image_url: '', is_active: true },
  { id: 'veggie-6', name: 'Jalapeños', description: 'Pickled green jalapeños for a fiery kick', price: 35, stock: 150, threshold: 15, image_url: '', is_active: true },
];

export const MEATS: Meat[] = [
  { id: 'meat-1', name: 'Pepperoni', description: 'Classic spiced pork and beef salami', price: 69, stock: 200, threshold: 20, image_url: '', is_active: true },
  { id: 'meat-2', name: 'Grilled Chicken', description: 'Tender marinated chicken breast, grilled', price: 79, stock: 180, threshold: 18, image_url: '', is_active: true },
  { id: 'meat-3', name: 'Crispy Bacon', description: 'Smoked bacon rashers, crumbled', price: 89, stock: 150, threshold: 15, image_url: '', is_active: true },
  { id: 'meat-4', name: 'Italian Sausage', description: 'Fennel-spiced pork sausage, sliced', price: 85, stock: 120, threshold: 12, image_url: '', is_active: true },
];

export const PIZZA_VARIETIES: PizzaVariety[] = [
  {
    id: 'variety-1',
    name: 'Margherita',
    description: 'The classic Neapolitan with San Marzano tomato, fresh mozzarella and basil',
    price: 349,
    image_url: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    tags: ['vegetarian', 'classic', 'bestseller'],
    is_active: true,
  },
  {
    id: 'variety-2',
    name: 'Pepperoni Feast',
    description: 'Loaded with generous rounds of premium pepperoni on classic tomato sauce',
    price: 499,
    image_url: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
    tags: ['meat', 'bestseller', 'spicy'],
    is_active: true,
  },
  {
    id: 'variety-3',
    name: 'BBQ Chicken',
    description: 'Smoky BBQ sauce, grilled chicken, red onion and cheddar on thick crust',
    price: 549,
    image_url: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    tags: ['meat', 'bbq', 'chicken'],
    is_active: true,
  },
  {
    id: 'variety-4',
    name: 'Garden Supreme',
    description: 'Pesto base with bell peppers, mushrooms, spinach, olives and parmesan',
    price: 449,
    image_url: 'https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg',
    tags: ['vegetarian', 'healthy', 'gourmet'],
    is_active: true,
  },
  {
    id: 'variety-5',
    name: 'Inferno',
    description: 'Arrabbiata sauce, pepperoni, jalapeños and chilli flakes — not for the faint-hearted',
    price: 529,
    image_url: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
    tags: ['meat', 'spicy'],
    is_active: true,
  },
  {
    id: 'variety-6',
    name: 'Four Cheese',
    description: 'Mozzarella, cheddar, parmesan and vegan cheese on a garlic white base',
    price: 579,
    image_url: 'https://images.pexels.com/photos/4110255/pexels-photo-4110255.jpeg',
    tags: ['vegetarian', 'cheesy', 'gourmet'],
    is_active: true,
  },
  {
    id: 'variety-7',
    name: 'Bacon & Mushroom',
    description: 'White garlic sauce, crispy bacon, button mushrooms and mozzarella',
    price: 559,
    image_url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    tags: ['meat', 'classic'],
    is_active: true,
  },
  {
    id: 'variety-8',
    name: 'Hawaiian Dream',
    description: 'Tomato base with sweet pineapple chunks, chicken and mozzarella',
    price: 489,
    image_url: 'https://images.pexels.com/photos/4194633/pexels-photo-4194633.jpeg',
    tags: ['meat', 'chicken', 'sweet'],
    is_active: true,
  },
];
