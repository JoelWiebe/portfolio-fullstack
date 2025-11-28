<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Wipe the table clean before seeding
        Project::truncate();

        $projects = [
            [
                'title' => "AI Theme Analyser",
                'categories' => ["AI & Analytics", "Research & Pedagogy"],
                'role' => "Lead Developer",
                'summary' => "Human-in-the-Loop tools for qualitative research using Vertex AI.",
                'description' => "Developed 'Human-in-the-Loop' (HitL) tools for qualitative research. Created a Thematic Analysis engine that performs coding, theme generation, magnitude coding, cross-case reporting, and automated theme map visualization. \n\nMethodology published in: Wiebe, J. P., Khan, R., Burns, S., & Slotta, J. D. (2025). Qualitative Research in the Age of LLMs: A Human-in-the-Loop Approach to Hybrid Thematic Analysis. ICLS 2025.",
                'tags' => ["Python", "Vertex AI", "LLMs", "HitL Workflows", "Qualitative Analysis"],
                'links' => [
                    ['label' => "GitHub Repository", 'url' => "https://github.com/encorelab/ai-theme-analyser"],
                    ['label' => "ICLS 2025 Publication", 'url' => "https://doi.org/10.22318/icls2025.322165"]
                ]
            ],
            [
                'title' => "AI Emotion Analyzer",
                'categories' => ["AI & Analytics", "Research & Pedagogy"],
                'role' => "Developer",
                'summary' => "Scalable emotion identification tool for qualitative datasets.",
                'description' => "Built a specialized tool for extracting and classifying emotional markers within large textual datasets. This Human-in-the-Loop system allows researchers to validate AI-generated emotion codes.\n\nResearch Context: Yu, E., Burns, S., Wiebe J.P., Perlman, J., Chen I., Kahlon, K., Perlman, M. (Under Review). Parent Voices on the benefits and challenges of Canada’s new child care policy: An emotion analysis using a large language model.",
                'tags' => ["Python", "NLP", "Emotion Analysis", "Research Tool"],
                'links' => [
                    ['label' => "GitHub Repository", 'url' => "https://github.com/JoelWiebe/AI-Emotion-Analyzer"]
                ]
            ],
            [
                'title' => "AI Data Extractor",
                'categories' => ["AI & Analytics", "Research & Pedagogy"],
                'role' => "Developer",
                'summary' => "Automated data extraction for scoping reviews.",
                'description' => "Developed a Python-based tool to automate the extraction of specific data points from full-text research papers. This tool supports scoping reviews by parsing PDFs and structuring unstructured academic text into analyzable formats.\n\nPublished Protocol: Yu, E., Burns, S., Wiebe, J. P., Schmeichel, A., & Perlman, M. (2025). Application of artificial intelligence in early childhood development: a scoping review protocol. BMJ Open.",
                'tags' => ["Python", "PDF Parsing", "Data Extraction", "Automation"],
                'links' => [
                    ['label' => "GitHub Repository", 'url' => "https://github.com/JoelWiebe/AI-Data-Extractor"],
                    ['label' => "BMJ Open Publication", 'url' => "https://doi.org/10.1136/bmjopen-2025-106044"]
                ]
            ],
            [
                'title' => "Personal Portfolio Infrastructure (In-Progress)",
                'categories' => ["Full Stack Ed-Tech", "Cloud & DevOps"],
                'role' => "Architect",
                'summary' => "High-availability portfolio on OCI using Laravel and MySQL.",
                'description' => "Architected a personal portfolio using Laravel and MySQL hosted on Oracle Cloud Infrastructure (OCI). Demonstrates high-fidelity implementation of OWASP security controls, AODA-compliant accessible design, and performant CSS/JS animations, utilizing Eloquent ORM for robust data modeling.",
                'tags' => ["Laravel", "MySQL", "OCI", "Nginx", "AODA", "OWASP"],
                'links' => []
            ],
            [
                'title' => "Crowd Tutor: Knowledge Worlds",
                'categories' => ["Full Stack Ed-Tech", "AI & Analytics", "Research & Pedagogy"],
                'role' => "Founding Director & Lead Developer",
                'summary' => "Scalable adaptive learning platform using Flutter and Generative AI.",
                'description' => "Founded a tech initiative for youth upskilling. Architecting a scalable adaptive learning platform using Flutter, Firebase, and Generative AI to gamify interest exploration and social learning. The system implements the MMMAAP instructional model (Multi-sensory, Motivational, Meaningful, Active, Applied, and Peer Learning).",
                'tags' => ["Flutter", "Firebase", "Generative AI", "Bonfire 2D", "Mobile"],
                'links' => [
                    ['label' => "crowdtutor.org", 'url' => "https://crowdtutor.org"]
                ]
            ],
            [
                'title' => "CK Board & SCORE Platform",
                'categories' => ["Full Stack Ed-Tech", "Cloud & DevOps", "Research & Pedagogy"],
                'role' => "Full Stack Developer & Researcher",
                'summary' => "Real-time orchestration on Azure PaaS with Node.js and WebSockets.",
                'description' => "Architected the CK Board and SCORE Authoring platforms on Azure PaaS. Utilized Angular, Node.js, and FabricJS for the frontend canvases. Implemented Redis and WebSockets to power 'RoomCast,' enabling real-time distribution and synchronization of artifacts across student devices in high-availability educational settings.",
                'tags' => ["Angular", "Node.js", "Azure PaaS", "Redis", "WebSockets", "FabricJS", "MongoDB"],
                'links' => [
                    ['label' => "Watch Demo Video", 'url' => "https://www.youtube.com/watch?v=t4aLSKlEc90"]
                ]
            ],
            [
                'title' => "TMU Rehearsals Platform",
                'categories' => ["Full Stack Ed-Tech", "Research & Pedagogy"],
                'role' => "Technical Consultant & Developer",
                'summary' => "Custom research platform for Toronto Metropolitan University.",
                'description' => "Consulted with faculty to identify platform needs for a specific research grant. Forked UC Berkeley's WISE project and rebranded it as 'Rehearsals'. Enabled experimental AI features and designed a custom data collection activity deployed to over 200 students, ensuring the platform met strict research objectives.",
                'tags' => ["Java Spring", "Angular", "Research Design", "AI Integration", "Consulting"],
                'links' => []
            ],
            [
                'title' => "ISLS Technical Infrastructure",
                'categories' => ["Cloud & DevOps", "Full Stack Ed-Tech"],
                'role' => "Technical Lead, Publications",
                'summary' => "Automation pipelines for proceedings and DSpace repositories.",
                'description' => "Global Technical Leadership for the International Society of the Learning Sciences. Engineered Python automation pipelines to process proceedings metadata, generate import packages for DSpace, and execute automated DOI registration via CrossRef. Developed a full-stack validation tool using Docker, Flask, and Jinja2 on Google Cloud.",
                'tags' => ["Python", "DSpace", "Docker", "Flask", "Google Cloud", "CrossRef"],
                'links' => []
            ],
            [
                'title' => "WISE Project (Berkeley Collab)",
                'categories' => ["Full Stack Ed-Tech"],
                'role' => "Collaborator & Developer",
                'summary' => "Extended Java Spring/Angular codebase for international research.",
                'description' => "Forked and extended a complex Java Spring/Angular codebase to support international research. Deployed containerized environments using Docker and explored new applications of LLMs for knowledge integration guidance and assessment.",
                'tags' => ["Java Spring", "Angular", "Docker", "LLMs", "Research"],
                'links' => []
            ],
            [
                'title' => "Darwin Robot (Autonomous Agents)",
                'categories' => ["HCI & Robotics"],
                'role' => "Robotics Developer",
                'summary' => "C++ Development for Darwin humanoid robot in FIRA HuroCup.",
                'description' => "Member of the Autonomous Agents Lab at the University of Manitoba. Developed C++ control software for the Darwin humanoid robot to compete in the FIRA HuroCup Marathon. Focused on computer vision integration and gait stability for autonomous navigation.",
                'tags' => ["C++", "Robotics", "Computer Vision", "Autonomous Agents", "Darwin-OP"],
                'links' => []
            ],
            [
                'title' => "Nao Robot Telepresence",
                'categories' => ["HCI & Robotics", "Research & Pedagogy"],
                'role' => "HCI Researcher",
                'summary' => "Telepresence interface development leading to IEEE publication.",
                'description' => "Engineered a microcontroller system for a boom camera on a Nao humanoid robot. Conducted HCI research on telepresence interfaces, which led to a publication in the IEEE International Symposium on Robot and Human Interactive Communication (RO-MAN).",
                'tags' => ["Robotics", "HCI", "Nao", "Research", "IEEE"],
                'links' => [
                    ['label' => "IEEE Publication", 'url' => "https://ieeexplore.ieee.org/document/8172419"]
                ]
            ],
            [
                'title' => "Remote Nurse Training Robotics",
                'categories' => ["HCI & Robotics", "Research & Pedagogy", "Ed-Tech Support"],
                'role' => "Educational Technology Researcher",
                'summary' => "Supporting remote presence robotics for Northern Saskatchewan nursing education.",
                'description' => "Supported faculty at the University of Saskatchewan in using remote presence robotics to deliver nurse training to remote northern regions. Performed observations and engaged in dialogue with faculty to optimize the use of robotics for productive pedagogical dialogue and lab training.",
                'tags' => ["Telepresence", "Robotics", "Nursing Education", "Qualitative Observation", "Remote Learning"],
                'links' => []
            ],
            [
                'title' => "ECE Data Visualization",
                'categories' => ["AI & Analytics", "Consulting"],
                'role' => "Technical Data Consultant",
                'summary' => "Automated assessment reporting workflow for Govt. of Nova Scotia.",
                'description' => "Designed a Python-based data curation and visualization workflow for Mount Saint Vincent University and the Government of Nova Scotia. The system generates automated assessment reports for Early Childhood Education Centers, supporting government quality assurance teams.",
                'tags' => ["Python", "Data Visualization", "Consulting", "Automation"],
                'links' => []
            ],
            [
                'title' => "Robot Control Interface",
                'categories' => ["HCI & Robotics"],
                'role' => "Robotics & Interface Developer",
                'summary' => "C#/WPF application for Microsoft Surface to control inspection robots.",
                'description' => "Designed a full-stack C#/WPF application for the Microsoft Surface tablet to control Inuktun inspection robot cameras and configurations. Implemented 3D animations to visualize robot body orientation and camera views in real-time.",
                'tags' => ["C#", "WPF", "Robotics", "Microsoft Surface", "3D Animation"],
                'links' => []
            ],
            [
                'title' => "College of Nursing Operations",
                'categories' => ["Ed-Tech Support"],
                'role' => "Project Manager & Dev",
                'summary' => "Managed SharePoint workflows and institutional PHP website.",
                'description' => "Co-administered the College’s institutional PHP website and managed complex internal workflows using SharePoint (room bookings, document management). Sustained the technical use of ExamSoft and facilitated the adoption of electronic grading for OSCEs.",
                'tags' => ["PHP", "SharePoint", "ExamSoft", "LMS", "Operations"],
                'links' => []
            ],
            [
                'title' => "Geomax Enterprise Mobile",
                'categories' => ["Full Stack Ed-Tech", "Legacy Systems"],
                'role' => "Wireless Application Developer",
                'summary' => "Java Server Pages (JSP) application with Hibernate ORM.",
                'description' => "Designed and deployed a Java Server Pages (JSP) application utilizing Servlets, JavaBeans, and Hibernate ORM for efficient MySQL data management. Implemented interactive front-ends using JavaScript and jQuery that integrated with server-side logic for push notifications.",
                'tags' => ["Java", "JSP", "Hibernate ORM", "MySQL", "jQuery", "Enterprise"],
                'links' => []
            ]
        ];

        foreach ($projects as $projectData) {
            Project::create($projectData);
        }
    }
}