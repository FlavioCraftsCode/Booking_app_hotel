import {
    Bed, Navigation, Calendar, Users, MapPin,
    Search, ChevronDown, Plus, Minus, X
} from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DateRange } from 'react-date-range';
import type { RangeKeyDict } from 'react-date-range';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface HeaderProps {
    type?: "list" | string;
}

const Header: React.FC<HeaderProps> = ({ type }) => {
    const navigate = useNavigate();
    const [openDest, setOpenDest] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    const [destination, setDestination] = useState("Selecione o destino");
    const [options, setOptions] = useState({ adult: 2, children: 0, room: 1 });

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if (openDate && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [openDate]);

    const destinations = ["João Pessoa, Brasil", "São Paulo, Brasil", "Rio de Janeiro, Brasil", "Lisboa, Portugal"];

    const handleOption = (name: "adult" | "children" | "room", operation: "i" | "d") => {
        setOptions((prev) => ({
            ...prev,
            [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
        }));
    };

    const handleSearch = () => {
        navigate("/hotels", { state: { destination, options, date } });
    };

    return (
        <div className={`bg-brand-dark text-white relative flex justify-center transition-all z-20 ${type === "list" ? "pb-12 md:pb-20 pt-4" : "pb-24 md:pb-32 pt-6 md:pt-10"}`}>
            <div className="w-full max-w-6xl px-4 md:px-6">


                <div className="flex mb-8 md:mb-12">
                    <div className="flex items-center gap-3 border-2 border-brand-primary px-6 py-2.5 rounded-full bg-brand-primary/10 cursor-default shadow-lg shadow-brand-primary/20 transition-all">
                        <Bed size={20} className="text-brand-primary" />
                        <span className="text-sm font-black uppercase tracking-widest">Hospedagens</span>
                    </div>
                </div>

                {type !== "list" && (
                    <div className="mb-12 md:mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight text-center md:text-left">
                            Sua próxima <span className="text-brand-primary">experiência</span> começa aqui.
                        </h1>
                        <p className="text-base md:text-xl opacity-80 max-w-2xl font-medium text-gray-300 text-center md:text-left">
                            Explore destinos exclusivos e garanta estadias com o selo LuxeStay.
                        </p>
                    </div>
                )}


                <div className={`absolute left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl bg-brand-accent rounded-2xl md:rounded-full p-1.5 shadow-2xl flex flex-col md:flex-row items-center gap-1 border-4 border-brand-accent transition-all z-50 ${type === "list" ? "-bottom-12 md:-bottom-10" : "-bottom-16 md:-bottom-10"}`}>


                    <div className="relative w-full md:flex-[1.2]">
                        <div onClick={() => { setOpenDest(!openDest); setOpenDate(false); setOpenOptions(false) }} className="flex items-center gap-3 px-5 py-3.5 md:py-4 bg-white rounded-xl md:rounded-l-full cursor-pointer hover:bg-gray-50 transition-all text-gray-800 h-full group">
                            <MapPin className="text-brand-primary group-hover:scale-110 transition-transform" size={20} />
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] uppercase font-black text-gray-400 leading-none mb-1">Destino</span>
                                <span className="font-bold truncate text-sm md:text-base">{destination}</span>
                            </div>
                        </div>
                        {openDest && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-2xl shadow-2xl p-2 z-[100] border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                                {destinations.map(d => (
                                    <div key={d} onClick={() => { setDestination(d); setOpenDest(false) }} className="p-4 hover:bg-orange-50 rounded-xl text-gray-700 font-bold cursor-pointer transition-colors flex items-center gap-3">
                                        <Navigation size={14} className="text-orange-300" /> {d}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block w-px h-8 bg-gray-200/50" />


                    <div className="relative w-full md:flex-1">
                        <div onClick={() => { setOpenDate(!openDate); setOpenDest(false); setOpenOptions(false) }} className="flex items-center gap-3 px-5 py-3.5 md:py-4 bg-white rounded-xl md:rounded-none cursor-pointer hover:bg-gray-50 transition-all text-gray-800 h-full group">
                            <Calendar className="text-brand-primary group-hover:scale-110 transition-transform" size={20} />
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] uppercase font-black text-gray-400 leading-none mb-1">Check-in / Out</span>
                                <span className="text-sm font-bold whitespace-nowrap">
                                    {`${format(date[0].startDate, "dd MMM", { locale: ptBR })} — ${format(date[0].endDate, "dd MMM", { locale: ptBR })}`}
                                </span>
                            </div>
                        </div>
                        {openDate && (
                            <div className="fixed md:absolute inset-0 md:inset-auto md:top-[calc(100%+8px)] md:left-1/2 md:-translate-x-1/2 z-[1000] md:z-[100] bg-white md:shadow-2xl md:rounded-3xl overflow-hidden border border-gray-100 flex flex-col animate-in slide-in-from-bottom md:zoom-in-95 duration-300">
                                <div className="md:hidden flex items-center justify-between p-4 border-b">
                                    <span className="font-black text-gray-800">Datas da Estadia</span>
                                    <button onClick={() => setOpenDate(false)} className="p-2 bg-gray-100 rounded-full text-gray-800"><X size={20} /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto md:overflow-visible flex justify-center bg-white">
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item: RangeKeyDict) => setDate([item.selection as any])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        minDate={new Date()}
                                        locale={ptBR}
                                        rangeColors={["#ff6805"]}
                                        months={window.innerWidth < 768 ? 1 : 2}
                                        direction="horizontal"
                                        className="text-sm"
                                    />
                                </div>
                                <div className="p-4 bg-white border-t flex justify-end">
                                    <button onClick={() => setOpenDate(false)} className="bg-brand-primary text-white px-10 py-3 rounded-xl font-black hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all active:scale-95">Confirmar</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block w-px h-8 bg-gray-200/50" />


                    <div className="relative w-full md:flex-1">
                        <div onClick={() => { setOpenOptions(!openOptions); setOpenDest(false); setOpenDate(false) }} className="flex items-center gap-3 px-5 py-3.5 md:py-4 bg-white rounded-xl md:rounded-none cursor-pointer hover:bg-gray-50 transition-all text-gray-800 h-full group text-left">
                            <Users className="text-brand-primary group-hover:scale-110 transition-transform" size={20} />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-black text-gray-400 leading-none mb-1">Hóspedes</span>
                                <span className="text-sm font-bold truncate">{options.adult} ad · {options.room} qt</span>
                            </div>
                            <ChevronDown size={16} className={`ml-auto text-gray-400 transition-transform ${openOptions ? "rotate-180" : ""}`} />
                        </div>
                        {openOptions && (
                            <div className="absolute top-[calc(100%+8px)] right-0 w-full md:w-80 bg-white rounded-2xl shadow-2xl p-6 z-[100] border border-gray-100 animate-in fade-in zoom-in-95 duration-200 text-gray-800">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-left">
                                            <p className="font-bold">Adultos</p>
                                            <p className="text-[10px] text-gray-400 font-medium">Acima de 12 anos</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-xl border">
                                            <button disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")} className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg disabled:opacity-30 transition-all text-brand-primary"><Minus size={14} /></button>
                                            <span className="w-4 text-center font-black">{options.adult}</span>
                                            <button onClick={() => handleOption("adult", "i")} className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg transition-all text-brand-primary"><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-left">
                                            <p className="font-bold">Quartos</p>
                                            <p className="text-[10px] text-gray-400 font-medium">Quantidade</p>
                                        </div>
                                        <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-xl border">
                                            <button disabled={options.room <= 1} onClick={() => handleOption("room", "d")} className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg disabled:opacity-30 transition-all text-brand-primary"><Minus size={14} /></button>
                                            <span className="w-4 text-center font-black">{options.room}</span>
                                            <button onClick={() => handleOption("room", "i")} className="w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg transition-all text-brand-primary"><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => setOpenOptions(false)} className="w-full mt-2 py-3.5 bg-brand-primary text-white font-black rounded-xl shadow-lg hover:bg-orange-600 transition-all">Aplicar</button>
                                </div>
                            </div>
                        )}
                    </div>


                    <button onClick={handleSearch} className="bg-brand-dark text-white px-8 md:px-12 py-4 md:py-4 rounded-xl md:rounded-full font-black hover:bg-black transition-all w-full md:w-auto flex items-center justify-center gap-3 active:scale-95 shadow-xl min-w-[180px] group">
                        <Search size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="uppercase tracking-widest text-[10px]">Pesquisar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;