import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import {
    MapPin,
    Inbox,
    Trash2,
    Users,
    ArrowRight,
    CalendarCheck,
    Calendar
} from 'lucide-react';
import Swal from 'sweetalert2';

const MyBookings: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/bookings/${user.id}`);
            if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
            const data = await res.json();
            setBookings(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erro ao carregar reservas:", err);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user?.id]);

    const handleCancel = async (bookingId: number) => {
        const result = await Swal.fire({
            title: 'CANCELAR ESTADIA?',
            text: "Esta ação removerá sua reserva permanentemente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#1e3a8a',
            confirmButtonText: 'SIM, EXCLUIR',
            cancelButtonText: 'MANTER',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
                    Swal.fire('Excluído!', 'Sua reserva foi cancelada.', 'success');
                }
            } catch (err) {
                Swal.fire('Erro', 'Falha ao conectar ao servidor.', 'error');
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-[#F0F5FF] flex flex-col font-sans selection:bg-orange-100">
            <Navbar />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 pt-32 md:pt-48 pb-20 md:pb-32">


                <div className="mb-8 md:mb-12 md:ml-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <span className="bg-orange-500 w-8 md:w-12 h-[2px]"></span>
                        <span className="text-blue-900/50 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em]">LuxeStay Experience</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-blue-900 tracking-tighter leading-none">
                        Meus <span className="text-orange-500">Agendamentos</span>
                    </h1>
                </div>


                <div className="bg-white/70 backdrop-blur-md border border-white rounded-[2.5rem] md:rounded-[4rem] p-4 md:p-14 shadow-2xl relative overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <div className="w-10 h-10 border-4 border-blue-200 border-t-orange-500 rounded-full animate-spin"></div>
                            <p className="text-xs font-bold text-blue-900/40 uppercase tracking-widest">Sincronizando viagens...</p>
                        </div>
                    ) : bookings.length > 0 ? (
                        <div className="grid gap-4 md:gap-8">
                            {bookings.map((b) => (
                                <div key={b.id} className="bg-white border border-blue-50/50 rounded-[2rem] md:rounded-[3.5rem] p-5 md:p-6 hover:shadow-xl transition-all group relative">


                                    <button
                                        onClick={() => handleCancel(b.id)}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all z-10"
                                    >
                                        <Trash2 size={20} className="md:w-[22px]" />
                                    </button>

                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">


                                        <div className="flex items-center gap-4 md:gap-6 w-full lg:w-1/3">
                                            <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-900 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center text-white shadow-lg shrink-0">
                                                <CalendarCheck size={24} className="md:w-[30px]" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <h3 className="text-lg md:text-2xl font-black text-blue-900 truncate pr-8">
                                                    {b.hotel_name || 'Hotel LuxeStay'}
                                                </h3>
                                                <p className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1 font-bold uppercase tracking-wider mt-1">
                                                    <MapPin size={12} className="text-orange-500 shrink-0" />
                                                    <span className="truncate">{b.hotel_location || 'Localização Premium'}</span>
                                                </p>
                                            </div>
                                        </div>


                                        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full py-6 lg:py-0 px-2 md:px-6 border-y lg:border-y-0 lg:border-l border-blue-50/50">
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1">
                                                    <Calendar size={10} /> Check-in
                                                </p>
                                                <p className="text-xs md:text-sm font-bold text-blue-900">{formatDate(b.check_in)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1">
                                                    <Calendar size={10} /> Check-out
                                                </p>
                                                <p className="text-xs md:text-sm font-bold text-blue-900">{formatDate(b.check_out)}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Hóspedes</p>
                                                <p className="text-xs md:text-sm font-bold text-blue-900 flex items-center gap-1.5">
                                                    <Users size={12} className="text-blue-400" />
                                                    {b.adults || 1}A {b.kids > 0 ? `+ ${b.kids}C` : ''}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Investimento</p>
                                                <p className="text-base md:text-lg font-black text-orange-500 leading-none">
                                                    <span className="text-[10px] mr-0.5 italic">R$</span>
                                                    {Number(b.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>


                                        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-4">
                                            <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[9px] font-black uppercase border border-green-100 tracking-widest">
                                                {b.status || 'Confirmada'}
                                            </span>
                                            <div className="lg:hidden text-[10px] font-bold text-blue-900/30 uppercase tracking-[0.2em]">
                                                REF: #{b.id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 md:py-32">
                            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Inbox size={40} className="text-blue-200" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-blue-900 uppercase tracking-tight">O horizonte espera por você</h2>
                            <p className="text-slate-400 mt-2 mb-10 max-w-xs mx-auto text-sm font-medium italic">Sua lista de desejos está pronta para ser preenchida.</p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-blue-900 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 shadow-xl shadow-blue-900/20 transition-all flex items-center gap-3 mx-auto active:scale-95"
                            >
                                Explorar Destinos <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MyBookings;