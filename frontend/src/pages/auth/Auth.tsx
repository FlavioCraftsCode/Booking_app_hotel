import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.name, formData.email, formData.password);
            }
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Erro na autenticação. Verifique seus dados.');
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="min-h-screen w-full bg-[#f0f7ff] flex items-center justify-center p-0 md:p-6 font-sans relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">


            <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-200/50 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[120px] pointer-events-none"></div>


            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-blue-100 md:flex items-center gap-2 pr-4 group hidden"
            >
                <ChevronLeft size={18} className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">Voltar</span>
            </button>


            <div className="w-full max-w-5xl md:h-[650px] bg-white md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(15,23,42,0.08)] flex flex-col md:flex-row border border-white relative z-10 overflow-hidden min-h-screen md:min-h-fit">


                <div className="hidden md:flex md:w-1/2 bg-[#0f172a] p-12 text-white flex-col justify-between relative">

                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className="relative z-10">
                        <div className="mb-16">
                            <h2 className="text-white font-black text-2xl tracking-tighter uppercase italic">
                                Luxe<span className="text-blue-500">Stay</span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl font-black tracking-tighter leading-[0.95]">
                                {isLogin ? "Bem-vindo de volta à elite." : "Inicie sua jornada premium."}
                            </h1>
                            <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
                                Acesse os destinos mais cobiçados do mundo com condições exclusivas para membros.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 gap-4 pt-10 border-t border-white/10">
                        {["Concierge Dedicado", "Upgrade de Categoria", "Check-in VIP"].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <CheckCircle2 size={12} className="text-blue-400" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[2px] text-slate-300">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white relative">


                    <div className="md:hidden mb-10 text-center">
                        <h2 className="font-black text-xl tracking-tighter uppercase italic text-slate-900 mb-2">
                            Luxe<span className="text-blue-600">Stay</span>
                        </h2>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[3px]">Portal de Membros</p>
                    </div>


                    <div className="mb-10 flex gap-8 border-b border-slate-100 relative">
                        <button
                            type="button"
                            onClick={() => { setIsLogin(true); setError(''); }}
                            className={`pb-4 text-[11px] font-black uppercase tracking-[3px] transition-all relative ${isLogin ? 'text-blue-600' : 'text-slate-400'}`}
                        >
                            Acessar {isLogin && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-600" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsLogin(false); setError(''); }}
                            className={`pb-4 text-[11px] font-black uppercase tracking-[3px] transition-all relative ${!isLogin ? 'text-blue-600' : 'text-slate-400'}`}
                        >
                            Registrar {!isLogin && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-600" />}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl text-[10px] font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-left-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Alexander Wright"
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-blue-200 focus:bg-white text-slate-900 h-14 pl-12 rounded-2xl outline-none transition-all placeholder:text-slate-300 text-sm font-medium"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">E-mail Corporativo</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-blue-200 focus:bg-white text-slate-900 h-14 pl-12 rounded-2xl outline-none transition-all placeholder:text-slate-300 text-sm font-medium"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Senha Privada</label>
                                {isLogin && <button type="button" className="text-[9px] font-bold text-blue-600 uppercase hover:underline">Esqueci a senha</button>}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-blue-200 focus:bg-white text-slate-900 h-14 pl-12 rounded-2xl outline-none transition-all placeholder:text-slate-300 text-sm font-medium"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className={`w-full bg-blue-600 text-white font-black py-5 rounded-2xl mt-6 flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.2)] active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            <span className="uppercase tracking-[2px] text-[11px]">
                                {isLoading ? 'Processando...' : isLogin ? 'Entrar no Portal' : 'Criar Conta Premium'}
                            </span>
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-400 text-[10px] font-medium leading-relaxed">
                        Ao continuar, você concorda com nossos <br className="hidden sm:block" />
                        <span className="text-blue-600 cursor-pointer hover:underline">Termos de Luxo</span> e <span className="text-blue-600 cursor-pointer hover:underline">Política de Privacidade</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;