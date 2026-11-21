/**
 * seed.js — Database seeder
 *
 * Seeds the database with an admin user and the 6 default services.
 * Run with: npm run seed
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');

const services = [
  {
    number: '01',
    tag: 'Brand Identity',
    title: 'Brand Strategy & Identity',
    icon: 'FaCompass',
    description:
      'Clarify your audience, positioning, and core messaging. We develop timeless visual identities, logo marks, typography scales, and practical brand design guidelines that keep your company consistent across every touchpoint.',
    deliverables: [
      'Market & Competitor Positioning',
      'Visual Identity Systems & Logos',
      'Comprehensive Brand Styleguides',
      'Typography & Color Palettes',
    ],
    isActive: true,
    order: 1,
  },
  {
    number: '02',
    tag: 'Digital Experience',
    title: 'Website & Digital Product Design',
    icon: 'FaLayerGroup',
    description:
      'Transform complex ideas into intuitive, high-converting digital products. We structure websites and software UI/UX to ensure clear communication, seamless user journeys, and maximum accessibility.',
    deliverables: [
      'Responsive Web & UI/UX Design',
      'Design Systems & Component Libraries',
      'Wireframing & Interactive Prototypes',
      'Accessibility & Usability Audits',
    ],
    isActive: true,
    order: 2,
  },
  {
    number: '03',
    tag: 'Full-Stack Code',
    title: 'Custom Software Development',
    icon: 'FaCode',
    description:
      'Build scalable, maintainable web applications and custom software tools designed to optimize real business workflows. Built using modern stacks including React 19, Next.js, TypeScript, and modern cloud architectures.',
    deliverables: [
      'Full-Stack Next.js Applications',
      'Custom Web Portals & Dashboards',
      'API Integrations & Backend Services',
      'Clean, Documented Architecture',
    ],
    isActive: true,
    order: 3,
  },
  {
    number: '04',
    tag: 'Search Visibility',
    title: 'Search Engine Optimization (SEO)',
    icon: 'FaSearch',
    description:
      'Elevate your visibility on Google and modern search engines. We implement rigorous technical SEO, site speed enhancements, structural schema data, and search-driven content plans that attract qualified traffic.',
    deliverables: [
      'Technical SEO Audits & Remediation',
      'Core Web Vitals & Speed Optimization',
      'On-Page Content & Metadata Strategy',
      'Local & National Search Foundation',
    ],
    isActive: true,
    order: 4,
  },
  {
    number: '05',
    tag: 'Social Media',
    title: 'Social Media Strategy',
    icon: 'FaShareAlt',
    description:
      'Establish a purposeful, consistent social presence. We identify the right channels for your audience, create content themes, and formulate sustainable scheduling workflows that build genuine brand credibility.',
    deliverables: [
      'Channel Selection & Optimization',
      'Content Calendar & Editorial Framework',
      'Visual Templates for Social Posts',
      'Engagement & Growth Tactics',
    ],
    isActive: true,
    order: 5,
  },
  {
    number: '06',
    tag: 'Content Strategy',
    title: 'Content Creation & Copywriting',
    icon: 'FaPenNib',
    description:
      'Engage your target audience with sharp, compelling messaging. We craft high-impact website copy, campaign storylines, and editorial content that clearly articulates what makes your business extraordinary.',
    deliverables: [
      'Website Copywriting & Value Propositions',
      'Campaign Messaging & Taglines',
      'Content Marketing Assets',
      'Brand Voice & Tone Guidelines',
    ],
    isActive: true,
    order: 6,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    console.log('Cleared existing users and services.');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in backend/.env before seeding.');
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`Admin user created: ${admin.email}`);

    // Create services
    await Service.insertMany(services);
    console.log(`${services.length} services seeded successfully.`);

    console.log('\n✅ Database seeding completed!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
