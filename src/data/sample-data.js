import { STAT_CARDS } from "../lib/constants.js";
import { addDays, addMonths, subDays, subMonths } from "date-fns";

const today = new Date();

export const sampleSettings = STAT_CARDS.map((card) => ({
  key: card.key,
  value: card.defaultValue,
  updatedAt: today,
}));

export const sampleProjects = [
  {
    name: "Wajir Girls Secondary School Renovation",
    slug: "wajir-girls-secondary-school-renovation",
    category: "Education",
    location: "Habasswein Ward",
    description:
      "<p>Comprehensive renovation of Wajir Girls Secondary School including new classrooms, science laboratories, modern dormitories, and a digital library to support STEM education for young women.</p>",
    budget: 5200000,
    progress: 65,
    status: "Ongoing",
    startDate: subMonths(today, 8),
    completionDate: addMonths(today, 4),
    beneficiaries: 1200,
    images: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
    ],
    featured: true,
    milestones: [
      {
        title: "Phase 1 Complete",
        description: "Demolition of old structures and foundation works.",
        date: subMonths(today, 6),
      },
      {
        title: "Phase 2 In Progress",
        description: "Construction of new classrooms and science labs.",
        date: subMonths(today, 2),
      },
    ],
    locationCoordinates: { lat: 1.7505, lng: 40.0586 },
  },
  {
    name: "Borehole Drilling Program",
    slug: "borehole-drilling-program",
    category: "Water",
    location: "Diif Ward",
    description:
      "<p>12 new solar-powered boreholes drilled across Diif Ward providing clean and reliable water access to over 5,000 residents with livestock watering points.</p>",
    budget: 4500000,
    progress: 100,
    status: "Completed",
    startDate: subMonths(today, 18),
    completionDate: subMonths(today, 6),
    beneficiaries: 5000,
    images: [
      "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b",
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
    ],
    featured: true,
    milestones: [
      {
        title: "Site Surveys",
        description: "Hydrogeological surveys conducted for suitable locations.",
        date: subMonths(today, 16),
      },
      {
        title: "Complete",
        description: "All boreholes operational with solar pumping systems.",
        date: subMonths(today, 6),
      },
    ],
    locationCoordinates: { lat: 1.2832, lng: 39.8107 },
  },
  {
    name: "Youth Skills Training Center",
    slug: "youth-skills-training-center",
    category: "Youth",
    location: "Khorof Harar Ward",
    description:
      "<p>Establishing a modern youth skills training facility offering courses in ICT, agribusiness, renewable energy technologies, and entrepreneurship.</p>",
    budget: 3900000,
    progress: 40,
    status: "Ongoing",
    startDate: subMonths(today, 5),
    completionDate: addMonths(today, 7),
    beneficiaries: 800,
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    featured: true,
    milestones: [
      {
        title: "Groundbreaking",
        description: "Launch ceremony with local youth groups.",
        date: subMonths(today, 5),
      },
      {
        title: "Construction Progress",
        description: "Main hall structure at lintel level.",
        date: subMonths(today, 1),
      },
    ],
    locationCoordinates: { lat: 1.757, lng: 39.9374 },
  },
  {
    name: "Health Clinic Construction - Habasswein",
    slug: "health-clinic-construction-habasswein",
    category: "Healthcare",
    location: "Habasswein Ward",
    description:
      "<p>New Level III health facility featuring maternity ward, vaccination center, pharmacy, and telemedicine capability to serve the expansive pastoral community.</p>",
    budget: 6100000,
    progress: 20,
    status: "Planned",
    startDate: addMonths(today, 1),
    completionDate: addMonths(today, 12),
    beneficiaries: 3500,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1587359396816-0be3b4d3d340",
    ],
    featured: false,
    milestones: [
      {
        title: "Design Approved",
        description: "Architectural plans approved by Ministry of Health.",
        date: subMonths(today, 1),
      },
    ],
    locationCoordinates: { lat: 1.7813, lng: 40.0551 },
  },
  {
    name: "Wajir South Road Infrastructure Upgrade",
    slug: "wajir-south-road-infrastructure-upgrade",
    category: "Infrastructure",
    location: "Across Wajir South",
    description:
      "<p>Grading and murraming of 120km of key constituency roads including installation of solar street lighting for safer night travel.</p>",
    budget: 8700000,
    progress: 80,
    status: "Ongoing",
    startDate: subMonths(today, 10),
    completionDate: addMonths(today, 2),
    beneficiaries: 9500,
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    ],
    featured: false,
    milestones: [
      {
        title: "Phase 1 Complete",
        description: "90km graded and compacted with drainage installed.",
        date: subMonths(today, 4),
      },
    ],
    locationCoordinates: { lat: 1.6978, lng: 40.1265 },
  },
  {
    name: "Community ICT Resource Centers",
    slug: "community-ict-resource-centers",
    category: "Education",
    location: "Sabuli & Lagboghol South",
    description:
      "<p>Deployment of two solar-powered ICT resource centers equipped with 40 computers, internet connectivity, and digital literacy trainers.</p>",
    budget: 2800000,
    progress: 55,
    status: "Ongoing",
    startDate: subMonths(today, 6),
    completionDate: addMonths(today, 3),
    beneficiaries: 1500,
    images: [
      "https://images.unsplash.com/photo-1513258496099-48168024aec0",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    ],
    featured: false,
    locationCoordinates: { lat: 1.8341, lng: 39.6583 },
  },
  {
    name: "Solar-Powered Cold Chain for Livestock Vaccines",
    slug: "solar-powered-cold-chain-for-livestock-vaccines",
    category: "Women",
    location: "Burder Ward",
    description:
      "<p>Installation of solar cold storage units managed by women groups to preserve livestock vaccines and dairy products supporting pastoralist women.</p>",
    budget: 2100000,
    progress: 75,
    status: "Ongoing",
    startDate: subMonths(today, 7),
    completionDate: addMonths(today, 1),
    beneficiaries: 600,
    images: [
      "https://images.unsplash.com/photo-1570610155223-8a29c88b53ac",
      "https://images.unsplash.com/photo-1468071174046-657d9d351a40",
    ],
    featured: false,
  },
  {
    name: "Mobile Health Outreach Vans",
    slug: "mobile-health-outreach-vans",
    category: "Healthcare",
    location: "All Wards",
    description:
      "<p>Launching two fully equipped mobile health outreach vans offering maternal health, immunization, and disease screening services across remote settlements.</p>",
    budget: 3300000,
    progress: 90,
    status: "Ongoing",
    startDate: subMonths(today, 9),
    completionDate: addMonths(today, 2),
    beneficiaries: 5300,
    images: [
      "https://images.unsplash.com/photo-1576765608633-5fd0c1ad29f8",
      "https://images.unsplash.com/photo-1580327332925-a10a3a75d498",
    ],
    featured: false,
  },
  {
    name: "Women Enterprise Micro Grants",
    slug: "women-enterprise-micro-grants",
    category: "Women",
    location: "Kholera Ward",
    description:
      "<p>Supporting 150 women-led cooperatives with seed capital, financial literacy training, and market linkages for value-added camel milk products.</p>",
    budget: 1900000,
    progress: 100,
    status: "Completed",
    startDate: subMonths(today, 12),
    completionDate: subMonths(today, 2),
    beneficiaries: 450,
    images: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433",
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572",
    ],
    featured: false,
  },
  {
    name: "Early Childhood Education Classroom Block",
    slug: "early-childhood-education-classroom-block",
    category: "Education",
    location: "Bashan Ward",
    description:
      "<p>Construction of modern ECD classrooms with child-friendly sanitation facilities and inclusive play areas serving 300 pupils.</p>",
    budget: 1600000,
    progress: 85,
    status: "Ongoing",
    startDate: subMonths(today, 8),
    completionDate: addMonths(today, 1),
    beneficiaries: 300,
    images: [
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
      "https://images.unsplash.com/photo-1588072432836-e10032774350",
    ],
    featured: false,
  },
  {
    name: "Community Peacebuilding Forums",
    slug: "community-peacebuilding-forums",
    category: "Youth",
    location: "Diif & Burder Wards",
    description:
      "<p>Facilitating inter-clan dialogue sessions, youth mentorship, and conflict resolution workshops to strengthen cohesion and security.</p>",
    budget: 950000,
    progress: 100,
    status: "Completed",
    startDate: subMonths(today, 14),
    completionDate: subMonths(today, 4),
    beneficiaries: 1200,
    images: [
      "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
      "https://images.unsplash.com/photo-1463569643904-4fbae71ed917",
    ],
    featured: false,
  },
  {
    name: "Livestock Market Modernization",
    slug: "livestock-market-modernization",
    category: "Infrastructure",
    location: "Habasswein Town",
    description:
      "<p>Upgrading livestock market with weighing bridges, shade structures, and digital market information system for pastoral traders.</p>",
    budget: 4600000,
    progress: 70,
    status: "Ongoing",
    startDate: subMonths(today, 6),
    completionDate: addMonths(today, 5),
    beneficiaries: 2200,
    images: [
      "https://images.unsplash.com/photo-1534531173927-aeb928d54385",
      "https://images.unsplash.com/photo-1574068468668-663138eaf4d7",
    ],
    featured: false,
  },
  {
    name: "Water Harvesting Dams Rehabilitation",
    slug: "water-harvesting-dams-rehabilitation",
    category: "Water",
    location: "Khorof Harar Ward",
    description:
      "<p>Desilting and lining of traditional water pans with installation of solar pumping for community storage tanks.</p>",
    budget: 2500000,
    progress: 60,
    status: "Ongoing",
    startDate: subMonths(today, 9),
    completionDate: addMonths(today, 3),
    beneficiaries: 3200,
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    ],
    featured: false,
  },
  {
    name: "Constituency Library Digitization",
    slug: "constituency-library-digitization",
    category: "Education",
    location: "Habasswein Ward",
    description:
      "<p>Digital cataloguing of 12,000 books, installation of e-learning pods, and provision of braille resources for visually impaired learners.</p>",
    budget: 1400000,
    progress: 95,
    status: "Ongoing",
    startDate: subMonths(today, 7),
    completionDate: addMonths(today, 1),
    beneficiaries: 1800,
    images: [
      "https://images.unsplash.com/photo-1510936111840-65e151ad71bb",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    ],
    featured: false,
  },
  {
    name: "Maternal Health Support Program",
    slug: "maternal-health-support-program",
    category: "Healthcare",
    location: "Kholera Ward",
    description:
      "<p>Training community health volunteers, providing maternal health kits, and equipping delivery rooms to reduce maternal mortality.</p>",
    budget: 1800000,
    progress: 75,
    status: "Ongoing",
    startDate: subMonths(today, 8),
    completionDate: addMonths(today, 2),
    beneficiaries: 900,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1587359396816-0be3b4d3d340",
    ],
    featured: false,
  },
  {
    name: "Community Solar Lighting Expansion",
    slug: "community-solar-lighting-expansion",
    category: "Infrastructure",
    location: "Sabuli Ward",
    description:
      "<p>Installation of 250 solar street lights across market centers and schools enhancing security and supporting evening economic activity.</p>",
    budget: 3100000,
    progress: 88,
    status: "Ongoing",
    startDate: subMonths(today, 10),
    completionDate: addMonths(today, 2),
    beneficiaries: 4100,
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    ],
    featured: false,
  },
  {
    name: "Youth Football & Talent Development League",
    slug: "youth-football-talent-development-league",
    category: "Youth",
    location: "Constituency Wide",
    description:
      "<p>Organized youth football league with coaching clinics, equipment support, and scholarships for outstanding players.</p>",
    budget: 950000,
    progress: 100,
    status: "Completed",
    startDate: subMonths(today, 15),
    completionDate: subMonths(today, 3),
    beneficiaries: 1200,
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e",
    ],
    featured: false,
  },
  {
    name: "Camel Milk Value Chain Hub",
    slug: "camel-milk-value-chain-hub",
    category: "Women",
    location: "Diif Ward",
    description:
      "<p>Processing center with pasteurization, packaging, and cold chain to support camel milk cooperatives led by women entrepreneurs.</p>",
    budget: 2700000,
    progress: 55,
    status: "Ongoing",
    startDate: subMonths(today, 6),
    completionDate: addMonths(today, 6),
    beneficiaries: 750,
    images: [
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
      "https://images.unsplash.com/photo-1574761470312-3f94e0c0dc2f",
    ],
    featured: false,
  },
  {
    name: "Habasswein Market Sanitation Upgrade",
    slug: "habasswein-market-sanitation-upgrade",
    category: "Infrastructure",
    location: "Habasswein Market",
    description:
      "<p>Construction of modern sanitation blocks, waste management system, and water kiosks improving hygiene standards.</p>",
    budget: 1500000,
    progress: 90,
    status: "Ongoing",
    startDate: subMonths(today, 7),
    completionDate: addMonths(today, 1),
    beneficiaries: 2000,
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    ],
    featured: false,
  },
  {
    name: "Scholarship Support for University Students",
    slug: "scholarship-support-for-university-students",
    category: "Education",
    location: "Wajir South Constituency",
    description:
      "<p>Annual scholarship covering tuition and stipends for 120 bright students pursuing higher education in STEM and public administration.</p>",
    budget: 3200000,
    progress: 100,
    status: "Completed",
    startDate: subMonths(today, 24),
    completionDate: subMonths(today, 12),
    beneficiaries: 120,
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    ],
    featured: false,
  },
  {
    name: "Emergency Drought Response Program",
    slug: "emergency-drought-response-program",
    category: "Water",
    location: "Drought-Prone Villages",
    description:
      "<p>Coordinated water trucking, fodder distribution, and cash transfers to vulnerable households during the 2024 drought emergency.</p>",
    budget: 5000000,
    progress: 100,
    status: "Completed",
    startDate: subMonths(today, 10),
    completionDate: subMonths(today, 1),
    beneficiaries: 8000,
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    ],
    featured: false,
  },
  {
    name: "Women in Parliament Mentorship Series",
    slug: "women-in-parliament-mentorship-series",
    category: "Women",
    location: "Nairobi & Wajir South",
    description:
      "<p>Monthly mentorship forums connecting young women leaders with female MPs, professional coaches, and civic educators.</p>",
    budget: 1750000,
    progress: 45,
    status: "Ongoing",
    startDate: subMonths(today, 4),
    completionDate: addMonths(today, 8),
    beneficiaries: 300,
    images: [
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde16",
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    ],
    featured: false,
  },
];

