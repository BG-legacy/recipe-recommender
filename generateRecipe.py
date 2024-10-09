import json
import sys
from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOllama(model='llama3.1')

recipe_prompt = ChatPromptTemplate.from_template(
    "Based on the user's preference for {preference}, recommend a recipe. Only provide the name and a brief description of the recipe."
)

details_prompt = ChatPromptTemplate.from_template(
    "Provide the ingredients and instructions for the {recipe_name} recipe."
    
)

recipe_chain = recipe_prompt | llm | StrOutputParser()
details_chain = details_prompt | llm | StrOutputParser()

def main():
    input_data = json.loads(sys.stdin.read())
    preference = input_data.get('preference', '')
    get_details = input_data.get('get_details', False)
    recipe_name = input_data.get('recipe_name', '')
    
    if get_details:
        details = details_chain.invoke({'recipe_name': recipe_name})
        output = {'details': details}
    else:
        recommendation = recipe_chain.invoke({'preference': preference})
        output = {'recommendation': recommendation}
    
    print(json.dumps(output))

if __name__ == "__main__":
    main()