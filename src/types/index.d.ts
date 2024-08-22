export type User = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  level_id: string;
  image: string;
  created_at: Date;
  updated_at: Date;
};

export type ActivityItem = {
  id: string;
  url: string;
};

export type Activity = {
  key: string;
  data: ActivityItem;
};

export type LBB = {
  about: string;
  description: string;
  image: string;
  activities: Activity[];
  created_at: Date;
  updated_at: Date;
};

export type About = {
  image: string;
  texts: string[];
};

export type Strength = {
  image: string;
  title: string;
  description: string;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  order_number: string;
  image: string;
  created_at: Date;
  updated_at: Date;
};

export type Teacher = {
  id: string;
  name: string;
  gender: string | "lk" | "pr";
  role: string;
  last_graduate_at: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type Facility = {
  title: string;
  description: string;
};

export type Testimony = {
  id: string;
  testimony: string;
  testimoner_name: string;
  last_graduate_at: string;
  now_studied_at: string;
  image: string;
  created_at: Date;
  updated_at: Date;
};

export type Question = {
  id: string;
  question: string;
  answer: string;
  created_at: Date;
  updated_at: Date;
};

export type Contact = {
  facebook: string;
  whatsapp: string;
  instagram: string;
  email: string;
  phoneNumber: string;
};
