import { Profile } from '../models/profile.model';

// TODO(step 2): fill remaining content (about text, more projects, LeetCode URL).
export const PROFILE: Profile = {
  name: 'Gaurav Kumar',
  title: 'Java Developer',
  tagline: 'I build scalable software solutions.',
  intro:
    'Backend developer building AI-agent platforms with Spring Boot, Spring AI, RAG pipelines and MCP. Currently at RedBlink Technologies.',
  email: 'gaurav.kumar.deve@gmail.com',
  resumeUrl: 'resume/GK_Resume.pdf',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/Gauravkumar1502', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/gauravkumar15', icon: 'linkedin' },
    { id: 'x', label: 'X / Twitter', url: 'https://x.com/Gauravkuma_r', icon: 'x' },
    { id: 'hackerrank', label: 'HackerRank', url: 'https://www.hackerrank.com/profile/gauravkumar15021', icon: 'hackerrank' },
    { id: 'codepen', label: 'CodePen', url: 'https://codepen.io/gauravkumar1502', icon: 'codepen' },
  ],
  experience: [
    {
      company: 'RedBlink Technologies',
      role: 'Junior Java Developer',
      location: 'Mohali, India',
      start: 'Dec 2025',
      end: 'Present',
      points: [
        'Developing Knolli.ai, an AI-agent platform, using Spring Boot, Spring AI and REST APIs for natural-language CRM operations.',
        'Built RAG pipelines using Spring AI and Vespa for vector search, with isolated knowledge bases per copilot.',
        'Implemented MCP (Model Context Protocol) to connect agents with external tools and expose Knolli.ai tools to other AI systems.',
        'Built a Salesforce Intelligent Copilot with a custom SOQL builder; integrated HubSpot and Crossbeam for CRM data.',
      ],
    },
    {
      company: 'Etasens Technologies',
      role: 'Junior Software Developer',
      location: 'Chandigarh, India',
      start: 'Apr 2025',
      end: 'Dec 2025',
      points: [
        'Contributed to a digital signage product for restaurants that displays menus based on time, location and scheduling rules.',
        'Built full-stack features with Spring Boot, REST APIs and Angular 17+, integrating POS systems (PAR, Clover, Square, Oracle, Toast).',
        'Developed REST and MCP-based integrations between POS systems and the signage platform.',
        'Improved reliability and scalability with ActiveMQ-based asynchronous communication between services.',
      ],
    },
    {
      company: 'Dortex AI Pvt Ltd',
      role: 'Junior Software Developer',
      location: 'Mohali, Punjab',
      start: 'Jul 2024',
      end: 'Feb 2025',
      points: [
        'Designed a CI/CD pipeline with GitHub Actions, cutting manual deployment effort and release turnaround time.',
        'Developed REST APIs for mobile and web with Spring Boot, AWS S3, EC2 and PostgreSQL.',
      ],
    },
  ],
  projects: [
    {
      name: 'BEDEV Coding Platform',
      stack: ['Angular 17', 'Java', 'Spring Boot', 'JPA', 'MySQL', 'WebSocket'],
      description:
        'A LeetCode-inspired coding platform supporting code execution, submissions and real-time competitive features.',
    },
  ],
  skills: [
    { label: 'Languages', items: ['Java', 'C', 'JavaScript', 'HTML/CSS'] },
    { label: 'Frameworks', items: ['Spring Boot', 'Spring AI', 'Angular 17+'] },
    { label: 'AI/ML', items: ['RAG pipelines', 'Vector similarity search', 'LLM-based agents', 'MCP'] },
    { label: 'Database', items: ['MySQL', 'PostgreSQL', 'PL/SQL', 'Redis'] },
    { label: 'Tools', items: ['REST', 'GraphQL', 'Linux', 'Git', 'Docker', 'AWS', 'ActiveMQ'] },
  ],
  education: [
    {
      school: 'Chandigarh University',
      degree: 'Master of Computer Applications (Cloud Computing & DevOps)',
      location: 'Mohali, Punjab',
      start: 'Sep 2022',
      end: 'Jul 2024',
      score: 'CGPA 7.06/10',
    },
    {
      school: 'Swami Shri Swaroopanand Saraswati Mahavidyalaya',
      degree: 'Bachelor of Computer Applications',
      location: 'Bhilai, Chhattisgarh',
      start: 'Jul 2017',
      end: 'Jul 2020',
      score: '72.7%',
    },
  ],
  certifications: [
    { title: 'TCS CodeVita', detail: 'Rank 1970 in an international coding competition' },
    { title: 'Version Control with Git' },
  ],
};
