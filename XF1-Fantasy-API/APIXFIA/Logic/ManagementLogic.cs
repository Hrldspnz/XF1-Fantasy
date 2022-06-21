using APIXFIA.Logic;
using APIXFIA.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APIXFIA.Repository
{
    public class ManagementLogic
    {

        DataRepository dataRepository = new DataRepository();

        ValidationLogic validation = new ValidationLogic();

        Rules rules = new Rules();


        // Inicio de los metodos para la gestion de las carreras dentro de la base de datos 


        public async Task<IEnumerable<Race>> getRaces()
        {
            return await dataRepository.getRaces();
        }


        public async Task<int> createNewRace(Race race)
        {
            return await dataRepository.createNewRace(race);
        }


        // Inicio de los metodos para la gestion de los torneos dentro de la base de datos 

        public async Task<IEnumerable<Tournament>> getTournaments()
        {
            return await dataRepository.getTournaments();
        }


        public async Task<int> createNewTournament(Tournament tournament)
        {

            List<string> tournamentsId3Y = new List<string>();
            tournamentsId3Y = await dataRepository.get3YTournament();

            string newTournamentId = validation.validateNewKey(tournamentsId3Y);

            return await dataRepository.createNewTournament(tournament, newTournamentId);
        }

        // este saca los tres anhos no se usa aqui
        public async Task<List<string>> get3YTournament()
        {
            return await dataRepository.get3YTournament();
        }


        public async Task<Number> getActualBudget()
        {
            return await dataRepository.getActualBudget();
        }

        //  Inicio de los metodos para la gestion de los datos de jugadores dentro de la base de datos 

        public async Task<int> createNewPlayerAccount(PlayerAcc player)
        {

            if (player.pass == null || player.statePlayer == null)
                return -1;

            bool validatePass = validation.validatePassword(player.pass);

            bool validateState = validation.validateState(player.statePlayer);

            if (validatePass == true && validateState == true)
            {
                //return 0;
                return  await dataRepository.createNewPlayerAccount(player);
            }
            return -1;

            
        }


        public async Task<int> newPlayerScuderia(Scuderia scuderia)
        {

            if (scuderia.email == null)
                return -1;

            string haveScuderia =  await dataRepository.haveScuderia(scuderia.email);

            if (haveScuderia == "no")
            {
                //return 0;
                return await dataRepository.newPlayerScuderia(scuderia);
            }
            else 
            {
                return -1;
            }
            
        }


        public async Task<string> getPlayerState(string email)
        {
            return await dataRepository.getPlayerState(email);
        }


        public async Task<PlayerInfo> getPlayerInfo(string email)
        {
            return await dataRepository.getPlayerInfo(email);
        }


        public async Task<int> updatePlayerState(string userName, string userState)
        {
            return await dataRepository.updatePlayerState(userName, userState);
        }


        public async Task<TeamCount> getTeamsXPlayer(string email)
        {
            return await dataRepository.getTeamsXPlayer(email);
        }


        public async Task<UserAcces> getPassUser(string email)
        {
            return await dataRepository.getPassUser(email);

        }


        //  Inicio de los metodos para la gestion de los datos de juego dentro de la base de datos

        public async Task<int> newPlayerTeam(Team team)
        {
            bool validateDrivers = false;
            bool validateCar = false;
            bool validateBudget = false;
            bool validateDiferentDrivers=false;
            Number actualBudget = new Number();

            List<Driver> drivers = new List<Driver>();
            List<Car> cars = new List<Car>();

            drivers = await dataRepository.getDrivers();

            cars = await dataRepository.getCars();

            actualBudget = await dataRepository.getActualBudget();

            validateDrivers = validation.validateTeamDrivers(team, drivers);

            validateCar = validation.validateTeamCar(team.car, cars);

            validateBudget = validation.validateTeamBudget(team, drivers, actualBudget.Value, cars);

            validateDiferentDrivers = validation.validateDiferentDrivers(team);

            //               

            if (validateDrivers && validateBudget && validateDiferentDrivers && validateCar)
            {
                return await dataRepository.newPlayerTeam(team);
                //return 0>;
            }
            else 
            {
                return -1; 
            }
        }


        public async Task<IEnumerable<Team>> getTeamInfo(string email) 
        {
            return await dataRepository.getTeamInfo(email);
        }


        public async Task<Team> getTeamPlayer(string nameTeam, string email)
        {
            return await dataRepository.getTeamPlayer(nameTeam,email);
        }


        public async Task<int> updatePlayerTeam(Team team) 
        {
            bool validateDrivers = false;
            bool validateCar = false;
            bool validateBudget = false;
            bool validateDiferentDrivers = false;
            Number actualBudget = new Number();

            List<Driver> drivers = new List<Driver>();
            List<Car> cars = new List<Car>();

            drivers = await dataRepository.getDrivers();

            cars = await dataRepository.getCars();

            actualBudget = await dataRepository.getActualBudget();

            validateDrivers = validation.validateTeamDrivers(team, drivers);

            validateCar = validation.validateTeamCar(team.car, cars);

            validateBudget = validation.validateTeamBudget(team, drivers, actualBudget.Value, cars);

            validateDiferentDrivers = validation.validateDiferentDrivers(team);

            //

            if (validateDrivers && validateBudget && validateDiferentDrivers && validateCar)
            {
                return await dataRepository.updatePlayerTeam(team);
                //return 0>;
            }
            else
            {
                return -1;
            }
        }


        public async Task<IEnumerable<Driver>> getDrivers()
        {
            return await dataRepository.getDrivers();
        }


        public async Task<IEnumerable<Car>> getCars()
        {
            return await dataRepository.getCars();
        }


        public async Task<string> haveScuderia(string email)
        {
            return await dataRepository.haveScuderia(email);
        }


        public async Task<int> LoadRaceResults(List<RaceResults> raceResults)
        {
            var created = 0;
            var created2 = 0;
            var created3 = 0;

            for (int i = 0; i < raceResults.Count; i++)
            {
                created = await dataRepository.insertRaceResults(raceResults[i]);
            }

            List<ObjScore> objScores = new List<ObjScore>();

            List<Driver> drivers = new List<Driver>();
            List<Car> cars = new List<Car>();
            List<TeamsLeague> teamsLeague = new List<TeamsLeague>();

            drivers = await dataRepository.getDrivers();
            cars = await dataRepository.getCars();
            teamsLeague = await dataRepository.getAllPublicLeague();

            objScores = rules.TotScore(drivers, cars, raceResults);

            for (int i = 0; i < teamsLeague.Count; i++)
            {
                int newScore = rules.teamScore(objScores, teamsLeague[i]);
                teamsLeague[i].Score = newScore;
            }

            //
            for (int i = 0; i < teamsLeague.Count; i++)
            {
                created2 = await dataRepository.editScorePublic(teamsLeague[i]);
                created3 = await dataRepository.editScorePrivate(teamsLeague[i]);

            }

            
            return created;
            
        }


        // Inicio de los metodos para la gestion de los datos de las ligas dentro de la base de datos 


        public async Task<int> newPrivateLeague(PrivateLeague privateLeague) 
        {

            bool validateUserLimit = validation.validateUserLimit(privateLeague.userLimit);

            int validateIsInLeague = await dataRepository.isInPrivateLeague(privateLeague.emailCreator);

            string newIdLeague = KeyGen.keyGen();

            if (validateUserLimit && validateIsInLeague == 0) 
            {
                //return 0;
                return await dataRepository.newPrivateLeague(privateLeague, newIdLeague);
            }
            else
            {
                return -1;
            }

            
        }


        public async Task<int> isInPrivateLeague(string email) 
        {
            return await dataRepository.isInPrivateLeague(email);
        }


        public async Task<int> updateUserPrivateLeague(string email, string idLeague) 
        {
            return await dataRepository.updateUserPrivateLeague(email, idLeague);
        }


        public async Task<int> insertInPrivateLeague(AddPrivLeague addPrivLeague)
        {

            int isInLeague = await dataRepository.isInPrivateLeague(addPrivLeague.email);

            int usersAmount = await dataRepository.getUsersAmount(addPrivLeague.idLeague);

            int userLimit = await dataRepository.getUsersLimit(addPrivLeague.idLeague);

            if (isInLeague == 0 && userLimit >= usersAmount/2) 
            {
                //return 0;
                return await dataRepository.insertInPrivateLeague(addPrivLeague);
            }

            return -1;
        }


        public async Task<IEnumerable<LeagueParticipants>> getPrivateParticipants(string email) 
        {
            return await dataRepository.getPrivateParticipants(email);
        }


        public async Task<PrivateLeague> getUserPrivLeagueInfo(string email) 
        {
            return await dataRepository.getUserPrivLeagueInfo(email);
        }


        public async Task<IEnumerable<LeagueParticipants>> getPublicParticipants() 
        {
            return await dataRepository.getPublicParticipants();
        }



    }
}
