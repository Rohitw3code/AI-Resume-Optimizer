from crewai_tools import ScrapeWebsiteTool,PDFSearchTool,SerperDevTool,FileReadTool
from crewai import Agent,Task,Crew

from Agents import (researcher_agent,profile_agent,activity_agent,
                    project_agent,work_researcher_agent,
                    latex_format_data_agent,format_agent)

from Tasks import (researcher_task,profile_task,project_task,work_task,
                   latex_task,format_task,activity_task)

from dotenv import load_dotenv, find_dotenv
import os


_ = load_dotenv(find_dotenv())
openai_api_key = os.getenv("OPENAI_API_KEY")
os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")
os.environ["OPENAI_MODEL_NAME"] = 'gpt-3.5-turbo'


job_application_crew = Crew(
    agents=[researcher_agent,profile_agent,
            project_agent,activity_agent,
            work_researcher_agent,format_agent,latex_format_data_agent],

    tasks=[researcher_task,profile_task,
          project_task,activity_task,
          work_task,format_task,latex_task],
    verbose=True,
    memory=True
)


def generate_resume(data):
    print("Generate Resume : ",data)
    pass



