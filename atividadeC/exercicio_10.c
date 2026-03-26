//Soma com entrada

#include <stdio.h> 
int main() {
    int numero;
    int resultado = 0;
    int i = 0;

    printf("Digite um numero: ");
    scanf("%d", &numero);

    while(i <= numero){
        resultado += i ;
        i++;
    }
        printf("A soma dos numero determinado pelo usuario: %d", resultado);
    
    return 0; 
}