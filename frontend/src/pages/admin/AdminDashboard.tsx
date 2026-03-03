import React, { useEffect, useState } from 'react';
import {
    Users,
    LogOut,
    Trash2,
    CalendarCheck,
    Menu,
    X,
    ChevronRight,
    Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

interface AdminUser { id: number; name: string; email: string; is_admin: number; }
interface Booking {
    id: number;
    hotel_name: string;
    user_name: string;
    check_in: string;
    check_out: string;
    status: string;
    total_price: number;
}

const AdminDashboard: React.FC = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'users' | 'bookings'>('users');
    const [usersList, setUsersList] = useState<AdminUser[]>([]);
    const [bookingsList, setBookingsList] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'users' ? '/admin/users' : '/admin/bookings';
            const res = await fetch(`http://localhost:5000${endpoint}`);
            if (!res.ok) throw new Error("Erro ao buscar dados do servidor");
            const data = await res.json();
            if (activeTab === 'users') setUsersList(data);
            else setBookingsList(data);
        } catch (err) {
            console.error("Erro na API:", err);
            Swal.fire('Erro', 'Não foi possível carregar as informações.', 'error');
        } finally {
            setLoading(false);
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleDeleteUser = async (id: number) => {
        const confirm = await Swal.fire({
            title: 'Excluir usuário?',
            text: "Isso removerá todas as reservas ligadas a ele!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b'
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/admin/users/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchData();
                    Swal.fire('Removido!', 'O usuário foi apagado.', 'success');
                }
            } catch (error) {
                Swal.fire('Erro', 'Falha ao deletar usuário.', 'error');
            }
        }
    };

    const handleDeleteBooking = async (id: number) => {
        const confirm = await Swal.fire({
            title: 'Excluir Reserva?',
            text: "Deseja remover este agendamento permanentemente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            confirmButtonColor: '#ef4444'
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    fetchData();
                    Swal.fire('Sucesso!', 'Reserva removida.', 'success');
                }
            } catch (error) {
                Swal.fire('Erro', 'Não foi possível excluir a reserva.', 'error');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50/50 font-sans text-slate-600">


            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}


            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-white border-r border-blue-100 
                transition-transform duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-8 border-b border-blue-50 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-blue-700 tracking-tighter">
                        LuxeStay <span className="text-blue-300 font-light italic text-lg">Admin</span>
                    </h2>
                    <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-grow p-6 space-y-8">
                    <div>
                        <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.3em] mb-6 ml-2">Main Management</p>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`flex items-center justify-between w-full p-4 rounded-2xl font-bold transition-all group ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'hover:bg-blue-50 text-slate-500'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Users size={18} /> Clientes
                                </div>
                                <ChevronRight size={14} className={activeTab === 'users' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                            </button>
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`flex items-center justify-between w-full p-4 rounded-2xl font-bold transition-all group ${activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'hover:bg-blue-50 text-slate-500'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <CalendarCheck size={18} /> Reservas
                                </div>
                                <ChevronRight size={14} className={activeTab === 'bookings' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="p-6 border-t border-blue-50">
                    <button onClick={logout} className="flex items-center gap-3 w-full p-4 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all">
                        <LogOut size={18} /> Logout Dashboard
                    </button>
                </div>
            </aside>


            <main className="flex-grow p-4 md:p-8 lg:p-12 w-full max-w-full overflow-x-hidden">


                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-3 bg-white rounded-xl shadow-sm border border-blue-100 text-blue-600"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                                {activeTab === 'users' ? "Gestão de Clientes" : "Mapa de Reservas"}
                            </h1>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                                {activeTab === 'users' ? `${usersList.length} usuários registrados` : `${bookingsList.length} agendamentos ativos`}
                            </p>
                        </div>
                    </div>

                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar registros..."
                            className="bg-white border border-blue-100 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-300 w-64 lg:w-80 transition-all text-sm font-medium"
                        />
                    </div>
                </header>


                {loading ? (
                    <div className="bg-white rounded-[2.5rem] p-24 text-center border border-white shadow-xl">
                        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                        <p className="text-blue-900 font-black uppercase tracking-[0.2em] text-[10px]">Sincronizando Banco de Dados...</p>
                    </div>
                ) : (
                    <div className="space-y-4">


                        <div className="hidden lg:block bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-blue-50/50 border-b border-blue-100 text-blue-400 uppercase text-[10px] font-black tracking-widest">
                                    {activeTab === 'users' ? (
                                        <tr>
                                            <th className="p-6">ID Perfil</th>
                                            <th className="p-6">Identificação</th>
                                            <th className="p-6">Contato</th>
                                            <th className="p-6 text-center">Gestão</th>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th className="p-6">Referência</th>
                                            <th className="p-6">Hóspede</th>
                                            <th className="p-6">Unidade Hotel</th>
                                            <th className="p-6 text-center">Check-in / Out</th>
                                            <th className="p-6">Faturamento</th>
                                            <th className="p-6 text-center">Status</th>
                                            <th className="p-6 text-center">Ações</th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody className="divide-y divide-blue-50 text-slate-700">
                                    {activeTab === 'users' ? (
                                        usersList.map(u => (
                                            <tr key={u.id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="p-6 font-mono text-blue-300 text-xs">#USR-{u.id}</td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-slate-800">{u.name} {u.is_admin ? '⭐' : ''}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-slate-500 font-medium">{u.email}</td>
                                                <td className="p-6">
                                                    <div className="flex justify-center">
                                                        <button onClick={() => handleDeleteUser(u.id)} className="p-3 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        bookingsList.map(b => (
                                            <tr key={b.id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="p-6 font-mono text-blue-300 text-xs">#BK-{b.id}</td>
                                                <td className="p-6 font-bold text-slate-800">{b.user_name || 'Hóspede Removido'}</td>
                                                <td className="p-6 text-blue-600 font-black italic tracking-tighter uppercase text-xs">{b.hotel_name}</td>
                                                <td className="p-6 text-[11px] text-center font-bold text-slate-400">
                                                    {new Date(b.check_in).toLocaleDateString()} <span className="text-blue-200">/</span> {new Date(b.check_out).toLocaleDateString()}
                                                </td>
                                                <td className="p-6 font-black text-slate-900">R$ {Number(b.total_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                <td className="p-6 text-center">
                                                    <span className="px-4 py-1.5 bg-green-100 text-green-700 text-[9px] font-black rounded-full uppercase tracking-widest border border-green-200">
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex justify-center">
                                                        <button onClick={() => handleDeleteBooking(b.id)} className="p-3 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>


                        <div className="lg:hidden space-y-4">
                            {activeTab === 'users' ? (
                                usersList.map(u => (
                                    <div key={u.id} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-800 uppercase text-xs tracking-wider">{u.name}</h4>
                                                <p className="text-slate-400 text-[11px]">{u.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteUser(u.id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                bookingsList.map(b => (
                                    <div key={b.id} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-1">{b.hotel_name}</p>
                                                <h4 className="font-bold text-slate-800 text-sm">{b.user_name}</h4>
                                            </div>
                                            <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-black rounded-full uppercase tracking-tighter">
                                                {b.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end border-t border-blue-50 pt-4">
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-300 uppercase">Faturamento</p>
                                                <p className="font-black text-slate-900 tracking-tighter">R$ {Number(b.total_price).toFixed(2)}</p>
                                            </div>
                                            <button onClick={() => handleDeleteBooking(b.id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;