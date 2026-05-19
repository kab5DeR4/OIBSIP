import { useState } from 'react';
import { PIZZA_VARIETIES } from '../../data/mockData';
import { PizzaVariety } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import { Pizza, Star, Flame, Leaf, Search, ShoppingCart, X, Plus, Minus } from 'lucide-react';

type Props = {
  onBuildPizza: () => void;
};

export default function MenuPage({ onBuildPizza }: Props) {
  const { addItem, totalItems } = useCart();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalVariety, setModalVariety] = useState<PizzaVariety | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [addedId, setAddedId] = useState('');

  const tagFilters = ['all', 'vegetarian', 'meat', 'spicy', 'classic', 'gourmet'];

  const filtered = PIZZA_VARIETIES.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase());
    const matchTag = filter === 'all' || v.tags.includes(filter);
    return matchSearch && matchTag;
  });

  const tagColor: Record<string, string> = {
    vegetarian: 'bg-green-100 text-green-700',
    meat: 'bg-red-100 text-red-700',
    spicy: 'bg-orange-100 text-orange-700',
    classic: 'bg-blue-100 text-blue-700',
    gourmet: 'bg-amber-100 text-amber-700',
    bbq: 'bg-rose-100 text-rose-700',
    chicken: 'bg-yellow-100 text-yellow-700',
    cheesy: 'bg-yellow-100 text-yellow-800',
    bestseller: 'bg-orange-100 text-orange-800',
    sweet: 'bg-pink-100 text-pink-700',
    healthy: 'bg-emerald-100 text-emerald-700',
  };

  function openModal(v: PizzaVariety) {
    setModalVariety(v);
    setModalQty(1);
  }

  function confirmAdd() {
    if (!modalVariety) return;
    addItem({
      id: modalVariety.id,
      name: modalVariety.name,
      price: modalVariety.price,
      type: 'variety',
      imageUrl: modalVariety.image_url,
    }, modalQty);
    setAddedId(modalVariety.id);
    setTimeout(() => setAddedId(''), 2000);
    setModalVariety(null);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <img
          src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg"
          alt="Pizza"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Our Pizza Menu</h1>
          <p className="text-orange-100 text-lg mb-6">Handcrafted with love, baked to perfection</p>
          <button
            onClick={onBuildPizza}
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
          >
            <Pizza className="w-5 h-5" />
            Build Your Own Pizza
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pizzas..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tagFilters.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === tag
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(v => (
          <div key={v.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100">
            <div className="relative h-44 overflow-hidden">
              <img
                src={v.image_url || 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg'}
                alt={v.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {v.tags.includes('bestseller') && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> Bestseller
                </div>
              )}
              {v.tags.includes('spicy') && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Spicy
                </div>
              )}
              {!v.tags.includes('spicy') && v.tags.includes('vegetarian') && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Veg
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{v.name}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{v.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {v.tags.map(tag => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor[tag] || 'bg-gray-100 text-gray-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">₹{v.price}</span>
                <button
                  onClick={() => openModal(v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    addedId === v.id
                      ? 'bg-green-500 text-white'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {addedId === v.id ? 'Added!' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Build Your Own Card */}
        <div
          onClick={onBuildPizza}
          className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-orange-300 hover:scale-[1.02]"
        >
          <div className="p-6 flex flex-col items-center justify-center h-full min-h-[240px] text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Pizza className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2">Build Your Own</h3>
            <p className="text-orange-100 text-sm">Choose your base, sauce, cheese and toppings</p>
          </div>
        </div>
      </div>

      {/* Quantity Modal */}
      {modalVariety && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModalVariety(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold text-gray-900">{modalVariety.name}</h2>
              <button onClick={() => setModalVariety(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={modalVariety.image_url || 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg'}
              alt={modalVariety.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <p className="text-sm text-gray-500 mb-4">{modalVariety.description}</p>
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setModalQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-semibold">{modalQty}</span>
                <button onClick={() => setModalQty(q => q + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-xl font-bold text-orange-600">₹{modalVariety.price * modalQty}</span>
            </div>
            <button
              onClick={confirmAdd}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
