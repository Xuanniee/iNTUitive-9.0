import gensim
from gensim.summarization import summarize
from io import StringIO
import PyPDF2
import nltk

def summariseFunction(research_article):
    # # Open the PDF file and extract the text using PyPDF2
    # research_article = open('Article.pdf', 'rb')
    pdf_reader = PyPDF2.PdfReader(research_article)
    text = ""
    for page in range(len(pdf_reader.pages)):
        text += str(pdf_reader.pages[page].extract_text())

    summary = summarize(text, ratio = 0.1, split = True)

    print(type(summary))
    with open('summary.txt', 'w') as file:
        file.write(str(summary))

    with open('summary.txt', 'r') as file:
        summaryContents = file.read()
    print(summaryContents)
    return summaryContents

research_article = open('Article.pdf', 'rb')
summariseFunction(research_article=research_article)

# # Preprocess the text by removing newlines and special characters
# text = text.replace('\n', ' ')
# text = gensim.utils.simple_preprocess(text)

# # Tokenize the text into sentences using NLTK
# sentences = nltk.sent_tokenize(text)

# if len(sentences) < 2:
#     print("Input text must have at least two sentences.")
# else:
#     # Gensim summarise function. ratio specifies the ratio of sentences in the original text to include in the summary (in this case, 30% of the sentences)
#     summary = summarize('. '.join(sentences), ratio=0.3)

#     # Print the summary
#     print(summary)


# # text = (
# #     "Thomas A. Anderson is a man living two lives. By day he is an "
# #     "average computer programmer and by night a hacker known as "
# #     "Neo. Neo has always questioned his reality, but the truth is "
# #     "far beyond his imagination. Neo finds himself targeted by the "
# #     "police when he is contacted by Morpheus, a legendary computer "
# #     "hacker branded a terrorist by the government. Morpheus awakens "
# #     "Neo to the real world, a ravaged wasteland where most of "
# #     "humanity have been captured by a race of machines that live "
# #     "off of the humans' body heat and electrochemical energy and "
# #     "who imprison their minds within an artificial reality known as "
# #     "the Matrix. As a rebel against the machines, Neo must return to "
# #     "the Matrix and confront the agents: super-powerful computer "
# #     "programs devoted to snuffing out Neo and the entire human "
# #     "rebellion. "
# # )

# # print(type(text))

# # print(summarize(text, ratio = 0.3))