export const sampleNews = [
  {
    title: "MP Adow Launches Youth Empowerment Program",
    slug: "mp-adow-launches-youth-empowerment-program",
    category: "Press Release",
    featuredImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    content:
      "<p>Hon. Mohamed Adow today launched the Youth Empowerment Program, a strategic initiative to support skills training, entrepreneurship, and mentorship for young people in Wajir South.</p><p>The program features a modern training facility, seed funding for youth startups, and mentorship from experienced professionals.</p>",
    excerpt:
      "Hon. Mohamed Adow unveils a comprehensive Youth Empowerment Program featuring training, mentorship, and startup seed funding for Wajir South youth.",
    tags: ["Youth", "Empowerment", "Training"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 5),
    status: "Published",
    views: 432,
  },
  {
    title: "New Borehole Brings Clean Water to 5,000 Residents",
    slug: "new-borehole-brings-clean-water",
    category: "Announcement",
    featuredImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    content:
      "<p>The flagship borehole project in Diif Ward is now complete, providing clean and reliable water to over 5,000 residents.</p><p>The project includes solar pumping, water kiosks, and livestock watering points managed by community committees.</p>",
    excerpt:
      "Diif Ward residents celebrate as a solar-powered borehole becomes operational, ensuring sustainable access to clean water.",
    tags: ["Water", "Infrastructure"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 12),
    status: "Published",
    views: 388,
  },
  {
    title: "Parliament Passes Education Bill Co-Sponsored by MP Adow",
    slug: "education-bill-passed",
    category: "Press Release",
    featuredImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    content:
      "<p>Parliament has passed the Education Access Amendment Bill 2024 co-sponsored by Hon. Mohamed Adow to expand bursary allocations for marginalized counties.</p><p>The bill prioritizes STEM education and provides grants for digital learning resources.</p>",
    excerpt:
      "Hon. Mohamed Adow's Education Access Amendment Bill passes Parliament, expanding bursary support for marginalized counties.",
    tags: ["Education", "Legislation"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 20),
    status: "Published",
    views: 512,
  },
  {
    title: "Community Health Clinic Opens in Wajir South",
    slug: "community-health-clinic-opens",
    category: "Media Coverage",
    featuredImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    content:
      "<p>The new community health clinic in Habasswein Ward has opened its doors, offering maternal care, vaccination services, and telemedicine consultations.</p><p>The facility was constructed through collaboration between the CDF and Ministry of Health.</p>",
    excerpt:
      "Habasswein Ward celebrates the opening of a modern community health clinic providing critical services to remote settlements.",
    tags: ["Healthcare", "Community"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 30),
    status: "Published",
    views: 289,
  },
  {
    title: "Town Hall Meeting Engages Constituents on Budget Priorities",
    slug: "town-hall-meeting-budget-priorities",
    category: "Event",
    featuredImage: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
    content:
      "<p>Hon. Mohamed Adow hosted a participatory town hall meeting in Khorof Harar, inviting residents to prioritize projects in the upcoming budget cycle.</p><p>Key priorities identified included water infrastructure, youth training, and maternal health services.</p>",
    excerpt:
      "Hundreds attend a vibrant town hall meeting in Khorof Harar to set development priorities for the coming financial year.",
    tags: ["Engagement", "Budget"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 35),
    status: "Published",
    views: 245,
  },
  {
    title: "MP Adow Hosts Women Leaders Roundtable",
    slug: "women-leaders-roundtable",
    category: "Press Release",
    featuredImage: "https://images.unsplash.com/photo-1551836022-4c4c79ecde16",
    content:
      "<p>A constituency-wide women leaders roundtable discussed inclusive economic policies, access to credit, and mentorship opportunities for young women.</p>",
    excerpt:
      "Women leaders from across Wajir South convene to chart economic empowerment strategies with Hon. Mohamed Adow.",
    tags: ["Women", "Empowerment"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 42),
    status: "Published",
    views: 198,
  },
  {
    title: "Youth Football Tournament Finals Draws Thousands",
    slug: "youth-football-tournament-finals",
    category: "Media Coverage",
    featuredImage: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    content:
      "<p>The Wajir South Youth Football League finals took place at Habasswein Stadium with 3,000 supporters cheering the finalists.</p>",
    excerpt:
      "Excitement in Habasswein as the Youth Football League finals showcase local sports talent and unity.",
    tags: ["Youth", "Sports"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 48),
    status: "Published",
    views: 176,
  },
  {
    title: "Digital Literacy Bootcamp Graduates 120 Learners",
    slug: "digital-literacy-bootcamp-graduates",
    category: "Press Release",
    featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    content:
      "<p>120 youths have completed a two-week digital literacy bootcamp at the new ICT resource center, gaining certifications in basic coding, online safety, and digital entrepreneurship.</p>",
    excerpt:
      "ICT resource center graduates 120 youths with new digital skills and entrepreneurship training.",
    tags: ["ICT", "Training"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 55),
    status: "Published",
    views: 201,
  },
  {
    title: "Emergency Relief Delivered to Drought-Stricken Families",
    slug: "emergency-relief-drought-families",
    category: "Announcement",
    featuredImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    content:
      "<p>In partnership with the National Drought Management Authority, 1,500 households received emergency food and water supplies.</p>",
    excerpt:
      "Relief efforts intensify as Hon. Mohamed Adow coordinates emergency support for drought-hit villages.",
    tags: ["Relief", "Humanitarian"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 62),
    status: "Published",
    views: 267,
  },
  {
    title: "Students Receive Bursary Cheques for 2024 Academic Year",
    slug: "students-receive-bursary-cheques-2024",
    category: "Announcement",
    featuredImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    content:
      "<p>Hon. Adow issued bursary cheques to 650 students pursuing secondary and tertiary education, emphasizing education as the cornerstone of development.</p>",
    excerpt:
      "650 students benefit from the 2024 bursary disbursement led by Hon. Mohamed Adow.",
    tags: ["Education", "Bursary"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 70),
    status: "Published",
    views: 310,
  },
  {
    title: "Youth Mentorship Podcast Launched",
    slug: "youth-mentorship-podcast-launched",
    category: "Media Coverage",
    featuredImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    content:
      "<p>The Youth Voices Podcast provides mentorship conversations with successful professionals from Wajir South guiding students on career choices.</p>",
    excerpt:
      "New Youth Voices Podcast amplifies success stories and mentorship for Wajir South youth.",
    tags: ["Youth", "Mentorship"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 80),
    status: "Published",
    views: 154,
  },
  {
    title: "Wajir South Innovation Challenge Winners Announced",
    slug: "innovation-challenge-winners",
    category: "Press Release",
    featuredImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    content:
      "<p>Five youth-led startups received seed funding during the Wajir South Innovation Challenge focusing on agri-tech and fintech solutions.</p>",
    excerpt:
      "Innovation Challenge awards five youth-led startups tackling local challenges with technology.",
    tags: ["Innovation", "Youth"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 95),
    status: "Published",
    views: 221,
  },
  {
    title: "Habasswein Market Sanitation Works Commence",
    slug: "habasswein-market-sanitation-works",
    category: "Announcement",
    featuredImage: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    content:
      "<p>Construction teams have commenced building modern sanitation blocks and waste management systems in Habasswein market.</p>",
    excerpt:
      "Habasswein market to benefit from modern sanitation and waste management infrastructure.",
    tags: ["Infrastructure", "Public Health"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 110),
    status: "Published",
    views: 187,
  },
  {
    title: "Community Dialogue Forum on Climate Resilience",
    slug: "community-dialogue-climate-resilience",
    category: "Event",
    featuredImage: "https://images.unsplash.com/photo-1463569643904-4fbae71ed917",
    content:
      "<p>Residents engaged in a dialogue on climate resilience strategies including water harvesting, drought-resistant crops, and early warning systems.</p>",
    excerpt:
      "Climate resilience forum empowers communities with adaptation strategies for recurrent droughts.",
    tags: ["Climate", "Community"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 125),
    status: "Published",
    views: 172,
  },
  {
    title: "MP Adow Meets University Students in Nairobi",
    slug: "mp-adow-meets-university-students",
    category: "Media Coverage",
    featuredImage: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    content:
      "<p>Hon. Adow hosted a consultative breakfast with Wajir South university students in Nairobi to discuss internships, mentorship, and career placement.</p>",
    excerpt:
      "University students engage Hon. Adow on internships, mentorship, and career opportunities.",
    tags: ["Youth", "Education"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 140),
    status: "Published",
    views: 205,
  },
  {
    title: "Community Policing Units Receive Motorbikes",
    slug: "community-policing-units-motorbikes",
    category: "Press Release",
    featuredImage: "https://images.unsplash.com/photo-1529338296731-c4280a44fc47",
    content:
      "<p>To enhance security patrols, community policing units across Wajir South received motorbikes and communication equipment.</p>",
    excerpt:
      "Security boosted as community policing units receive new motorbikes and radios.",
    tags: ["Security", "Community"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 160),
    status: "Published",
    views: 190,
  },
  {
    title: "CDF Issues Scholarships for STEM Courses",
    slug: "cdf-issues-scholarships-stem",
    category: "Announcement",
    featuredImage: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    content:
      "<p>Twenty outstanding students received full scholarships to pursue STEM degrees under the Constituency Development Fund education program.</p>",
    excerpt:
      "CDF invests in STEM talent with full scholarships for top-performing students.",
    tags: ["Education", "STEM"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 180),
    status: "Published",
    views: 199,
  },
  {
    title: "Wajir South Peace Caravan Concludes Successfully",
    slug: "wajir-south-peace-caravan",
    category: "Event",
    featuredImage: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
    content:
      "<p>The peace caravan covered 18 settlements conducting conflict resolution workshops and youth dialogues promoting harmony.</p>",
    excerpt:
      "Peace caravan fosters harmony across 18 settlements with dialogue and cultural events.",
    tags: ["Peace", "Community"],
    author: "Office of Mohamed Adow MP",
    publishDate: subDays(today, 210),
    status: "Published",
    views: 187,
  },
];

