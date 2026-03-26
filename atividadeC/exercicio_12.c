//Maior valor entre vários números

#include <stdio.h> 
int main() {
    int num, maior;

    printf("Digite o primeiro numero: ");
    scanf("%d", &num);
    maior = num;

    for(int i = 2; i <= 5; i++){
        printf("Digite o %d numero: ", i);
        scanf("%d", &num);

        if(num > maior){
            maior = num;
        }
    }

    printf("\nO maior numero digitado foi: %d", maior);

    return 0;
}