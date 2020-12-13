import streamlit as st
from bs4 import BeautifulSoup
import requests
from streamlit_webscrap_tool import st_webscrap_tool

st.title("Web Scrap Tool")
url = st.sidebar.text_input(label='URL')
if url != '':
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) \
                AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'}
    source = requests.get(url, headers=headers)
    st.sidebar.text('Status Code: '+ str(source.status_code))
    soup = BeautifulSoup(source.text, 'lxml')
    tag = st.sidebar.text_input('Find by tag:')
    soup_list = soup.find_all(tag)
    st.sidebar.text('Found: {} elements'.format(len(soup_list)))
    html = [i.prettify() for i in soup_list]
    st_webscrap_tool(html=html)