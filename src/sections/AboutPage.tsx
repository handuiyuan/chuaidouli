import { Link } from 'react-router-dom';
import { toys, brands } from '@/data/toys';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="mb-14">
        <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase">About</span>
        <h1 className="text-3xl font-light text-stone-900 mt-2 leading-tight">
          关于<span className="font-medium">揣兜里</span>
        </h1>
      </div>

      {/* Main intro */}
      <div className="prose prose-stone max-w-none">
        <p className="text-stone-600 leading-loose text-base">
          "揣兜里"是一个关于中古玩具的微信公众号。
        </p>
        <p className="text-stone-600 leading-loose text-base mt-4">
          我们记录的是那些出生在上世纪六十年代到九十年代的玩具们——
          它们可能来自日本的小工厂，美国的大公司，也可能来自香港的代工车间。
          它们曾经是百货商店橱窗里最闪亮的东西，后来被收进箱子，压进阁楼，
          再后来在二手市场、拍卖行，或者某个不起眼的角落里重新被发现。
        </p>
        <p className="text-stone-600 leading-loose text-base mt-4">
          我们做这个网站，是想给这些玩具一个稳定的家。
          图鉴的形式，博物馆的态度——每一件都值得被认真对待。
        </p>
      </div>

      <div className="divider-jp my-12">
        <span className="text-[10px] tracking-[0.4em] text-stone-400">COLLECTION</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-14">
        {[
          { num: toys.length, label: '件收录藏品' },
          { num: brands.length, label: '个品牌覆盖' },
          { num: '60s–90s', label: '年代跨度' },
        ].map((s, i) => (
          <div key={i} className="text-center border border-stone-200 py-6">
            <div className="text-3xl font-light text-amber-600">{s.num}</div>
            <div className="text-xs tracking-wide text-stone-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* What we cover */}
      <h2 className="text-base font-medium text-stone-800 tracking-wide mb-5">我们关注的品牌与系列</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {brands.map(brand => (
          <Link
            key={brand.id}
            to={`/catalog?brand=${encodeURIComponent(brand.name)}`}
            className="group flex gap-4 p-4 border border-stone-200 hover:border-amber-300 transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-stone-100 flex items-center justify-center">
              <span className="text-stone-400 text-xs font-medium">{brand.foundedYear?.toString().slice(2)}'</span>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-800 group-hover:text-amber-700 transition-colors">
                {brand.nameEn}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">{brand.country} · 创立于 {brand.foundedYear}</p>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{brand.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="divider-jp my-12">
        <span className="text-[10px] tracking-[0.4em] text-stone-400">CONTACT</span>
      </div>

      {/* WeChat */}
      <div className="bg-stone-900 text-white p-8 flex flex-col sm:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.4em] text-stone-500 mb-2">WECHAT OFFICIAL ACCOUNT</p>
          <h3 className="text-xl font-light">
            <span className="text-amber-400">揣兜里</span><br/>
            微信公众号
          </h3>
          <p className="text-stone-400 text-sm mt-3 leading-relaxed">
            更多中古玩具的故事、收藏指南、<br/>
            品相鉴别与市场行情，都在公众号里。
          </p>
          <p className="mt-4 text-xs text-stone-500">微信搜索：揣兜里</p>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="w-32 h-32 bg-stone-800 border border-stone-700 flex items-center justify-center">
            <span className="text-stone-500 text-xs text-center leading-relaxed">
              公众号<br/>二维码
            </span>
          </div>
        </div>
      </div>

      {/* Back to catalog */}
      <div className="mt-12 text-center">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm tracking-widest text-amber-700 hover:text-amber-600 border border-amber-300 px-6 py-2.5 hover:bg-amber-50 transition-colors"
        >
          进入图鉴
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
