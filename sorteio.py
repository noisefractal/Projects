import random

QTDduplas = 0
duplas = []

while QTDduplas < 30: 
    pretabela = input("Tem alguma dupla para cadastrar? (Sim/Não): ").strip().lower()
    
    if pretabela == "sim":
        nome_dupla = input("Qual o nome da dupla? ")
        duplas.append(nome_dupla)
        QTDduplas += 1 
        print(f"Dupla cadastrada: {nome_dupla}")
        print(f"Quantidade de duplas cadastradas: {QTDduplas}")
        print(f"Acompanhe a lista de cadastro:{duplas}")
    
    elif pretabela == "não":
        print("Cadastro interrompido.")
        break 
    
print("Limite de duplas alcançado ou cadastro interrompido.")



    


        
        