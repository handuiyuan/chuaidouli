import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toys, allBrandNames, allSeries, conditionConfig } from '@/data/toys';
import type { Toy } from '@/types';

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState<'year-asc' | 'year-desc' | 'name'>('year-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result: Toy[] = [...toys];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        (t.nameEn?.toLowerCase().includes(q)) ||
        t.brand.toLowerCase().includes(q) ||
        t.series.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (selectedBrand) result = result.filter(t => t.brand === selectedBrand);
    if (selectedSeries) result = result.filter(t => t.series === selectedSeries);
    if (selectedCondition) result = result.filter(t => t.condition === selectedCondition);

    result.sort((a, b) => {
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'year-desc') return b.year - a.year;
      return a.name.localeCompare(b.name, 'zh');
    });

    return result;
  }, [search, selectedBrand, selectedSeries, selectedCondition, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedBrand('');
    setSelectedSeries('');
    setSelectedCondition('');
  };

  const hasFilters = search || selectedBrand || selectedSeries || selectedCondition;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase mb-1">Encyclopedia</p>
        <h1 className="text-2xl font-medium text-stone-800">中古玩具图鉴</h1>
        <p className="text-sm text-stone-400 mt-1">共收录 {toys.length} 件藏品，{filtered.length} 件符合当前筛选</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-56 flex-shrink-0">
          {/* Search */}
          <div className="mb-6">
            <label className="text-[10px] tracking-widest text-stone-400 block mb-2">搜索</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="名称、品牌、系列..."
                className="w-full border border-stone-200 bg-white text-sm px-3 py-2 pr-8 focus:outline-none focus:border-stone-400 placeholder:text-stone-300"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Brand */}
          <FilterGroup
            label="品牌"
            options={allBrandNames}
            value={selectedBrand}
            onChange={setSelectedBrand}
          />

          {/* Series */}
          <FilterGroup
            label="系列"
            options={allSeries}
            value={selectedSeries}
            onChange={setSelectedSeries}
          />

          {/* Condition */}
          <div className="mb-6">
            <label className="text-[10px] tracking-widest text-stone-400 block mb-3">品相</label>
            <div className="flex flex-col gap-1.5">
              {Object.entries(conditionConfig).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCondition(selectedCondition === key ? '' : key)}
                  className={`text-left text-xs px-2 py-1.5 border transition-colors ${
                    selectedCondition === key
                      ? 'border-amber-400 bg-amber-50 text-amber-800'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-stone-400 hover:text-amber-700 transition-colors tracking-wide mt-2"
            >
              ✕ 清除所有筛选
            </button>
          )}
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400">{filtered.length} 件</span>
              {hasFilters && (
                <span className="text-[10px] tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5">
                  已筛选
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs border border-stone-200 bg-white px-2 py-1.5 text-stone-600 focus:outline-none"
              >
                <option value="year-desc">年代 · 新→旧</option>
                <option value="year-asc">年代 · 旧→新</option>
                <option value="name">名称</option>
              </select>
              {/* View mode */}
              <div className="flex border border-stone-200">
                {(['grid', 'list'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-2.5 py-1.5 transition-colors ${
                      viewMode === mode ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {mode === 'grid' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-sm">没有找到符合条件的藏品</p>
              <button onClick={clearFilters} className="mt-3 text-xs text-amber-700 underline">清除筛选</button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(toy => (
                <ToyCard key={toy.id} toy={toy} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-stone-100">
              {filtered.map(toy => (
                <ToyListRow key={toy.id} toy={toy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <label className="text-[10px] tracking-widest text-stone-400 block mb-3">{label}</label>
      <div className="flex flex-col gap-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(value === opt ? '' : opt)}
            className={`text-left text-xs px-2 py-1.5 border transition-colors truncate ${
              value === opt
                ? 'border-amber-400 bg-amber-50 text-amber-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
            title={opt}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToyCard({ toy }: { toy: Toy }) {
  return (
    <Link to={`/toy/${toy.id}`} className="toy-card group">
      <div className="bg-white border border-stone-200 overflow-hidden h-full flex flex-col">
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={toy.images[0]}
            alt={toy.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-stone-800 text-sm leading-snug">{toy.name}</h3>
            <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 ${conditionConfig[toy.condition].color}`}>
              {conditionConfig[toy.condition].label.split(' ')[0]}
            </span>
          </div>
          {toy.nameEn && <p className="text-[11px] text-stone-400 mb-2 tracking-wide">{toy.nameEn}</p>}
          <div className="flex items-center justify-between text-xs text-stone-400 mt-auto pt-2 border-t border-stone-100">
            <span>{toy.brand}</span>
            <span>{toy.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ToyListRow({ toy }: { toy: Toy }) {
  return (
    <Link to={`/toy/${toy.id}`} className="flex items-center gap-4 py-4 hover:bg-stone-50 transition-colors px-2 -mx-2">
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-stone-100">
        <img src={toy.images[0]} alt={toy.name} className="w-full h-full object-cover"/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-stone-800 text-sm">{toy.name}</span>
          {toy.nameEn && <span className="text-xs text-stone-400 hidden sm:inline">/ {toy.nameEn}</span>}
        </div>
        <p className="text-xs text-stone-400 mt-0.5">{toy.series} · {toy.brand}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`text-[10px] px-2 py-0.5 ${conditionConfig[toy.condition].color}`}>
          {conditionConfig[toy.condition].label.split(' ')[0]}
        </span>
        <span className="text-xs text-stone-400">{toy.year}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-300">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </Link>
  );
}
