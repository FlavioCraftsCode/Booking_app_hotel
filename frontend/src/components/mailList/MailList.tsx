import React from 'react';

const MailList: React.FC = () => {
  return (
    <section className="w-full mt-12 bg-[#003580] p-12 flex flex-col items-center gap-4 text-white rounded-3xl shadow-xl">
      <h1 className="text-3xl font-black tracking-tight text-center">
        Economize tempo e dinheiro!
      </h1>
      <p className="text-blue-100 font-medium text-center opacity-80">
        Inscreva-se e enviaremos as melhores ofertas exclusivas para você.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mt-4">
        <input 
          type="email" 
          placeholder="Seu melhor e-mail" 
          className="flex-[3] h-14 px-6 rounded-2xl text-gray-900 outline-none font-semibold focus:ring-4 focus:ring-orange-500/30 transition-all"
        />
        <button className="flex-1 bg-[#ff6805] hover:bg-orange-600 text-white font-black px-8 h-14 rounded-2xl shadow-lg active:scale-95 transition-all uppercase text-sm tracking-widest">
          Inscrever
        </button>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <input type="checkbox" id="terms" className="accent-orange-500 w-4 h-4" />
        <label htmlFor="terms" className="text-[10px] font-bold uppercase tracking-widest opacity-60 cursor-pointer">
          Aceito receber ofertas e promoções via e-mail
        </label>
      </div>
    </section>
  );
};

export default MailList;
