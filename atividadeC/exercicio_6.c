//Par ou ímpar

#include <stdio.h> 
int main() {
    int numero;
    printf("Digite um numero: ");
    scanf("%d", &numero);

    if(numero % 2 == 0){
        printf("Numero é par");
    } else {
        printf("Numero é impar");
    }
    
    return 0; 
}