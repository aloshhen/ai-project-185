import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Mail, Github, Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = [
    { id: 1, src: '/user-photo-1.jpg', title: 'Фото 1' },
    { id: 2, src: '/user-photo-2.jpg', title: 'Фото 2' },
    { id: 3, src: '/user-photo-3.jpg', title: 'Фото 3' },
    { id: 4, src: '/user-photo-4.jpg', title: 'Фото 4' },
    { id: 5, src: '/user-photo-5.jpg', title: 'Фото 5' },
    { id: 6, src: '/user-photo-6.jpg', title: 'Фото 6' }
  ]

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

  return (
    <div className="min-h-screen bg-slate-950">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-2xl z-40 border-b border-slate-800/50">
        <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Camera className="w-7 h-7 text-violet-500" />
            <span className="text-2xl font-bold text-white tracking-tight">Портфолио</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#gallery" className="text-slate-400 hover:text-violet-400 transition-colors font-medium">Галерея</a>
            <a href="#about" className="text-slate-400 hover:text-violet-400 transition-colors font-medium">О себе</a>
            <a href="#contact" className="text-slate-400 hover:text-violet-400 transition-colors font-medium">Контакты</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-slate-950 to-fuchsia-600/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight">
                Мое <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Фото</span><br />Портфолио
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Коллекция моих лучших работ и моментов, запечатленных через объектив камеры
              </p>
              <button 
                onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-violet-600/30"
              >
                Смотреть галерею
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-600/20 border border-slate-800/50">
                <img 
                  src="/user-photo-1.jpg" 
                  alt="Hero" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Фото <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Галерея</span>
            </h2>
            <p className="text-xl text-slate-400">Моя коллекция избранных работ</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer border border-slate-800/50 hover:border-violet-600/50 transition-all"
                onClick={() => openLightbox(photo, index)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 bg-slate-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
              О <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">себе</span>
            </h2>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-10 rounded-2xl border border-slate-700/50">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Добро пожаловать в мое портфолио! Я увлекаюсь фотографией и стремлюсь запечатлеть уникальные моменты и эмоции через объектив камеры.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Каждое фото в моей коллекции — это история, момент времени, который я хочу сохранить и поделиться с вами. Спасибо, что заглянули!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Свяжитесь <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">со мной</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Готов ответить на ваши вопросы и обсудить возможное сотрудничество
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:your-email@example.com"
                className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-xl border border-slate-700/50 hover:border-violet-600/50 px-8 py-4 rounded-xl transition-all group"
              >
                <Mail className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">Email</span>
              </a>
              
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-xl border border-slate-700/50 hover:border-fuchsia-600/50 px-8 py-4 rounded-xl transition-all group"
              >
                <Instagram className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">Instagram</span>
              </a>
              
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-xl border border-slate-700/50 hover:border-violet-600/50 px-8 py-4 rounded-xl transition-all group"
              >
                <Github className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/50 py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="w-6 h-6 text-violet-500" />
            <span className="text-xl font-bold text-white">Портфолио</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 Фото Портфолио. Все права защищены.
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-violet-400 transition-colors"
            >
              <X className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-6 text-white hover:text-violet-400 transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-6 text-white hover:text-violet-400 transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <motion.img
              key={selectedPhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white text-xl font-semibold">{selectedPhoto.title}</p>
              <p className="text-slate-400 mt-2">{currentIndex + 1} / {photos.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App