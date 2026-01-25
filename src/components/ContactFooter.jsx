import { Mail, Linkedin, Instagram, Facebook } from 'lucide-react';

const ContactFooter = () => {
  return (
    <footer className="relative z-40 py-12 px-6 mt-32 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">Vamos construir algo juntos?</h2>
          <p className="text-cyan-400">Entre em contato para discutirmos seu próximo projeto.</p>
          <p className="text-slate-400">Contrate Nossas Soluções para seu negócio!</p>
        </div>

        <div className="flex items-center gap-6">
          {/* LinkedIn: Blue #0A66C2 */}
          <SocialLink 
            href="https://www.linkedin.com/in/nat%C3%A3-k-a63056137/" 
            icon={<Linkedin size={24} />} 
            label="LinkedIn" 
            className="hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white"
          />

          {/* Instagram: Gradient Purple/Pink/Orange - approximated with pink/purple for simplicity or custom class */}
          <SocialLink 
            href="https://www.instagram.com/devnkimberly/?hl=pt-br" 
            icon={<Instagram size={24} />} 
            label="Instagram"
            className="hover:bg-linear-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:border-pink-500 hover:text-white"
          />

          {/* Facebook: Blue #1877F2 */}
          <SocialLink 
            href="https://www.facebook.com/profile.php?id=61581919812272" 
            icon={<Facebook size={24} />} 
            label="Facebook"
            className="hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white"
          />
          
          {/* Email: White */}
          <a 
            href="mailto:natankimberly97@gmail.com"
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 hover:bg-white border border-cyan-500/30 text-cyan-400 hover:text-black transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            title="Enviar E-mail"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
      
      <div className="mt-12 text-center pt-8 border-t border-white/5 text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Natã Kimberly. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label, className }) => (
  <a 
    href={href}
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/50 border border-white/5 text-slate-300 transition-all hover:scale-110 ${className}`}
    aria-label={label}
  >
    {icon}
  </a>
);

export default ContactFooter;
