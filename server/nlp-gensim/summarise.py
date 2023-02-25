import gensim
from gensim.summarization import summarize
from io import StringIO
import PyPDF2
import nltk

# Open the PDF file and extract the text using PyPDF2
research_article = open('Article.pdf', 'rb')
pdf_reader = PyPDF2.PdfReader(research_article)
text = ""
for page in range(len(pdf_reader.pages)):
    text += pdf_reader.pages[page].extract_text()

# Preprocess the text by removing newlines and special characters
text = text.replace('\n', ' ')
# # text = gensim.utils.simple_preprocess(text)

# # Gensim summarise function. ratio specifies the ratio of sentences in the original text to include in the summary (in this case, 10% of the sentences)
# # sentences = gensim.summarization.textcleaner.split_sentences(' '.join(text))
# # Tokenize the text into sentences using NLTK
# sentences = nltk.sent_tokenize(str(text))
# print(sentences)


# if len(sentences) < 2:
#     print("Input text must have at least two sentences.")
# else:
#     for i in range(len(text)):
#         print(i)

#     # # Gensim summarise function. ratio specifies the ratio of sentences in the original text to include in the summary (in this case, 30% of the sentences)
#     # summary = summarize(' '.join(str(sentences)), ratio=0.3)

#     # # Print the summary
#     # print(summary)

