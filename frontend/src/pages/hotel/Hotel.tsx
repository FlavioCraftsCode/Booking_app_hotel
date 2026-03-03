import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { hotels as staticHotels } from "../../data/hotelsData";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BookingModal from "../../components/bookingModal/BookingModal";
import { useAuth } from '../../context/AuthContext';
import { MapPin, Star, Share2, Heart, CheckCircle2, ChevronLeft, Calendar } from "lucide-react";

const Hotel: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hotel, setHotel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const staticHotel = staticHotels.find((item) => item.id === id);

        if (staticHotel) {
            setHotel(staticHotel);
            setLoading(false);
        } else {
            fetch(`http://localhost:5000/hotels`)
                .then(res => res.json())
                .then(data => {
                    const dynamicHotel = data.find((h: any) => h.id.toString() === id);
                    if (dynamicHotel) {
                        setHotel({
                            ...dynamicHotel,
                            photos: [dynamicHotel.image_url, dynamicHotel.image_url, dynamicHotel.image_url],
                            price: dynamicHotel.starting_price || 0
                        });
                    }
                })
                .catch(err => console.error("Erro ao buscar hotel:", err))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleBookingClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setIsModalOpen(true);
    };

    const confirmReservation = async (details: { adults: number, kids: number, days: number }) => {
        try {
            const checkIn = new Date();
            const checkOut = new Date();
            checkOut.setDate(checkIn.getDate() + details.days);

            const totalPrice = (hotel?.price || 0) * details.days;

            const response = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user?.id,
                    hotel_id: Number(hotel?.id),
                    check_in: checkIn.toISOString().split('T')[0],
                    check_out: checkOut.toISOString().split('T')[0],
                    adults: details.adults,
                    kids: details.kids,
                    total_price: totalPrice
                })
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok) {
                    setIsModalOpen(false);
                    navigate('/my-bookings');
                } else {
                    alert(`Erro: ${data.error || "Erro na reserva"}`);
                }
            } else {
                const textError = await response.text();
                console.error("Resposta não-JSON recebida:", textError);
                alert("Erro inesperado no servidor.");
            }
        } catch (error) {
            console.error("Erro crítico na reserva:", error);
            alert("Erro de conexão. O servidor está ligado?");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Buscando refúgio...</p>
            </div>
        </div>
    );

    if (!hotel) return <div className="p-20 text-center font-black italic text-gray-300">Hotel não encontrado...</div>;

    return (
        <div className="bg-white min-h-screen">
            <Navbar />


            <div className="hidden md:block">
                <Header type="list" />
            </div>

            <main className="max-w-7xl mx-auto px-0 md:px-6 lg:px-12 pt-0 md:pt-44 pb-32">


                <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 md:hidden bg-white/90 p-2 rounded-full shadow-lg">
                    <ChevronLeft size={24} />
                </button>


                <div className="relative group">
                    <div className="flex md:grid md:grid-cols-12 md:grid-rows-2 gap-2 md:gap-4 h-[350px] md:h-[600px] overflow-x-auto md:overflow-hidden snap-x snap-mandatory no-scrollbar">
                        <div className="min-w-full md:min-w-0 md:col-span-8 md:row-span-2 overflow-hidden md:rounded-[3rem] snap-center">
                            <img src={hotel.photos?.[0] || hotel.image_url} className="w-full h-full object-cover" alt="Principal" />
                        </div>
                        <div className="hidden md:block md:col-span-4 overflow-hidden rounded-[2.5rem] shadow-lg">
                            <img src={hotel.photos?.[1] || hotel.image_url} className="w-full h-full object-cover" alt="2" />
                        </div>
                        <div className="hidden md:block md:col-span-4 overflow-hidden rounded-[2.5rem] shadow-lg">
                            <img src={hotel.photos?.[2] || hotel.image_url} className="w-full h-full object-cover" alt="3" />
                        </div>
                    </div>
                </div>


                <div className="px-6 md:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 my-8 md:my-12 border-b border-gray-100 pb-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                    {hotel.category || 'LuxeStay Selection'}
                                </span>
                                <div className="flex text-yellow-500 items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-black text-gray-900">{hotel.rating || '5.0'}</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                                {hotel.name}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-400 font-bold">
                                <MapPin size={18} className="text-orange-500" />
                                <span className="text-base md:text-lg">{hotel.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">Sobre a estadia</h2>
                                <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
                                    {hotel.description}
                                </p>
                            </section>

                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {["All inclusive", "Wi-Fi Premium", "Transfer Aeroporto", "Concierge 24h"].map(item => (
                                    <div key={item} className="flex items-center gap-3 p-5 bg-gray-50 rounded-[2rem] border border-gray-100 transition-hover hover:bg-gray-100">
                                        <div className="bg-white p-2 rounded-xl shadow-sm">
                                            <CheckCircle2 className="text-orange-500" size={20} />
                                        </div>
                                        <span className="font-black text-gray-700 text-xs uppercase tracking-wider">{item}</span>
                                    </div>
                                ))}
                            </section>
                        </div>


                        <aside className="hidden lg:block">
                            <div className="sticky top-44 bg-[#000814] text-white p-10 rounded-[3.5rem] shadow-2xl">
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black italic">R$ {hotel.price}</span>
                                    <span className="text-gray-400 font-bold">/noite</span>
                                </div>
                                <button
                                    onClick={handleBookingClick}
                                    className="w-full bg-orange-500 text-white font-black py-6 rounded-3xl text-lg hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                                >
                                    {user ? 'Reservar agora' : 'Entre para reservar'}
                                </button>
                                <p className="text-[10px] text-center mt-6 text-gray-500 font-bold uppercase tracking-widest">
                                    Garantia de melhor preço LuxeStay
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>


            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">A partir de</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">R$ {hotel.price}</span>
                        <span className="text-xs font-bold text-gray-400">/noite</span>
                    </div>
                </div>
                <button
                    onClick={handleBookingClick}
                    className="bg-gray-900 text-white font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-xl active:scale-95"
                >
                    {user ? 'Reservar' : 'Login'}
                </button>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmReservation}
                hotelPrice={hotel.price}
                hotelName={hotel.name}
            />
            <Footer />
        </div>
    );
};

export default Hotel;