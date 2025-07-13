const services = [
  {
    slug: 'airport-pickup',
    title: 'Airport Pickup Service',
    price: '$49',
    category: 'Airport',
    rating: 4.8,
    highlight: 'Professional meet and greet at the airport with direct transfer to your accommodation.',
    description: `Your journey starts the moment you land — and we're right there with you. Our airport pickup service ensures a smooth and welcoming arrival, removing the stress of navigating unfamiliar transport or dealing with last-minute logistics.

We'll greet you at the arrivals gate with a personalized sign and help with your luggage. From there, we'll take you directly to your accommodation — no detours or delays.

Choose your comfort level:

Standard Ride – Reliable, clean sedans or SUVs for individuals or small groups.

Luxury Ride – Executive vehicles with added comfort, privacy, and style — ideal for professionals or families.

Every ride is punctual, safe, and operated by drivers who understand the needs of newcomers.`,
    features: [
      '24/7 availability',
      'Multilingual driver',
      'Luggage assistance',
      'Live tracking & updates'
    ],
    image: '/dummy/airport.jpg',
    icon: '✈️'
  },
  {
    slug: 'sim-card-setup',
    title: 'SIM Card Setup',
    price: '$19',
    category: 'Connectivity',
    rating: 4.7,
    highlight: 'Get a local SIM card and stay connected from day one.',
    description: `Get connected without confusion. We help you set up a local SIM card as soon as you arrive — saving you the hassle of long queues, language barriers, or hidden fees.

Whether you need unlimited data, international call support, or basic connectivity — we guide you to the best plan for your needs. We'll even activate it with you and explain how top-ups and renewals work.

You'll be texting home, navigating your new city, and booking Ubers in minutes — all with a local number you can rely on.`,
    features: [
      'Instant activation',
      'Best local plans',
      'Troubleshooting support',
      'No hidden fees'
    ],
    image: '/dummy/sim.jpg',
    icon: '📱'
  },
  {
    slug: 'accommodation-assist',
    title: 'Accommodation Assistance',
    price: '$99',
    category: 'Housing',
    rating: 4.9,
    highlight: 'Find safe, affordable, and comfortable housing options.',
    description: `Finding a place to live in a new country can be overwhelming — we make it manageable and safe.

Our team works with verified listings and trusted providers to find housing options tailored to your lifestyle, visa status, and budget. We assist with rental agreements, local laws, and any documents you may need to sign.

We also help with:

Temporary vs permanent stays

Shared vs private housing

Suburb recommendations (transport, safety, community)

You'll get local insights with global support — no scams, no stress.`,
    features: [
      'Virtual tours',
      'Paperwork help',
      'Move-in support',
      'Verified listings'
    ],
    image: '/dummy/housing.jpg',
    icon: '🏠'
  },
  {
    slug: 'bank-account-setup',
    title: 'Bank Account Setup',
    price: '$29',
    category: 'Finance',
    rating: 4.6,
    highlight: 'Open a local bank account quickly and easily.',
    description: `One of the first things you'll need is a local bank account — and we'll help you get it done quickly and properly.

Whether you're a student needing a fee-free account or a worker getting ready for payroll, we guide you through appointments, paperwork, and submission.

We'll also help you understand:

Online/mobile banking

Debit vs credit cards

Transaction fees, daily limits, and savings accounts

Keeping your money safe abroad`,
    features: [
      'Document prep',
      'Appointment booking',
      'Bank comparison',
      'On-site support'
    ],
    image: '/dummy/bank.jpg',
    icon: '🏦'
  },
  {
    slug: 'city-orientation',
    title: 'City & University Orientation',
    price: '$39',
    category: 'Orientation',
    rating: 4.8,
    highlight: 'Guided tours to help you settle in and explore your new city.',
    description: `New cities can be exciting — and confusing. Our guided orientation tours help you feel like a local from day one.

We walk you through landmarks, services, and essentials — answering every question along the way.

You'll learn about:

Grocery stores, pharmacies, banks, post offices

Public transport

University campus layout

Safety tips and cultural norms

Student deals, hangouts, and best coffee spots`,
    features: [
      'Campus tours',
      'Local attractions',
      'Essential info sessions',
      'Meet other students'
    ],
    image: '/dummy/orientation.jpg',
    icon: '🗺️'
  },
  {
    slug: 'healthcare-registration',
    title: 'Healthcare Registration',
    price: '$25',
    category: 'Health',
    rating: 4.7,
    highlight: 'Get registered with local healthcare services easily.',
    description: `Healthcare can be confusing in a new country — we make it clear and accessible.

Whether it's Medicare or private insurance, we guide you through eligibility, registration, and next steps.

We also help with:

GP (doctor) registration

Finding clinics near you

Emergency contacts and when to use them

Accessing mental health, dental, and specialist care`,
    features: [
      'Insurance guidance',
      'Provider registration',
      'First appointment booking',
      'Translation support'
    ],
    image: '/dummy/health.jpg',
    icon: '🏥'
  },
  {
    slug: 'tfn-abn-assistance',
    title: 'TFN & ABN Assistance',
    price: '$35',
    category: 'Finance',
    rating: 4.6,
    highlight: 'Get your Tax File Number or Australian Business Number hassle-free.',
    description: `Tax doesn't have to be a mystery. We help you register for a Tax File Number (TFN) or Australian Business Number (ABN) — depending on your goals.

Our support includes:

Deciding whether TFN or ABN suits your needs

Step-by-step help completing applications

Explaining the Australian tax system

Setting up superannuation and understanding payslips

Avoiding delays and common mistakes`,
    features: [
      'Application guidance',
      'Document preparation',
      'Tax system explanation',
      'Superannuation setup'
    ],
    image: '/dummy/TFN & ABN.jpg',
    icon: '🧾'
  },
  {
    slug: 'part-time-job-support',
    title: 'Part-Time Job Starter Support',
    price: '$45',
    category: 'Employment',
    rating: 4.7,
    highlight: 'Land your first part-time job with confidence.',
    description: `New country, new job market? We help students and new arrivals land their first part-time job with confidence.

We cover:

Platforms like Seek, Indeed, and Jora

Building a local-style resume

Setting up TFN/ABN

Working for Uber, Doordash, Menulog

Understanding casual pay, work rights, and taxes

You'll leave ready to apply, onboard, and start earning.`,
    features: [
      'Resume building',
      'Job platform guidance',
      'Work rights education',
      'Application support'
    ],
    image: '/dummy/Parttime.jpg',
    icon: '💼'
  },
  {
    slug: 'driving-support',
    title: 'Driving & Vehicle Starter Support',
    price: '$55',
    category: 'Transport',
    rating: 4.5,
    highlight: 'Get your driver\'s licence and vehicle setup sorted.',
    description: `Want to drive or get a car in Australia? We make the whole process clear and legal — from licence to registration.

We'll help you with:

Converting your licence or applying from scratch

Learner & probationary licence steps

Australian road rules and safety

Buying your first car (Rego, insurance, inspections)

Driving for Uber or delivery apps legally`,
    features: [
      'Licence conversion',
      'Road rules education',
      'Vehicle purchase guidance',
      'Legal compliance'
    ],
    image: '/dummy/Driver.jpg',
    icon: '🚗'
  }
];

export default services; 