using Microsoft.VisualStudio.TestTools.UnitTesting;
using APIXFIA.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace APIXFIA.Model.Tests
{
    [TestClass()]
    public class KeyGenTests
    {
        [TestMethod()]
        public void keyGenShoulHaveALetter()
        {
            string newKey = KeyGen.keyGen();

            bool expectedHaveLetter = true;
            bool haveLetter = false;

            for (int i = 0; i < newKey.Length; i++)
            {
                if (Char.IsLetter(newKey, i))
                {
                    haveLetter = true;
                }
                
            }

            Assert.AreEqual(expectedHaveLetter, haveLetter);
        }

        [TestMethod()]
        public void keyGenShoulHaveANumber()
        {
            string newKey = KeyGen.keyGen();

            bool expectedHaveNumber = true;
            bool haveNumber = false;

            for (int i = 0; i < newKey.Length; i++)
            {
                if (Char.IsNumber(newKey, i))
                {
                    haveNumber = true;
                }

            }

            Assert.AreEqual(expectedHaveNumber, haveNumber);
        }

        [DataRow(6)]
        [TestMethod()]
        public void keyGenShoulHaveXChars(int expectedLength)
        {
            string newKey = KeyGen.keyGen();
            int actualLength = 0;

            actualLength = newKey.Length;

            Assert.AreEqual(expectedLength, actualLength);
        }


    }
}