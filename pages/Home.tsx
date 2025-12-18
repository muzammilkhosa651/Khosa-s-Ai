import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Wand2, Zap, ArrowRight, Stars } from 'lucide-react';

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}> = ({ title, description, icon, to, color }) => (
  <Link
    to={to}
    className="group relative p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1 overflow-hidden"
  >
    <div className={`absolute top-0 right-0 p-32 opacity-[0.03] rounded-full transform translate-x-1/2 -translate-y-1/2 ${color} blur-3xl`} />
    <div className="relative z-10">
      <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${color} text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
      <div className="flex items-center text-sm font-medium text-brand-400 group-hover:text-brand-300">
        Try now <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <div className="relative text-center space-y-8 pt-12 lg:pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 text-brand-300 text-sm font-medium backdrop-blur-sm animate-fade-in-up">
          <Stars size={14} />
          <span>Powered by Google Gemini 2.5</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Unleash Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-500">
            Creative Vision
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
          Create stunning visuals, reimagine existing photos, and enhance quality with the power of Khosa's AI. Professional grade tools for everyone.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/text-to-image"
            className="px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all shadow-lg shadow-brand-500/25 flex items-center gap-2"
          >
            Start Creating <Wand2 size={18} />
          </Link>
          <Link
            to="/enhance"
            className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all border border-slate-700 hover:border-slate-600"
          >
            Enhance Photos
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Text to Image"
          description="Turn words into art. Describe your imagination and watch it come to life with our advanced diffusion models."
          icon={<Image size={24} />}
          to="/text-to-image"
          color="bg-purple-500"
        />
        <FeatureCard
          title="Image to Image"
          description="Transform existing photos. Change styles, add elements, or completely reimagine the composition."
          icon={<Wand2 size={24} />}
          to="/image-to-image"
          color="bg-blue-500"
        />
        <FeatureCard
          title="AI Enhancement"
          description="Upscale and restore. Remove noise, sharpen details, and correct colors automatically."
          icon={<Zap size={24} />}
          to="/enhance"
          color="bg-amber-500"
        />
      </div>
    </div>
  );
};

export default Home;