export const sampleEvents = [
  {
    title: "Wajir South Town Hall Meeting",
    date: addDays(today, 7),
    startTime: "10:00",
    endTime: "13:00",
    location: "Khorof Harar Social Hall",
    description:
      "Constituency-wide budget consultation to prioritize projects for the 2025/26 financial year.",
    image: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
    rsvpLink: "https://forms.gle/townhall2025",
    capacity: 500,
  },
  {
    title: "Bursary Application Workshop",
    date: addDays(today, 21),
    startTime: "09:00",
    endTime: "12:00",
    location: "Habasswein Boys High School",
    description:
      "Hands-on workshop guiding parents and students through the bursary application process with on-site support.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    rsvpLink: "https://forms.gle/bursary2025",
    capacity: 400,
  },
  {
    title: "Youth Football Tournament Kick-Off",
    date: addDays(today, 28),
    startTime: "15:00",
    endTime: "19:00",
    location: "Habasswein Stadium",
    description:
      "Opening ceremony for the 2025 youth football tournament featuring 24 teams across Wajir South.",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    rsvpLink: "https://forms.gle/youthfootball",
    capacity: 3000,
  },
  {
    title: "Community Health Outreach",
    date: addDays(today, 35),
    startTime: "08:00",
    endTime: "16:00",
    location: "Diif Health Centre",
    description:
      "Mobile health outreach providing maternal care, vaccinations, HIV screening, and nutrition counseling.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    capacity: 800,
  },
  {
    title: "Women Enterprise Training Bootcamp",
    date: addDays(today, 45),
    startTime: "09:00",
    endTime: "17:00",
    location: "Burder Community Hall",
    description:
      "Two-day bootcamp focusing on financial literacy, business planning, and market linkages for women entrepreneurs.",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde16",
    capacity: 200,
  },
  {
    title: "Climate Resilience Innovation Lab",
    date: addDays(today, 52),
    startTime: "10:00",
    endTime: "15:00",
    location: "Wajir South Innovation Hub",
    description:
      "Collaborative lab designing community-driven solutions for drought and climate adaptation.",
    image: "https://images.unsplash.com/photo-1463569643904-4fbae71ed917",
    capacity: 120,
  },
  {
    title: "Constituency Service Day",
    date: addDays(today, 60),
    startTime: "09:00",
    endTime: "16:00",
    location: "Wajir South Constituency Office",
    description:
      "Meet with constituency service officers for bursary inquiries, issue reporting, and project updates.",
    image: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
    capacity: 600,
  },
  {
    title: "STEM Scholars Mentorship Forum",
    date: addDays(today, 65),
    startTime: "10:00",
    endTime: "14:00",
    location: "University of Nairobi, Chandaria Hall",
    description:
      "Mentorship forum connecting Wajir South STEM scholars with industry professionals and internship opportunities.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    capacity: 250,
  },
  {
    title: "Camel Milk Cooperative Expo",
    date: addDays(today, 75),
    startTime: "09:00",
    endTime: "17:00",
    location: "Diif Cooperative Grounds",
    description:
      "Showcase of camel milk value chain innovations, training sessions, and market linkages for women cooperatives.",
    image: "https://images.unsplash.com/photo-1574761470312-3f94e0c0dc2f",
    capacity: 500,
  },
  {
    title: "Youth Innovation Challenge Demo Day",
    date: addDays(today, 90),
    startTime: "11:00",
    endTime: "16:00",
    location: "Wajir South Innovation Hub",
    description:
      "Top 10 youth-led startups pitch their solutions to investors, development partners, and community leaders.",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    capacity: 350,
  },
];

