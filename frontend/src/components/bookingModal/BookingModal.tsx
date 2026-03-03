import React, { useState } from 'react';
import { Users, Baby, Calendar, X, Info } from 'lucide-react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
    hotelPrice: number;
    hotelName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onConfirm, hotelPrice, hotelName }) => {
    const [adults, setAdults] = useState(1);
    const [kids, setKids] = useState(0);
    const [days, setDays] = useState(1);

    if (!isOpen) return null;

    const totalPrice = hotelPrice * days;

    const handleConfirmClick = () => {
        const checkIn = new Date();
        const checkOut = new Date();
        checkOut.setDate(checkIn.getDate() + days);

        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        onConfirm({
            days: days,
            adults: Number(adults) || 1,
            kids: Number(kids) || 0,
            total_price: Number(totalPrice) || 0,
            check_in: formatDate(checkIn),
            check_out: formatDate(checkOut)
        });
    };

    return (

        <div className="fixed inset-0 z-[100] flex justify-center items-start pt-24 pb-10 px-4 overflow-y-auto bg-blue-900/40 backdrop-blur-md">

            <div
                className="fixed inset-0 -z-10"
                onClick={onClose}
            ></div>


            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl animate-in zoom-in duration-300 border border-blue-50 mb-10">

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-300 hover:text-orange-500 transition-all"
                >
                    <X size={24} />
                </button>

                <div className="mb-8">
                    <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                        Finalizar Reserva
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-blue-900 leading-tight tracking-tighter">
                        {hotelName}
                    </h2>
                </div>

                <div className="space-y-4">

                    <div className="p-5 bg-slate-50 rounded-[1.8rem] border border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-blue-900" />
                                <span className="font-bold text-blue-900">Noites</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm">
                                <button onClick={() => setDays(Math.max(1, days - 1))} className="w-8 h-8 font-black text-blue-900 hover:bg-slate-50 rounded-lg">-</button>
                                <span className="font-black text-blue-900">{days}</span>
                                <button onClick={() => setDays(days + 1)} className="w-8 h-8 font-black text-blue-900 hover:bg-slate-50 rounded-lg">+</button>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-50 rounded-[1.8rem] border border-slate-100">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Adultos</p>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setAdults(Math.max(1, adults - 1))} className="font-black text-blue-900">-</button>
                                <span className="font-black text-xl text-blue-900">{adults}</span>
                                <button onClick={() => setAdults(adults + 1)} className="font-black text-blue-900">+</button>
                            </div>
                        </div>
                        <div className="p-5 bg-slate-50 rounded-[1.8rem] border border-slate-100">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Crianças</p>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setKids(Math.max(0, kids - 1))} className="font-black text-blue-900">-</button>
                                <span className="font-black text-xl text-blue-900">{kids}</span>
                                <button onClick={() => setKids(kids + 1)} className="font-black text-blue-900">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Valor Total</p>
                            <p className="text-4xl font-black text-blue-900 tracking-tighter">
                                R$ {totalPrice.toLocaleString('pt-BR')}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleConfirmClick}
                        className="w-full bg-blue-900 text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                    >
                        Confirmar Reserva
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;