import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Instagram, Github, X, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = [
    { 
      id: 1, 
      src: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-photo-1769685356.JPG?', 
      title: 'Фото 1' 
    },
    { 
      id: 2, 
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80', 
      title: 'Природа' 
    },
    { 
      id: 3, 
      src: 'https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-photo-1769685390.jpg?', 
      title: 'Фото 2' 
    },
    { 
      id: 4, 
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80', 
      title: 'Туман' 
    },
    { 
      id: 5, 
      src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80', 
      title: 'Лес' 
    },
    { 
      id: 6, 
      src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80', 
      title: 'Озеро' 
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const newIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const prevPhoto = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-video-1769685477.MOV?"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="text-white text-2xl font-light tracking-widest"
          >
            ЗАГРУЗКА...
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-40 border-b border-gray-100">
        <nav className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <span className="text-sm font-medium tracking-wider text-gray-900">ПОРТФОЛИО</span>
          <div className="hidden md:flex space-x-8">
            <a href="#gallery" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Галерея</a>
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">О себе</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Контакты</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Фотография
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Коллекция избранных работ
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[16/10] overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(photos[0], 0)}
          >
            <img 
              src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/edit-photo-1769685356.JPG?"
              alt="Hero"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.slice(1).map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden cursor-pointer"
                onClick={() => openLightbox(photo, index + 1)}
              >
                <img 
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 tracking-tight">
              О себе
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Добро пожаловать в мое портфолио. Я увлекаюсь фотографией и стремлюсь запечатлеть уникальные моменты и эмоции через объектив камеры.
              </p>
              <p>
                Каждое фото в моей коллекции — это история, момент времени, который я хочу сохранить и поделиться с вами. Спасибо, что заглянули.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 tracking-tight">
              Контакты
            </h2>
            <p className="text-lg text-gray-500 mb-12">
              Свяжитесь со мной
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:your-email@example.com"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">Email</span>
              </a>
              
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </a>
              
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2024 Портфолио
          </p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.img
              key={selectedPhoto.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-sm text-gray-500">{currentIndex + 1} / {photos.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App