export const sampleGallery = [
  {
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    caption: "Hon. Mohammed Adow engaging youth leaders during the innovation forum.",
    category: "Community",
    dateTaken: subDays(today, 12),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
    caption: "Constituents sharing development priorities at the Khorof Harar town hall meeting.",
    category: "Events",
    dateTaken: subDays(today, 15),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    caption: "Nurses at the new Habasswein Community Health Clinic maternity wing.",
    category: "Projects",
    dateTaken: subDays(today, 28),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    caption: "Solar street lights illuminating Sabuli market center at night.",
    category: "Projects",
    dateTaken: subDays(today, 35),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    caption: "University mentorship breakfast with Wajir South students in Nairobi.",
    category: "Events",
    dateTaken: subDays(today, 42),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    caption: "Students receiving new learning materials at the constituency library digitization launch.",
    category: "Projects",
    dateTaken: subDays(today, 48),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    caption: "Digital literacy bootcamp participants celebrate their certification.",
    category: "Community",
    dateTaken: subDays(today, 54),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    caption: "Water harvesting pan rehabilitation works underway in Khorof Harar Ward.",
    category: "Projects",
    dateTaken: subDays(today, 63),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1574761470312-3f94e0c0dc2f",
    caption: "Women cooperative members running the camel milk value chain hub.",
    category: "Community",
    dateTaken: subDays(today, 70),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523661149972-0bed12a73a15",
    caption: "Constituency peace caravan engaging elders on conflict resolution.",
    category: "Community",
    dateTaken: subDays(today, 82),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    caption: "Innovation Challenge finalists presenting their prototypes.",
    category: "Events",
    dateTaken: subDays(today, 90),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    caption: "Hon. Adow addressing the National Assembly on the Education Access Amendment Bill.",
    category: "Parliament",
    dateTaken: subDays(today, 120),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    caption: "Youth Football League finals draw thousands to Habasswein Stadium.",
    category: "Events",
    dateTaken: subDays(today, 130),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    caption: "Coaches guiding young players during the youth sports clinic.",
    category: "Community",
    dateTaken: subDays(today, 140),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523875194681-bedd468c58bf",
    caption: "Community layout session for the livestock market modernization.",
    category: "Projects",
    dateTaken: subDays(today, 150),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1463569643904-4fbae71ed917",
    caption: "Climate resilience dialogue connecting communities and experts.",
    category: "Community",
    dateTaken: subDays(today, 160),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    caption: "Hon. Adow contributing during a parliamentary committee session.",
    category: "Parliament",
    dateTaken: subDays(today, 180),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1574761470312-3f94e0c0dc2f",
    caption: "Community members celebrating completion of the borehole program.",
    category: "Projects",
    dateTaken: subDays(today, 200),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523661149972-0bed12a73a15",
    caption: "Peace caravan team conducting conflict transformation workshops.",
    category: "Community",
    dateTaken: subDays(today, 210),
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    caption: "Students participating in the bursary award ceremony.",
    category: "Events",
    dateTaken: subDays(today, 220),
  },
];

