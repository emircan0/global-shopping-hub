import React from 'react';
import HomeSlider from '../components/HomeSlider'
import CategorySidebar from '../components/CategorySidebar'
import ProductList from '../components/ProductList'

const Home = () => {
  return (
    <div className="bg-cream-50 min-h-screen">
      <HomeSlider />
      
      {/* Kampanya Banner'ları */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8">
          <div className="relative h-64 rounded-lg overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d" 
              alt="Kampanya 1" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="font-serif text-3xl mb-2">Yeni Üyelere Özel</h3>
                <p className="text-lg font-light">İlk Alışverişte %15 İndirim</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3" 
              alt="Kampanya 2" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="font-serif text-3xl mb-2">Sezon Sonu</h3>
                <p className="text-lg font-light">Net %50 İndirim</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <CategorySidebar />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-serif text-3xl text-brown-800">Öne Çıkan Ürünler</h1>
              <select className="bg-white border border-cream-200 text-brown-700 py-2 px-4 rounded-lg focus:outline-none focus:border-brown-300">
                <option>Önerilen Sıralama</option>
                <option>Fiyata Göre (Artan)</option>
                <option>Fiyata Göre (Azalan)</option>
                <option>En Yeniler</option>
              </select>
            </div>
            <ProductList />
          </div>
        </div>
      </div>

      {/* Alt Banner */}
      <div className="bg-cream-100 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <i className="fas fa-truck text-4xl text-brown-800 mb-4"></i>
              <h3 className="font-serif text-xl text-brown-800 mb-2">Ücretsiz Kargo</h3>
              <p className="text-brown-600">2000 TL ve üzeri alışverişlerde</p>
            </div>
            <div className="text-center">
              <i className="fas fa-undo text-4xl text-brown-800 mb-4"></i>
              <h3 className="font-serif text-xl text-brown-800 mb-2">Kolay İade</h3>
              <p className="text-brown-600">30 gün içinde ücretsiz iade</p>
            </div>
            <div className="text-center">
              <i className="fas fa-lock text-4xl text-brown-800 mb-4"></i>
              <h3 className="font-serif text-xl text-brown-800 mb-2">Güvenli Alışveriş</h3>
              <p className="text-brown-600">SSL güvenlik sertifikası</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
