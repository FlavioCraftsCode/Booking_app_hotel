import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyList: React.FC = () => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const data = [
        { name: "Hotéis", count: "233.450", img: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Apartamentos", count: "180.221", img: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Resorts", count: "10.500", img: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Villas", count: "8.900", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Cabanas", count: "2.100", img: "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Casas de Campo", count: "1.500", img: "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 mt-12 relative group">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pesquise por tipo de acomodação</h2>


            <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 z-10 bg-white p-2 rounded-full shadow-lg border border-gray-200 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 text-brand-primary"
            >
                <ChevronLeft size={24} />
            </button>


            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
            >
                {data.map((item, index) => (
                    <div key={index} className="flex-none w-[calc(25%-12px)] min-w-[240px] cursor-pointer group/item">
                        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden mb-3 shadow-sm border border-transparent group-hover/item:border-brand-primary/20 transition-all">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover/item:text-brand-primary transition-colors">
                            {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                            {item.count} hotéis
                        </p>
                    </div>
                ))}
            </div>


            <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 z-10 bg-white p-2 rounded-full shadow-lg border border-gray-200 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 text-brand-primary"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default PropertyList;