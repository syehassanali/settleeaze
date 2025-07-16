import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PricingCard = ({ 
  name, 
  price, 
  features, 
  isPopular = false, 
  onBookNow, 
  isCustom = false,
  totalPrice = null
}) => {
  return (
    <div className={`
      relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${isPopular 
        ? 'border-indigo-500 scale-105 shadow-xl' 
        : 'border-gray-100 hover:border-indigo-200'
      }
      ${isCustom ? 'border-dashed border-gray-300' : ''}
    `}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Package Name */}
        <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-indigo-600' : 'text-gray-800'}`}>
          {name}
        </h3>

        {/* Price */}
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {!isCustom && totalPrice && (
            <span className="text-gray-500 ml-1">/package</span>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {feature.included ? (
                <FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
              ) : (
                <FaTimes className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onBookNow({ name, price, features, totalPrice, isCustom })}
          className={`
            w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
            ${isPopular 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg' 
              : isCustom
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }
          `}
        >
          {isCustom ? 'Build Custom Package' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default PricingCard; 