import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  color: 'purple' | 'blue' | 'green' | 'orange';
  trend?: {
    value: string;
    isUp: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, trend }) => {
  const colorClasses = {
    purple: 'from-purple-500 via-pink-500 to-purple-600',
    blue: 'from-blue-500 via-cyan-500 to-blue-600',
    green: 'from-emerald-500 via-teal-500 to-emerald-600',
    orange: 'from-orange-500 via-amber-500 to-orange-600',
  };

  const glowClasses = {
    purple: 'shadow-purple-500/25',
    blue: 'shadow-cyan-500/25',
    green: 'shadow-emerald-500/25',
    orange: 'shadow-orange-500/25',
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all hover:border-white/30 group relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-2xl ${glowClasses[color]} group-hover:scale-110 transition-transform`}>
          </div>
          {trend && (
            <div className={`flex items-center text-sm px-3 py-2 rounded-full backdrop-blur-sm ${
              trend.isUp 
                ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30' 
                : 'text-red-400 bg-red-500/20 border border-red-500/30'
            }`}>
              <span className="font-medium">{trend.value}</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
            {value}
          </h3>
          <p className="text-gray-300/80 text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;