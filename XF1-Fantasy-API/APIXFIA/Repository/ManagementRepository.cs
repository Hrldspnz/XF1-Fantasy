using APIXFIA.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APIXFIA.Repository
{
    public class ManagementRepository
    {

        DataRepository dataRepository = new DataRepository();


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

            string newTournamentId = KeyGen.validateNewKey(tournamentsId3Y);

            return await dataRepository.createNewTournament(tournament, newTournamentId);
        }

        // este saca los tres anhos no se usa aqui
        public async Task<List<string>> get3YTournament()
        {
            return await dataRepository.get3YTournament();
        }


        public async Task<int> getActualBudget()
        {
            return await dataRepository.getActualBudget();
        }

        //  Inicio de los metodos para la gestion de los datos de jugadores dentro de la base de datos 

        public async Task<int> createNewPlayerAccount(PlayerAcc player)
        {
            return await dataRepository.createNewPlayerAccount(player);
        }


        public async Task<int> newPlayerScuderia(Scuderia scuderia)
        {
            return await dataRepository.newPlayerScuderia(scuderia);
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


        public async Task<PlayerAcc> getPassUser(string email)
        {
            return await dataRepository.getPassUser(email);

        }


        //  Inicio de los metodos para la gestion de los datos de juego dentro de la base de datos

        public async Task<int> newPlayerTeam(Team team)
        {
            return await dataRepository.newPlayerTeam(team);
        }


        public async Task<IEnumerable<Team>> getTeamInfo(string email) 
        {
            return await dataRepository.getTeamInfo(email);
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

        // Inicio de los metodos para la gestion de los datos de las ligas dentro de la base de datos 


        public async Task<int> newPrivateLeague(PrivateLeague privateLeague) 
        {
            return await dataRepository.newPrivateLeague(privateLeague);
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
            return await dataRepository.insertInPrivateLeague(addPrivLeague);
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
