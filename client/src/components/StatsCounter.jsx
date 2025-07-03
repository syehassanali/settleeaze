import React from 'react';
import CountUp from 'react-countup';

const StatsCounter = () => (
  <div className="flex space-x-8 font-mono text-lg md:text-2xl">
    <div>
      <span className="text-accent font-bold"><CountUp end={5000} duration={2} />+</span> Students Served
    </div>
    <div>
      <span className="text-accent font-bold"><CountUp end={98} duration={2} />%</span> Satisfaction
    </div>
  </div>
);

export default StatsCounter;