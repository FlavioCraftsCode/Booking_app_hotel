import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LogOut,
    CalendarDays,
    LayoutDashboard,
    User,
    ChevronDown,
    Menu,
    X,
    Building2
} from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isAdmin = Number(user?.is_admin) === 1;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="h-20 bg-[#000814] flex justify-center sticky top-0 z-[999] shadow-xl border-b border-white/5 font-sans px-4 sm:px-6">
            <div className="w-full max-w-7xl flex items-center justify-between">


                <Link to="/" className="text-xl sm:text-2xl font-black tracking-tighter text-white shrink-0">
                    Luxe<span className="text-orange-500">Stay.com</span>
                </Link>


                <div className="flex items-center gap-2 sm:gap-6">

                    {!isAdmin && user && (
                        <button className="hidden md:flex items-center gap-2 text-gray-400 text-sm font-semibold hover:text-white transition-all">
                            <Building2 size={16} />
                            Listar propriedade
                        </button>
                    )}

                    {user ? (
                        <div className="relative" ref={dropdownRef}>

                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 sm:gap-3 bg-white/5 hover:bg-white/10 p-1.5 sm:px-3 sm:py-2 rounded-2xl border border-white/10 transition-all active:scale-95 group"
                            >
                                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg ring-2 ring-white/5">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] leading-none mb-1">
                                        {isAdmin ? 'ADMIN' : 'PREMIUM'}
                                    </p>
                                    <p className="text-white text-sm font-bold leading-none">{user.name.split(' ')[0]}</p>
                                </div>
                                <ChevronDown
                                    size={16}
                                    className={`text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>


                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-100 overflow-hidden hidden md:block animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Conta Ativa</p>
                                        <p className="text-gray-900 text-sm font-bold truncate">{user.email}</p>
                                    </div>

                                    <div className="p-2 space-y-0.5">
                                        {isAdmin && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all font-black text-xs uppercase"
                                            >
                                                <LayoutDashboard size={18} />
                                                Painel Administrativo
                                            </Link>
                                        )}

                                        <Link to="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-bold text-sm">
                                            <CalendarDays size={18} className="text-orange-500" />
                                            Minhas Reservas
                                        </Link>

                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-bold text-sm text-left">
                                            <User size={18} className="text-blue-500" />
                                            Meu Perfil
                                        </button>

                                        <div className="h-px bg-gray-100 my-2" />

                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm text-left">
                                            <LogOut size={18} />
                                            Sair da Conta
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (

                        <div className="hidden md:flex items-center gap-4">
                            <button onClick={() => navigate('/login')} className="text-white text-sm font-bold hover:text-orange-500 transition-colors">Entrar</button>
                            <button onClick={() => navigate('/login')} className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-black shadow-lg hover:bg-orange-600 transition-all">Começar</button>
                        </div>
                    )}


                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>


            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[1000] md:hidden">

                    <div className="absolute inset-0 bg-[#000814]/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)} />


                    <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <span className="font-black text-xl text-[#000814]">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400"><X size={24} /></button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4 space-y-2">
                            {user && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none mb-2">{isAdmin ? 'MODO ADMIN' : 'CLIENTE LUXO'}</p>
                                    <p className="text-gray-900 font-bold">{user.name}</p>
                                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                                </div>
                            )}

                            {isAdmin && (
                                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-indigo-600 bg-indigo-50 rounded-2xl font-black text-sm uppercase">
                                    <LayoutDashboard size={20} /> Painel Geral
                                </Link>
                            )}

                            <Link to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold transition-colors">
                                <CalendarDays size={20} className="text-orange-500" /> Minhas Reservas
                            </Link>

                            <button className="w-full flex items-center gap-4 p-4 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold transition-colors text-left">
                                <User size={20} className="text-blue-500" /> Meu Perfil
                            </button>

                            {!user && (
                                <div className="pt-4 space-y-3">
                                    <button onClick={() => navigate('/login')} className="w-full p-4 text-gray-900 font-bold border border-gray-200 rounded-2xl">Entrar</button>
                                    <button onClick={() => navigate('/login')} className="w-full p-4 bg-orange-500 text-white font-black rounded-2xl">Criar Conta</button>
                                </div>
                            )}
                        </div>

                        {user && (
                            <div className="p-4 border-t border-gray-100">
                                <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-colors text-left">
                                    <LogOut size={20} /> Sair da Conta
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;