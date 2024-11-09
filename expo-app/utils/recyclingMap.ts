// Define recycling categories
export type RecyclingCategory = {
  category: 'Recyclable' | 'Compost' | 'Landfill' | 'Special Disposal' | 'Unknown';
  instructions: string;
  additionalInfo?: string;
  preparation?: string[];
  commonMistakes?: string[];
};

// Define common materials and their recycling categories
const commonMaterials: { [key: string]: RecyclingCategory } = {
  'Plastic': {
    category: 'Recyclable',
    instructions: 'Check the recycling number and rinse clean',
    additionalInfo: 'Only plastics #1 (PET) and #2 (HDPE) are widely recyclable',
    preparation: [
      'Remove all contents',
      'Rinse thoroughly',
      'Remove labels if possible',
      'Compress to save space'
    ],
    commonMistakes: [
      'Leaving food residue',
      'Including plastic bags with regular recycling',
      'Not checking the recycling number'
    ]
  },
  'Glass': {
    category: 'Recyclable',
    instructions: 'Separate by color if required by your local facility',
    additionalInfo: 'Window glass and drinking glasses are NOT recyclable',
    preparation: [
      'Remove caps and lids',
      'Rinse thoroughly',
      'Remove any non-glass parts',
      'Do not break or crush'
    ],
    commonMistakes: [
      'Including ceramics or porcelain',
      'Including light bulbs',
      'Including broken window glass'
    ]
  },
  'Metal': {
    category: 'Recyclable',
    instructions: 'Most metal containers and aluminum items are recyclable',
    preparation: [
      'Rinse clean',
      'Remove paper labels when possible',
      'Crush if space is needed'
    ],
    commonMistakes: [
      'Including paint cans with wet paint',
      'Not removing food residue',
      'Including pressurized containers'
    ]
  },
  'Paper': {
    category: 'Recyclable',
    instructions: 'Keep dry and clean',
    additionalInfo: 'Shredded paper should be contained in a paper bag',
    preparation: [
      'Remove plastic windows from envelopes',
      'Remove staples and paper clips',
      'Keep dry and uncontaminated'
    ],
    commonMistakes: [
      'Including greasy or food-stained paper',
      'Including thermal receipt paper',
      'Including paper towels or tissues'
    ]
  },
  'Wood': {
    category: 'Special Disposal',
    instructions: 'Check local guidelines for wood recycling facilities',
    additionalInfo: 'Treated wood requires special handling',
    preparation: [
      'Remove nails and hardware',
      'Separate treated from untreated wood',
      'Break down into manageable pieces'
    ]
  },
  'Textile': {
    category: 'Special Disposal',
    instructions: 'Donate if in good condition, or find textile recycling programs',
    preparation: [
      'Clean and dry before donation',
      'Separate by material type if possible',
      'Check for local textile recycling programs'
    ]
  },
  'Building Material': {
    category: 'Special Disposal',
    instructions: 'Contact construction waste recycling facilities',
    additionalInfo: 'Many materials can be recycled or reused in construction',
    preparation: [
      'Sort by material type',
      'Remove hazardous materials',
      'Break down into manageable pieces',
      'Check local construction recycling programs'
    ],
    commonMistakes: [
      'Mixing different materials',
      'Not checking for asbestos or lead',
      'Improper disposal of hazardous materials'
    ]
  }
};

