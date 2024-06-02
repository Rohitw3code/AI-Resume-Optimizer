from crewai import Agent,Task,Crew
from crewai_tools import ScrapeWebsiteTool,PDFSearchTool,SerperDevTool,FileReadTool


search_tool = SerperDevTool()
scrape_tool = ScrapeWebsiteTool()
resume_tool = FileReadTool(file_path='./template.docx')


researcher_agent = Agent(
    role="Tech Job Researcher",
    goal="Make sure to do amazing analysis on "
        "job posting to help job applicants land a job for ",
    tools = [scrape_tool, search_tool],
    verbose=True,
    backstory=(
        "As a Job Researcher, your prowess in "
        "navigating and extracting critical "
        "information from job postings."
        "Your skills help pinpoint the necessary "
        "qualifications and skills sought "
        "by employers, forming the foundation for "
        "effective application tailoring."
    )
)

profile_agent = Agent(
    role="Profile Engineer",
    goal="Ensure all necessary details about the user are thoroughly included",
    verbose=True,
    backstory=(
        "You specialize in verifying and compiling user information from both academic backgrounds "
        "such as grades, college, school, semesters, degrees or diplomas, and other branches, "
        "as well as academic status. Additionally, you manage social information such as links, IDs, "
        "and usernames, handling user data with ease and precision."
    )
)


# Agent 3
project_agent = Agent(
    role="Project Manager",
    goal="Ensure to add only relevant projects",
    verbose=True,
    backstory=(
        "You specialize in managing projects and have a strong understanding of which projects best match the job posting role. "
        "You can analyze the project's tech stack and filter out the ones that align best with the job requirements. "
        "You excel at comparing projects and can use various sources to identify the most relevant ones."
    )
)


# Agent 4
activity_agent = Agent(
    role="Extracurricular Activities Coordinator",
    goal="Ensure to add only relevant extracurricular activities",
    verbose=True,
    backstory=(
        "You specialize in managing and curating extracurricular activities, ensuring they align with the user's profile and goals. "
        "You have a keen eye for identifying activities that best showcase the user's skills and interests, providing a well-rounded view of their capabilities. "
        "You are adept at analyzing the relevance of various activities and can efficiently filter out those that are most pertinent."
    )
)



# Agent 5
work_researcher_agent = Agent(
    role="Work Experience Coordinator",
    goal="Ensure to add only relevant work experiences and prioritize them based on the job role",
    verbose=True,
#     tools = [scrape_tool,search_tool],
    backstory=(
        "You specialize in handling and organizing work experience, arranging it in an order that highlights the most relevant roles based on the job posting. "
        "You focus on including experiences that capture the attention of HR, whether they are internships, jobs, freelance projects, or part-time work. "
        "Your keen understanding of job requirements ensures that only the most pertinent experiences are included and emphasized."
    )
)


# Agent 6
format_agent = Agent(
    role="Resume Formatter",
    goal="Ensure the data is structured and formatted in the best resume-friendly manner",
#     tools=[scrape_tool,search_tool],
    verbose=True,
    backstory=(
        "You specialize in formatting and structuring resumes to be well-readable by HR and ATS-friendly. "
        "You excel at highlighting the most relevant points, ensuring the resume is well-structured and formatted. "
        "Each point is noticeable and well-documented, fitting all essential information onto a single page."
    )
)

# Agent 7
latex_format_data_agent = Agent(
    role="LaTeX Resume Formatter",
    goal="Ensure each detail is formatted in LaTeX",
    tools=[resume_tool],
    verbose=True,
    backstory=(
        "you dont use the file data only use the format"
        "You are an expert in LaTeX programming, capable of coding any document format with relevant highlighting and color coding. "
        "You write optimal LaTeX code to ensure resumes are easily readable by ATS machines. "
        "follow the formatting syle of the given resume pdf as input "
        "Your skill ensures that the resume is both visually appealing and technically efficient."
    )
)











