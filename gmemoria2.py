class Node:
    def __init__(self, process_name, size):
        self.process_name = process_name
        self.size = size
        self.next = None


class MemoryManagerLinkedList:
    def __init__(self, size):
        self.size = size
        self.memory = [None] * size

    def allocate_memory(self, process_name, base_register, limit_register):
        if limit_register > self.size:
            print(f"Erro: Registrador limite além do tamanho da memória disponível.")
            return

        node = Node(process_name, limit_register - base_register)
        for i in range(base_register, limit_register):
            if self.memory[i] is not None:
                print(f"Erro: Endereço {i} já ocupado.")
                return
            self.memory[i] = node

        self.print_memory()

    def print_memory(self):
        print("Lista Encadeada:", end=' ')
        for node in self.memory:
            if node:
                print(node.process_name, end=' ')
            else:
                print("vazio", end=' ')
        print()


# Exemplo de uso
memory_manager_linked_list = MemoryManagerLinkedList(64)

while True:
    user_input = input("Digite 's' para alocar memória, 'q' para sair: ")

    if user_input == 'q':
        break
    elif user_input == 's':
        process_name = input("Digite o nome do processo: ")
        base_register = int(input("Digite o registrador base: "))
        limit_register = int(input("Digite o registrador limite: "))
        memory_manager_linked_list.allocate_memory(process_name, base_register, limit_register)
    else:
        print("Comando inválido. Digite 's' para alocar memória ou 'q' para sair.")


