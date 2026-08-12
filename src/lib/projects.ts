export type Project = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  filterCategory: string;
  shortDescription: string;
  description?: string;
  role: string[];
  technologies: string[];
  features: string[];
  screenshots: string[];
  video: string | null;
  caseStudy: {
    challenge: string;
    approach: string;
    result: string;
  };
  thumbnail?: string;
  poster?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  architecture?: ArchitectureNode[];
};

export type ArchitectureNode = { label: string; detail?: string };
export type ProjectMedia = { type: "image" | "video"; src: string; alt: string; poster?: string };

export const projects: Project[] = [
  {
    id: "crypto-bitcoin",
    slug: "crypto-bitcoin",
    number: "01",
    title: "Crypto Application",
    category: "CRYPTO / FINTECH",
    filterCategory: "FINTECH",
    shortDescription: "A crypto-focused digital application built around Bitcoin and cryptocurrency-related information, calculations and interactive financial functionality.",
    role: ["UI/UX Design", "Frontend Development", "Full-Stack Development"],
    technologies: ["React.js", "Node.js", "API Integration"],
    features: [
      "Bitcoin / crypto-focused experience",
      "Interactive calculations",
      "Dynamic application behavior",
      "Backend functionality",
      "Responsive interface",
      "Custom UI design",
      "Data-driven interactions",
    ],
    screenshots: [],
    video: "/videos/1.mp4",
    caseStudy: {
      challenge: "Creating a modern crypto experience where users could interact with Bitcoin-related information and perform relevant calculations through a clean and responsive interface.",
      approach: "I designed and implemented the user interface and worked on the application's functional and backend-driven behavior. The project was not just a static crypto landing page — it included real application logic, calculations and backend functionality.",
      result: "A fully functional crypto application that allows users to interact with Bitcoin data, perform calculations, and navigate a clean, responsive interface with real backend integration.",
    },
  },
  {
    id: "international-school",
    slug: "international-school",
    number: "02",
    title: "International School",
    category: "EDUCATION / WEB",
    filterCategory: "WEB",
    shortDescription: "A modern website developed for an international school with a focus on presenting school information, courses, admissions and user-facing forms.",
    role: ["Frontend Development"],
    technologies: ["Next.js"],
    features: [
      "School information",
      "Courses / programs",
      "Admission information",
      "User forms",
      "Responsive interface",
      "Structured navigation",
      "Modern frontend",
      "Clear information architecture",
    ],
    screenshots: ["/projects/school.png"],
    video: "/videos/2.mp4",
    caseStudy: {
      challenge: "Building a professional and modern digital presence for an international school while making important information easy for visitors to find.",
      approach: "I developed the complete frontend using Next.js and structured the experience around school information, courses, admissions and forms. The interface was designed to make the journey from discovering the school to exploring courses and admission information clear and easy.",
      result: "A polished, informative school website that presents courses, admissions, and school information through clear navigation and modern design.",
    },
  },
  {
    id: "custom-ecommerce",
    slug: "custom-ecommerce",
    number: "03",
    title: "Custom E-Commerce",
    category: "E-COMMERCE / FULL-STACK",
    filterCategory: "E-COMMERCE",
    shortDescription: "A custom end-to-end e-commerce platform built from scratch with a React frontend, Node.js backend, PostgreSQL database and payment gateway integration.",
    role: ["UI Development", "Frontend Development", "Backend Development", "Full-Stack Integration"],
    technologies: ["React.js", "Node.js", "PostgreSQL", "Payment Gateway"],
    features: [
      "Product catalog",
      "Product details",
      "Shopping cart",
      "Checkout",
      "Payment gateway",
      "Order functionality",
      "Database integration",
      "Responsive frontend",
      "Full-stack architecture",
    ],
    screenshots: ["/projects/onlineShop.png"],
    video: "/videos/3.mp4",
    caseStudy: {
      challenge: "Building a complete online shopping experience without relying on a pre-built e-commerce platform.",
      approach: "I developed the frontend using React.js and built the backend architecture with Node.js. PostgreSQL was used for the application's data layer and a payment gateway was integrated to support the checkout workflow.",
      result: "A complete full-stack commerce experience covering the customer journey from browsing products through checkout and payment.",
    },
  },
  {
    id: "lyba",
    slug: "lyba",
    number: "04",
    title: "LYBA",
    category: "FASHION / E-COMMERCE",
    filterCategory: "E-COMMERCE",
    shortDescription: "A modern e-commerce website developed for LYBA, a clothing and fashion business.",
    role: ["Full-Stack Web Development", "UI Implementation"],
    technologies: ["Next.js", "MongoDB"],
    features: [
      "Fashion / clothing catalog",
      "Product pages",
      "Product information",
      "Shopping cart",
      "Checkout",
      "Product database",
      "Responsive design",
      "Modern e-commerce UI",
    ],
    screenshots: ["/projects/laiba.png"],
    video: "/videos/4.mp4",
    caseStudy: {
      challenge: "Creating a polished digital storefront where customers could explore the clothing collection, view product information and complete purchases through a smooth shopping experience.",
      approach: "The website was developed using Next.js with a database-driven product architecture. The experience includes product presentation, shopping functionality and checkout.",
      result: "A complete fashion e-commerce platform with product browsing, cart functionality, and a smooth checkout experience backed by MongoDB.",
    },
  },
  {
    id: "fitness-gym",
    slug: "fitness-gym",
    number: "05",
    title: "Fitness & Gym",
    category: "FITNESS / WEB",
    filterCategory: "WEB",
    shortDescription: "A modern fitness website created for a Karachi-based gym.",
    role: ["Web Development"],
    technologies: ["Next.js"],
    features: [
      "Gym information",
      "Trainer details",
      "Fitness programs",
      "Subscription details",
      "Responsive design",
      "Modern interface",
      "Clear calls-to-action",
    ],
    screenshots: ["/projects/gym.png"],
    video: "/videos/5.mp4",
    caseStudy: {
      challenge: "Giving the gym a professional online presence while making its trainers, fitness offerings and subscription information easy to explore.",
      approach: "The website was designed around the information that potential members actually need when evaluating a gym. Visitors can explore trainer information, fitness offerings and subscription details through a modern responsive interface.",
      result: "A professional gym website that clearly presents trainers, programs, and subscriptions through a clean, responsive design.",
    },
  },
  {
    id: "webtoners",
    slug: "webtoners",
    number: "06",
    title: "WEBTONERS",
    category: "AGENCY / FULL-STACK / AI",
    filterCategory: "AI",
    shortDescription: "A modern full-stack agency website developed for Webtoners, a USA-based digital agency.",
    role: ["UI Development", "Frontend Development", "Full-Stack Development", "AI Integration"],
    technologies: ["React.js", "Framer Motion", "AI Agent"],
    features: [
      "Agency website",
      "Interactive frontend",
      "Service presentation",
      "AI agent integration",
      "Framer Motion animations",
      "Responsive design",
      "Contact / lead interaction",
      "Full-stack functionality",
    ],
    screenshots: ["/projects/agency.png", "/projects/web.png"],
    video: "/videos/6.mp4",
    caseStudy: {
      challenge: "Creating a modern agency experience that clearly communicated services while providing a highly interactive frontend.",
      approach: "The project used React.js for the frontend and Framer Motion for interactive motion and transitions. An AI agent was also introduced into the website to add an intelligent interaction layer. The focus was on combining strong visual design with real functionality rather than creating a static agency website.",
      result: "A dynamic, interactive agency website with AI-powered interactions, smooth animations, and complete service presentation.",
    },
  },
  {
    id: "technology-company",
    slug: "technology-company",
    number: "07",
    title: "Tech Company",
    category: "TECHNOLOGY / WEB",
    filterCategory: "WEB",
    shortDescription: "A modern website developed for a Pakistan-based technology company.",
    role: ["Frontend Development"],
    technologies: ["React.js"],
    features: [
      "Technology company website",
      "Service presentation",
      "Pricing information",
      "Contact form",
      "Responsive UI",
      "Modern navigation",
      "React-based frontend",
    ],
    screenshots: [],
    video: "/videos/7.mp4",
    caseStudy: {
      challenge: "Creating a professional digital presence that clearly communicated the company's services, pricing and contact options.",
      approach: "I developed the website using React.js and focused on creating a responsive interface with clear navigation and strong content hierarchy. The site included service / pricing presentation and contact functionality.",
      result: "A clean, professional technology company website with clear service presentation, pricing, and contact functionality.",
    },
  },
  {
    id: "house-of-waseela",
    slug: "house-of-waseela",
    number: "08",
    title: "House of Waseela",
    category: "MEDIA / NEWS / FULL-STACK",
    filterCategory: "FULL-STACK",
    shortDescription: "A modern media and content platform developed for House of Waseela, a Pakistan-based media network publishing news, blogs and articles.",
    role: ["Frontend Development", "Backend Development", "Full-Stack Development"],
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    features: [
      "News publishing",
      "Blog / article system",
      "Dynamic content",
      "MongoDB-backed content",
      "Backend API",
      "Responsive frontend",
      "Content-driven architecture",
      "Media-focused UI",
    ],
    screenshots: ["/projects/houseofwasila.png", "/projects/houseofmusab.png"],
    video: "/videos/8.mp4",
    caseStudy: {
      challenge: "Building more than a static marketing website — the platform needed a dynamic content architecture so that news, articles and blog content could be managed and displayed.",
      approach: "I developed the frontend using Next.js and Tailwind CSS and built the backend infrastructure using Node.js, Express.js and MongoDB. The architecture allowed the website to work as a content-driven media platform rather than simply a collection of static pages.",
      result: "A complete media platform with dynamic content management, news publishing, and a blog system powered by a full-stack architecture.",
    },
  },
  {
    id: "restro-erp",
    slug: "restro-erp",
    number: "09",
    title: "RESTRO ERP",
    category: "ERP / POS / RESTAURANT",
    filterCategory: "ERP / CRM",
    shortDescription: "A complete restaurant management and POS ecosystem designed to manage branches, staff, users, orders, tables, reservations and restaurant operations.",
    role: ["Full-Stack Product Development", "UI Development", "System Architecture", "RBAC Implementation"],
    technologies: ["Next.js", "Node.js", "MongoDB", "Express.js"],
    features: [
      "Multi-branch management",
      "POS system",
      "Table management",
      "Reservations",
      "Order management",
      "Staff management",
      "User management",
      "Manager role",
      "Cashier / POS role",
      "Role-based access control",
      "Product / menu management",
      "Restaurant operations",
      "Reports / business insights",
      "Inventory-related workflows",
    ],
    screenshots: ["/projects/resto-crm.png", "/projects/bawarchi.png", "/projects/lahori.png", "/projects/cafe.png"],
    video: "/videos/crm1.mp4",
    caseStudy: {
      challenge: "Building a complete restaurant operations platform that could centralize the day-to-day workflows of a restaurant business.",
      approach: "The system was designed around real restaurant operations including multiple branches, staff management, user roles, POS operations, tables, reservations, products and business workflows. The platform includes role-based access so different staff members can work with the parts of the system relevant to their responsibilities.",
      result: "A centralized restaurant management platform that handles daily operations from POS and orders to staff management and reporting.",
    },
  },
  {
    id: "retail-pos",
    slug: "retail-pos",
    number: "10",
    title: "Retail Inventory & POS",
    category: "ERP / INVENTORY / POS",
    filterCategory: "ERP / CRM",
    shortDescription: "A business management and inventory system designed for a small minimart and retail business.",
    role: ["Full-Stack Product Development", "UI Development", "Business System Development"],
    technologies: ["Next.js", "Node.js", "MongoDB"],
    features: [
      "POS system",
      "Inventory management",
      "Product management",
      "Customer records",
      "Sales tracking",
      "Daily dashboard",
      "Profit / loss visibility",
      "Business insights",
      "Retail workflow management",
      "Centralized business data",
    ],
    screenshots: ["/projects/inventory-crm .png"],
    video: "/videos/crm2.mp4",
    caseStudy: {
      challenge: "Creating a practical retail management system that could centralize daily sales, inventory and customer information.",
      approach: "The platform combines POS functionality with inventory management and business analytics. A daily dashboard provides visibility into sales and business performance, including profit and loss information. The system was designed around the real workflow of a small retail business rather than simply being a generic dashboard.",
      result: "A practical retail management system with POS, inventory tracking, sales analytics, and daily profit/loss visibility.",
    },
  },
];

// Additional screenshot-only projects (no video mapping)
export const additionalScreenshots: { src: string; title: string; category: string }[] = [
  { src: "/projects/perfumes.png", title: "Perfume Store", category: "E-COMMERCE" },
  { src: "/projects/fashion diva.png", title: "Fashion Diva", category: "E-COMMERCE" },
  { src: "/projects/syed.png", title: "SH Hoorain", category: "E-COMMERCE" },
  { src: "/projects/zivora.png", title: "Zivora", category: "E-COMMERCE" },
  { src: "/projects/sized.png", title: "Sized", category: "WEB" },
  { src: "/projects/urge.png", title: "Urge", category: "WEB" },
];

export const filterCategories = ["ALL", "WEB", "E-COMMERCE", "FULL-STACK", "AI", "MEDIA", "ERP / CRM", "FINTECH"] as const;
export type FilterCategory = (typeof filterCategories)[number];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
