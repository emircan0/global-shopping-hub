import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = searchParams.get('q');
    const [filters, setFilters] = useState({
        priceRange: 'all',
        category: 'all',
        sortBy: 'newest'
    });

    useEffect(() => {
        // API'den arama sonuçlarını getir
        setLoading(true);
        // Örnek veri
        setProducts([/* API'den gelen ürünler */]);
        setLoading(false);
    }, [query, filters]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">"{query}" için arama sonuçları</h1>
            
            {/* Filtreler */}
            <div className="flex gap-4 mb-6">
                <select 
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="border p-2 rounded"
                >
                    <option value="all">Fiyat Aralığı</option>
                    <option value="0-100">0-100 TL</option>
                    <option value="100-500">100-500 TL</option>
                    <option value="500+">500+ TL</option>
                </select>

                <select 
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="border p-2 rounded"
                >
                    <option value="newest">En Yeniler</option>
                    <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
                    <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
                </select>
            </div>

            {/* Sonuçlar */}
            {loading ? (
                <div>Yükleniyor...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults; 