export const sampleSpeeches = [
  {
    title: "Budget Policy Statement Debate - Education Priorities",
    date: subDays(today, 45),
    session: "National Assembly - Afternoon Session",
    topic: "Education Funding",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    transcript:
      "Hon. Mohamed Adow emphasized equitable resource allocation for marginalized counties, prioritizing digital learning and teacher training.",
  },
  {
    title: "Climate Resilience and Drought Mitigation Motion",
    date: subDays(today, 72),
    session: "National Assembly - Special Sitting",
    topic: "Climate Action",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    transcript:
      "The MP outlined a multi-pronged approach featuring early warning systems, water harvesting, and pastoralist insurance.",
  },
  {
    title: "Youth Empowerment Bill Second Reading",
    date: subDays(today, 90),
    session: "National Assembly - Morning Session",
    topic: "Youth Development",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    transcript:
      "Speech highlighting investment in technical training and innovation grants for youth-led enterprises.",
  },
  {
    title: "Infrastructure Committee Report on Northern Corridor Roads",
    date: subDays(today, 130),
    session: "Committee of the Whole House",
    topic: "Infrastructure",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    transcript:
      "Hon. Adow presented recommendations to upgrade the Wajir-Garissa road network and expand solar lighting.",
  },
];

export const sampleBills = [
  {
    number: "B/023/2024",
    title: "Youth Empowerment Bill 2024",
    dateIntroduced: subMonths(today, 8),
    coSponsors: ["Hon. Fatuma Gedi", "Hon. Abdullahi Sheikh"],
    status: "Passed",
    statusStage: 4,
    categories: ["Youth", "Economy"],
    documentUrl: "/documents/youth-empowerment-bill.pdf",
  },
  {
    number: "B/114/2023",
    title: "Wajir Water Infrastructure Bill 2023",
    dateIntroduced: subMonths(today, 12),
    coSponsors: ["Hon. Ahmed Bashane"],
    status: "Reading 3",
    statusStage: 3,
    categories: ["Water", "Infrastructure"],
    documentUrl: "/documents/wajir-water-infrastructure-bill.pdf",
  },
  {
    number: "B/045/2024",
    title: "Education Access Amendment Bill 2024",
    dateIntroduced: subMonths(today, 6),
    coSponsors: ["Hon. Millie Odhiambo"],
    status: "Passed",
    statusStage: 4,
    categories: ["Education"],
    documentUrl: "/documents/education-access-amendment-bill.pdf",
  },
  {
    number: "B/098/2023",
    title: "Community Health Strengthening Bill",
    dateIntroduced: subMonths(today, 14),
    coSponsors: ["Hon. Esther Passaris"],
    status: "Reading 2",
    statusStage: 2,
    categories: ["Healthcare"],
    documentUrl: "/documents/community-health-strengthening-bill.pdf",
  },
  {
    number: "B/211/2024",
    title: "Northern Kenya Renewable Energy Incentives Bill",
    dateIntroduced: subMonths(today, 4),
    coSponsors: ["Hon. John Kiarie"],
    status: "Reading 1",
    statusStage: 1,
    categories: ["Energy", "Climate"],
    documentUrl: "/documents/northern-kenya-renewable-energy-incentives-bill.pdf",
  },
];

