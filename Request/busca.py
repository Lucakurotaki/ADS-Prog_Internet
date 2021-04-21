# -*- coding: utf-8 -*- #

import requests
import requests_cache
import re
from bs4 import BeautifulSoup
from pprint import pprint

requests_cache.install_cache('banco')

response = requests.get(input("Digite o endereço: "))

soup = BeautifulSoup(response.text, 'html.parser')

endrs = soup.find_all('a', href=True)


while True:
    for i in range(0,10):
        print("{} - ".format(i+1), endrs[i]['href'])
    
    num = int(input("Digite o número do site desejado: "))
    chave = input("Escreva a palavra chave: ")

    requests_cache.install_cache('banco')

    pagina = requests.get(endrs[num+1]['href'])

    pag_soup = BeautifulSoup(pagina.text, 'html.parser')

    resultado = soup.body.find_all(string=re.compile('.*{0}.*'.format(chave)), recursive=True)

    for conteudo in resultado:
        palavras = conteudo.split()
        for indice, palavra in enumerate(palavras):
            if palavra == chave:
                for i in range(-15,15):
                    print(palavras[indice+i])
    
    fim = input("Deseja continuar?(s/n): ")

    if fim != 'S' and fim != 's':
        break