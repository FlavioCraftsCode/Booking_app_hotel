import React from 'react';
import { Globe, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerColumns = [
        {
            title: "Cidades",
            links: ["Dublin", "Austin", "Reno", "João Pessoa", "São Paulo", "Rio de Janeiro"]
        },
        {
            title: "Categorias",
            links: ["Hotéis", "Apartamentos", "Resorts", "Villas", "Cabanas", "Casas de Campo"]
        },
        {
            title: "Suporte",
            links: ["Centro de Ajuda", "Segurança", "Termos e Condições", "Privacidade", "Como funciona"]
        },
        {
            title: "LuxeStay",
            links: ["Sobre nós", "Carreiras", "Blog", "Investidores", "Parcerias"]
        }
    ];

    return (
        <footer className="w-full bg-white border-t border-gray-200 pt-12 mt-auto">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {footerColumns.map((col, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                                {col.title}
                            </h4>
                            <ul className="flex flex-col gap-2">
                                {col.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-sm text-gray-600 hover:text-brand-primary transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="border-gray-100" />

                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-xl font-black tracking-tighter text-brand-dark">
                            Luxe<span className="text-brand-primary">Stay.com</span>
                        </span>
                        <p className="text-xs text-gray-500">
                            © {currentYear} LuxeStay - Todos os direitos reservados.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-all">
                            <Globe size={18} />
                            Português (BR)
                        </button>
                        <button className="text-sm font-bold text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-all">
                            R$ BRL
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                            <a key={idx} href="#" className="p-2 text-gray-600 hover:text-brand-primary hover:bg-orange-50 rounded-full transition-all">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-brand-dark py-4 text-center">
                <p className="text-[10px] text-gray-400 px-6">
                    O LuxeStay.com faz parte do grupo Luxe Group Inc., líder mundial em viagens online e serviços relacionados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
