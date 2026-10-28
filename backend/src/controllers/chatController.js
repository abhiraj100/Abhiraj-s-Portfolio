import { defaultProjects, defaultSkills, defaultExperience, defaultCertifications } from '../data/seedData.js';

export const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a message query.',
    });
  }

  const query = message.trim().toLowerCase();

  // If user has OPENAI_API_KEY set in process.env, can optionally use it
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are the AI portfolio assistant for Abhiraj Yadav, a Full Stack Software Engineer specializing in React, Node.js, .NET 8, MongoDB, Azure, and Generative AI / RAG. Education: MCA from VIT Bhopal (8.50 CGPA). Contact: abhirajyadav303@gmail.com. Projects: DevPilot AI, FloCard, SkillTrack, Fennex Safety, QuickCart, EventWithYadavs. Keep answers concise, professional, warm, and helpful to recruiters.`,
            },
            { role: 'user', content: message },
          ],
          max_tokens: 250,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        return res.json({
          success: true,
          reply: data.choices[0].message.content,
          source: 'openai',
        });
      }
    } catch (err) {
      // Fallback to rule engine
    }
  }

  // Built-in intelligent rule & context engine
  let reply = '';
  const suggestions = [];

  if (query.includes('hire') || query.includes('job') || query.includes('opportunity') || query.includes('available') || query.includes('role')) {
    reply = "Abhiraj is actively available for Software Engineer (Full Stack, Backend, Frontend, or AI Engineering) roles. He is open to remote roles as well as relocation. You can reach out directly via the contact form below or email abhirajyadav303@gmail.com!";
    suggestions.push('What are his core skills?', 'Tell me about DevPilot AI', 'Where is he located?');
  } else if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('language')) {
    reply = `Abhiraj's core technical toolkit spans:
• Full Stack: React, Next.js, Node.js, Express.js, ASP.NET Core, .NET 8, REST APIs, Tailwind CSS
• AI & GenAI: OpenAI API, Azure OpenAI, RAG Pipelines, Vector Search, LangChain, Embeddings
• Databases: MongoDB, PostgreSQL, SQL Server, Redis
• Cloud & DevOps: Docker, Azure, AWS, GitHub Actions CI/CD
• Languages: C#, JavaScript, TypeScript, Java, Python, SQL.`;
    suggestions.push('Tell me about his AI experience', 'Show me his projects', 'What is his education?');
  } else if (query.includes('devpilot') || query.includes('rag') || query.includes('ai') || query.includes('llm') || query.includes('openai')) {
    reply = "Abhiraj built 'DevPilot AI'—a developer-first AI workspace that indexes repositories, performs semantic code search with vector embeddings, and delivers architectural insights using RAG. He also worked on enterprise document search with Azure AI Search and Azure OpenAI on the Fennex Safety solution!";
    suggestions.push('What stack was used for DevPilot AI?', 'Tell me about SkillTrack', 'How to contact Abhiraj?');
  } else if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
    reply = `Abhiraj has built several production-grade applications:
1. DevPilot AI (AI workspace with RAG code search)
2. FloCard (.NET 8 & blockchain digital identity platform)
3. SkillTrack (MERN SaaS learning platform with role-based auth)
4. Fennex Safety (SPFx & Azure AI document intelligence)
5. EventWithYadavs (Community platform with QR ticketing & SMTP)
6. QuickCart (Modern e-commerce with Next.js, Node & Stripe).`;
    suggestions.push('Tell me about FloCard', 'Tell me about DevPilot AI', 'What is his GitHub?');
  } else if (query.includes('experience') || query.includes('company') || query.includes('work history') || query.includes('background')) {
    reply = `Abhiraj has shipped real-world production software across multiple teams:
• Software Engineer at 366Pi Technology (Jun 2026 — Present): Full-stack, .NET & AI workflows
• Software Developer Engineer at Stocai 109 Technology (Mar 2025 — Apr 2026): Performance & REST APIs
• Developer Intern at Affy Cloud IT Solutions (Nov 2024 — Jan 2025): React interfaces & OAuth
• React.js Intern at Codes For Tomorrow (Sep 2024 — Nov 2024): API integrations & telemetry dashboards.`;
    suggestions.push('What are his strongest skills?', 'What is his education?', 'How can I hire him?');
  } else if (query.includes('education') || query.includes('degree') || query.includes('college') || query.includes('university') || query.includes('mca') || query.includes('vit')) {
    reply = "Abhiraj holds an MCA (Master of Computer Applications) from Vellore Institute of Technology (VIT), Bhopal (2023–2025) with an outstanding 8.50 / 10 CGPA. Prior to that, he completed his BCA from Nilamber-Pitamber University with 72.25%.";
    suggestions.push('What certifications does he have?', 'What projects did he build?', 'Can I download his resume?');
  } else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('phone') || query.includes('message')) {
    reply = "You can contact Abhiraj via email at abhirajyadav303@gmail.com, connect on LinkedIn (linkedin.com/in/abhiraj-yadav-86a232215/), or use the contact form at the bottom of this portfolio!";
    suggestions.push('Send a message via the form', 'Check his GitHub', 'Open Dev Terminal');
  } else if (query.includes('resume') || query.includes('cv')) {
    reply = "You can download Abhiraj's complete updated PDF resume using the 'Resume' button in the hero section or the header at the top of the page!";
    suggestions.push('What are his core skills?', 'Tell me about his experience', 'Where is he located?');
  } else {
    reply = "Hi! I am Abhiraj's AI Portfolio Assistant. I can tell you about his full-stack engineering experience, AI/RAG projects like DevPilot AI, his education at VIT Bhopal, or how you can collaborate with him. What would you like to know?";
    suggestions.push('What are his core skills?', 'Tell me about his projects', 'Is he available for hire?');
  }

  return res.json({
    success: true,
    reply,
    suggestions,
    source: 'portfolio-engine',
  });
};
