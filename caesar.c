#include <cs50.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <stdlib.h>



int main(int argc, string argv[])
{

// Enter only single character
if(argc != 2){
printf("Usage: ./caesar key\n");
return 1;

   }

// Enter only single digit
   for(int i = 0; i < strlen(argv[1]) ;i++){

    if(!isdigit(argv[1][i])){
        printf("Usage: ./caesar key\n");
      return 1;
    }
   }

    // Converts key to integer
    int k = atoi(argv[1]);

    // Prompts the user to enter plaintext
    string plainText = get_string("PLAINTEXT : ");

    printf("chiphertext :");


    //Loops into  to Check for upper & lowercase letters
    for(int j = 0; j<strlen(argv[1]) ; j++){

    //If plaintext is uppercase ,print only uppercase ciphertext
    if(isupper(plainText[j])){

    printf("%c",(plainText[j] -65 + k) %26 +65);

    }


    //If plaintext is lowercase ,print only lowercase Ciphertext
    else if(islower(plainText[j])){

     printf("%c",(plainText[j] -97 + k) %26 +97);

    }

    // Prints "PLAINTEXT" if conditions  above are not meet
    else{
           printf("%c",plainText[j]);

   }



}
printf("\n");




}

