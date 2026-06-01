"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, Package, Users } from "lucide-react";

interface StatProps {
  from: number;
  to: number;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

function StatCard({ from, to, label, icon, delay }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 1.4,
        ease: "easeOut",
        delay: delay,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [from, to, isInView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="relative bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-[3px] transition-all duration-300 flex flex-col items-center text-center group overflow-hidden"
    >
      {/* Top animating gold bar */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
        className="absolute top-0 start-0 w-full h-[3px] bg-[#C9A84C] origin-left rtl:origin-right"
      />
      
      <div className="mb-4 text-[#1B2D6B] opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      
      <div className="font-serif text-[52px] font-bold text-[#1B2D6B] mb-2 leading-none" dir="ltr">
        {count}+
      </div>
      
      <div className="w-10 h-[2px] bg-[#C9A84C] mb-5 rounded-full opacity-70"></div>
      
      <div className="uppercase tracking-[0.2em] text-[11px] font-bold text-gray-800 mb-2">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsCounter({ dict }: { dict: any }) {
  const stats = [
    { 
      label: dict.years, 
      value: 40, 
      icon: <Clock size={28} strokeWidth={1.5} />
    },
    { 
      label: dict.products, 
      value: 1500, 
      icon: <Package size={28} strokeWidth={1.5} />
    },
    { 
      label: dict.clients, 
      value: 1000, 
      icon: <Users size={28} strokeWidth={1.5} />
    },
  ];

  return (
    <section className="bg-gray-50 py-24 border-b border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <StatCard 
              key={idx} 
              from={0} 
              to={stat.value} 
              label={stat.label} 
              icon={stat.icon}
              delay={idx * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
