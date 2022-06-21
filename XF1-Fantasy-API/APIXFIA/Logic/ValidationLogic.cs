using APIXFIA.Model;
using System;
using System.Collections.Generic;

namespace APIXFIA.Repository
{
    public class ValidationLogic
    {

        public string validateNewKey(List<string> compareList)
        {
            string newKey = KeyGen.keyGen();
            for (int i = 0; i < compareList.Count; i++)
            {
                if (compareList[i].Equals(newKey))
                {
                    newKey = KeyGen.keyGen();
                    i = 0;
                }

            }
            return newKey;


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


        public bool validateState(string state)
        {

            if (state == "inactivo")
            {
                return true;
            }
            return false;
        }


        public bool validateTeamDrivers(Team team, List<Driver> drivers)
        {
            bool validDriver1 = false;
            bool validDriver2 = false;
            bool validDriver3 = false;
            bool validDriver4 = false;
            bool validDriver5 = false;
            bool validDrivers = false;

            if (team.nameDriver1 != null)
            {
                validDriver1 = validateTeamDriverAUX(team.nameDriver1, drivers);
            }

            if (team.nameDriver2 != null)
            {
                validDriver2 = validateTeamDriverAUX(team.nameDriver2, drivers);
            }

            if (team.nameDriver3 != null)
            {
                validDriver3 = validateTeamDriverAUX(team.nameDriver3, drivers);
            }

            if (team.nameDriver4 != null)
            {
                validDriver4 = validateTeamDriverAUX(team.nameDriver4, drivers);
            }

            if (team.nameDriver5 != null)
            {
                validDriver5 = validateTeamDriverAUX(team.nameDriver5, drivers);
            }


            if (validDriver1 && validDriver2 && validDriver3 && validDriver4 && validDriver5)
            {
                validDrivers = true;
            }

            return validDrivers;
        }


        private bool validateTeamDriverAUX(string driver, List<Driver> drivers)
        {
            bool validDriver = false;

            for (int i = 0; i < drivers.Count; i++)
            {
                if (driver == drivers[i].nameDriver)
                {
                    validDriver = true;
                }
            }
            return validDriver;
        }


        public bool validateTeamCar(string car, List<Car> cars)
        {
            bool validCar = false;

            for (int i = 0; i < cars.Count; i++)
            {
                if (car.Equals(cars[i].nameCar))
                {
                    validCar = true;
                }
            }
            return validCar;
        }


        public bool validateDiferentDrivers(Team team)
        {
            bool validateDiferentDrivers = true;
            if (team.nameDriver1 != null)
            {
                if (team.nameDriver1.Equals(team.nameDriver2)) { validateDiferentDrivers = false; }
                if (team.nameDriver1.Equals(team.nameDriver3)) { validateDiferentDrivers = false; }
                if (team.nameDriver1.Equals(team.nameDriver4)) { validateDiferentDrivers = false; }
                if (team.nameDriver1.Equals(team.nameDriver5)) { validateDiferentDrivers = false; }
            }

            if (team.nameDriver2 != null)
            {
                if (team.nameDriver2.Equals(team.nameDriver3)) { validateDiferentDrivers = false; }
                if (team.nameDriver2.Equals(team.nameDriver4)) { validateDiferentDrivers = false; }
                if (team.nameDriver2.Equals(team.nameDriver5)) { validateDiferentDrivers = false; }
            }

            if (team.nameDriver3 != null)
            {
                if (team.nameDriver3.Equals(team.nameDriver4)) { validateDiferentDrivers = false; }
                if (team.nameDriver3.Equals(team.nameDriver5)) { validateDiferentDrivers = false; }
            }

            if (team.nameDriver4 != null)
            {
                if (team.nameDriver4.Equals(team.nameDriver5)) { validateDiferentDrivers = false; }
            }

            return validateDiferentDrivers;
        }


        public bool validateTeamBudget(Team team, List<Driver> drivers, int tempBudget, List<Car> cars)
        {
            int driver1Budget = 0;
            int driver2Budget = 0;
            int driver3Budget = 0;
            int driver4Budget = 0;
            int driver5Budget = 0;
            int carBudget = 0;
            int totBudget = 0;

            bool validBudget = false;


            if (team.nameDriver1 != null)
            {
                driver1Budget = validateTeamBudgetAUX(team.nameDriver1, drivers);
            }

            if (team.nameDriver2 != null)
            {
                driver2Budget = validateTeamBudgetAUX(team.nameDriver2, drivers);
            }

            if (team.nameDriver3 != null)
            {
                driver3Budget = validateTeamBudgetAUX(team.nameDriver3, drivers);
            }

            if (team.nameDriver4 != null)
            {
                driver4Budget = validateTeamBudgetAUX(team.nameDriver4, drivers);
            }

            if (team.nameDriver5 != null)
            {
                driver5Budget = validateTeamBudgetAUX(team.nameDriver5, drivers);
            }

            if (team.nameDriver5 != null)
            {
                carBudget = validateTeamCarBudgetAUX(team.car, cars);
            }

            totBudget = driver1Budget + driver2Budget + driver3Budget + driver4Budget + driver5Budget + carBudget;


            if (totBudget <= tempBudget)
            {
                validBudget = true;
            }

            return validBudget;
        }


        private int validateTeamBudgetAUX(string driver, List<Driver> drivers)
        {
            int driverBudget = 0;

            for (int i = 0; i < drivers.Count; i++)
            {
                if (driver == drivers[i].nameDriver)
                {
                    driverBudget = drivers[i].price;
                }
            }
            return driverBudget;
        }


        private int validateTeamCarBudgetAUX(string car, List<Car> cars)
        {
            int carBudget = 0;

            for (int i = 0; i < cars.Count; i++)
            {
                if (car == cars[i].nameCar)
                {
                    carBudget = cars[i].price;
                }
            }
            return carBudget;
        }


        public bool validateUserLimit(int userlimit) 
        {
            bool validLimit = false;

            if (20 >= userlimit && userlimit >= 5) 
            {
                validLimit = true; 
            }

            return validLimit; 
        }




    }
}
