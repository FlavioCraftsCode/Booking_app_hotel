import React, { useState, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import { SlidersHorizontal, X, Banknote, Search, MapPin } from "lucide-react";
import { hotels } from "../../data/hotelsData";
import type { HotelData } from "../../data/hotelsData";

const List: React.FC = () => {
    const location = useLocation();

    const rawDestination = location.state?.destination || "";
    const [destination, setDestination] = useState(rawDestination === "Selecione o destino" ? "" : rawDestination);

    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(10000);

    const filteredHotels = useMemo(() => {
        return hotels.filter((hotel: HotelData) => {
            const searchTag = destination.toLowerCase().trim();
            const matchDest = !searchTag ||
                hotel.location.toLowerCase().includes(searchTag) ||
                hotel.name.toLowerCase().includes(searchTag);

            const matchPrice = hotel.price >= minPrice && hotel.price <= maxPrice;

            return matchDest && matchPrice;
        });
    }, [destination, minPrice, maxPrice]);

    const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<number>>, val: string) => {
        const value = val.replace(/\D/g, "");
        setter(value === "" ? 0 : parseInt(value));
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen font-sans text-gray-900">
            <Navbar />
            <Header type="list" />

            <main className="max-w-7xl mx-auto px-6 pt-52 pb-20">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">


                    <aside className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-gray-100 sticky top-40">

                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-2">

                                    <SlidersHorizontal size={18} className="text-orange-500" />
                                    <h2 className="text-xl font-black tracking-tighter uppercase">Filtros</h2>
                                </div>
                                <button
                                    onClick={() => { setDestination(""); setMinPrice(0); setMaxPrice(10000); }}
                                    className="text-[10px] font-black text-gray-300 hover:text-orange-500 uppercase tracking-widest transition-all"
                                >
                                    Limpar
                                </button>
                            </div>


                            <div className="mb-8">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block ml-1">Onde procurar?</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cidade ou hotel..."
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}

                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500/20 focus:bg-white rounded-2xl h-14 pl-5 pr-12 font-bold text-sm outline-none transition-all placeholder:text-gray-300 shadow-sm focus:shadow-orange-100"
                                    />
                                    {destination ? (
                                        <X size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-orange-500" onClick={() => setDestination("")} />
                                    ) : (
                                        <MapPin size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-200" />
                                    )}
                                </div>
                            </div>


                            <div className="mb-10 space-y-6">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 block ml-1">Preço por noite</label>

                                <div className="space-y-3">

                                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:bg-white focus-within:border-orange-200 transition-all">
                                        <span className="text-xs font-black text-orange-500 mr-2 uppercase">De</span>
                                        <span className="text-sm font-bold mr-1 text-gray-400">R$</span>
                                        <input
                                            type="text"
                                            value={minPrice}
                                            onChange={(e) => handlePriceChange(setMinPrice, e.target.value)}
                                            className="bg-transparent w-full font-black text-sm outline-none"
                                        />
                                    </div>


                                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:bg-white focus-within:border-orange-200 transition-all">
                                        <span className="text-xs font-black text-orange-500 mr-2 uppercase">Até</span>
                                        <span className="text-sm font-bold mr-1 text-gray-400">R$</span>
                                        <input
                                            type="text"
                                            value={maxPrice}
                                            onChange={(e) => handlePriceChange(setMaxPrice, e.target.value)}
                                            className="bg-transparent w-full font-black text-sm outline-none"
                                        />
                                    </div>
                                </div>
                            </div>


                            <button className="w-full bg-orange-500 text-white font-black py-5 rounded-3xl shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] hover:bg-orange-600 hover:shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
                                <Search size={18} className="group-hover:scale-110 transition-transform" />
                                Pesquisar
                            </button>
                        </div>
                    </aside>


                    <div className="lg:col-span-9 flex flex-col gap-10">
                        <div className="pb-8">
                            <h1 className="text-6xl font-black tracking-tighter text-gray-900 mb-4 leading-none">
                                {destination || "Resultados"}
                            </h1>
                            <div className="flex items-center gap-3">

                                <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                                    Mostrando {filteredHotels.length} opções disponíveis
                                </p>
                            </div>
                        </div>


                        <div className="grid gap-8">
                            {filteredHotels.length > 0 ? (
                                filteredHotels.map((hotel) => (
                                    <SearchItem key={hotel.id} hotel={hotel} />
                                ))
                            ) : (
                                <div className="py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-gray-100 shadow-inner">
                                    <Banknote size={48} className="mx-auto text-orange-100 mb-6" />
                                    <p className="font-black text-gray-400 text-2xl tracking-tight mb-2">Nenhum quarto encontrado.</p>
                                    <button
                                        onClick={() => { setMinPrice(0); setMaxPrice(10000); }}
                                        className="text-orange-500 font-bold text-sm underline underline-offset-4"
                                    >
                                        Limpar filtros de preço
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default List;