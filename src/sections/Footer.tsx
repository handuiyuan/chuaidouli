export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.3em] text-stone-400 uppercase">Vintage Toy Encyclopedia</span>
            <span className="text-xl font-medium text-stone-800">揣兜里</span>
            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
              记录那些被时光淘洗的玩具，<br/>
              以及藏在它们身后的故事。
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-widest text-stone-400 mb-1">导航</span>
            {[
              { href: '/', label: '首页' },
              { href: '/catalog', label: '图鉴' },
              { href: '/about', label: '关于' },
            ].map(link => (
              <a key={link.href} href={link.href} className="text-sm text-stone-500 hover:text-stone-800 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* WeChat */}
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-widest text-stone-400 mb-1">微信公众号</span>
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-stone-400">
                <path d="M8.5 2C4.91 2 2 4.91 2 8.5c0 2.03.88 3.86 2.28 5.14L3.5 16l2.42-.81A6.47 6.47 0 0 0 8.5 15.01c.19 0 .38-.01.57-.03a5.96 5.96 0 0 1-.07-.98C9 10.12 11.8 7.5 15.3 7.5c.26 0 .52.01.78.04C15.15 4.42 12.13 2 8.5 2zm-1.5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM15.3 9c-2.9 0-5.3 2.04-5.3 4.5S12.4 18 15.3 18c.7 0 1.36-.13 1.97-.37L19.5 18.5l-.85-2.04A4.42 4.42 0 0 0 20.6 13.5C20.6 11.04 18.2 9 15.3 9zm-1.3 3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm2.6 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/>
              </svg>
              揣兜里
            </div>
            <p className="text-xs text-stone-400 mt-1">搜索公众号"揣兜里"<br/>探索更多中古玩具故事</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-100 flex justify-between items-center">
          <p className="text-xs text-stone-300">© 2026 揣兜里 · 中古玩具图鉴</p>
          <p className="text-xs text-stone-300 tracking-widest">VINTAGE TOY ENCYCLOPEDIA</p>
        </div>
      </div>
    </footer>
  );
}