export const sampleVotingRecords = Array.from({ length: 52 }).map((_, index) => {
  const votes = ["Yes", "No", "Abstain"];
  const topics = ["Education", "Water", "Healthcare", "Security", "Youth", "Economy"];
  return {
    billName: `Bill ${index + 101}`,
    date: subDays(today, index * 3),
    vote: votes[index % votes.length],
    topic: topics[index % topics.length],
  };
});

export const sampleCommitteeWork = {
  committees: [
    { name: "Education Committee", role: "Member" },
    { name: "Budget & Appropriations Committee", role: "Vice Chair" },
    { name: "Regional Development Committee", role: "Member" },
  ],
  meetings: [
    {
      title: "Budget Review Meeting",
      date: addDays(today, 6),
      time: "09:30",
      location: "Parliament Towers Room 4A",
    },
    {
      title: "Education Policy Stakeholder Engagement",
      date: addDays(today, 12),
      time: "10:00",
      location: "KICD Auditorium",
    },
    {
      title: "Regional Development Planning Session",
      date: addDays(today, 18),
      time: "14:00",
      location: "Parliament Committee Room 2",
    },
    {
      title: "National Budget Estimates Review",
      date: addDays(today, 25),
      time: "09:00",
      location: "Treasury Boardroom",
    },
    {
      title: "Education Sectoral Hearing",
      date: addDays(today, 32),
      time: "11:00",
      location: "Parliament Mini Chamber",
    },
  ],
  reports: [
    {
      title: "Education Infrastructure Progress Report 2024",
      publishedOn: subDays(today, 20),
      documentUrl: "/documents/education-infrastructure-progress-report.pdf",
    },
    {
      title: "Budget Implementation Oversight Report Q2",
      publishedOn: subDays(today, 35),
      documentUrl: "/documents/budget-oversight-report-q2.pdf",
    },
    {
      title: "Regional Development Strategic Plan 2025",
      publishedOn: subDays(today, 58),
      documentUrl: "/documents/regional-development-strategic-plan-2025.pdf",
    },
  ],
};

