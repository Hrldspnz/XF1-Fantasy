using Microsoft.VisualStudio.TestTools.UnitTesting;
using APIXFIA.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using APIXFIA.Model;

namespace APIXFIA.Repository.Tests
{
    [TestClass()]
    public class ValidationRepositoryTests
    {
        [TestMethod()]
        public void passwordShouldHaveLetter()
        {
            bool expectedResult = false;
            string password = "12345678";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validatePassword(password);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void passwordShouldHaveNumber()
        {
            bool expectedResult = false;
            string password = "abcdefgh";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validatePassword(password);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void passwordShouldHave8Chars()
        {
            bool expectedResult = false;
            string password = "as12";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validatePassword(password);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void passwordShouldHaveNumLetter8Char()
        {
            bool expectedResult = true;
            string password = "aston123";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validatePassword(password);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void initialStateShouldBeInactive()
        {
            bool expectedResult = true;
            string state = "inactivo";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateState(state);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void driversShouldBeInDataSucces()
        {
            bool expectedResult = true;

            Team team = new Team();
            team.nameDriver1 = "Esteban Ocon";
            team.nameDriver2 = "Daniel Ricciardo";
            team.nameDriver3 = "Charles Leclerc";
            team.nameDriver4 = "Carlos Sainz";
            team.nameDriver5 = "Alexander Albon";

            Driver driver1 = new Driver();
            driver1.nameDriver = "Alexander Albon";

            Driver driver2 = new Driver();
            driver2.nameDriver = "Carlos Sainz";

            Driver driver3 = new Driver();
            driver3.nameDriver = "Charles Leclerc";

            Driver driver4 = new Driver();
            driver4.nameDriver = "Daniel Ricciardo";

            Driver driver5 = new Driver();
            driver5.nameDriver = "Esteban Ocon";

            List<Driver> drivers = new List<Driver>();
            drivers.Add(driver1);
            drivers.Add(driver2);
            drivers.Add(driver3);
            drivers.Add(driver4);
            drivers.Add(driver5);

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateTeamDrivers(team, drivers);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void driversShouldBeInDataFail()
        {
            bool expectedResult = false;

            Team team = new Team();
            team.nameDriver1 = "Esteban Ocon";
            team.nameDriver2 = "Daniel Ricciardo";
            team.nameDriver3 = "Charles Leclerc";
            team.nameDriver4 = "Carlos Sainz";
            team.nameDriver5 = "Alexander Albon";

            Driver driver1 = new Driver();
            driver1.nameDriver = "Alexander Albon";

            Driver driver2 = new Driver();
            driver2.nameDriver = "Carlos Sainz";

            Driver driver3 = new Driver();
            driver3.nameDriver = "Charles Leclerc";

            Driver driver4 = new Driver();
            driver4.nameDriver = "Daniel Ricciardo";

            Driver driver5 = new Driver();
            driver5.nameDriver = "Lance Stroll";

            List<Driver> drivers = new List<Driver>();
            drivers.Add(driver1);
            drivers.Add(driver2);
            drivers.Add(driver3);
            drivers.Add(driver4);
            drivers.Add(driver5);

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateTeamDrivers(team, drivers);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void carShouldBeInDataSucces()
        {
            bool expectedResult = true;

            Team team = new Team();
            team.car = "Alpine";

            Car car1 = new Car();
            car1.nameCar = "Alfa Romeo";

            Car car2 = new Car();
            car2.nameCar = "AlphaTauri";

            Car car3 = new Car();
            car3.nameCar = "Alpine";

            Car car4 = new Car();
            car4.nameCar = "Aston Martin";

            Car car5 = new Car();
            car5.nameCar = "Ferrari";

            List<Car> cars = new List<Car>();
            cars.Add(car1);
            cars.Add(car2);
            cars.Add(car3);
            cars.Add(car4);
            cars.Add(car5);

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateTeamCar(team.car, cars);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void carShouldBeInDataFail()
        {
            bool expectedResult = false;

            Team team = new Team();
            team.car = "Haas";

            Car car1 = new Car();
            car1.nameCar = "Alfa Romeo";

            Car car2 = new Car();
            car2.nameCar = "AlphaTauri";

            Car car3 = new Car();
            car3.nameCar = "Alpine";

            Car car4 = new Car();
            car4.nameCar = "Aston Martin";

            Car car5 = new Car();
            car5.nameCar = "Ferrari";

            List<Car> cars = new List<Car>();
            cars.Add(car1);
            cars.Add(car2);
            cars.Add(car3);
            cars.Add(car4);
            cars.Add(car5);

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateTeamCar(team.car, cars);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void driversShouldBeDiferentFail()
        {
            bool expectedResult = false;

            Team team = new Team();
            team.nameDriver1 = "Esteban Ocon";
            team.nameDriver2 = "Daniel Ricciardo";
            team.nameDriver3 = "Charles Leclerc";
            team.nameDriver4 = "Esteban Ocon";
            team.nameDriver5 = "Alexander Albon";

            Driver driver1 = new Driver();
            driver1.nameDriver = "Alexander Albon";

            Driver driver2 = new Driver();
            driver2.nameDriver = "Carlos Sainz";

            Driver driver3 = new Driver();
            driver3.nameDriver = "Charles Leclerc";

            Driver driver4 = new Driver();
            driver4.nameDriver = "Daniel Ricciardo";

            Driver driver5 = new Driver();
            driver5.nameDriver = "Esteban Ocon";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateDiferentDrivers(team);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void driversShouldBeDiferentSucces()
        {
            bool expectedResult = true;

            Team team = new Team();
            team.nameDriver1 = "Esteban Ocon";
            team.nameDriver2 = "Daniel Ricciardo";
            team.nameDriver3 = "Charles Leclerc";
            team.nameDriver4 = "Carlos Sainz";
            team.nameDriver5 = "Alexander Albon";

            Driver driver1 = new Driver();
            driver1.nameDriver = "Alexander Albon";

            Driver driver2 = new Driver();
            driver2.nameDriver = "Carlos Sainz";

            Driver driver3 = new Driver();
            driver3.nameDriver = "Charles Leclerc";

            Driver driver4 = new Driver();
            driver4.nameDriver = "Daniel Ricciardo";

            Driver driver5 = new Driver();
            driver5.nameDriver = "Esteban Ocon";

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateDiferentDrivers(team);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void teamBudgetShouldBeInTheLimitSucces()
        {
            bool expectedResult = true;

            int actualBudget = 100;

            Team team = new Team();
            team.nameDriver1 = "Esteban Ocon";
            team.nameDriver2 = "Daniel Ricciardo";
            team.nameDriver3 = "Charles Leclerc";
            team.nameDriver4 = "Carlos Sainz";
            team.nameDriver5 = "Alexander Albon";
            team.car = "Alfa Romeo";

            Driver driver1 = new Driver();
            driver1.nameDriver = "Alexander Albon";
            driver1.price = 8;

            Driver driver2 = new Driver();
            driver2.nameDriver = "Carlos Sainz";
            driver2.price = 17;

            Driver driver3 = new Driver();
            driver3.nameDriver = "Charles Leclerc";
            driver3.price = 19;

            Driver driver4 = new Driver();
            driver4.nameDriver = "Daniel Ricciardo";
            driver4.price = 14;

            Driver driver5 = new Driver();
            driver5.nameDriver = "Esteban Ocon";
            driver5.price = 12;

            List<Driver> drivers = new List<Driver>();
            drivers.Add(driver1);
            drivers.Add(driver2);
            drivers.Add(driver3);
            drivers.Add(driver4);
            drivers.Add(driver5);

            Car car1 = new Car();
            car1.nameCar = "Alfa Romeo";
            car1.price = 9;

            Car car2 = new Car();
            car2.nameCar = "AlphaTauri";
            car1.price = 10;

            Car car3 = new Car();
            car3.nameCar = "Alpine";
            car1.price = 14;

            Car car4 = new Car();
            car4.nameCar = "Aston Martin";
            car1.price = 11;

            Car car5 = new Car();
            car5.nameCar = "Ferrari";
            car1.price = 26;

            List<Car> cars = new List<Car>();
            cars.Add(car1);
            cars.Add(car2);
            cars.Add(car3);
            cars.Add(car4);
            cars.Add(car5);

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateTeamBudget(team, drivers, actualBudget, cars);

            Assert.AreEqual(expectedResult, actualResult);

        }


        [TestMethod()]
        public void teamBudgetShouldBeInTheLimitFail()   
        {
            bool expectedResult = false;

            int actualBudget = 100;

            Team team = new Team();
            team.nameDriver1 = "Esteban Ocon";
            team.nameDriver2 = "Daniel Ricciardo";
            team.nameDriver3 = "Charles Leclerc";
            team.nameDriver4 = "Carlos Sainz";
            team.nameDriver5 = "Alexander Albon";
            team.car = "Alfa Romeo";

            Driver driver1 = new Driver();
            driver1.nameDriver = "Alexander Albon";
            driver1.price = 8;

            Driver driver2 = new Driver();
            driver2.nameDriver = "Carlos Sainz";
            driver2.price = 17;

            Driver driver3 = new Driver();
            driver3.nameDriver = "Charles Leclerc";
            driver3.price = 38;

            Driver driver4 = new Driver();
            driver4.nameDriver = "Daniel Ricciardo";
            driver4.price = 14;

            Driver driver5 = new Driver();
            driver5.nameDriver = "Esteban Ocon";
            driver5.price = 12;

            List<Driver> drivers = new List<Driver>();
            drivers.Add(driver1);
            drivers.Add(driver2);
            drivers.Add(driver3);
            drivers.Add(driver4);
            drivers.Add(driver5);

            Car car1 = new Car();
            car1.nameCar = "Alfa Romeo";
            car1.price = 9;

            Car car2 = new Car();
            car2.nameCar = "AlphaTauri";
            car1.price = 10;

            Car car3 = new Car();
            car3.nameCar = "Alpine";
            car1.price = 14;

            Car car4 = new Car();
            car4.nameCar = "Aston Martin";
            car1.price = 11;

            Car car5 = new Car();
            car5.nameCar = "Ferrari";
            car1.price = 26;

            List<Car> cars = new List<Car>();
            cars.Add(car1);
            cars.Add(car2);
            cars.Add(car3);
            cars.Add(car4);
            cars.Add(car5);

            ValidationLogic repository = new ValidationLogic();

            bool actualResult = repository.validateTeamBudget(team, drivers, actualBudget, cars);

            Assert.AreEqual(expectedResult, actualResult);

        }




    }
}