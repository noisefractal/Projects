import pygame
import sys
pygame.init()

# Configurações da tela
LARGURA, ALTURA = 800, 600
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Jogo da Forca")

BRANCO = (255, 255, 255)
PRETO = (0, 0, 0)
VERMELHO = (255, 0, 0)
AZUL = (0, 0, 255)

fonte = pygame.font.SysFont(None, 48)
fonte_pequena = pygame.font.SysFont(None, 36)

# Variáveis globais, troque e divirta-se :)
# Palavra e dica fixas (altere estas variáveis para mudar o jogo)
palavra_a_adivinhar = "COBOL".upper()  # Palavra a ser adivinhada
dica = "É uma linguagem de programação antiga"  # Dica

letras_adivinhadas = []
letras_corretas = []
erros = 0
tentativas_maximas = 8  # Alterado para 8 tentativas

# Função para desenhar o texto na tela
def desenhar_texto(texto, fonte, cor, x, y):
    superficie_texto = fonte.render(texto, True, cor)
    tela.blit(superficie_texto, (x, y))

# Função para desenhar a estrutura fixa da forca
def desenhar_estrutura_forca():
    base_x, base_y = 600, 400
    pygame.draw.line(tela, PRETO, (base_x - 50, base_y), (base_x + 50, base_y), 5)  # Base
    pygame.draw.line(tela, PRETO, (base_x, base_y), (base_x, base_y - 200), 5)  # Poste
    pygame.draw.line(tela, PRETO, (base_x, base_y - 200), (base_x - 100, base_y - 200), 5)  # Braço superior
    pygame.draw.line(tela, PRETO, (base_x - 100, base_y - 200), (base_x - 100, base_y - 150), 3)  # Corda

# Função para desenhar o boneco parte por parte
def desenhar_boneco(erros):
    base_x, base_y = 600, 400
    if erros >= 1: 
        pygame.draw.circle(tela, PRETO, (base_x - 100, base_y - 120), 20, 3)
    if erros >= 2:
        pygame.draw.line(tela, PRETO, (base_x - 100, base_y - 100), (base_x - 100, base_y - 50), 3)
    if erros >= 3:
        pygame.draw.line(tela, PRETO, (base_x - 100, base_y - 80), (base_x - 120, base_y - 110), 3)
    if erros >= 4:
        pygame.draw.line(tela, PRETO, (base_x - 100, base_y - 80), (base_x - 80, base_y - 110), 3)
    if erros >= 5:
        pygame.draw.line(tela, PRETO, (base_x - 100, base_y - 50), (base_x - 120, base_y - 20), 3)
    if erros >= 6:
        pygame.draw.line(tela, PRETO, (base_x - 100, base_y - 50), (base_x - 80, base_y - 20), 3)
    if erros >= 7:
        pygame.draw.circle(tela, PRETO, (base_x - 105, base_y - 125), 2)
        pygame.draw.circle(tela, PRETO, (base_x - 95, base_y - 125), 2)
    if erros >= 8: 
        pygame.draw.arc(tela, PRETO, (base_x - 110, base_y - 120, 20, 10), 3.14, 0, 3)

def main():
    global letras_adivinhadas, letras_corretas, erros

    # Variáveis do jogo
    letras_adivinhadas = []
    letras_corretas = ["_" for _ in palavra_a_adivinhar]
    erros = 0

    rodando = True
    while rodando:
        tela.fill(BRANCO)

        # Desenhar estrutura fixa
        desenhar_estrutura_forca()

        # Exibe a mensagem principal
        desenhar_texto("Adivinhe a linguagem de programação!", fonte, AZUL, 50, 50)

        # Desenha palavra, letras usadas e dica
        desenhar_texto(" ".join(letras_corretas), fonte, PRETO, 50, 150)
        desenhar_texto("Letras usadas: " + " ".join(letras_adivinhadas), fonte_pequena, VERMELHO, 50, 250)
        desenhar_texto(f"Dica: {dica}", fonte_pequena, PRETO, 50, 500)

        # Desenha número de tentativas restantes
        desenhar_texto(f"Tentativas restantes: {tentativas_maximas - erros}", fonte_pequena, PRETO, 50, 350)

        # Desenha o boneco com base nos erros
        desenhar_boneco(erros)

        # Vitória ou derrota
        if erros >= 8:
            desenhar_texto("Você perdeu!", fonte, VERMELHO, 50, 400)
            desenhar_texto(f"A palavra era: {palavra_a_adivinhar}", fonte, VERMELHO, 50, 450)
            pygame.display.flip()
            pygame.time.wait(3000)
            rodando = False
            continue

        if "_" not in letras_corretas:
            desenhar_texto("Parabéns, você venceu!", fonte, PRETO, 50, 400)
            pygame.display.flip()
            pygame.time.wait(3000)
            rodando = False
            continue

        # Eventos entrada
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if evento.type == pygame.KEYDOWN:
                if evento.unicode.isalpha():  # Verifica se a tecla pressionada é uma letra
                    letra = evento.unicode.upper()
                    if letra not in letras_adivinhadas:
                        letras_adivinhadas.append(letra)
                        if letra in palavra_a_adivinhar:
                            for i, char in enumerate(palavra_a_adivinhar):
                                if char == letra:
                                    letras_corretas[i] = letra
                        else:
                            erros += 1
        pygame.display.flip()

main()

