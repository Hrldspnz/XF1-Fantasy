using System.Text;
using System.Security.Cryptography;
using System;

namespace APIXFIA.Model
{
    public class Encript
    {
        public string codecMd5(string text) 
        {
            string key = "mikey";
            byte[] keyArray;

            byte[] Arreglo_a_Cifrar = UTF8Encoding.UTF8.GetBytes(text);

            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();

            keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

            hashmd5.Clear();


            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform =
            tdes.CreateEncryptor();


            byte[] ArrayResultado =
            cTransform.TransformFinalBlock(Arreglo_a_Cifrar,
            0, Arreglo_a_Cifrar.Length);

            tdes.Clear();

            //se regresa el resultado en forma de una cadena
            return Convert.ToBase64String(ArrayResultado,
                                            0, ArrayResultado.Length);
        }

        public string deCodecMd5(string encriptedText)
        {
            string key = "mikey";
            byte[] keyArray;
            byte[] Array_a_Descifrar =
            Convert.FromBase64String(encriptedText);

            MD5CryptoServiceProvider hashmd5 =
            new MD5CryptoServiceProvider();

            keyArray = hashmd5.ComputeHash(
            UTF8Encoding.UTF8.GetBytes(key));

            hashmd5.Clear();

            TripleDESCryptoServiceProvider tdes =
            new TripleDESCryptoServiceProvider();

            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform =
            tdes.CreateDecryptor();

            byte[] resultArray =
            cTransform.TransformFinalBlock(Array_a_Descifrar,
            0, Array_a_Descifrar.Length);

            tdes.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }

        public bool validatePassword(string password)
        {
            bool letter;
            bool number;
            letter = false;
            number = false;
            for (int i = 0; i < password.Length; i++)
            {
                if (Char.IsLetter(password, i))
                {
                    letter = true;
                }
                else if (Char.IsDigit(password, i))
                {
                    number = true;
                }
            }
            if (letter && number && password.Length >= 8)
            {
                return true;
            }
            return false;
        }


    }
}
