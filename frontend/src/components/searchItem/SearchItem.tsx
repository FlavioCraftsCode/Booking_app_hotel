import React from 'react';
import { useNavigate } from "react-router-dom";
import { Star, MapPin, ChevronRight } from "lucide-react";
import type { HotelData } from "../../data/hotelsData";


interface SearchItemProps {
    hotel: HotelData & { tag?: string; category?: string };
}

const SearchItem: React.FC<SearchItemProps> = ({ hotel }) => {
    const navigate = useNavigate();


    const displayTag = hotel.tag || hotel.category || "Destaque";

    return (
        <div className="bg-white border border-gray-100 p-4 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-300 group">


            <div className="relative w-full md:w-72 h-64 shrink-0 overflow-hidden rounded-[2rem]">
                <img
                    src={hotel.photos?.[0] || (hotel as any).image_url}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[11px] font-black text-gray-800">{hotel.rating || "5.0"}</span>
                </div>
            </div>


            <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                            {hotel.name}
                        </h3>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 mt-1 mb-3">
                        <MapPin size={14} className="text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-wider">{hotel.location}</span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 font-medium mb-4">
                        {hotel.description}
                    </p>

                    <div className="flex gap-2">

                        <span className="bg-green-50 text-green-700 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] border border-green-100">
                            {displayTag}
                        </span>
                    </div>
                </div>


                <div className="flex items-end justify-between mt-6 border-t border-gray-50 pt-4">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Preço por noite</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-black text-gray-900 italic">R$</span>
                            <span className="text-3xl font-black text-gray-900">{hotel.price}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            navigate(`/hotels/${hotel.id}`);
                            window.scrollTo(0, 0);
                        }}
                        className="bg-[#000814] text-white font-black py-4 px-6 md:px-8 rounded-2xl hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-2 shadow-lg text-sm uppercase tracking-widest"
                    >
                        Ver Detalhes
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;