// Define specific items and their recycling categories
const specificItems: { [key: string]: RecyclingCategory } = {
  'Bottle': {
    category: 'Recyclable',
    instructions: 'Rinse and place in recycling bin',
    preparation: [
      'Remove cap',
      'Empty completely',
      'Rinse thoroughly',
      'Crush if plastic'
    ]
  },
  'Plastic Bag': {
    category: 'Special Disposal',
    instructions: 'Return to grocery store collection points',
    additionalInfo: 'Do not place in regular recycling bin',
    preparation: [
      'Clean and dry',
      'Remove receipts and debris',
      'Bundle multiple bags together'
    ]
  },
  'Battery': {
    category: 'Special Disposal',
    instructions: 'Take to designated battery recycling locations',
    additionalInfo: 'Different types require different handling',
    preparation: [
      'Tape terminal ends of lithium batteries',
      'Keep dry',
      'Sort by battery type if possible'
    ],
    commonMistakes: [
      'Throwing in regular trash',
      'Not taping battery terminals',
      'Missing battery recycling events'
    ]
  },
  'Electronics': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'May contain valuable and hazardous materials',
    preparation: [
      'Remove batteries',
      'Delete personal data',
      'Keep all components together'
    ]
  },
  'Coffee Cup': {
    category: 'Landfill',
    instructions: 'Most coffee cups are not recyclable due to plastic lining',
    additionalInfo: 'Consider using a reusable cup',
    preparation: [
      'Remove plastic lid (recycle separately)',
      'Empty all liquids'
    ]
  },
  'Pizza Box': {
    category: 'Compost',
    instructions: 'If heavily soiled with grease, compost instead of recycle',
    preparation: [
      'Remove any non-paper items',
      'Tear into smaller pieces if composting'
    ]
  },
  'Aluminum Foil': {
    category: 'Recyclable',
    instructions: 'Clean foil can be recycled',
    preparation: [
      'Clean off all food residue',
      'Ball up clean foil into fist-sized balls',
      'Check for food contamination'
    ]
  },
  'Light Bulb': {
    category: 'Special Disposal',
    instructions: 'Different types require different disposal methods',
    additionalInfo: 'LED, CFL, and fluorescent bulbs contain hazardous materials',
    preparation: [
      'Do not break',
      'Store in original packaging if possible',
      'Take to hardware store recycling programs'
    ]
  },
  'Milk Carton': {
    category: 'Recyclable',
    instructions: 'Rinse and flatten',
    preparation: [
      'Rinse thoroughly',
      'Remove plastic spout if present',
      'Flatten to save space'
    ]
  },
  'Paint Can': {
    category: 'Special Disposal',
    instructions: 'Take to hazardous waste collection',
    preparation: [
      'Keep lid sealed',
      'Store upright',
      'Never pour paint down drains'
    ]
  },
  'Styrofoam': {
    category: 'Landfill',
    instructions: 'Most facilities do not recycle styrofoam',
    additionalInfo: 'Consider alternatives to styrofoam packaging',
    preparation: [
      'Break into smaller pieces',
      'Check for local specialty recyclers'
    ]
  },
  'Computer': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains valuable materials and potential hazardous components',
    preparation: [
      'Back up important data',
      'Securely wipe personal information',
      'Remove batteries if applicable',
      'Keep all components together'
    ],
    commonMistakes: [
      'Throwing in regular trash',
      'Not removing personal data',
      'Separating components'
    ]
  },
  'Laptop': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains battery and sensitive components',
    preparation: [
      'Back up important data',
      'Securely wipe personal information',
      'Remove battery if possible',
      'Include charging cable'
    ],
    commonMistakes: [
      'Disposing with regular trash',
      'Not removing personal data',
      'Improper battery disposal'
    ]
  },
  'Monitor': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'May contain hazardous materials, especially older CRT models',
    preparation: [
      'Disconnect all cables',
      'Keep screen intact',
      'Package safely for transport'
    ],
    commonMistakes: [
      'Breaking the screen',
      'Regular trash disposal',
      'Not checking for local e-waste events'
    ]
  },
  'Computer Keyboard': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains electronic components and plastic',
    preparation: [
      'Remove batteries if wireless',
      'Clean of debris',
      'Bundle cables neatly'
    ]
  },
  'Computer Hardware': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'May contain valuable metals and sensitive components',
    preparation: [
      'Remove any storage devices',
      'Keep components intact',
      'Package safely'
    ]
  },
  'Furniture': {
    category: 'Special Disposal',
    instructions: 'Check local donation centers or furniture recycling options',
    additionalInfo: 'Many items can be donated if in good condition',
    preparation: [
      'Clean thoroughly',
      'Disassemble if required',
      'Remove non-furniture attachments',
      'Check for donation eligibility'
    ],
    commonMistakes: [
      'Leaving at curbside without checking local rules',
      'Not considering donation',
      'Not breaking down large pieces'
    ]
  },
  'Table': {
    category: 'Special Disposal',
    instructions: 'Consider donation or furniture recycling',
    additionalInfo: 'Material type affects disposal method',
    preparation: [
      'Clean thoroughly',
      'Disassemble if possible',
      'Sort materials (wood, metal, glass)',
      'Check local donation options'
    ]
  },
  'Desk': {
    category: 'Special Disposal',
    instructions: 'Consider donation or furniture recycling',
    additionalInfo: 'Office furniture often has specific recycling programs',
    preparation: [
      'Remove all contents',
      'Disassemble if possible',
      'Separate materials by type',
      'Check with office supply stores for recycling programs'
    ]
  },
  'Chair': {
    category: 'Special Disposal',
    instructions: 'Consider donation or furniture recycling',
    additionalInfo: 'Many chairs can be reupholstered or donated',
    preparation: [
      'Clean thoroughly',
      'Check structural integrity',
      'Remove any detachable cushions',
      'Contact local donation centers'
    ],
    commonMistakes: [
      'Leaving at curbside without permission',
      'Not checking donation options',
      'Throwing away repairable items'
    ]
  },
  'Bed': {
    category: 'Special Disposal',
    instructions: 'Contact mattress recycling facilities or furniture disposal services',
    additionalInfo: 'Many areas have specific mattress recycling programs',
    preparation: [
      'Strip all bedding',
      'Check for bed bug infestation',
      'Disassemble frame if possible',
      'Contact specialty recyclers'
    ],
    commonMistakes: [
      'Illegal dumping',
      'Not checking local mattress recycling programs',
      'Putting in regular trash'
    ]
  },
  'Door': {
    category: 'Special Disposal',
    instructions: 'Contact construction material recycling centers or salvage yards',
    additionalInfo: 'Wooden doors can often be refinished and reused',
    preparation: [
      'Remove hardware (handles, hinges)',
      'Separate materials (wood, metal, glass)',
      'Check with architectural salvage companies'
    ]
  },
  'Flooring': {
    category: 'Special Disposal',
    instructions: 'Material-specific recycling required',
    additionalInfo: 'Different types (carpet, wood, vinyl) have different disposal methods',
    preparation: [
      'Separate by material type',
      'Remove nails and staples',
      'Cut into manageable pieces',
      'Contact specialty recyclers'
    ]
  },
  'Bag': {
    category: 'Special Disposal',
    instructions: 'Consider donation or textile recycling',
    additionalInfo: 'Many materials can be recycled or reused',
    preparation: [
      'Empty all contents',
      'Clean thoroughly',
      'Check condition for donation',
      'Find local textile recycling programs'
    ]
  },
  'Handbag': {
    category: 'Special Disposal',
    instructions: 'Consider donation or textile/leather recycling',
    additionalInfo: 'Quality items can often be resold or donated',
    preparation: [
      'Empty all contents',
      'Clean thoroughly',
      'Check condition for donation',
      'Research leather recycling options'
    ]
  },
  'Home Decor': {
    category: 'Special Disposal',
    instructions: 'Consider donation or material-specific recycling',
    additionalInfo: 'Many items can be upcycled or donated',
    preparation: [
      'Sort by material type',
      'Clean items thoroughly',
      'Check donation eligibility',
      'Separate recyclable components'
    ]
  },

  // Clothing & Footwear
  'Clothing': {
    category: 'Special Disposal',
    instructions: 'Donate if in good condition, or use textile recycling programs',
    additionalInfo: 'Many retailers offer clothing recycling programs',
    preparation: [
      'Clean and dry all items',
      'Sort by condition (donatable vs recyclable)',
      'Check local textile recycling options',
      'Remove non-textile elements'
    ],
    commonMistakes: [
      'Throwing away reusable clothing',
      'Donating damaged items',
      'Not checking for textile recycling programs'
    ]
  },
  'Footwear': {
    category: 'Special Disposal',
    instructions: 'Consider donation or specialty shoe recycling programs',
    additionalInfo: 'Some athletic shoe brands have recycling programs',
    preparation: [
      'Clean thoroughly',
      'Tie pairs together',
      'Check condition for donation',
      'Research brand-specific recycling programs'
    ],
    commonMistakes: [
      'Throwing away repairable shoes',
      'Not checking brand recycling programs',
      'Mixing with regular trash'
    ]
  },
  'Shoe': {
    category: 'Special Disposal',
    instructions: 'Consider donation or specialty shoe recycling programs',
    additionalInfo: 'Many shoe materials can be recycled into new products',
    preparation: [
      'Clean thoroughly',
      'Keep pairs together',
      'Remove removable insoles',
      'Check local shoe recycling options'
    ]
  },
  'Sneaker': {
    category: 'Special Disposal',
    instructions: 'Check manufacturer recycling programs',
    additionalInfo: 'Many athletic brands have take-back programs',
    preparation: [
      'Clean thoroughly',
      'Remove laces and insoles',
      'Check brand-specific recycling programs',
      'Consider donation if in good condition'
    ]
  },

  // Hazardous Materials
  'Ammunition': {
    category: 'Special Disposal',
    instructions: 'Contact local law enforcement or licensed disposal facility',
    additionalInfo: 'Never dispose of ammunition in regular trash or recycling',
    preparation: [
      'Keep in original container if possible',
      'Do not attempt to dismantle',
      'Contact police department for disposal options',
      'Never incinerate'
    ],
    commonMistakes: [
      'Throwing in regular trash',
      'Attempting to dismantle',
      'Not contacting proper authorities'
    ]
  },
  'Weapon': {
    category: 'Special Disposal',
    instructions: 'Contact local law enforcement for proper disposal',
    additionalInfo: 'Weapons require special handling and documentation',
    preparation: [
      'Ensure weapon is safe/unloaded',
      'Contact local authorities',
      'Follow legal disposal requirements',
      'Never dispose in regular trash'
    ],
    commonMistakes: [
      'Illegal disposal',
      'Not contacting authorities',
      'Attempting self-disposal'
    ]
  },

  // Accessories
  'Glove': {
    category: 'Special Disposal',
    instructions: 'Dispose based on material type',
    additionalInfo: 'Different materials require different disposal methods',
    preparation: [
      'Sort by material (leather, textile, rubber)',
      'Clean thoroughly',
      'Check for donation possibilities',
      'Research material-specific recycling'
    ],
    commonMistakes: [
      'Not separating by material type',
      'Throwing reusable items away',
      'Not checking donation options'
    ]
  },

  // Containers & Drinkware
  'Shaker': {
    category: 'Recyclable',
    instructions: 'Check material type and rinse thoroughly',
    additionalInfo: 'Most protein shakers are made of recyclable plastic',
    preparation: [
      'Disassemble all parts',
      'Clean thoroughly',
      'Remove rubber seals',
      'Check plastic recycling number'
    ],
    commonMistakes: [
      'Not separating components',
      'Leaving residue inside',
      'Recycling with mixing ball inside'
    ]
  },
  'Jug': {
    category: 'Recyclable',
    instructions: 'Rinse and remove cap before recycling',
    additionalInfo: 'Large plastic containers are typically #2 HDPE plastic',
    preparation: [
      'Empty completely',
      'Rinse thoroughly',
      'Remove handle if different material',
      'Compress to save space'
    ],
    commonMistakes: [
      'Leaving liquid inside',
      'Not checking for mold',
      'Recycling with cap attached'
    ]
  },
  'Water Jug': {
    category: 'Recyclable',
    instructions: 'Clean and recycle with plastic containers',
    additionalInfo: 'Large water jugs are usually made of #1 or #2 plastic',
    preparation: [
      'Empty completely',
      'Clean and dry',
      'Remove cap and handle if different material',
      'Check local size restrictions'
    ],
    commonMistakes: [
      'Not emptying completely',
      'Leaving labels on',
      'Including non-recyclable attachments'
    ]
  },
  'Cup': {
    category: 'Special Disposal',
    instructions: 'Disposal depends on material type',
    additionalInfo: 'Different materials require different recycling methods',
    preparation: [
      'Identify material (plastic, paper, ceramic)',
      'Clean thoroughly',
      'Remove any non-recyclable elements',
      'Sort by material type'
    ],
    commonMistakes: [
      'Not checking material type',
      'Recycling coated paper cups',
      'Not separating different materials'
    ]
  },
  'Pc': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains valuable components and potential hazardous materials',
    preparation: [
      'Back up important data',
      'Securely wipe hard drives',
      'Remove batteries if any',
      'Keep components together'
    ],
    commonMistakes: [
      'Disposing in regular trash',
      'Not removing personal data',
      'Separating valuable components'
    ]
  },

  // Electronics
  'Screen': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'May contain hazardous materials, handle with care',
    preparation: [
      'Keep screen intact',
      'Remove any stands or mounts',
      'Package safely for transport',
      'Take to e-waste facility'
    ]
  },
  'Hardware': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains recyclable metals and components',
    preparation: [
      'Sort by type',
      'Remove batteries if present',
      'Keep small parts together',
      'Check manufacturer recycling programs'
    ]
  },
  'TV': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains hazardous materials, especially older models',
    preparation: [
      'Keep screen intact',
      'Remove stand and accessories',
      'Never break or crush',
      'Use certified e-waste recyclers'
    ],
    commonMistakes: [
      'Putting in regular trash',
      'Breaking the screen',
      'Not using proper e-waste facilities'
    ]
  },
  'Mouse': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains electronic components and batteries',
    preparation: [
      'Remove batteries if applicable',
      'Coil cord neatly',
      'Keep with other e-waste',
      'Check manufacturer recycling programs'
    ]
  },

  // Food & Organic Matter
  'Food': {
    category: 'Compost',
    instructions: 'Dispose in compost bin or food waste collection',
    additionalInfo: 'Many communities have food waste programs',
    preparation: [
      'Remove packaging',
      'Separate from non-food items',
      'Check local composting guidelines',
      'Use appropriate bins'
    ]
  },
  'Cake': {
    category: 'Compost',
    instructions: 'Dispose in food waste or compost',
    additionalInfo: 'Food waste should not go in regular trash',
    preparation: [
      'Remove non-food decorations',
      'Remove any non-compostable items',
      'Place in food waste bin',
      'Check local composting guidelines'
    ]
  },
  'Cream': {
    category: 'Compost',
    instructions: 'Dispose in food waste collection',
    additionalInfo: 'Dairy products can be composted in municipal systems',
    preparation: [
      'Keep separate from packaging',
      'Use sealed containers for transport',
      'Follow local food waste guidelines'
    ]
  },
  'Dessert': {
    category: 'Compost',
    instructions: 'Dispose in food waste or compost',
    additionalInfo: 'Separate any non-food components first',
    preparation: [
      'Remove packaging',
      'Separate non-food decorations',
      'Use food waste bins'
    ]
  },

  // Toys & Decorative Items
  'Figurine': {
    category: 'Special Disposal',
    instructions: 'Disposal depends on material type',
    additionalInfo: 'Consider donation if in good condition',
    preparation: [
      'Check material composition',
      'Clean thoroughly',
      'Remove batteries if present',
      'Consider donation options'
    ]
  },
  'Toy': {
    category: 'Special Disposal',
    instructions: 'Consider donation or material-specific recycling',
    additionalInfo: 'Many toys can be donated if in good condition',
    preparation: [
      'Remove batteries',
      'Clean thoroughly',
      'Sort by material type',
      'Check donation options'
    ],
    commonMistakes: [
      'Not removing batteries',
      'Throwing away usable toys',
      'Not checking donation options'
    ]
  },

  // Bags & Accessories
  'Backpack': {
    category: 'Special Disposal',
    instructions: 'Consider donation or textile recycling',
    additionalInfo: 'Many backpacks can be repaired or donated',
    preparation: [
      'Empty all contents',
      'Clean thoroughly',
      'Check condition for donation',
      'Research textile recycling options'
    ],
    commonMistakes: [
      'Throwing away repairable items',
      'Not checking donation options',
      'Disposing with contents inside'
    ]
  },
  'Purse': {
    category: 'Special Disposal',
    instructions: 'Consider donation or textile/leather recycling',
    additionalInfo: 'Quality items can often be resold or donated',
    preparation: [
      'Empty all contents',
      'Clean thoroughly',
      'Check condition for donation',
      'Research material-specific recycling'
    ],
    commonMistakes: [
      'Not checking material type',
      'Throwing away valuable items',
      'Not considering resale'
    ]
  },
  'Accessories': {
    category: 'Special Disposal',
    instructions: 'Sort by material type for proper disposal',
    additionalInfo: 'Many accessories can be donated or recycled',
    preparation: [
      'Sort by material (metal, plastic, textile)',
      'Clean items thoroughly',
      'Remove batteries if present',
      'Check donation options'
    ],
    commonMistakes: [
      'Not separating by material',
      'Throwing away valuable items',
      'Not checking donation possibilities'
    ]
  },
  'Drawer': {
    category: 'Special Disposal',
    instructions: 'Dispose based on material type (wood, metal, plastic)',
    additionalInfo: 'Consider upcycling or repurposing',
    preparation: [
      'Remove hardware (handles, rails)',
      'Separate materials',
      'Check for reuse possibilities',
      'Contact furniture recyclers'
    ],
    commonMistakes: [
      'Not separating materials',
      'Throwing away usable pieces',
      'Not checking local furniture recycling'
    ]
  },

  'Cup': {
    category: 'Special Disposal', 
    instructions: 'Disposal depends on material type',
    additionalInfo: 'Different materials require different recycling methods',
    preparation: [
      'Identify material (plastic, paper, ceramic)',
      'Clean thoroughly',
      'Remove any non-recyclable elements',
      'Sort by material type'
    ],
    commonMistakes: [
      'Not checking material type',
      'Recycling coated paper cups',
      'Not separating different materials'
    ]
  },

  // Paper Products
  'Poster': {
    category: 'Recyclable',
    instructions: 'Recycle with paper products',
    additionalInfo: 'Remove any non-paper attachments',
    preparation: [
      'Remove tape, staples, or plastic coating',
      'Keep dry and clean',
      'Flatten for recycling',
      'Check for lamination'
    ],
    commonMistakes: [
      'Recycling laminated posters',
      'Not removing non-paper elements',
      'Recycling when wet or contaminated'
    ]
  },
  'Advertisement': {
    category: 'Recyclable',
    instructions: 'Recycle with paper materials',
    additionalInfo: 'Most printed materials are recyclable',
    preparation: [
      'Remove plastic wrapping',
      'Separate from non-paper materials',
      'Keep clean and dry',
      'Bundle with other paper'
    ],
    commonMistakes: [
      'Including plastic wrapping',
      'Not separating different materials',
      'Recycling glossy ads with regular paper'
    ]
  },

  // Digital/Electronic Items
  'QR Code': {
    category: 'Special Disposal',
    instructions: 'Dispose based on material type (paper or electronic display)',
    additionalInfo: 'If printed, recycle with paper; if electronic display, follow electronics disposal',
    preparation: [
      'Determine material type',
      'Remove from electronic devices if applicable',
      'Sort according to material',
      'Follow appropriate disposal method'
    ]
  },

  // Furniture
  'Shelf': {
    category: 'Special Disposal',
    instructions: 'Consider donation or material-specific recycling',
    additionalInfo: 'Can often be repurposed or donated',
    preparation: [
      'Remove all contents',
      'Disassemble if possible',
      'Sort by material type',
      'Check donation options'
    ],
    commonMistakes: [
      'Not separating materials',
      'Throwing away usable items',
      'Not checking donation centers'
    ]
  },
  'Bookcase': {
    category: 'Special Disposal',
    instructions: 'Consider donation or furniture recycling',
    additionalInfo: 'Often suitable for donation or upcycling',
    preparation: [
      'Remove all contents',
      'Disassemble if possible',
      'Sort materials (wood, metal, glass)',
      'Check local donation options'
    ]
  },
  'Cabinet': {
    category: 'Special Disposal',
    instructions: 'Consider donation or material-specific recycling',
    additionalInfo: 'Kitchen cabinets can often be reused',
    preparation: [
      'Remove hardware',
      'Clean thoroughly',
      'Separate materials',
      'Check with renovation recyclers'
    ]
  },
  'Couch': {
    category: 'Special Disposal',
    instructions: 'Consider donation or furniture recycling',
    additionalInfo: 'Many areas have specific upholstered furniture recycling',
    preparation: [
      'Clean thoroughly',
      'Remove cushions',
      'Check for reusability',
      'Contact furniture recyclers'
    ],
    commonMistakes: [
      'Leaving at curb without permission',
      'Not checking donation options',
      'Not removing non-furniture items'
    ]
  },

  // Reading Materials
  'Book': {
    category: 'Recyclable',
    instructions: 'Donate or recycle with paper products',
    additionalInfo: 'Many organizations accept book donations',
    preparation: [
      'Remove non-paper elements',
      'Check condition for donation',
      'Separate hardcover from pages if recycling',
      'Research local book drives'
    ],
    commonMistakes: [
      'Not removing hardcovers',
      'Recycling books that could be donated',
      'Not checking library acceptance'
    ]
  },
  'Publication': {
    category: 'Recyclable',
    instructions: 'Recycle with paper products',
    additionalInfo: 'Most printed materials are recyclable',
    preparation: [
      'Remove plastic covers',
      'Remove non-paper inserts',
      'Keep dry and clean',
      'Bundle with other paper'
    ]
  },

  // Electronics & Media
  'Disk': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'Contains recyclable materials and potential sensitive data',
    preparation: [
      'Securely erase data if possible',
      'Keep in protective case',
      'Do not break or scratch',
      'Check manufacturer recycling programs'
    ],
    commonMistakes: [
      'Breaking disks for security',
      'Throwing in regular trash',
      'Not protecting from scratches'
    ]
  },
  'Electrical Device': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'May contain valuable components and hazardous materials',
    preparation: [
      'Remove batteries if applicable',
      'Keep all components together',
      'Package safely',
      'Check manufacturer recycling programs'
    ],
    commonMistakes: [
      'Disposing in regular trash',
      'Not removing batteries',
      'Separating components'
    ]
  },
  'Wiring': {
    category: 'Special Disposal',
    instructions: 'Take to electronics or metal recycling center',
    additionalInfo: 'Copper wiring has valuable recycling potential',
    preparation: [
      'Remove from devices if possible',
      'Bundle neatly',
      'Separate by type if known',
      'Check scrap metal recyclers'
    ],
    commonMistakes: [
      'Throwing in regular trash',
      'Not separating by type',
      'Burning to extract metals'
    ]
  },

  // Containers & Packaging
  'Box': {
    category: 'Recyclable',
    instructions: 'Recycle with cardboard/paper materials',
    additionalInfo: 'Most boxes are highly recyclable',
    preparation: [
      'Break down flat',
      'Remove non-paper materials',
      'Keep dry and clean',
      'Bundle with other cardboard'
    ],
    commonMistakes: [
      'Not breaking down boxes',
      'Recycling wet or soiled boxes',
      'Including plastic or foam packaging'
    ]
  },

  // Appliances & Devices
  'Appliance': {
    category: 'Special Disposal',
    instructions: 'Take to appliance recycling center or contact manufacturer',
    additionalInfo: 'Many retailers offer appliance recycling with new purchase',
    preparation: [
      'Unplug and clean thoroughly',
      'Remove food and contents',
      'Secure doors and loose parts',
      'Check manufacturer take-back programs'
    ],
    commonMistakes: [
      'Disposing with regular trash',
      'Not removing hazardous components',
      'Not checking retailer recycling options'
    ]
  },
  'Device': {
    category: 'Special Disposal',
    instructions: 'Take to electronics recycling center',
    additionalInfo: 'May contain valuable and hazardous materials',
    preparation: [
      'Remove batteries',
      'Secure or erase personal data',
      'Keep all components together',
      'Check manufacturer recycling programs'
    ]
  },
  'Refrigerator': {
    category: 'Special Disposal',
    instructions: 'Contact specialized appliance recycler',
    additionalInfo: 'Contains refrigerants that require special handling',
    preparation: [
      'Empty completely',
      'Clean thoroughly',
      'Do not remove refrigerant lines',
      'Schedule professional pickup'
    ],
    commonMistakes: [
      'Attempting DIY refrigerant removal',
      'Disposing with regular trash',
      'Not using certified recyclers'
    ]
  },

  // Storage & Cabinets
  'Closet': {
    category: 'Special Disposal',
    instructions: 'Consider donation or material-specific recycling',
    additionalInfo: 'Built-in units may require professional removal',
    preparation: [
      'Remove all contents',
      'Disassemble if possible',
      'Sort materials by type',
      'Check donation possibilities'
    ],
    commonMistakes: [
      'Not separating materials',
      'Improper demolition',
      'Not checking reuse options'
    ]
  },
  'Pantry': {
    category: 'Special Disposal',
    instructions: 'Consider donation or material-specific recycling',
    additionalInfo: 'Cabinet units can often be reused',
    preparation: [
      'Remove all contents',
      'Clean thoroughly',
      'Disassemble if possible',
      'Sort by material type'
    ]
  },
  'Medicine Chest': {
    category: 'Special Disposal',
    instructions: 'Separate cabinet from medications',
    additionalInfo: 'Medications require separate disposal at pharmacy',
    preparation: [
      'Remove all medications',
      'Take medicines to pharmacy',
      'Clean thoroughly',
      'Recycle cabinet by material type'
    ],
    commonMistakes: [
      'Disposing medications in trash/drain',
      'Not separating materials',
      'Not removing all contents'
    ]
  },

  // Building Materials & Flooring
  'Floor': {
    category: 'Special Disposal',
    instructions: 'Contact construction waste recycling facilities',
    additionalInfo: 'Different flooring materials require different disposal methods',
    preparation: [
      'Identify material type (wood, carpet, tile, vinyl)',
      'Remove nails and tacks',
      'Sort by material type',
      'Check with construction recyclers'
    ],
    commonMistakes: [
      'Not identifying hazardous materials (asbestos)',
      'Mixing different materials',
      'Not checking local construction recycling options'
    ]
  },

  // Aquatic & Animal Items
  'Animal': {
    category: 'Special Disposal',
    instructions: 'Contact veterinarian or animal control for proper disposal',
    additionalInfo: 'Different animals require different disposal methods',
    preparation: [
      'Contact local veterinarian',
      'Check local regulations',
      'Never dispose in regular trash',
      'Consider burial options if permitted'
    ],
    commonMistakes: [
      'Improper disposal in regular trash',
      'Not checking local regulations',
      'Not contacting proper authorities'
    ]
  },
  'Fish': {
    category: 'Compost',
    instructions: 'Small fish can be composted or buried in garden',
    additionalInfo: 'Large quantities should be disposed through proper channels',
    preparation: [
      'Check local regulations',
      'Consider garden burial',
      'Use sealed containers if disposing',
      'Contact pet store for guidance'
    ]
  },
  'Shark': {
    category: 'Special Disposal',
    instructions: 'Contact wildlife authorities or marine specialists',
    additionalInfo: 'Protected species may have specific disposal requirements',
    preparation: [
      'Contact marine authorities',
      'Document finding if required',
      'Follow local wildlife regulations'
    ]
  },
  'Sea Life': {
    category: 'Special Disposal',
    instructions: 'Contact marine authorities or wildlife services',
    additionalInfo: 'Different species may have specific disposal requirements',
    preparation: [
      'Document the finding',
      'Contact local authorities',
      'Follow marine disposal guidelines'
    ]
  },
  'Aquatic': {
    category: 'Special Disposal',
    instructions: 'Contact appropriate authorities based on species',
    additionalInfo: 'Different aquatic life requires different disposal methods',
    preparation: [
      'Identify species if possible',
      'Contact local authorities',
      'Follow proper disposal guidelines'
    ]
  },
  'Water': {
    category: 'Special Disposal',
    instructions: 'Dispose according to content and contamination level',
    additionalInfo: 'Contaminated water requires special handling',
    preparation: [
      'Identify any contaminants',
      'Check local water disposal guidelines',
      'Never dump contaminated water in storm drains',
      'Contact authorities if hazardous'
    ],
    commonMistakes: [
      'Dumping in storm drains',
      'Not checking for contaminants',
      'Improper disposal of chemical-containing water'
    ]
  },
  'Goldfish': {
    category: 'Special Disposal',
    instructions: 'Never release into natural water bodies',
    additionalInfo: 'Can be composted or buried in garden',
    preparation: [
      'Consider garden burial',
      'Contact pet store for guidance',
      'Never flush or release into waterways',
      'Check local pet disposal guidelines'
    ],
    commonMistakes: [
      'Releasing into natural water bodies',
      'Flushing down toilet',
      'Not checking local guidelines'
    ]
  },
  'Business Card': {
    category: 'Recyclable',
    instructions: 'Recycle with paper products',
    additionalInfo: 'Remove any plastic coatings or special finishes',
    preparation: [
      'Remove any plastic elements',
      'Keep with other paper products',
      'Check for special coatings',
      'Bundle with similar items'
    ],
    commonMistakes: [
      'Recycling laminated cards',
      'Not checking for special finishes',
      'Mixing with non-paper items'
    ]
  },
  'Text': {
    category: 'Recyclable',
    instructions: 'Recycle with paper materials',
    additionalInfo: 'Printed materials are generally recyclable',
    preparation: [
      'Remove any non-paper elements',
      'Keep dry and clean',
      'Bundle with other paper'
    ]
  },
  'Cosmetics': {
    category: 'Special Disposal',
    instructions: 'Separate packaging from contents',
    additionalInfo: 'Many cosmetic containers can be recycled after cleaning',
    preparation: [
      'Empty all contents',
      'Clean containers thoroughly',
      'Separate different materials',
      'Check brand recycling programs'
    ],
    commonMistakes: [
      'Not emptying containers',
      'Mixing different materials',
      'Not checking brand take-back programs'
    ]
  },
  'Lighter': {
    category: 'Special Disposal',
    instructions: 'Ensure completely empty before disposal',
    additionalInfo: 'Contains flammable materials and requires careful handling',
    preparation: [
      'Ensure completely empty',
      'Do not crush or puncture',
      'Check local hazardous waste guidelines',
      'Never throw in regular trash while containing fuel'
    ],
    commonMistakes: [
      'Disposing with remaining fuel',
      'Throwing in regular trash',
      'Attempting to dismantle'
    ]
  },
  'Novel': {
    category: 'Recyclable',
    instructions: 'Donate or recycle with paper products',
    additionalInfo: 'Consider donating to libraries or book drives first',
    preparation: [
      'Remove non-paper covers',
      'Check condition for donation',
      'Separate hardcover from pages if recycling',
      'Research local book donation options'
    ],
    commonMistakes: [
      'Not removing hardcovers',
      'Recycling books that could be donated',
      'Not checking library acceptance'
    ]
  },
  'Ceiling Fan': {
    category: 'Special Disposal',
    instructions: 'Take to electronics/appliance recycling center',
    additionalInfo: 'Contains metal and electrical components that can be recycled',
    preparation: [
      'Disconnect from power source',
      'Remove light bulbs and shades',
      'Disassemble if possible',
      'Keep all parts together'
    ],
    commonMistakes: [
      'Disposing in regular trash',
      'Not removing light bulbs',
      'Improper disassembly'
    ]
  },
  'Light Fixture': {
    category: 'Special Disposal',
    instructions: 'Take to electronics/metal recycling center',
    additionalInfo: 'Different materials need to be separated for recycling',
    preparation: [
      'Remove all bulbs',
      'Separate materials (metal, glass, plastic)',
      'Remove any wiring',
      'Check local recycling guidelines'
    ],
    commonMistakes: [
      'Not removing bulbs',
      'Mixing different materials',
      'Improper wiring disposal'
    ]
  }
};

