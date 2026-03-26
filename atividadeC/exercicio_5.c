//Maior de idade

#include <stdio.h> 
int main() {
    int idade;
    printf("Digite sua idade: ");
    scanf("%d", &idade);

    if(idade => 18){
        printf("Maior de Idade");
    } else if(idade < 18){
        printf("Menor de Idade");
    }
    
    return 0; 
}