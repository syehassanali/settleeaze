export const serviceOptions = {
  'airport-pickup': {
    name: 'Airport Pickup Service',
    icon: '✈️',
    description: 'Professional meet and greet at the airport with direct transfer to your accommodation.',
    options: [
      {
        name: 'Standard',
        price: 25,
        description: 'Reliable, clean sedans or SUVs for individuals or small groups.',
        features: ['Professional driver', 'Luggage assistance', 'Direct transfer', '24/7 availability']
      },
      {
        name: 'Premium',
        price: 45,
        description: 'Executive vehicles with added comfort, privacy, and style.',
        features: ['Luxury vehicle', 'Professional driver', 'Luggage assistance', 'Priority pickup', 'Refreshments']
      },
      {
        name: 'Luxury',
        price: 75,
        description: 'Top-tier vehicles with premium service and amenities.',
        features: ['Luxury vehicle', 'Professional chauffeur', 'Concierge service', 'Priority pickup', 'Refreshments', 'WiFi']
      }
    ]
  },
  'sim-card-setup': {
    name: 'SIM Card Setup',
    icon: '📱',
    description: 'Get connected without confusion with local SIM card setup.',
    options: [
      {
        name: 'Basic',
        price: 15,
        description: 'Essential connectivity with local number.',
        features: ['Local SIM card', 'Basic data plan', 'Activation support', 'Top-up guidance']
      },
      {
        name: 'Standard',
        price: 25,
        description: 'Comprehensive connectivity with international support.',
        features: ['Local SIM card', 'Unlimited data', 'International calls', 'Activation support', 'Top-up guidance']
      },
      {
        name: 'Premium',
        price: 40,
        description: 'Premium connectivity with extensive international support.',
        features: ['Local SIM card', 'Unlimited data', 'International calls', 'Premium support', 'Backup SIM', 'Travel insurance']
      }
    ]
  },
  'accommodation-assist': {
    name: 'Accommodation Assistance',
    icon: '🏠',
    description: 'Finding a place to live in a new country made manageable and safe.',
    options: [
      {
        name: '2-Star',
        price: 35,
        description: 'Budget-friendly accommodation options.',
        features: ['Shared accommodation', 'Basic amenities', 'Location guidance', 'Safety verification']
      },
      {
        name: '3-Star',
        price: 55,
        description: 'Comfortable accommodation with good amenities.',
        features: ['Private room', 'Good amenities', 'Location guidance', 'Safety verification', 'Rental assistance']
      },
      {
        name: '4-Star',
        price: 85,
        description: 'Premium accommodation with excellent amenities.',
        features: ['Private accommodation', 'Premium amenities', 'Location guidance', 'Safety verification', 'Rental assistance', 'Move-in support']
      },
      {
        name: '5-Star',
        price: 120,
        description: 'Luxury accommodation with top-tier amenities.',
        features: ['Luxury accommodation', 'Premium amenities', 'Location guidance', 'Safety verification', 'Rental assistance', 'Move-in support', 'Concierge service']
      }
    ]
  },
  'bank-account-setup': {
    name: 'Bank Account Setup',
    icon: '🏦',
    description: 'Open a local bank account quickly and properly.',
    options: [
      {
        name: 'Basic',
        price: 20,
        description: 'Essential banking setup for students.',
        features: ['Account opening', 'Document preparation', 'Basic guidance', 'Online banking setup']
      },
      {
        name: 'Standard',
        price: 35,
        description: 'Comprehensive banking setup with additional services.',
        features: ['Account opening', 'Document preparation', 'Comprehensive guidance', 'Online banking setup', 'Card setup', 'Transaction guidance']
      },
      {
        name: 'Premium',
        price: 55,
        description: 'Premium banking setup with full financial guidance.',
        features: ['Account opening', 'Document preparation', 'Premium guidance', 'Online banking setup', 'Card setup', 'Transaction guidance', 'Financial planning']
      }
    ]
  },
  'city-orientation': {
    name: 'City & University Orientation',
    icon: '🗺️',
    description: 'Guided orientation tours to help you feel like a local from day one.',
    options: [
      {
        name: 'Basic',
        price: 25,
        description: 'Essential city orientation and campus tour.',
        features: ['Campus tour', 'Basic city orientation', 'Essential services guide', 'Safety tips']
      },
      {
        name: 'Standard',
        price: 40,
        description: 'Comprehensive orientation with local insights.',
        features: ['Campus tour', 'Comprehensive city orientation', 'Essential services guide', 'Safety tips', 'Local recommendations', 'Transport guide']
      },
      {
        name: 'Premium',
        price: 65,
        description: 'Premium orientation with personalized guidance.',
        features: ['Campus tour', 'Comprehensive city orientation', 'Essential services guide', 'Safety tips', 'Local recommendations', 'Transport guide', 'Personal guide', 'Extended tour']
      }
    ]
  },
  'healthcare-registration': {
    name: 'Healthcare Registration',
    icon: '🏥',
    description: 'Healthcare registration made clear and accessible.',
    options: [
      {
        name: 'Basic',
        price: 20,
        description: 'Essential healthcare registration support.',
        features: ['Medicare registration', 'Basic guidance', 'Document assistance', 'Provider recommendations']
      },
      {
        name: 'Standard',
        price: 35,
        description: 'Comprehensive healthcare setup with additional support.',
        features: ['Medicare registration', 'Comprehensive guidance', 'Document assistance', 'Provider recommendations', 'Insurance guidance', 'Emergency contacts']
      },
      {
        name: 'Premium',
        price: 55,
        description: 'Premium healthcare setup with full support.',
        features: ['Medicare registration', 'Premium guidance', 'Document assistance', 'Provider recommendations', 'Insurance guidance', 'Emergency contacts', 'Mental health support', 'Specialist referrals']
      }
    ]
  },
  'tfn-abn-assistance': {
    name: 'TFN & ABN Assistance',
    icon: '🧾',
    description: 'Tax registration assistance for TFN or ABN.',
    options: [
      {
        name: 'TFN Only',
        price: 25,
        description: 'Tax File Number registration for employees.',
        features: ['TFN application', 'Document preparation', 'Step-by-step guidance', 'Application tracking']
      },
      {
        name: 'ABN Only',
        price: 35,
        description: 'Australian Business Number registration for business.',
        features: ['ABN application', 'Document preparation', 'Step-by-step guidance', 'Application tracking', 'Business guidance']
      },
      {
        name: 'Both TFN & ABN',
        price: 50,
        description: 'Complete tax registration for both employment and business.',
        features: ['TFN application', 'ABN application', 'Document preparation', 'Step-by-step guidance', 'Application tracking', 'Business guidance', 'Tax system explanation']
      }
    ]
  },
  'part-time-job-support': {
    name: 'Part-Time Job Support',
    icon: '💼',
    description: 'Land your first part-time job with confidence.',
    options: [
      {
        name: 'Basic',
        price: 30,
        description: 'Essential job search and application support.',
        features: ['Resume building', 'Job platform guidance', 'Application support', 'Basic interview prep']
      },
      {
        name: 'Standard',
        price: 50,
        description: 'Comprehensive job search with additional support.',
        features: ['Resume building', 'Job platform guidance', 'Application support', 'Interview prep', 'Work rights education', 'TFN/ABN setup']
      },
      {
        name: 'Premium',
        price: 80,
        description: 'Premium job search with full career guidance.',
        features: ['Resume building', 'Job platform guidance', 'Application support', 'Interview prep', 'Work rights education', 'TFN/ABN setup', 'Career planning', 'Networking support']
      }
    ]
  },
  'driving-support': {
    name: 'Driving & Vehicle Support',
    icon: '🚗',
    description: 'Get your driver\'s licence and vehicle setup sorted.',
    options: [
      {
        name: 'Licence Only',
        price: 40,
        description: 'Driver\'s licence conversion and application support.',
        features: ['Licence conversion', 'Road rules education', 'Application assistance', 'Test preparation']
      },
      {
        name: 'Licence + Vehicle',
        price: 75,
        description: 'Complete driving setup including vehicle purchase guidance.',
        features: ['Licence conversion', 'Road rules education', 'Application assistance', 'Test preparation', 'Vehicle purchase guidance', 'Registration assistance', 'Insurance guidance']
      },
      {
        name: 'Premium',
        price: 120,
        description: 'Premium driving setup with comprehensive support.',
        features: ['Licence conversion', 'Road rules education', 'Application assistance', 'Test preparation', 'Vehicle purchase guidance', 'Registration assistance', 'Insurance guidance', 'Driving lessons', 'Legal compliance']
      }
    ]
  }
};

export const getServicePrice = (serviceId, optionName) => {
  const service = serviceOptions[serviceId];
  if (!service) return 0;
  
  const option = service.options.find(opt => opt.name === optionName);
  return option ? option.price : 0;
};

export const calculateTotalPrice = (selectedServices) => {
  return selectedServices.reduce((total, service) => {
    return total + getServicePrice(service.id, service.option);
  }, 0);
}; 