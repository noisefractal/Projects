numero = input("Digite um número com mais de 5 dígitos: ")

if len(numero) >= 5:
    numero_com_espacos = " ".join(numero)
    print("Número com espaços entre os dígitos:", numero_com_espacos)
else:
    print("O número deve ter mais de 5 dígitos.")