export const sampleFaqs = [
  {
    question: "How do I apply for a bursary?",
    answer:
      "Download the bursary application form, fill in all required details, attach necessary documentation including school admission letters, national ID copies, and submit to the constituency office before the deadline.",
  },
  {
    question: "What is CDF and how can I benefit?",
    answer:
      "The Constituency Development Fund (CDF) supports community projects in education, infrastructure, and social services. Residents can propose projects through the CDF committee or apply for bursaries and community initiatives.",
  },
  {
    question: "How do I report a community issue?",
    answer:
      "You can report issues through the contact form on this website, visit the constituency service office, or call the hotline numbers provided for Nairobi and Wajir offices.",
  },
  {
    question: "What services are offered at the constituency office?",
    answer:
      "Services include bursary processing, recommendation letters, community project support, issue reporting, internship placements, and constituency ID registration assistance.",
  },
  {
    question: "How can I volunteer for community programs?",
    answer:
      "Submit your interest via the contact form specifying the program you wish to support. The team will follow up with orientation details and schedules.",
  },
  {
    question: "Are there internship opportunities?",
    answer:
      "Yes. The office partners with public institutions and NGOs to provide internships. Check the services page and apply using the internship application form.",
  },
  {
    question: "How do I access constituency development reports?",
    answer:
      "Development reports and audits are available on the legislative page under the committee work tab. You can also request physical copies from the office.",
  },
  {
    question: "How long does it take to receive a response to inquiries?",
    answer:
      "The office strives to respond to inquiries within 48 hours during working days. For urgent matters, use the phone contacts provided.",
  },
  {
    question: "Can I propose a new community project?",
    answer:
      "Yes. Submit a project proposal using the downloadable template on the services page. The CDF committee reviews proposals quarterly.",
  },
  {
    question: "What documents are required for recommendation letters?",
    answer:
      "Bring a formal letter of request, national ID, proof of opportunity (e.g., admission letter), and any relevant supporting documents.",
  },
  {
    question: "How can I unsubscribe from the newsletter?",
    answer:
      "Each newsletter email contains an unsubscribe link. Alternatively, contact the office to update your subscription status.",
  },
  {
    question: "What support is available for persons with disabilities?",
    answer:
      "The office facilitates assistive devices, education support, and inclusion programs. Reach out through the contact form for tailored assistance.",
  },
  {
    question: "Are there youth training programs available?",
    answer:
      "Yes. The Youth Skills Training Center offers ICT, agribusiness, renewable energy, and entrepreneurship training. Check the events calendar for upcoming cohorts.",
  },
  {
    question: "Where can I access the latest news and updates?",
    answer:
      "Visit the news section of this website for the latest press releases, announcements, and media coverage featuring Hon. Mohamed Adow.",
  },
  {
    question: "How are project sites monitored?",
    answer:
      "Project monitoring is conducted through field visits, community feedback forums, and digital tracking dashboards. Updates are shared via the projects page.",
  },
];

