import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d",
      title: "Sonbahar Koleksiyonu",
      description: "Yeni Sezon Çantalarla Tarzınızı Yansıtın",
      buttonText: "Koleksiyonu Keşfet",
      link: "/kategori/sonbahar-koleksiyonu"
    },
    {
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      title: "Lüks Tasarımlar",
      description: "Özel Dikişler, Benzersiz Detaylar",
      buttonText: "Hemen İncele",
      link: "/kategori/luks-tasarimlar"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide) => (
        <div
          key={slide.link}  // link'i key olarak kullandık
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            slide.link === slides[currentSlide].link ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-cream-50">
              <h2 className="font-serif text-5xl mb-4">{slide.title}</h2>
              <p className="text-xl mb-8 font-light">{slide.description}</p>
              <Link 
                to={slide.link}
                className="inline-block bg-cream-50 text-brown-800 px-8 py-3 rounded-lg hover:bg-cream-100 transition-colors font-medium"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}  // Dots için yine index'i key olarak kullandık
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-cream-50' : 'bg-cream-50/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeSlider
