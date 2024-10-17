class MemoryManagerBitmap:
    def __init__(self, size):
        self.size = size
        self.bitmap = [0] * size

    def allocate_memory(self, process_name, base_register, limit_register):
        for i in range(base_register, limit_register):
            if i >= self.size or self.bitmap[i] == 1:
                print(f"Erro: Endereço {i} já ocupado ou além do limite.")
                return

        for i in range(base_register, limit_register):
            self.bitmap[i] = 1

        self.print_bitmap()

    def print_bitmap(self):
        print("Mapa de Bits:", ''.join(map(str, self.bitmap)))


# Exemplo de uso
memory_manager_bitmap = MemoryManagerBitmap(64)

while True:
    user_input = input("Digite 's' para alocar memória, 'q' para sair: ")

    if user_input == 'q':
        break
    elif user_input == 's':
        process_name = input("Digite o nome do processo: ")
        base_register = int(input("Digite o registrador base: "))
        limit_register = int(input("Digite o registrador limite: "))
        memory_manager_bitmap.allocate_memory(process_name, base_register, limit_register)
    else:
        print("Comando inválido. Digite 's' para alocar memória ou 'q' para sair.")
