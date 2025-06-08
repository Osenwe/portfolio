import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import python from './python.png'
import tableau from './tableau.png';
import p6 from './p6.png';
import excel from './excel.png';
import msproject from './msproject.png';
import pycharm from './pycharm.png'
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import traffic_light from './traffic_light.png';
import ultrasound from './ultrasonic.png';


export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    python,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    tableau, p6, msproject, excel, pycharm,
    traffic_light, ultrasound
};

export const workData = [
    {
        title: 'SavorDeck',
        description: 'Recipe Manager Application',
        bgImage: '/work-1.png',
        link: 'www.savordeck.com',
    },
   {
        title: 'Geo based app',
        description: 'Mobile App',
        bgImage: '/work-2.png',
        link: '#',
    },
]

export const serviceData = [
    {
        icon: assets.analytics_icon,
        title: 'Data Analytics & Insights',
        description: 'Delivering data-driven solutions by analyzing trends and translating metrics into strategic business actions using Python, SQL, and BI tools.',
        link: ''
    },
    {
        icon: assets.management_icon,
        title: 'Project Management',
        description: 'Managing tech and analytics projects from planning to execution with a focus on efficiency, stakeholder communication, and timely delivery.',
        link: ''
    }
   /* {
        icon: assets.backend_icon,
        title: 'Backend Development',
        description: 'Building and maintaining robust server-side applications using Django and relational databases like MySQL.',
        link: ''
    }*/ ,
    {
        icon: assets.training_icon,
        title: 'Tech Training & Mentorship',
        description: 'Educating students and teams in programming, analytics, and system design through structured, real-world learning experiences.',
        link: ''
    }
]

export const infoList = [
    {
        icon: assets.code_icon,
        iconDark: assets.code_icon_dark,
        title: 'Languages & Tools',
        description: 'Python, Pycharm, MySQL, Excel, Tableau, MS Project, P6'
    },
    {
        icon: assets.edu_icon,
        iconDark: assets.edu_icon_dark,
        title: 'Education',
        description: 'M.Sc. Information Systems'
    },
    {
        icon: assets.project_icon,
        iconDark: assets.project_icon_dark,
        title: 'Projects',
        description: 'Created 2 data and web development personal projects'
    }
];


export const toolsData = [
    [assets.vscode, "VSCode"], [assets.python, "Python"],[assets.p6, "Primavera P6"], [assets.msproject, "MS Project"], 
    [assets.git, "Git"], [assets.tableau, "Tableau"], [assets.pycharm, "Pycharm"]
];

// My research papers array
export const researchPapers = [
    {
      title: "Trust as a mediator in Nigerian e-commerce ...",
      journal: "Open Journal of Business and Management",
      year: "2025",
      abstract: "This research examines the role of trust as a mediating factor in Nigerian e-commerce ecosystems, analyzing its effects on consumer behavior, product quality perception, and convenience factors. The study provides insights into the unique challenges and opportunities within the Nigerian digital marketplace.",
      thumbnail: assets.research_icon, // Replace with appropriate icon
      pdfLink: "/papers/trust-nigerian-ecommerce.pdf", // Update with actual link
      doi: "10.4236/ojbm.2025.131016"
    },
    {
      title: "Prototyping and Conceptualizing Electric Model Vehicles...",
      journal: "IEEE German Education Conference (GECon)",
      year: "2023",
      abstract: "This paper presents a framework for prototyping electric model vehicles as educational tools to enhance automotive STEM education with a focus on sustainable e-mobility. The research demonstrates how practical engineering projects can strengthen technical education and promote environmental awareness.",
      thumbnail: assets.education_icon, // Replace with appropriate icon
      pdfLink: "https://ieeexplore.ieee.org/document/10295128",
      doi: "IEEE GECon 2023"
    },
    {
      title: "Desktop Factory: A Laboratory-scale Multisignal...",
      journal: "XVI Technologies Applied to Electronics Teaching Conference (TAEE)",
      year: "2024",
      abstract: "This research introduces a laboratory-scale desktop factory system utilizing RF/PID-based automation for industrial telematics and control experiments. The framework provides an accessible platform for teaching automation concepts, wireless communication, and control systems in educational settings.",
      thumbnail: assets.automation_icon, // Replace with appropriate icon
      pdfLink: "https://doi.org/10.1109/TAEE59541.2024.10604887", 
      doi: "10.1109/TAEE59541.2024.10604887"
    },
    {
      title: "Algorithmic Framework for Analyzing and Simulating Multi-Axial ...",
      journal: "IEEE International Conference on Robotic Computing (IRC)",
      year: "2023",
      abstract: "This paper presents an algorithmic framework for analyzing and simulating multi-axial robotic transformations in spatial coordinates. The research provides mathematical foundations and computational methods for modeling complex robotic movements and transformations in three-dimensional space.",
      thumbnail: assets.robotics_icon, // Replace with appropriate icon
      pdfLink: "https://doi.org/10.1109/IRC59093.2023.00034",
      doi: "10.1109/IRC59093.2023.00034"
    },
    {
      title: "Development of Microcontroller-Based Manipulator Arm ...",
      journal: "XVI Technologies Applied to Electronics Teaching Conference (TAEE)",
      year: "2024",
      abstract: "This research presents the development of a microcontroller-based manipulator arm as a teaching tool, addressing the trilemma of accessibility, functionality, and cost-effectiveness in robotics education for Nigerian schools. The framework provides a practical approach to introducing robotics concepts in resource-constrained educational environments.",
      thumbnail: assets.stem_icon, // Replace with appropriate icon
      pdfLink: "https://doi.org/10.1109/TAEE59541.2024.10604968",
      doi: "10.1109/TAEE59541.2024.10604968"
    }
  ]