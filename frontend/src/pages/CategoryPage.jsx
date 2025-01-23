import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CategorySidebar from '../components/CategorySidebar'
import ProductList from '../components/ProductList'

function CategoryPage() {
  const { categorySlug } = useParams()

  // Kategori isimlerini slug'dan düzgün formata çevirme
  const getCategoryName = (slug) => {
    const names = {
      'el-cantalari': 'El Çantaları',
      'sirt-cantalari': 'Sırt Çantaları',
      'cuzdan': 'Cüzdanlar',
      'seyahat': 'Seyahat Çantaları',
      'aksesuar': 'Aksesuarlar'
    }
    return names[slug] || 'Kategori'
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <CategorySidebar />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-serif text-3xl text-brown-800">{getCategoryName(categorySlug)}</h1>
              <select className="bg-white border border-cream-200 text-brown-700 py-2 px-4 rounded-lg focus:outline-none focus:border-brown-300">
                <option>Önerilen Sıralama</option>
                <option>Fiyata Göre (Artan)</option>
                <option>Fiyata Göre (Azalan)</option>
                <option>En Yeniler</option>
              </select>
            </div>
            <ProductList category={categorySlug} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage 