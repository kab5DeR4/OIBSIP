import { useEffect, useState } from 'react';
import { getInventory, updateStock, LocalInventoryItem } from '../../data/mockStore';
import { AlertTriangle, TrendingDown, Edit2, Check, X } from 'lucide-react';

export default function InventoryPage() {
  const [items, setItems] = useState<LocalInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState('');
  const [editStock, setEditStock] = useState(0);

  function fetchInventory() {
    setItems(getInventory());
    setLoading(false);
  }

  useEffect(() => { fetchInventory(); }, []);

  function saveStock() {
    if (!editId) return;
    updateStock(editId, editStock);
    setEditId('');
    fetchInventory();
  }

  const categories: LocalInventoryItem['category'][] = ['bases', 'sauces', 'cheeses', 'veggies', 'meats'];
  const categoryNames: Record<string, string> = {
    bases: 'Pizza Bases',
    sauces: 'Sauces',
    cheeses: 'Cheeses',
    veggies: 'Veggies',
    meats: 'Meats',
  };
  const lowStock = items.filter(i => i.stock <= i.threshold);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Inventory Management</h1>
      <p className="text-gray-500 mb-6">Track and manage all pizza ingredients</p>

      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">{lowStock.length} item{lowStock.length > 1 ? 's' : ''} below threshold</p>
            <p className="text-sm text-red-700 mt-1">{lowStock.map(i => i.name).join(', ')}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="space-y-6">
          {categories.map(category => {
            const categoryItems = items.filter(i => i.category === category);
            return (
              <div key={category}>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">{categoryNames[category]}</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                  {categoryItems.length === 0 ? (
                    <p className="p-4 text-gray-500 text-center">No items</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Price (₹)</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Stock</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">Threshold</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {categoryItems.map(item => {
                          const isLow = item.stock <= item.threshold;
                          return (
                            <tr key={item.id} className={isLow ? 'bg-red-50' : 'hover:bg-gray-50'}>
                              <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                              <td className="px-4 py-3 text-right text-gray-600">₹{item.price}</td>
                              <td className={`px-4 py-3 text-right font-bold ${isLow ? 'text-red-600' : 'text-gray-900'}`}>{item.stock} units</td>
                              <td className="px-4 py-3 text-right text-gray-600">{item.threshold} units</td>
                              <td className="px-4 py-3 text-center">
                                {isLow ? (
                                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                    <TrendingDown className="w-3 h-3" /> Low
                                  </div>
                                ) : (
                                  <div className="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">OK</div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {editId === item.id ? (
                                  <div className="flex items-center gap-1 justify-center">
                                    <input type="number" value={editStock} onChange={e => setEditStock(parseInt(e.target.value) || 0)} className="w-16 px-2 py-1 border border-gray-300 rounded text-sm" min={0} />
                                    <button onClick={saveStock} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setEditId('')} className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <button onClick={() => { setEditId(item.id); setEditStock(item.stock); }} className="inline-flex items-center gap-1 px-2 py-1 text-orange-600 hover:bg-orange-50 rounded transition-colors">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
