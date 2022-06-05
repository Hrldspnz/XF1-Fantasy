using System;
using System.Collections.Generic;

namespace APIXFIA.Model
{
    public class KeyGen
    {

        public static string keyGen() 
        {
            Random rdn = new Random();
            string characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

            bool isLetter;
            bool isNumber;
            isLetter = false;
            isNumber = false;

            int length = characters.Length;
            char letter;
            int passLength = 6;
            string rdmPass = string.Empty;
            for (int i = 0; i < passLength; i++)
            {
                letter = characters[rdn.Next(length)];

                if (Char.IsLetter(letter)) 
                {
                    isLetter = true;
                }
                if (Char.IsNumber(letter))
                {
                    isNumber = true;
                }

                rdmPass += letter.ToString();
            }

            if (isLetter && isNumber)
            {
                return rdmPass;
            }
            else {
                return keyGen();
            }
            
        }

        public static string validateNewKey(List<string> compareList) 
        {
            string newKey = keyGen();
            for (int i = 0; i < compareList.Count; i++) 
            {
                if (compareList[i].Equals(newKey))
                {
                    newKey = keyGen();
                    i = 0;
                }
                
            }
            return newKey;
            
            
        }
    
    }
}
