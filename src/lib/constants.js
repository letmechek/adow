export const PROJECT_CATEGORIES = [
  "Infrastructure",
  "Education",
  "Healthcare",
  "Water",
  "Youth",
  "Women",
];

export const PROJECT_STATUSES = ["Planned", "Ongoing", "Completed"];

export const NEWS_CATEGORIES = [
  "Press Release",
  "Event",
  "Media Coverage",
  "Announcement",
];

export const EVENT_CATEGORIES = ["Community", "Parliament", "Youth", "Education"];

export const GALLERY_CATEGORIES = [
  "Events",
  "Projects",
  "Parliament",
  "Community",
];

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Assistance Request",
  "Bursary Application",
  "Media Inquiry",
  "Report an Issue",
  "Other",
];

export const SETTINGS_KEYS = {
  yearsService: "stats_years_service",
  billsSponsored: "stats_bills",
  projectsCompleted: "stats_projects",
  constituentsServed: "stats_constituents",
};

export const STAT_CARDS = [
  { key: SETTINGS_KEYS.yearsService, label: "Years in Service", defaultValue: 4 },
  { key: SETTINGS_KEYS.billsSponsored, label: "Bills Sponsored", defaultValue: 12 },
  { key: SETTINGS_KEYS.projectsCompleted, label: "Projects Completed", defaultValue: 23 },
  {
    key: SETTINGS_KEYS.constituentsServed,
    label: "Constituents Served",
    defaultValue: 150000,
  },
];

export const ROLES = {
  admin: "admin",
  editor: "editor",
};
