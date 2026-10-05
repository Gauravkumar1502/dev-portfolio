import { type Profile } from '../models/profile.model';

export const PROFILE: Profile = {
  name: 'Gaurav Kumar',
  title: 'Java Developer',
  tagline: 'I build scalable software solutions.',
  intro:
    'I’m a backend developer who designs efficient APIs, scalable data models and AI-powered workflows with Java, Spring Boot and Spring AI. Currently at RedBlink Technologies, I build Knolli.ai, an AI-agent platform, working on RAG pipelines, MCP integrations and CRM copilots.',
  currentCompany: 'RedBlink Technologies',
  location: 'Mohali, India',
  about: [
    'My coding adventure kicked off back in 2015 with NFS and Vice City. Racing virtual cars turned out to be my unexpected gateway into tech. In school I started playing with C and Java, building NetBeans desktop apps that probably confused more people than they helped.',
    'In college I dove deep into programming, databases and web technologies, earning a BCA and then an MCA in Cloud Computing & DevOps, and learning how to turn complex problems into clean, working solutions.',
    'Since then I’ve shipped CI/CD pipelines and Spring Boot APIs at Dortex AI, integrated restaurant POS systems with a digital-signage platform at Etasens, and today I build AI agents, RAG pipelines and MCP integrations at RedBlink Technologies.',
    'When I’m not coding you’ll find me exploring new tech, watching sci-fi or playing video games. Always up for a chat about tech, so feel free to reach out!',
  ],
  aboutTech: [
    'Java',
    'Spring Boot',
    'Spring AI',
    'RAG & vector search',
    'MCP',
    'Angular 17+',
    'PostgreSQL',
    'Docker',
    'AWS (EC2, S3, RDS)',
    'GitHub Actions',
  ],
  email: 'gaurav.kumar.deve@gmail.com',
  resumeUrl: 'resume/GK_Resume.pdf',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/Gauravkumar1502', icon: 'github' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/gauravkumar15',
      icon: 'linkedin',
    },
    {
      id: 'leetcode',
      label: 'LeetCode',
      url: 'https://leetcode.com/GauravKumar15/',
      icon: 'leetcode',
    },
    { id: 'x', label: 'X / Twitter', url: 'https://x.com/Gauravkuma_r', icon: 'x' },
    {
      id: 'hackerrank',
      label: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/gauravkumar15021',
      icon: 'hackerrank',
    },
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
      featured: true,
      stack: ['Angular 17', 'Java', 'Spring Boot', 'JPA', 'MySQL', 'WebSocket'],
      description:
        'A LeetCode-inspired coding platform supporting code execution, submissions and real-time competitive features.',
      repo: 'https://github.com/Gauravkumar1502/Be-Dev',
    },
    {
      name: 'LinkedIn Automate CLI',
      featured: true,
      stack: ['Java', 'ChatGPT API', 'CLI'],
      description:
        'A command-line tool that automates LinkedIn posting, using ChatGPT to generate engaging, personalised posts.',
      repo: 'https://github.com/Gauravkumar1502/LinkedinAutomateCLI',
    },
    {
      name: 'KeepNotes',
      stack: ['Angular 17', '.NET', 'REST API'],
      description: 'A note-taking app with an Angular v17 frontend and a .NET REST API backend.',
      repo: 'https://github.com/Gauravkumar1502/KeepNotes',
    },
    {
      name: 'P2P Chatting',
      stack: ['Java', 'Sockets', 'Multithreading'],
      description:
        'A multi-client chat server in Java with concurrent client handling over sockets and a custom messaging protocol.',
      repo: 'https://github.com/Gauravkumar1502/P2PChatting',
    },
    {
      name: 'SpaceX Update',
      stack: ['Angular 19', 'TypeScript'],
      description: 'An Angular app showing the latest SpaceX launch updates.',
      repo: 'https://github.com/Gauravkumar1502/SpaceX-Update',
      live: 'https://space-x-update.vercel.app',
    },
    {
      name: 'Terminal Portfolio (v1)',
      stack: ['HTML', 'CSS', 'JavaScript'],
      description: 'The original terminal-style portfolio with interactive commands and themes.',
      repo: 'https://github.com/Gauravkumar1502/Terminal-Portfolio',
      live: 'https://gauravkumar1502.github.io/Terminal-Portfolio/',
    },
  ],
  skills: [
    { label: 'Languages', items: ['Java', 'C', 'JavaScript', 'HTML/CSS'] },
    { label: 'Frameworks', items: ['Spring Boot', 'Spring AI', 'Angular 17+'] },
    {
      label: 'AI/ML',
      items: ['RAG pipelines', 'Vector similarity search', 'LLM-based agents', 'MCP'],
    },
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
    {
      title: 'TCS CodeVita',
      detail: 'Rank 1970 in an international coding competition',
      url: 'https://drive.google.com/file/d/1qrTQOjfAz4np93VKglLMewXaNh2iyd4i/view?usp=drive_link',
    },
    {
      title: 'Version Control with Git',
      detail: 'Coursera',
      url: 'https://www.coursera.org/account/accomplishments/verify/6SFGCMX96SUD',
    },
  ],
};
