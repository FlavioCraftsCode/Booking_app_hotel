import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Star, MapPin } from 'lucide-react';
import { hotels } from "../../data/hotelsData";
import type { HotelData } from "../../data/hotelsData";

const FeaturedProperties: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const isMobile = window.innerWidth < 768;
            const scrollAmount = isMobile ? clientWidth * 0.85 : clientWidth * 0.8;

            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleCardClick = (id: string) => {
        window.scrollTo(0, 0);
        navigate(`/hotels/${id}`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mt-12 md:mt-20 relative group">


            <div className="flex justify-between items-end mb-8 md:mb-10">
                <div className="max-w-[70%] md:max-w-md">
                    <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-gray-900 uppercase leading-tight md:leading-none">
                        Ofertas para o <span className="text-orange-500">fim de semana</span>
                    </h2>
                    <p className="text-gray-400 font-bold text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2 md:mt-3 flex items-center gap-2">
                        <span className="w-6 md:w-8 h-[2px] bg-orange-500/30"></span>
                        Estadias exclusivas
                    </p>
                </div>


                <div className="flex gap-2 md:gap-4">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Anterior"
                        className="p-3 md:p-4 bg-white hover:bg-black hover:text-white rounded-xl md:rounded-2xl shadow-md border border-gray-100 transition-all active:scale-90 text-gray-900"
                    >
                        <ChevronLeft size={18} className="md:size-[22px]" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Próximo"
                        className="p-3 md:p-4 bg-white hover:bg-black hover:text-white rounded-xl md:rounded-2xl shadow-md border border-gray-100 transition-all active:scale-90 text-gray-900"
                    >
                        <ChevronRight size={18} className="md:size-[22px]" />
                    </button>
                </div>
            </div>


            <div
                ref={scrollRef}
                className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-10 md:pb-16 pt-2 scroll-smooth snap-x snap-mandatory"
            >
                {hotels.map((hotel: HotelData) => (
                    <div
                        key={hotel.id}
                        onClick={() => handleCardClick(hotel.id)}
                        className="flex-none w-[85vw] md:w-[340px] snap-center md:snap-start cursor-pointer group/card bg-white rounded-[2rem] md:rounded-[2.5rem] 
                                   relative border-2 border-gray-100/80 
                                   hover:border-orange-500 hover:ring-4 hover:ring-orange-500/10 
                                   shadow-[0_15px_35px_rgba(0,0,0,0.03)] 
                                   hover:shadow-[0_40px_80px_rgba(249,115,22,0.15)] 
                                   transition-all duration-500 ease-out transform md:hover:-translate-y-3 overflow-hidden"
                    >

                        <div className="relative h-60 md:h-72 w-full p-2 md:p-3 pb-0">
                            <div className="w-full h-full rounded-[1.5rem] md:rounded-[1.8rem] overflow-hidden relative">
                                <img
                                    src={hotel.photos[0]}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[1.5s]"
                                />

                                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                                    <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-2xl">
                                        <Star size={10} className="text-orange-500 fill-orange-500" />
                                        <span className="text-[10px] md:text-[11px] font-black text-white">{hotel.rating}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="absolute top-3 right-3 md:top-4 md:right-4 p-2.5 md:p-3 bg-white/20 backdrop-blur-xl hover:bg-white rounded-full transition-all group/heart border border-white/20"
                                >
                                    <Heart size={16} className="text-white group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-colors" />
                                </button>
                            </div>
                        </div>


                        <div className="p-6 md:p-8 pt-4 md:pt-6">
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <MapPin size={10} className="text-orange-500" />
                                <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[1.5px] md:tracking-[2px]">
                                    {hotel.location}
                                </span>
                            </div>

                            <h3 className="font-black text-xl md:text-2xl leading-tight text-gray-900 line-clamp-2 h-12 md:h-14 group-hover/card:text-orange-500 transition-colors tracking-tighter">
                                {hotel.name}
                            </h3>

                            <div className="w-full h-[1px] bg-gray-100 my-4 md:my-6"></div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5 md:space-y-1">
                                    <p className="text-[8px] md:text-[9px] font-black text-gray-300 uppercase tracking-widest">Preço por noite</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs md:text-sm font-black text-orange-500 italic">R$</span>
                                        <span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                                            {hotel.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center 
                                              border-2 border-transparent group-hover/card:border-orange-500/20 
                                              md:group-hover/card:bg-orange-500 md:group-hover/card:text-white 
                                              shadow-sm transition-all duration-500">
                                    <ChevronRight size={20} className="md:size-[26px] group-hover/card:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>


                        <div className="hidden md:block absolute bottom-0 left-0 w-full h-1.5 bg-orange-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProperties;