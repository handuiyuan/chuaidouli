import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { HomePage } from '@/sections/HomePage';
import { CatalogPage } from '@/sections/CatalogPage';
import { ToyDetailPage } from '@/sections/ToyDetailPage';
import { AboutPage } from '@/sections/AboutPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/toy/:id" element={<ToyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
