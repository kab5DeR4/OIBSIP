import { useState } from 'react';
import { PIZZA_BASES, SAUCES, CHEESES, VEGGIES, MEATS } from '../../data/mockData';
import { PizzaBase, Sauce, Cheese, Veggie, Meat } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import { ChevronRight, ChevronLeft, Check, ShoppingCart } from 'lucide-react';

type Step = 'base' | 'sauce' | 'cheese' | 'veggies' | 'review';
const STEPS: Step[] = ['base', 'sauce', 'cheese', 'veggies', 'review'];

type Props = {
  onGoToCart?: () => void;
};

export default function PizzaBuilder({ onGoToCart }: Props) {
  const { addItem } = useCart();
  const [step, setStep] = useState<Step>('base');
  const [selectedBase, setSelectedBase] = useState<PizzaBase | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<Sauce | null>(null);
  const [selectedCheese, setSelectedCheese] = useState<Cheese | null>(null);
  const [selectedVeggies, setSelectedVeggies] = useState<Veggie[]>([]);
  const [selectedMeats, setSelectedMeats] = useState<Meat[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const stepIndex = STEPS.indexOf(step);
  const basePrice = (selectedBase?.price || 0) + (selectedSauce?.price || 0) + (selectedCheese?.price || 0);
  const toppingPrice =
    selectedVeggies.reduce((a, v) => a + v.price, 0) +
    selectedMeats.reduce((a, m) => a + m.price, 0);
  const unitPrice = basePrice + toppingPrice;
  const totalPrice = unitPrice * quantity;

  function buildDetails(): string {
    const parts = [
      selectedBase?.name,
      selectedSauce?.name,
      selectedCheese?.name,
      ...selectedVeggies.map(v => v.name),
      ...selectedMeats.map(m => m.name),
    ].filter(Boolean);
    return parts.join(' + ');
  }

  function addToCart() {
    if (!selectedBase || !selectedSauce || !selectedCheese) return;
    addItem({
      id: `custom-${Date.now()}`,
      name: 'Custom Pizza',
      price: unitPrice,
      type: 'custom',
      details: buildDetails(),
    }, quantity);
    setAdded(true);
  }

  if (added) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pizza Added to Cart!</h2>
          <p className="text-gray-500 mb-6">{buildDetails()}</p>
          <div className="flex gap-3">
            <button
              onClick={() => { setAdded(false); setStep('base'); setSelectedBase(null); setSelectedSauce(null); setSelectedCheese(null); setSelectedVeggies([]); setSelectedMeats([]); setQuantity(1); }}
              className="flex-1 border border-gray-300 rounded-xl py-2.5 text-gray-600 font-medium hover:bg-gray-50"
            >
              Build Another
            </button>
            <button
              onClick={onGoToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> View Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  const canProceed =
    step === 'base' ? !!selectedBase :
    step === 'sauce' ? !!selectedSauce :
    step === 'cheese' ? !!selectedCheese :
    step === 'veggies' ? true :
    true; // review step — always can place

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Build Your Pizza</h1>

      {/* Step Indicator */}
      <div className="flex items-center mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-shrink-0">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${s === step ? 'bg-orange-500 text-white' : i < stepIndex ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              {i < stepIndex ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              <span className="text-sm font-medium hidden sm:inline capitalize">{s}</span>
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mx-1 flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {step === 'base' && <ItemGrid items={PIZZA_BASES} selected={selectedBase} onSelect={setSelectedBase} title="Choose Your Base" />}
        {step === 'sauce' && <ItemGrid items={SAUCES} selected={selectedSauce} onSelect={setSelectedSauce} title="Choose Your Sauce" />}
        {step === 'cheese' && <ItemGrid items={CHEESES} selected={selectedCheese} onSelect={setSelectedCheese} title="Choose Your Cheese" />}

        {step === 'veggies' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Toppings <span className="text-sm font-normal text-gray-400">(optional)</span></h2>
            <div className="mb-5">
              <p className="text-sm font-medium text-gray-600 mb-3">🥦 Veggies</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {VEGGIES.map(v => (
                  <button key={v.id}
                    onClick={() => setSelectedVeggies(prev => prev.find(x => x.id === v.id) ? prev.filter(x => x.id !== v.id) : [...prev, v])}
                    className={`p-3 rounded-lg border-2 text-left text-sm font-medium transition-all ${selectedVeggies.find(x => x.id === v.id) ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-orange-300'}`}>
                    <p>{v.name}</p>
                    <p className="text-xs text-orange-600 font-bold mt-0.5">+₹{v.price}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">🥩 Meats</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {MEATS.map(m => (
                  <button key={m.id}
                    onClick={() => setSelectedMeats(prev => prev.find(x => x.id === m.id) ? prev.filter(x => x.id !== m.id) : [...prev, m])}
                    className={`p-3 rounded-lg border-2 text-left text-sm font-medium transition-all ${selectedMeats.find(x => x.id === m.id) ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-orange-300'}`}>
                    <p>{m.name}</p>
                    <p className="text-xs text-orange-600 font-bold mt-0.5">+₹{m.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Your Pizza</h2>
            <div className="space-y-2 mb-5 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm"><span className="font-medium text-gray-700">Base:</span> {selectedBase?.name} <span className="text-orange-600">+₹{selectedBase?.price}</span></p>
              <p className="text-sm"><span className="font-medium text-gray-700">Sauce:</span> {selectedSauce?.name} <span className="text-orange-600">+₹{selectedSauce?.price}</span></p>
              <p className="text-sm"><span className="font-medium text-gray-700">Cheese:</span> {selectedCheese?.name} <span className="text-orange-600">+₹{selectedCheese?.price}</span></p>
              {selectedVeggies.map(v => <p key={v.id} className="text-sm"><span className="font-medium text-gray-700">Veggie:</span> {v.name} <span className="text-orange-600">+₹{v.price}</span></p>)}
              {selectedMeats.map(m => <p key={m.id} className="text-sm"><span className="font-medium text-gray-700">Meat:</span> {m.name} <span className="text-orange-600">+₹{m.price}</span></p>)}
            </div>
            <div className="flex items-center gap-4 mb-5">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50">-</button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50">+</button>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Unit Price:</span><span className="font-medium">₹{unitPrice}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-600">Qty:</span><span>×{quantity}</span></div>
              <div className="flex justify-between font-bold text-lg border-t border-orange-200 pt-2">
                <span>Total:</span><span className="text-orange-600">₹{totalPrice}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between">
        <button onClick={() => setStep(STEPS[stepIndex - 1])} disabled={stepIndex === 0} className="flex items-center gap-2 px-5 py-2.5 border rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 font-medium">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        {step === 'review' ? (
          <button onClick={addToCart} className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold">
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        ) : (
          <button onClick={() => setStep(STEPS[stepIndex + 1])} disabled={!canProceed} className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl font-semibold">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ItemGrid<T extends { id: string; name: string; price: number; description: string; image_url: string }>({
  items, selected, onSelect, title
}: { items: T[]; selected: T | null; onSelect: (item: T) => void; title: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map(item => (
          <button key={item.id} onClick={() => onSelect(item)}
            className={`relative text-left rounded-xl border-2 overflow-hidden transition-all hover:shadow-md ${selected?.id === item.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'}`}>
            <img
              src={item.image_url || 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg'}
              alt={item.name}
              className="w-full h-24 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold text-sm text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
              <p className="text-xs text-orange-600 font-bold mt-1">+₹{item.price}</p>
            </div>
            {selected?.id === item.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
