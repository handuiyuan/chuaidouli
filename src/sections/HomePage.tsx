import { Link } from 'react-router-dom';
import { toys, brands, conditionConfig } from '@/data/toys';

export function HomePage() {
  const featured = toys.filter(t => t.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, transparent, transparent 40px,
              rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px
            ), repeating-linear-gradient(
              90deg, transparent, transparent 40px,
              rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 41px
            )`
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="flex flex-col gap-6 max-w-2xl">
            <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase">
              Vintage Toy Encyclopedia
            </span>
            <h1 className="text-4xl md:text-6xl font-light leading-tight">
              揣兜里的<br/>
              <em className="not-italic font-medium text-amber-400">中古玩具</em>
            </h1>
            <p className="text-stone-400 text-base leading-relaxed max-w-lg">
              那些被时光淘洗的小东西，曾经攥在小小的手心里，
              跟着我们走过整个童年。
              这里是它们的图鉴，也是我们的记忆。
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 transition-colors text-white text-sm tracking-widest px-6 py-3"
              >
                进入图鉴
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center text-stone-400 hover:text-white text-sm tracking-widest px-6 py-3 border border-stone-700 hover:border-stone-500 transition-colors"
              >
                关于我们
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-10 border-t border-stone-800 pt-8">
            {[
              { num: toys.length, label: '件收录' },
              { num: brands.length, label: '个品牌' },
              { num: '60s–90s', label: '年代跨度' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-2xl font-light text-amber-400">{s.num}</span>
                <span className="text-xs tracking-widest text-stone-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase mb-1">Featured Items</p>
            <h2 className="text-xl font-medium text-stone-800">精选藏品</h2>
          </div>
          <Link to="/catalog" className="text-xs tracking-widest text-amber-700 hover:text-amber-600 flex items-center gap-1">
            查看全部
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(toy => (
            <Link key={toy.id} to={`/toy/${toy.id}`} className="toy-card group">
              <div className="bg-white border border-stone-200 overflow-hidden">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={toy.images[0]}
                    alt={toy.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-stone-800 text-sm leading-snug">{toy.name}</h3>
                    <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 ${conditionConfig[toy.condition].color}`}>
                      {conditionConfig[toy.condition].label.split(' ')[0]}
                    </span>
                  </div>
                  {toy.nameEn && (
                    <p className="text-xs text-stone-400 mb-2 tracking-wide">{toy.nameEn}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>{toy.brand}</span>
                    <span>{toy.year}</span>
                  </div>
                  <p className="mt-2 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {toy.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase mb-1">Brands</p>
            <h2 className="text-xl font-medium text-stone-800">品牌索引</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {brands.map(brand => (
              <Link
                key={brand.id}
                to={`/catalog?brand=${encodeURIComponent(brand.name)}`}
                className="group flex flex-col items-center text-center p-5 border border-stone-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all"
              >
                <span className="text-2xl font-light text-stone-300 group-hover:text-amber-400 transition-colors mb-2">
                  {brand.foundedYear?.toString().slice(2)}'
                </span>
                <span className="text-xs font-medium text-stone-700 tracking-wide">{brand.nameEn}</span>
                <span className="text-[10px] text-stone-400 mt-0.5">{brand.country}</span>
                <span className="mt-2 text-[10px] tracking-wider text-stone-300 group-hover:text-amber-500 transition-colors">
                  {brand.toyCount} 件
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WeChat Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-stone-900 text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.5em] text-stone-500 uppercase">WeChat Official Account</span>
            <h2 className="text-2xl font-light">
              更多故事在<br/>
              <span className="text-amber-400 font-medium">揣兜里</span> 公众号
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              每一件玩具背后都有一段历史，一个品牌，一群小孩。
              在公众号里，我们讲得更细，更慢，更有温度。
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            {/* QR placeholder */}
            <div className="w-28 h-28 bg-stone-800 border border-stone-700 flex items-center justify-center">
              <span className="text-stone-500 text-xs text-center leading-relaxed">
                公众号<br/>二维码
              </span>
            </div>
            <span className="text-xs text-stone-500">微信搜索 揣兜里</span>
          </div>
        </div>
      </section>
    </div>
  );
}
