import React, { useState } from 'react';
import { FaCheck, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { serviceOptions, calculateTotalPrice } from '../data/serviceOptions';

const CustomPackageBuilder = ({ open, onClose, onBookCustom }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [showAllFeatures, setShowAllFeatures] = useState({});

  if (!open) return null;

  const addService = (serviceId, optionName) => {
    const existingIndex = selectedServices.findIndex(s => s.id === serviceId);
    if (existingIndex >= 0) {
      // Update existing service
      const updated = [...selectedServices];
      updated[existingIndex] = { id: serviceId, option: optionName };
      setSelectedServices(updated);
    } else {
      // Add new service
      setSelectedServices([...selectedServices, { id: serviceId, option: optionName }]);
    }
  };

  const removeService = (serviceId) => {
    setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
  };

  const getSelectedServiceOption = (serviceId) => {
    const service = selectedServices.find(s => s.id === serviceId);
    return service ? service.option : null;
  };

  const totalPrice = calculateTotalPrice(selectedServices);

  const handleBookCustom = () => {
    const customPackage = {
      name: 'Custom Package',
      price: `$${totalPrice}`,
      services: selectedServices.map(service => {
        const serviceData = serviceOptions[service.id];
        const option = serviceData.options.find(opt => opt.name === service.option);
        return {
          serviceName: serviceData.name,
          optionName: service.option,
          price: option.price,
          features: option.features
        };
      }),
      totalPrice: totalPrice
    };
    onBookCustom(customPackage);
  };

  const handleClose = () => {
    setSelectedServices([]);
    setExpandedService(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Build Your Custom Package</h2>
              <p className="text-indigo-100 mt-1">Mix and match services to create your perfect arrival package</p>
            </div>
            <button 
              onClick={handleClose}
              className="text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Services Selection */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Available Services</h3>
            
            <div className="space-y-4">
              {Object.entries(serviceOptions).map(([serviceId, service]) => (
                <div key={serviceId} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Service Header */}
                  <div 
                    className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setExpandedService(expandedService === serviceId ? null : serviceId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSelectedServiceOption(serviceId) && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Selected: {getSelectedServiceOption(serviceId)}
                          </span>
                        )}
                        <span className="text-gray-400">
                          {expandedService === serviceId ? <FaMinus /> : <FaPlus />}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Options */}
                  {expandedService === serviceId && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {service.options.map((option) => {
                          const isExpanded = showAllFeatures[serviceId + option.name];
                          return (
                            <div 
                              key={option.name}
                              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                getSelectedServiceOption(serviceId) === option.name
                                  ? 'border-indigo-500 bg-indigo-50'
                                  : 'border-gray-200 hover:border-indigo-300'
                              }`}
                              onClick={() => addService(serviceId, option.name)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-gray-800">{option.name}</h5>
                                <span className="text-lg font-bold text-indigo-600">${option.price}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                              <ul className="space-y-1">
                                {(isExpanded ? option.features : option.features.slice(0, 3)).map((feature, index) => (
                                  <li key={index} className="flex items-center text-xs text-gray-600">
                                    <FaCheck className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              {option.features.length > 3 && (
                                <button
                                  type="button"
                                  className="text-xs text-blue-600 mt-2 underline hover:text-blue-800 focus:outline-none"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setShowAllFeatures(prev => ({
                                      ...prev,
                                      [serviceId + option.name]: !isExpanded
                                    }));
                                  }}
                                >
                                  {isExpanded ? 'Show Less' : `Show All (${option.features.length})`}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-96 bg-gray-50 p-6 border-l border-gray-200 flex flex-col">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Custom Package</h3>
            
            {selectedServices.length === 0 ? (
              <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">📦</div>
                <p className="text-gray-500">Select services to build your package</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
                  {selectedServices.map((service) => {
                    const serviceData = serviceOptions[service.id];
                    const option = serviceData.options.find(opt => opt.name === service.option);
                    return (
                      <div key={service.id} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-semibold text-gray-800">{serviceData.name}</h5>
                            <p className="text-sm text-gray-600">{service.option}</p>
                          </div>
                          <button
                            onClick={() => removeService(service.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FaTimes className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{option.features.length} features</span>
                          <span className="font-semibold text-indigo-600">${option.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 pt-4 flex-shrink-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">${totalPrice}</span>
                  </div>
                  
                  <button
                    onClick={handleBookCustom}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Book Custom Package
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPackageBuilder; 