//Entrada de número

#include <stdio.h> 
int main() {
    int numero;
    printf("Digite um numero, negativo ou positivo: ");
    scanf("%d", &numero);

    if(numero > 0.0){
        printf("Numero positivo");
    } else if(numero < 0.0){
        printf("Numero negativo");
    }
    
    return 0; 
}