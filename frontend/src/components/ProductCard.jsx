import React from 'react';

const ProductCard = () => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src="/assets/urun1.jpg" alt="Ürün" className="w-full h-48 object-cover rounded-t-lg"/>
      <h2 className="font-bold mt-2">Ürün Adı</h2>
      <p className="text-gray-500">Açıklama metni buraya gelecek...</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold">200 TL</span>
        <button className="bg-blue-500 text-white p-2 rounded">Sepete Ekle</button>
      </div>
    </div>
  );
};

export default ProductCard;
