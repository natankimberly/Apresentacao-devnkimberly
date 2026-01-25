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
          <SocialLink href="https://www.linkedin.com/in/nat%C3%A3-k-a63056137/" icon={<Linkedin size={24} />} label="LinkedIn" />
          <SocialLink href="https://www.instagram.com/devnkimberly/?hl=pt-br" icon={<Instagram size={24} />} label="Instagram" />
          <SocialLink href="https://www.facebook.com/profile.php?id=61581919812272" icon={<Facebook size={24} />} label="Facebook" />
          <a 
            href="mailto:natankimberly97@gmail.com"
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
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

const SocialLink = ({ href, icon, label }) => (
  <a 
    href={href}
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 text-slate-300 hover:text-white transition-all hover:scale-110"
    aria-label={label}
  >
    {icon}
  </a>
);

export default ContactFooter;