// Note: The following categories of labels should be excluded from recycling instructions
// as they are not physical items that can be recycled:

// Human Descriptors:
// - Face
// - Head
// - Person
// - Adult
// - Male
// - Man
// - Body Part
// - Neck
// - Hair
// - Beard

// Photography/Image Concepts:
// - Photography
// - Portrait
// - Selfie

// Instead of mapping these items, we should filter them out before showing recycling instructions.
// Let's add a helper function:

export function isRecyclableItem(label: string): boolean {
  const nonRecyclableCategories = [
    // Human descriptors
    'face', 'head', 'person', 'adult', 'male', 'man', 'body part', 
    'neck', 'hair', 'beard',
    
    // Photography concepts
    'photography', 'portrait', 'selfie',
    
    // Other concepts
    'indoors', 'interior design', 'architecture',
    'room', 'living room', 'bedroom', 'dining room'
  ];

  return !nonRecyclableCategories.includes(label.toLowerCase());
}

// Use this function before getting recycling info:
export function getRecyclingInfo(label: string): RecyclingCategory | null {
  if (!isRecyclableItem(label)) {
    return null;
  }
  
  // Convert label to lowercase for case-insensitive matching
  const normalizedLabel = label.toLowerCase();
  
  // Check for exact matches in specific items
  for (const [item, info] of Object.entries(specificItems)) {
    if (normalizedLabel.includes(item.toLowerCase())) {
      return info;
    }
  }
  
  // Check for material matches
  for (const [material, info] of Object.entries(commonMaterials)) {
    if (normalizedLabel.includes(material.toLowerCase())) {
      return info;
    }
  }
  
  // Default return if no match is found
  return {
    category: 'Unknown',
    instructions: 'Please check local recycling guidelines',
    additionalInfo: 'When in doubt, throw it out',
    preparation: ['Check local recycling guidelines', 'Contact waste management for specific instructions'],
    commonMistakes: ['Assuming all similar items are recycled the same way']
  };
}
