import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const Featured: React.FC = () => {

    const destinations = [
        {
            id: 1,
            name: "Tóquio",
            location: "Japão",
            properties: "1,240 propriedades",
            img: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            name: "Paris",
            location: "França",
            properties: "980 propriedades",
            img: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-6 mt-20 pb-20">

            <div className="mb-12 border-l-4 border-orange-500 pl-6">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
                    Curadoria LuxeStay
                </h2>
                <h1 className="text-5xl font-black tracking-tighter text-blue-950 mt-1">
                    Destinos em <span className="text-orange-500">Destaque</span>
                </h1>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {destinations.map((city) => (
                    <div
                        key={city.id}
                        className="relative group overflow-hidden rounded-[2rem] cursor-pointer shadow-2xl shadow-blue-950/10 transition-all duration-500 aspect-[16/10]"
                    >

                        <img
                            src={city.img}
                            alt={city.name}
                            className="w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-110"
                        />


                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />


                        <div className="absolute top-8 right-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                            <span className="text-white text-[11px] font-black uppercase tracking-widest">Exclusivo</span>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10 text-white drop-shadow-xl flex items-end justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-orange-400 font-bold text-sm uppercase tracking-widest mb-2">
                                    <MapPin size={16} />
                                    {city.location}
                                </div>
                                <h3 className="text-5xl font-black tracking-tighter leading-none mb-3">
                                    {city.name}
                                </h3>
                                <p className="text-gray-200 font-medium text-sm bg-white/10 inline-block px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                                    {city.properties}
                                </p>
                            </div>


                            <div className="bg-orange-500 p-5 rounded-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-orange-500/40">
                                <ArrowRight className="text-white" size={24} />
                            </div>
                        </div>


                        <div className="absolute inset-6 border border-white/0 group-hover:border-white/20 rounded-[1.5rem] transition-all duration-700 pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Featured;