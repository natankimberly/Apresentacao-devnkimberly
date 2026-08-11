import { BookOpen, Cpu, Target } from "lucide-react";
import { TimelineCard } from "./TimelineSection";

const ICON = 22;

const NataProfileTimeline = () => {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-3 pb-2 pt-2 md:px-4">
      <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-cyan-900/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <TimelineCard
        title="Objetivo"
        icon={<Target size={ICON} />}
        alignment="left"
        delay={0.05}
        compact
      >
        <p>Brasileiro, 29 Anos - habilitado.</p>
        <p>
          Possuo experiência na área do comércio, rotinas administrativas e
          departamento pessoal. Atualmente trabalho como{" "}
          <strong className="text-white">Programador / Desenvolvedor Fullstack</strong> em
          uma grande empresa do ramo de transportes nacional 🚛.
        </p>
        <p className="font-medium text-cyan-200">
          Meu Objetivo é apresentar as minhas capacidades de desenvolvimento para
          seu novo site ou aplicação.
        </p>
      </TimelineCard>

      <TimelineCard
        title="Formação"
        icon={<BookOpen size={ICON} />}
        alignment="right"
        delay={0.08}
        compact
      >
        <p className="mb-2 font-bold text-white">
          Graduação: Tecnologia em Análise e Desenvolvimento de Sistemas pelo
          campus IFMT - Universidade Federal de Mato Grosso - Campus
          Rondonópolis
        </p>
        <ul className="space-y-3">
          <li className="flex gap-2">
            <span className="text-cyan-500 shrink-0">▹</span>
            <span>
              <strong className="text-slate-200">Algoritmos & Lógica:</strong>{" "}
              Estruturação de pensamento para resolver problemas complexos com
              eficiência.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500 shrink-0">▹</span>
            <span>
              <strong className="text-slate-200">Engenharia de Software:</strong>{" "}
              Arquitetura, ciclos de vida e qualidade de código para sistemas
              escaláveis.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500 shrink-0">▹</span>
            <span>
              <strong className="text-slate-200">Banco de Dados:</strong>{" "}
              Modelagem relacional, integridade e performance.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500 shrink-0">▹</span>
            <span>
              <strong className="text-slate-200">Programação Web & Mobile:</strong>{" "}
              Interfaces intuitivas e fluidas em ecossistemas modernos.
            </span>
          </li>
        </ul>
      </TimelineCard>

      <TimelineCard
        title="Capacidades"
        icon={<Cpu size={ICON} />}
        alignment="left"
        delay={0.1}
        compact
      >
        <p className="italic text-cyan-200 mb-4 border-l-2 border-cyan-500 pl-3">
          &quot;Minha jornada une a estabilidade da infraestrutura à inovação do
          desenvolvimento.&quot;
        </p>
        <p className="mb-4">
          Desenvolvo aplicações Fullstack prontas para resolver problemas reais, automatizando processos e melhorando a eficiência das empresas usando{" "}
          <strong>
            JavaScript (Next.js/Vue.js/React), TypeScript, Node.js, Next.js, PHP (Laravel),
            Python, Go,
          </strong>
          entre outras muitas tecnologias no mercado atual, são um exemplo que, com ajuda das ferramentas certas (IA), e com conhecimento em arquitetura de software podemos que o estudante de programação pode se tornar um desenvolvedor profissional e criar soluções incríveis e escaláveis para empresas de todos os portes.
        </p>
        <p>
          Minha experiência com servidores e redes me permite projetar toda a
          arquitetura de Software desde o levantamento de requisitos, até o
          deploy e produção. Além disso, crio soluções{" "}
          <strong>Mobile</strong> que levam a gestão empresarial para a palma da
          mão.
        </p>
      </TimelineCard>
    </div>
  );
};

export default NataProfileTimeline;
