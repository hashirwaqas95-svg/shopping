import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SizeRow {
  size: string;
  chestIn: string;
  chestCm: string;
  shoulderIn: string;
  shoulderCm: string;
  lengthIn: string;
  lengthCm: string;
  sleeveIn: string;
  sleeveCm: string;
}

const SHIRTS_DATA: SizeRow[] = [
  { size: 'S', chestIn: '38-39"', chestCm: '96-99', shoulderIn: '17.5"', shoulderCm: '44.5', lengthIn: '29.5"', lengthCm: '75', sleeveIn: '25.0"', sleeveCm: '63.5' },
  { size: 'M', chestIn: '40-41"', chestCm: '101-104', shoulderIn: '18.2"', shoulderCm: '46.2', lengthIn: '30.0"', lengthCm: '76', sleeveIn: '25.5"', sleeveCm: '64.8' },
  { size: 'L', chestIn: '42-43"', chestCm: '106-109', shoulderIn: '19.0"', shoulderCm: '48.3', lengthIn: '30.5"', lengthCm: '77.5', sleeveIn: '26.0"', sleeveCm: '66' },
  { size: 'XL', chestIn: '44-46"', chestCm: '112-117', shoulderIn: '19.8"', shoulderCm: '50.3', lengthIn: '31.0"', lengthCm: '79', sleeveIn: '26.5"', sleeveCm: '67.3' },
  { size: 'XXL', chestIn: '47-49"', chestCm: '119-124', shoulderIn: '20.5"', shoulderCm: '52.0', lengthIn: '31.5"', lengthCm: '80', sleeveIn: '27.0"', sleeveCm: '68.5' }
];

const TEES_DATA: SizeRow[] = [
  { size: 'XS', chestIn: '40"', chestCm: '101', shoulderIn: '19.5"', shoulderCm: '49.5', lengthIn: '27.5"', lengthCm: '70', sleeveIn: '8.5"', sleeveCm: '21.5' },
  { size: 'S', chestIn: '42"', chestCm: '106', shoulderIn: '20.5"', shoulderCm: '52', lengthIn: '28.5"', lengthCm: '72', sleeveIn: '9.0"', sleeveCm: '23' },
  { size: 'M', chestIn: '44"', chestCm: '112', shoulderIn: '21.5"', shoulderCm: '54.5', lengthIn: '29.5"', lengthCm: '75', sleeveIn: '9.5"', sleeveCm: '24' },
  { size: 'L', chestIn: '46"', chestCm: '117', shoulderIn: '22.5"', shoulderCm: '57', lengthIn: '30.5"', lengthCm: '77.5', sleeveIn: '10.0"', sleeveCm: '25.4' },
  { size: 'XL', chestIn: '48"', chestCm: '122', shoulderIn: '23.5"', shoulderCm: '59.5', lengthIn: '31.5"', lengthCm: '80', sleeveIn: '10.5"', sleeveCm: '26.6' }
];

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useStore();
  const [activeTab, setActiveTab] = useState<'shirts' | 'tees'>('shirts');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  const currentData = activeTab === 'shirts' ? SHIRTS_DATA : TEES_DATA;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeSizeGuide}
          className="absolute top-4 right-4 text-stone-400 hover:text-black p-1.5"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-stone-900 font-display text-xl sm:text-2xl font-bold">
          <Ruler className="w-5 h-5" />
          <span>Garment Size Chart & Fit Guide</span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Precision measurements tailored for Pakistani physiques. All garments are pre-shrunk.
        </p>

        {/* Tab & Unit selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-1 bg-stone-100 p-1">
            <button
              onClick={() => setActiveTab('shirts')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'shirts' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-black'
              }`}
            >
              Shirts & Polos
            </button>
            <button
              onClick={() => setActiveTab('tees')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'tees' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-black'
              }`}
            >
              Oversized & Basic Tees
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-stone-400 font-medium">Unit:</span>
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 text-xs font-bold ${
                unit === 'in' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 text-xs font-bold ${
                unit === 'cm' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest Width</th>
                <th className="py-2.5 px-3">Shoulder</th>
                <th className="py-2.5 px-3">Length</th>
                <th className="py-2.5 px-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono tabular-nums">
              {currentData.map((row) => (
                <tr key={row.size} className="hover:bg-stone-50">
                  <td className="py-3 px-3 font-sans font-bold text-stone-900 text-xs">
                    {row.size}
                  </td>
                  <td className="py-3 px-3 text-stone-700">
                    {unit === 'in' ? row.chestIn : row.chestCm}
                  </td>
                  <td className="py-3 px-3 text-stone-700">
                    {unit === 'in' ? row.shoulderIn : row.shoulderCm}
                  </td>
                  <td className="py-3 px-3 text-stone-700">
                    {unit === 'in' ? row.lengthIn : row.lengthCm}
                  </td>
                  <td className="py-3 px-3 text-stone-700">
                    {unit === 'in' ? row.sleeveIn : row.sleeveCm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring tips */}
        <div className="mt-6 p-4 bg-stone-50 text-xs text-stone-600 space-y-1.5 border border-stone-100">
          <strong className="text-stone-900 uppercase tracking-wider text-[10px] block">
            How to Measure:
          </strong>
          <p>
            · <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal under your arms.
          </p>
          <p>
            · <strong>Length:</strong> Measure from highest point of the shoulder seam straight down to the bottom hem.
          </p>
          <p>
            · <strong>Oversized Fits:</strong> Our oversized collection is intentionally cut with 2-3 inches of additional ease. Buy your usual size for the designer boxy drape.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-black"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
