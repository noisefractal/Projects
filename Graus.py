def celsius_para_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def fahrenheit_para_celsius(fahrenheit):
    celsius = (fahrenheit - 32) * 5/9
    return celsius

def calculo_celsius_para_fahrenheit():
    celsius = float(input("Digite a temperatura em graus Celsius: "))
    fahrenheit = celsius_para_fahrenheit(celsius)
    print(f"{celsius} graus Celsius é equivalente a {fahrenheit} graus Fahrenheit.")

def calculo_fahrenheit_para_celsius():
    fahrenheit = float(input("Digite a temperatura em graus Fahrenheit: "))
    celsius = fahrenheit_para_celsius(fahrenheit)
    print(f"{fahrenheit} graus Fahrenheit é equivalente a {celsius:.2f} graus Celsius.")

def calculo():
    opcao = int(input("Isso está em Fahrenheit(1) ou Celsius(2): "))
    
    if opcao == 2:
        calculo_celsius_para_fahrenheit()
    elif opcao == 1:
        calculo_fahrenheit_para_celsius()
    else:
        print("Opção inválida. Escolha 1 para Fahrenheit ou 2 para Celsius.")

calculo()

