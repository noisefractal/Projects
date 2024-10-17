def converter_tempo(segundos):
    dias = segundos // (24 * 3600)
    segundos_restantes = segundos % (24 * 3600)
    horas = segundos_restantes // 3600
    segundos_restantes %= 3600
    minutos = segundos_restantes // 60
    segundos_restantes %= 60
    segundos = segundos_restantes

    return dias, horas, minutos, segundos

def calculo():
    total_segundos = int(input("Digite a quantidade de segundos: "))
    dias, horas, minutos, segundos = converter_tempo(total_segundos)
    print(f"{total_segundos} segundos é equivalente a {dias} dias, {horas} horas, {minutos} minutos e {segundos} segundos.")

calculo()
