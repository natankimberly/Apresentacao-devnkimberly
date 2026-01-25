import { motion as Motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { BookOpen, Target, Briefcase, Cpu, Code2 } from 'lucide-react';

const TimelineCard = ({ title, icon, children, alignment, delay }) => {
  const defaultOptions = {
    reverse: false,
    max: 20,
    perspective: 1000,
    scale: 1.02,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    gyro: true
  }

  return (
    <Motion.div
      initial={{ opacity: 0, x: alignment === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, type: "spring" }}
      className={`relative w-full md:w-[45%] mb-12 ${alignment === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      {/* Visual Connector Line to center */}
      <div className={`hidden md:block absolute top-10 w-[55%] h-[2px] bg-linear-to-r from-cyan-500/50 to-transparent ${alignment === 'left' ? 'right-[-55%] rotate-0' : 'left-[-55%] rotate-180'}`}></div>
      <div className={`hidden md:block absolute top-9 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan] ${alignment === 'left' ? 'right-[-55px]' : 'left-[-55px]'}`}></div>

      <Tilt options={defaultOptions} className="h-full">
        <div className="h-full p-10 md:p-12 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-colors shadow-2xl group">
          <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-6">
            <div className="p-4 rounded-2xl bg-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                {icon}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">{title}</h3>
          </div>
          <div className="text-lg md:text-xl text-slate-300 leading-relaxed font-light space-y-6">
            {children}
          </div>
        </div>
      </Tilt>
    </Motion.div>
  );
};

const TimelineSection = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 py-20 flex flex-col pt-[40vh]"> {/* pt-[40vh] determines when it starts appearing relative to flow */}
      
      {/* Central Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-transparent via-cyan-900/50 to-transparent -translate-x-1/2"></div>
      
      {/* Objetivo */}
      <TimelineCard title="Objetivo" icon={<Target />} alignment="left" delay={0.2}>
        <p>
            Brasileiro, 28 Anos - habilitado.
        </p>
        <p>
            Possuo experiência na área do comércio, rotinas administrativas e departamento pessoal. 
            Atualmente trabalho como <strong>Analista de Suporte de TI</strong> em uma grande empresa do ramo de transportes nacional 🚛.
        </p>
        <p className="font-medium text-cyan-200">
            Meu Objetivo é apresentar as minhas capacidades de desenvolvimento para seu novo site ou aplicação.
        </p>
      </TimelineCard>

      {/* Formação */}
      <TimelineCard title="Formação" icon={<BookOpen />} alignment="right" delay={0.2}>
        <p className="mb-2 font-bold text-white">Graduação: Tecnologia em Análise e Desenvolvimento de Sistemas pelo campus IFMT - Universidade Federal de Mato Grosso - Campus Rondonópolis</p>
        <ul className="space-y-3">
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Algoritmos & Lógica:</strong> Estruturação de pensamento para resolver problemas complexos com eficiência.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Engenharia de Software:</strong> Arquitetura, ciclos de vida e qualidade de código para sistemas escaláveis.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Banco de Dados:</strong> Modelagem relacional, integridade e performance.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Programação Web & Mobile:</strong> Interfaces intuitivas e fluidas em ecossistemas modernos.</span>
            </li>
        </ul>
      </TimelineCard>

      {/* Experiências */}
      <TimelineCard title="Experiências de Trabalho" icon={<Briefcase />} alignment="left" delay={0.2}>
        <p className="text-lg font-semibold text-white mb-2">Analista de Suporte em uma grande transportadora Nacional com diversas responsabilidades:</p>
        <ul className="space-y-3">
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">File Servers:</strong> Gestão centralizada de dados com segurança e redundância.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Windows Servers:</strong> Conhecimentos em Windows Server e Active Directory, Acessos Terminal Servers (TS) uso dos sistemas da empresa remotamente pelos funcionários de diversas filiais espalhadas pelo país.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Firewall & Segurança:</strong> Blindagem de infraestrutura (NATs, Rules, Vlans, controle da rede interna).</span>
            </li>
            
            <li className="flex gap-2">
                <span className="text-cyan-500">▹</span>
                <span><strong className="text-slate-200">Sistemas Diversos:</strong> Controle operacional, Suporte ao usuário, supervisão de ferramentas coorporativas.</span>
            </li>
        </ul>
      </TimelineCard>

      {/* Capacidades */}
      <TimelineCard title="Capacidades" icon={<Cpu />} alignment="right" delay={0.2}>
        <p className="italic text-cyan-200 mb-4 border-l-2 border-cyan-500 pl-3">
            "Minha jornada une a estabilidade da infraestrutura à inovação do desenvolvimento."
        </p>
        <p className="mb-4">
            Desenvolvo aplicações Fullstack prontas para o mundo real usando <strong>JavaScript (Next.js/React), TypeScript, Node.js, PHP (Laravel), Python, Go, entre outras tecnologias</strong>, são um exemplo que, com ajuda das ferramentas certas (IA), podemos criar soluções incríveis.
        </p>
        <p className="mb-4">
            Minha experiência com servidores e redes me permite projetar toda a arquitetura de Software desde o levantamento de requisitos, até o deploy e produção. Além disso, crio soluções <strong>Mobile</strong> que levam a gestão empresarial para a palma da mão.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
            {['React', 'Next.js', 'Node.js', 'PHP Laravel', 'Python','Go', 'Mobile', 'Infraestrutura', 'Redes'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-400">
                    {tech}
                </span>
            ))}
        </div>
      </TimelineCard>
      
      {/* Title separator for Projects */}
      <div className="text-center mt-20 mb-10">
         <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-900/80 border border-violet-500/30 text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <Code2 size={40} className="mr-3" />
            <span className="text-3xl font-bold text-white uppercase tracking-widest">Desenvolvimento</span>
         </div>
      </div>

    </div>
  );
};

export default TimelineSection;
