from crewai import Agent,Task,Crew
from crewai_tools import ScrapeWebsiteTool,PDFSearchTool,SerperDevTool,FileReadTool
from Agents import (researcher_agent,project_agent
                    ,activity_agent,work_researcher_agent,
                    format_agent,latex_format_data_agent)

#Task 1
researcher_task = Task(
    description=(
        "Analyze the provided job posting job description ({job_description}) "
        "to extract key skills, experiences, and qualifications required. "
        "Utilize available tools to gather content, identify, and categorize the requirements."
    ),
    expected_output=(
        "A structured list of job requirements, including necessary skills, qualifications, experiences, tech stack, and certifications."
    ),
    agent=researcher_agent,
    async_execution=True
)

#Task 2
# Task for Profile Agent: Structure User Data
profile_task = Task(
    description=(
        "Structure the user's data {education_text} ensuring that their name, college, and degree are included. "
        "Review the user data {skills_text} and include essential details, prioritizing the most important information."
    ),
    expected_output=(
        "do not add too much details from the link of linkedin and github or anyother if adding the detail can increase the"
        "the chance job match then only include it"
        "The user's details are well-formatted with minimal line spacing. "
        "Group social links together and place them centrally. "
        "Organize social links and academic data into sections, using underlines to separate sections. "
        "link text with color and make important text bold."
    ),
    context=[researcher_task],
    agent=researcher_agent,
    async_execution=True
)

#Task 3
# Task for Project Manager: Sort and Present Projects
project_task = Task(
    description=(
        "Sort the user's projects {project_text} based on their relevance to the job requirements. "
        "Match each project's tech stack and skills with those required by the job, selecting the 3-5 most relevant projects. "
        "Exclude any unrelated projects."
    ),
    expected_output=(
        "A list of the most relevant projects matching the job requirements. "
        "Structure the project list with improved project names that relate to the job requirements. "
        "Bold the project names and include the project dates in month/year format. "
        "Provide a brief description of each project, focusing on the most suitable tech stack related to the job requirements. "
        "Highlight any live project links with a suitable color if available. "
        "If space permits, include what the user learned from each project's development."
    ),
    context=[researcher_task],
    agent=project_agent,
    async_execution=True
)


#Task 4
# Task for Activity Manager: Sort and Present Activities
activity_task = Task(
    description=(
        "Format the activity section {activity_text} using bold and italic text to highlight extracurricular activities. "
        "Include certificates only if they are relevant to the job. "
        "Sort the activities by their relevance to the job description and remove any unrelated activities. "
        "Relate your skills to the activities and certificates."
    ),
    expected_output=(
        "A well-formatted activity section using appropriate bold and italic fonts to highlight achievements. "
        "Sorted activities and certificates that are most relevant to the job requirements. "
        "Place the dates aligned to the right of the activity or certificate name. Change the color of any links if present. "
        "Briefly describe each activity with concise descriptions."
    ),
    context=[researcher_task,profile_task],
    agent=activity_agent,
    async_execution=True
)


# Task 5
# Task for Work Manager: Structure and Present Work Experience
work_task = Task(
    description=(
        "This is the most important section. Use the job requirements and qualifications to demonstrate how the user's work experience {experience_text}"
        "can effectively contribute to the job role."
    ),
    expected_output=(
        "A well-formatted work experience section with color text, listing the user's positions. The previous job roles should be bold with dates in the right corner. "
        "Mention if the job was remote, hybrid, or on-site. "
        "Include the company name, prioritizing larger and reputable companies at the top. "
        "Provide a short explanation of the work experience, relating how the user's previous experience is beneficial for the current role. "
        "Add skills and projects the user worked on after the short description of the work at the company. "
        "All details should be clearly mentioned and prioritized based on relevance to the current job and company type."
    ),
    context=[work_researcher_agent],
    agent=researcher_agent,
    async_execution=True
)


# Task 6
format_task = Task(
    description=(
        "use previous data to format the user data and bold the section title and use italic font to style color the link text and make sure the whole "
        "do the formatting in ATS friendly way eary section and date ,link and detilas is easly readable by the ATS machine for resume"
    ),
    expected_output=(
        "add horizonatal line in seaction , color the link and heighlight the skills fit the user data in one page only"
        "use small text to fit in one page only don't use horizonatl margin"
        "don't use large margin space among the line and esction use less margin and make sure it it is clearnly visible to the HR"
        "give top left right bottom little margin"
        "well fomatted document and with each section heighlited "
        "place the user details , skills ,work experince ,projects ,activity and certification in this order"
        "but projects ,activity and certification in this order can be changed depends uplon the job requiredment "
        "the priorty so the aligh the data in most sutaible way"
        "remove any fake data which is not provided by the user"
        ""
    ),
    context=[researcher_task,profile_task,project_task,activity_task],
    agent=format_agent
)


# LaTeX Task: Convert Data to LaTeX Code
latex_task = Task(
    description=(
        "Convert each line and link everything into LaTeX code, ensuring each section is appropriately highlighted with bold and suitable colors. "
        "Do not include page numbers in the code. use small font to and no margin in horizontally"
    ),
    expected_output=(
        "do not use the input file data on use the format and the structure of the file to create a latex in that format"
        "The LaTeX code should cover all user data including user details, projects, work experience, activities, certifications, and everything else. "
        "It should be well-documented and formatted in the .ltx format, ready for compilation into a LaTeX document."
    ),
    context=[format_task],  # Add more context if needed: research_task, profile_task, project_task, activity_task
    output_file = "new_resume.tex",
    agent=latex_format_data_agent
)