export const sampleServices = [
  {
    id: "bursary",
    name: "Bursary Applications",
    description:
      "Financial support for secondary, tertiary, and university students from Wajir South to ensure continuous education.",
    cta: "Apply Now",
  },
  {
    id: "recommendation",
    name: "Recommendation Letters",
    description:
      "Personalized recommendation letters for scholarships, job applications, and academic opportunities.",
    cta: "Request Letter",
  },
  {
    id: "projects",
    name: "Community Project Proposals",
    description:
      "Guidance and support for community-led development initiatives seeking CDF funding.",
    cta: "Submit Proposal",
  },
  {
    id: "issues",
    name: "Issue Reporting",
    description:
      "Report community concerns including infrastructure gaps, security issues, and service delays.",
    cta: "Report Now",
  },
  {
    id: "cdf",
    name: "CDF Information",
    description:
      "Access information on project allocations, timelines, and how CDF funds are utilized.",
    cta: "View Details",
  },
  {
    id: "internships",
    name: "Internship Opportunities",
    description:
      "Internship placements within partner organizations and public institutions for youth from Wajir South.",
    cta: "Apply Today",
  },
];

export const sampleDownloads = [
  {
    title: "Bursary Application Form",
    file: "/downloads/bursary-application-form.pdf",
  },
  {
    title: "CDF Project Proposal Template",
    file: "/downloads/cdf-project-proposal-template.docx",
  },
  {
    title: "Recommendation Letter Request Form",
    file: "/downloads/recommendation-letter-request.docx",
  },
];

export const sampleAdmin = {
  username: "admin",
  email: "admin@mohamedadow.ke",
  password: process.env.ADMIN_DEFAULT_PASSWORD || "adminMohamed2024",
};

export const sampleNewsletter = [
  {
    email: "citizen1@example.com",
    subscribedAt: subDays(today, 12),
    status: "Active",
  },
  {
    email: "citizen2@example.com",
    subscribedAt: subDays(today, 30),
    status: "Active",
  },
  {
    email: "citizen3@example.com",
    subscribedAt: subDays(today, 60),
    status: "Unsubscribed",
  },
];
