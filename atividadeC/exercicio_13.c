//Maior valor entre vários números

#include <stdio.h> 
int main() {
    float num;
    int positivos = 0;
    int negativos = 0;

    printf("Digite 5 numeros: ");
   

    for(int i = 1; i <= 5; i++){
        printf("Digite o numero %d: ", i);
        scanf("%f", &num);

         if(num > 0){
            positivos++;
        } else if(num < 0){
            negativos++;
        }
    }

    printf("\nResultados:\n");
    printf("Quantidade de positivos: %d\n", positivos);
    printf("Quantidade de negativos: %d\n", negativos);

    return 0;
}