import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Phone, Star, ChevronDown, MessageCircle, Menu, X } from 'lucide-react';

// Servicios organizados por categoría
const servicios = {
  depilacion: {
    titulo: "Depilación",
    descripcion: "Técnicas profesionales de depilación para diferentes áreas del cuerpo, garantizando resultados duraderos y la máxima suavidad.",
    imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    items: [
      { nombre: "Rostro completo", duracion: "30 minutos", precio: 6000, descripcion: "Depilación completa del rostro para una piel suave y radiante" },
      { nombre: "Bozo o mentón", duracion: "20 minutos", precio: 1000, descripcion: "Depilación precisa de labio superior o mentón" },
      { nombre: "Ceja", duracion: "40 minutos", precio: 850, descripcion: "Diseño y depilación de cejas personalizado" },
      { nombre: "Nuca", duracion: "20 minutos", precio: 900, descripcion: "Depilación de la zona de la nuca para un look más limpio" },
      { nombre: "Axilas", duracion: "30 minutos", precio: 4500, descripcion: "Depilación suave y efectiva de las axilas" },
      { nombre: "Brazos completos", duracion: "40 minutos", precio: 6600, descripcion: "Depilación completa de brazos" },
      { nombre: "Medio brazo", duracion: "40 minutos", precio: 3500, descripcion: "Depilación desde el codo hasta la muñeca" },
      { nombre: "Abdomen completo", duracion: "40 minutos", precio: 4500, descripcion: "Depilación total del área abdominal" },
      { nombre: "Línea", duracion: "20 minutos", precio: 800, descripcion: "Depilación de la línea alba" },
      { nombre: "Espalda completa", duracion: "40 minutos", precio: 12500, descripcion: "Depilación total de la espalda" },
      { nombre: "Cavado", duracion: "30 minutos", precio: 10000, descripcion: "Depilación de la zona íntima" },
      { nombre: "Cavado Bikini", duracion: "20 minutos", precio: 10000, descripcion: "Depilación de la línea del bikini" },
      { nombre: "Tiro de cola", duracion: "20 minutos", precio: 7500, descripcion: "Depilación de la zona interglútea" },
      { nombre: "Glúteos", duracion: "15 minutos", precio: 8000, descripcion: "Depilación completa de glúteos" },
      { nombre: "Pierna completa", duracion: "20 minutos", precio: 15500, descripcion: "Depilación desde el tobillo hasta la cadera" },
      { nombre: "Media pierna", duracion: "20 minutos", precio: 13000, descripcion: "Depilación desde la rodilla hacia abajo o arriba" }
    ]
  },
  cejasYPestanas: {
    titulo: "Cejas y Pestañas",
    descripcion: "Tratamientos especializados para realzar tu mirada y definir tus rasgos faciales.",
    imagen: "https://images.unsplash.com/photo-1583001809873-a128495da465?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    items: [
      { nombre: "Laminado de cejas + perfilado", duracion: "50 minutos", precio: 8500, descripcion: "Técnica que alisa y disciplina el pelo de las cejas, incluyendo diseño personalizado" },
      { nombre: "Teñido de cejas", duracion: "30 minutos", precio: 7500, descripcion: "Coloración profesional para dar definición y profundidad a tus cejas" },
      { nombre: "Lifting de pestañas", duracion: "1 hora", precio: 10500, descripcion: "Tratamiento que curva y eleva las pestañas naturales" },
      { nombre: "Lifting de pestañas con teñido", precio: 20500, descripcion: "Combinación de lifting y tinte para una mirada más intensa" }
    ]
  },
  exfoliantes: {
    titulo: "Tratamientos Exfoliantes",
    descripcion: "Tratamientos especializados para renovar la piel y tratar problemas específicos.",
    imagen: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    items: [
      { nombre: "Dermoabrasión con Punta de Diamante Corporal", precio: 20000, descripcion: "Exfoliación profunda que elimina células muertas y mejora la textura de la piel" },
      { nombre: "Tratamiento vello encarnado cavado", precio: 15000, descripcion: "Tratamiento específico para prevenir y tratar vellos enquistados en la zona íntima" },
      { nombre: "Tratamiento Vello encarnado media pierna", precio: 10500, descripcion: "Tratamiento para vellos enquistados en media pierna" },
      { nombre: "Tratamiento Vello encarnado pierna completa", precio: 20000, descripcion: "Tratamiento completo para vellos enquistados en toda la pierna" },
      { nombre: "Tratamiento vello encarnado axilas", precio: 9000, descripcion: "Tratamiento específico para vellos enquistados en las axilas" }
    ]
  },
  masajes: {
    titulo: "Masajes",
    descripcion: "Diferentes técnicas de masajes terapéuticos y relajantes para tu bienestar.",
    imagen: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    items: [
      { nombre: "Masaje localizado", duracion: "2 horas", precio: 27100, descripcion: "Masaje enfocado en áreas específicas de tensión" },
      { nombre: "Masaje descontracturante", precio: 27500, descripcion: "Masaje terapéutico para aliviar contracturas y tensión muscular" },
      { nombre: "Masaje con Piedras calientes", precio: 20800, descripcion: "Terapia con piedras volcánicas que combinan calor y masaje" },
      { nombre: "Masaje con Pindas", precio: 30800, descripcion: "Masaje con saquitos de hierbas aromáticas calientes" }
    ]
  },
  manicuriaYPedicuria: {
    titulo: "Manicuría y Pedicuría",
    descripcion: "Servicios completos para el cuidado y embellecimiento de manos y pies.",
    imagen: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    items: [
      { nombre: "Belleza de manos", precio: 25000, descripcion: "Tratamiento completo para el cuidado de las manos" },
      { nombre: "Semipermanente", precio: 30100, descripcion: "Esmaltado duradero con acabado profesional" },
      { nombre: "Esculpidas en gel", precio: 30900, descripcion: "Extensiones de uñas modeladas en gel" },
      { nombre: "Uñas mordidas", precio: 30900, descripcion: "Tratamiento especial para reconstrucción de uñas" },
      { nombre: "Kapping gel", precio: 30500, descripcion: "Fortalecimiento de uñas naturales con gel" },
      { nombre: "Spa de pies", precio: 21000, descripcion: "Tratamiento completo de relajación y cuidado para los pies" },
      { nombre: "Belleza de pies + esmaltado semi", precio: 25100, descripcion: "Pedicuría completa con esmaltado semipermanente" },
      { nombre: "Esmaltado común", precio: 5500, descripcion: "Aplicación de esmalte tradicional" },
      { nombre: "Reconstrucción una uña", precio: 600, descripcion: "Reparación individual de uñas dañadas" },
      { nombre: "Remoción acrílico", precio: 1100, descripcion: "Eliminación segura de uñas acrílicas" },
      { nombre: "Remoción gel", precio: 980, descripcion: "Eliminación profesional de uñas de gel" },
      { nombre: "Remoción Kapping", precio: 800, descripcion: "Eliminación de kapping de gel" },
      { nombre: "Remoción semi", precio: 680, descripcion: "Eliminación de esmalte semipermanente" }
    ]
  },
  cosmetologia: {
    titulo: "Cosmetología/Cosmiatría",
    descripcion: "Tratamientos faciales y corporales para el cuidado integral de tu piel.",
    imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    items: [
      { nombre: "Limpieza Profunda Facial", duracion: "1 hora", precio: 25400, descripcion: "Limpieza completa que incluye extracción de impurezas y tratamiento hidratante" },
      { nombre: "Limpieza profunda facial con tratamiento Acné", duracion: "2 horas", precio: "Consultable", descripcion: "Tratamiento especializado para pieles con acné" },
      { nombre: "Tratamiento AntiGE+revitalización", precio: "Consultable", descripcion: "Tratamiento anti-edad con efecto revitalizante" },
      { nombre: "Limpieza de espalda", duracion: "1 hora", precio: 40500, descripcion: "Limpieza profunda de la zona de la espalda" },
      { nombre: "Exfoliación corporal", precio: 40800, descripcion: "Tratamiento completo de renovación de la piel" },
      { nombre: "Debrasión con punta de diamante", precio: 30500, descripcion: "Tratamiento de microdermoabrasión para mejorar la textura de la piel" }
    ]
  }
};

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // altura aproximada del nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setIsMobileMenuOpen(false);
      setIsServicesOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0">
        <div className="bg-white/90 backdrop-blur-sm shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <h1 className="text-2xl font-bold text-[#B8860B]">Viviana Medina</h1>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8 items-center">
                <button onClick={() => scrollToSection('inicio')} className="text-gray-600 hover:text-[#B8860B] transition-colors">
                  Inicio
                </button>
                <button onClick={() => scrollToSection('sobre-mi')} className="text-gray-600 hover:text-[#B8860B] transition-colors">
                  Sobre Mí
                </button>
                
                {/* Services Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center text-gray-600 hover:text-[#B8860B] transition-colors"
                  >
                    Servicios <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isServicesOpen && (
                    <div className="dropdown py-2">
                      {Object.values(servicios).map((categoria) => (
                        <button
                          key={categoria.titulo}
                          onClick={() => {
                            scrollToSection(categoria.titulo.toLowerCase().replace(/\s+/g, '-'));
                            setIsServicesOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {categoria.titulo}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button onClick={() => scrollToSection('contacto')} className="text-gray-600 hover:text-[#B8860B] transition-colors">
                  Contacto
                </button>
                
                <a 
                  href="https://wa.me/5491124658827" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="elegant-button"
                >
                  Agendar Cita
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="block w-full text-left py-2 text-gray-600"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('sobre-mi')}
                className="block w-full text-left py-2 text-gray-600"
              >
                Sobre Mí
              </button>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center w-full text-left py-2 text-gray-600"
                >
                  Servicios <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {Object.values(servicios).map((categoria) => (
                      <div
                        key={categoria.titulo}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection(categoria.titulo.toLowerCase().replace(/\s+/g, '-'));
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left py-1 text-sm text-gray-600 cursor-pointer hover:text-[#B8860B]"
                      >
                        {categoria.titulo}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => scrollToSection('contacto')}
                className="block w-full text-left py-2 text-gray-600"
              >
                Contacto
              </button>
              
              <a 
                href="https://wa.me/5491124658827" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center py-2 mt-2 rounded-full bg-[#B8860B] text-white"
              >
                Agendar Cita
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/5491124658827" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="text-white w-8 h-8" />
      </a>

      {/* Hero Section */}
      <header id="inicio" className="relative h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative text-center text-white z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Viviana Medina</h1>
          <p className="text-2xl md:text-3xl mb-8">Estética & Belleza</p>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">Descubre la experiencia de cuidado personalizado que realza tu belleza natural</p>
          <button 
            onClick={() => scrollToSection('servicios')} 
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-full text-white hover:bg-white hover:text-[#B8860B] transition-all duration-300"
          >
            Descubrir Servicios
          </button>
        </div>
      </header>

      {/* About Section */}
      <section id="sobre-mi" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#B8860B]">Sobre Mí</h2>
          <div className="flex flex-col md:flex-row items-center gap-12 mb-8">
            <img 
              src="/Vivi.jpg"
              alt="Viviana Medina"
              className="w-56 h-56 rounded-full object-cover shadow-lg border-4 border-[#B8860B]/20"
            />
            <div className="prose lg:prose-xl text-gray-700">
              <p className="mb-4">
                Como profesional multifacética, combino mi pasión por la estética con mi carrera artística. Además de ser especialista en belleza y bienestar, soy actriz en constante formación con el reconocido Pablo Novak.
              </p>
              <p className="mb-4">
                Me formé en la prestigiosa escuela de Leo Paparella y soy maquilladora profesional egresada de Laboratorios LACA. Mi compromiso con la excelencia y las habilidades blandas me permiten ofrecer una experiencia personalizada y profesional a cada cliente.
              </p>
              <p>
                Como Asesora de Imagen, mi objetivo es realzar la belleza natural de cada persona, adaptándome rápidamente a las nuevas tendencias y técnicas del sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id="servicios">
        {Object.values(servicios).map((categoria, index) => (
          <section 
            id={categoria.titulo.toLowerCase().replace(/\s+/g, '-')} 
            key={categoria.titulo} 
            className={`py-24 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-[#faf7f2]'}`}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#B8860B]">{categoria.titulo}</h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{categoria.descripcion}</p>
              
              {/* Category Image */}
              <div className="mb-16 overflow-hidden rounded-xl shadow-lg max-w-4xl mx-auto">
                <img 
                  src={categoria.imagen} 
                  alt={categoria.titulo} 
                  className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Mobile Services List */}
              <div className="md:hidden">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {categoria.items.map((servicio, idx) => (
                    <div 
                      key={servicio.nombre} 
                      className={`p-4 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100 last:border-b-0`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{servicio.nombre}</h3>
                          {servicio.duracion && (
                            <p className="text-sm text-gray-500 mt-1">
                              <Star className="inline-block w-3 h-3 mr-1 text-[#B8860B]" />
                              {servicio.duracion}
                            </p>
                          )}
                        </div>
                        <p className="text-[#B8860B] font-bold">
                          {typeof servicio.precio === 'number' ? `$${servicio.precio.toLocaleString()}` : servicio.precio}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{servicio.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop Services Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoria.items.map((servicio) => (
                  <div key={servicio.nombre} className="service-card">
                    <h3 className="text-xl font-semibold mb-3">{servicio.nombre}</h3>
                    <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
                    {servicio.duracion && (
                      <p className="text-sm text-gray-500 mb-3">
                        <Star className="inline-block w-4 h-4 mr-1 text-[#B8860B]" />
                        Duración: {servicio.duracion}
                      </p>
                    )}
                    <p className="text-[#B8860B] font-bold text-lg">
                      {typeof servicio.precio === 'number' ? `$${servicio.precio.toLocaleString()}` : servicio.precio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Contact Section */}
      <section id="contacto" className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#B8860B]">¡Hola! ¿En qué podemos ayudarte?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Podes chatear ahora con nosotros vía WhatsApp clickeando el ícono al pie de la página y te invito a seguirme en instagram donde sigo expandiendo como actriz y recibiran las ultimas actualizaciones de mi trabajo
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
            <a
              href="https://www.instagram.com/vivi.emed/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-[#B8860B] transition-colors group"
            >
              <div className="bg-gray-100 p-4 rounded-full mr-4 group-hover:bg-[#B8860B]/10 transition-colors">
                <Instagram className="w-6 h-6 text-[#B8860B]" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Instagram</p>
                <p className="text-gray-500">@vivi.emed</p>
              </div>
            </a>
            <a
              href="https://wa.me/5491124658827"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-[#B8860B] transition-colors group"
            >
              <div className="bg-gray-100 p-4 rounded-full mr-4 group-hover:bg-[#B8860B]/10 transition-colors">
                <Phone className="w-6 h-6 text-[#B8860B]" />
              </div>
              <div className="text-left">
                <p className="font-semibold">WhatsApp</p>
                <p className="text-gray-500">+54 9 11 2465-8827</p>
              </div>
            </a>
          </div>
          
          <div className="mt-16">
            <a 
              href="https://wa.me/5491124658827" 
              target="_blank" 
              rel="noopener noreferrer"
              className="elegant-button inline-block"
            >
              Agendar una Cita
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#faf7f2]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#B8860B] mb-6">Viviana Medina</h2>
          <p className="text-gray-600 mb-8">Estética & Belleza</p>
          <div className="w-24 h-1 gold-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-600">
            Made with ❤️ by <a href="https://judithdavalos.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#B8860B] hover:underline">Juroda</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;