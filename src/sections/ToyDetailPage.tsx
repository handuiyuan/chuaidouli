import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toys, conditionConfig } from '@/data/toys';

export function ToyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toy = toys.find(t => t.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!toy) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-400 text-sm mb-4">未找到该藏品</p>
        <Link to="/catalog" className="text-amber-700 text-sm underline">返回图鉴</Link>
      </div>
    );
  }

  // Related items (same series or brand, exclude self)
  const related = toys.filter(t =>
    t.id !== toy.id && (t.series === toy.series || t.brand === toy.brand)
  ).slice(0, 3);

  const condition = conditionConfig[toy.condition];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8 tracking-wide">
        <Link to="/" className="hover:text-stone-600">首页</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-stone-600">图鉴</Link>
        <span>/</span>
        <span className="text-stone-600">{toy.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Panel */}
        <div>
          <div className="aspect-square bg-stone-100 overflow-hidden mb-3">
            <img
              src={toy.images[activeImg]}
              alt={toy.name}
              className="w-full h-full object-cover"
            />
          </div>
          {toy.images.length > 1 && (
            <div className="flex gap-2">
              {toy.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
                    i === activeImg ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="flex flex-col">
          {/* Series badge */}
          <span className="text-[10px] tracking-[0.4em] text-amber-700 bg-amber-50 border border-amber-200 w-fit px-3 py-1 mb-4">
            {toy.series}
          </span>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-medium text-stone-900 leading-tight">{toy.name}</h1>
          {toy.nameEn && (
            <p className="text-stone-400 mt-1 tracking-wide text-sm">{toy.nameEn}</p>
          )}

          {/* Condition */}
          <div className="flex items-center gap-2 mt-4">
            <span className={`text-xs px-3 py-1 ${condition.color}`}>{condition.label}</span>
          </div>

          {/* Specs table */}
          <div className="mt-6 border border-stone-200 divide-y divide-stone-100">
            {[
              { label: '品牌', value: toy.brand },
              { label: '系列', value: toy.series },
              { label: '年份', value: `${toy.year} 年` },
              { label: '产地', value: toy.origin },
              toy.material && { label: '材质', value: toy.material },
              toy.scale && { label: '尺寸', value: toy.scale },
            ].filter(Boolean).map((spec: any) => (
              <div key={spec.label} className="flex">
                <span className="w-20 flex-shrink-0 text-xs text-stone-400 px-3 py-2.5 bg-stone-50 border-r border-stone-200">
                  {spec.label}
                </span>
                <span className="text-xs text-stone-700 px-3 py-2.5">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {toy.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {toy.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/catalog?tag=${encodeURIComponent(tag)}`}
                  className="tag-chip hover:border-amber-300 hover:text-amber-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-xs tracking-widest text-stone-400 mb-2">藏品说明</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{toy.description}</p>
          </div>

          {/* WeChat link */}
          {toy.wechatArticleUrl && (
            <a
              href={toy.wechatArticleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs text-stone-500 border border-stone-200 px-4 py-2.5 hover:border-amber-300 hover:text-amber-700 transition-colors w-fit"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M8.5 2C4.91 2 2 4.91 2 8.5c0 2.03.88 3.86 2.28 5.14L3.5 16l2.42-.81A6.47 6.47 0 0 0 8.5 15.01c.19 0 .38-.01.57-.03a5.96 5.96 0 0 1-.07-.98C9 10.12 11.8 7.5 15.3 7.5c.26 0 .52.01.78.04C15.15 4.42 12.13 2 8.5 2zm-1.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM15.3 9c-2.9 0-5.3 2.04-5.3 4.5S12.4 18 15.3 18c.7 0 1.36-.13 1.97-.37L19.5 18.5l-.85-2.04A4.42 4.42 0 0 0 20.6 13.5C20.6 11.04 18.2 9 15.3 9zm-1.3 3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm2.6 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/>
              </svg>
              在公众号查看原文
            </a>
          )}
        </div>
      </div>

      {/* Story */}
      {toy.story && (
        <div className="mt-14">
          <div className="divider-jp">
            <span className="text-xs tracking-[0.4em] text-stone-400 uppercase">Story</span>
          </div>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-medium text-stone-800 mb-4">背后的故事</h2>
            <p className="text-sm text-stone-600 leading-loose tracking-wide">{toy.story}</p>
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <div className="divider-jp">
            <span className="text-xs tracking-[0.4em] text-stone-400 uppercase">Related</span>
          </div>
          <h2 className="text-lg font-medium text-stone-800 mb-6">相关藏品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map(r => (
              <Link key={r.id} to={`/toy/${r.id}`} className="toy-card group">
                <div className="bg-white border border-stone-200 overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={r.images[0]}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-stone-800">{r.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{r.brand} · {r.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs tracking-widest text-stone-400 hover:text-stone-700 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回
        </button>
      </div>
    </div>
  );
}
