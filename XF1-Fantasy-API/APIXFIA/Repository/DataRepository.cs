using APIXFIA.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace APIXFIA.Repository
{

    /**
     * Clase creada para la interaccion de datos con sql server
     * */
    public class DataRepository : ControllerBase
    {
        String conectionString;
        Encript encript;
        public DataRepository()
        {
            conectionString = "Server=tcp:basexfia.database.windows.net,1433;Initial Catalog=BaseDeDatosXFia;Persist Security Info=False;User ID=AdminXFIA;Password=Xfia123456;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            encript = new Encript();
        }


        // Inicio de los metodos para la gestion de las carreras dentro de la base de datos 


        /**
         * Metodo que se encarga de obtener una lista con las carreras existentes
         * @return races listado de carreras con sus respectivos atributos
         */
        public async  Task<IEnumerable<Race>> getRaces()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "GetRaces";
            sqlCmd.Connection = myConnection;
            myConnection.Open();

            reader = sqlCmd.ExecuteReader();

            List<Race> races = new List<Race>();

            while (reader.Read())
            {
                Race race = new Race();

                race.ID_Race = reader.GetValue(0).ToString();
                race.Race_name = reader.GetValue(1).ToString();
                race.Race_track = reader.GetValue(2).ToString();
                race.Country = reader.GetValue(3).ToString();
                race.Date_begin = reader.GetValue(4).ToString();
                race.Hour_begin = reader.GetValue(5).ToString();
                race.Date_end = reader.GetValue(6).ToString();
                race.Hour_end = reader.GetValue(7).ToString();
                race.Race_state = reader.GetValue(8).ToString();
                race.Tournament_id = reader.GetValue(9).ToString();


                races.Add(race);

            }
            myConnection.Close();

            return races;
        }

        

        /**
         * Metodo que se encarga de ingresar una nueva carrera a la base de datos
         * @param race objeto de tipo Race con los datos de la carrera
         * @return int created con el resultado de la operacion
         */
        public async Task<int> createNewRace(Race race)
        {
            
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "InsertRace";
            sqlCmd.Parameters.AddWithValue("@ID_Race", race.ID_Race);
            sqlCmd.Parameters.AddWithValue("@Race_name", race.Race_name);
            sqlCmd.Parameters.AddWithValue("@Race_track", race.Race_track);
            sqlCmd.Parameters.AddWithValue("@Country", race.Country);
            sqlCmd.Parameters.AddWithValue("@Date_begin", DateTime.Parse(race.Date_begin));
            sqlCmd.Parameters.AddWithValue("@Hour_begin", DateTime.Parse(race.Hour_begin));
            sqlCmd.Parameters.AddWithValue("@Date_end", DateTime.Parse(race.Date_end));
            sqlCmd.Parameters.AddWithValue("@Hour_end", DateTime.Parse(race.Hour_end));
            sqlCmd.Parameters.AddWithValue("@Race_state", race.Race_state);
            sqlCmd.Parameters.AddWithValue("@Tournament_id", race.Tournament_id);
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            var created = sqlCmd.ExecuteNonQuery();
            myConnection.Close();


            return created;
        }


        // Inicio de los metodos para la gestion de las carreras dentro de la base de datos 

        /**
         * Metodo que se encarga de obtener una lista de todos los torneos existentes
         * @return tournaments lista de objetos de tipo Tournament
         */
        public async Task<IEnumerable<Tournament>> getTournaments()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "GetTournaments";
            sqlCmd.Connection = myConnection;
            myConnection.Open();

            reader = sqlCmd.ExecuteReader();

            List<Tournament> tournaments = new List<Tournament>();

            while (reader.Read())
            {
                Tournament tournament = new Tournament();

                tournament.ID_tournament = reader.GetValue(0).ToString();
                tournament.TName = reader.GetValue(1).ToString();
                tournament.Date_begin = reader.GetValue(2).ToString();
                tournament.Date_end = reader.GetValue(3).ToString();
                tournament.Hour_begin = reader.GetValue(4).ToString();
                tournament.Hour_end = reader.GetValue(5).ToString();
                tournament.Rules_desc = reader.GetValue(6).ToString();
                tournament.Budget = (int)reader.GetValue(7);


                tournaments.Add(tournament);

            }
            myConnection.Close();

            return tournaments;
        }


        /**
         * Metodo que se encarga de ingresar un nuevo torneo dentro de la base de datos
         * @param tournament obtjeto de tipo Tournament con los datos del torneo
         * @return resultado de la operacion
         */
        public async Task<int> createNewTournament(Tournament tournament)
        {
            SqlDataReader reader = null;

            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            List<string> tournamentsId = new List<string>();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "idTournament3YearsAgo";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader(); 

            while (reader.Read())
            {
                string tnmtId;

                tnmtId = reader.GetValue(0).ToString();
     


                tournamentsId.Add(tnmtId);

            }
            myConnection.Close();

            string newTournamentId = KeyGen.validateNewKey(tournamentsId);


            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "InsertTournament";
            sqlCmd.Parameters.AddWithValue("@Id_tournament", newTournamentId);
            sqlCmd.Parameters.AddWithValue("@TName", tournament.TName);
            sqlCmd.Parameters.AddWithValue("@Date_begin", DateTime.Parse(tournament.Date_begin));
            sqlCmd.Parameters.AddWithValue("@Date_end", DateTime.Parse(tournament.Date_end));
            sqlCmd.Parameters.AddWithValue("@Hour_begin", DateTime.Parse(tournament.Hour_begin));
            sqlCmd.Parameters.AddWithValue("@Hour_end", DateTime.Parse(tournament.Hour_end));
            sqlCmd.Parameters.AddWithValue("@Rules_desc", tournament.Rules_desc);
            sqlCmd.Parameters.AddWithValue("@Budget", tournament.Budget);
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            var created = sqlCmd.ExecuteNonQuery();
            myConnection.Close();

            return created;
        }


        //-------------------------------------------------------------
        public async Task<string> createNewTournamentAUX()
        {
            SqlDataReader reader = null;

            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            List<string> tournamentsId = new List<string>();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "idTournament3YearsAgo";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            while (reader.Read())
            {
                string tnmtId;

                tnmtId = reader.GetValue(0).ToString();



                tournamentsId.Add(tnmtId);

            }
            myConnection.Close();

            string newTournamentId = KeyGen.validateNewKey(tournamentsId);

            return newTournamentId;
        }

        //----------------------------------------------------------------

        //  Inicio de los metodos para la gestion de los datos de jugadores dentro de la base de datos 


        /**
         * Metodo que crear una nueva cuenta de jugador dentro de la base de datos
         * @param player objeto de tipo PlayerAcc con los atibutos a ingresar
         * @return created resultado de la operacion realizada
         */
        public async Task<int> createNewPlayerAccount(PlayerAcc player) 
        {
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "insertPlayerAccount";
            sqlCmd.Parameters.AddWithValue("@nameUser", player.nameUser);
            sqlCmd.Parameters.AddWithValue("@email", player.email);
            sqlCmd.Parameters.AddWithValue("@country", player.country);
            sqlCmd.Parameters.AddWithValue("@pass", encript.codecMd5(player.pass));
            sqlCmd.Parameters.AddWithValue("@statePlayer", player.statePlayer);
            
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            var created = sqlCmd.ExecuteNonQuery();
            myConnection.Close();

            return created;

        }


        /**
         * Metodo que se encarga de crear la escuderia de un jugador dentro de la base de datos
         * @param scuderia obtjeto de tipo Scuderia con los atributos a ingresar
         * @return created resultado de la operacion realizada
         */
        public async Task<int> newPlayerScuderia(Scuderia scuderia) 
        {
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "insertScuderia";
            sqlCmd.Parameters.AddWithValue("@nameScuderia", scuderia.nameScuderia);
            sqlCmd.Parameters.AddWithValue("@email", scuderia.email);
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            var created = sqlCmd.ExecuteNonQuery();
            myConnection.Close();

            return created;
        }


        /**
         * Metodo que se encarga de actualizar el estado de un jugador
         * @param userName nombre del jugador a editar
         * @param userState estado al que se desea cambiar el jugador
         * @return created resultado de la operacion realizada
         */
        public async Task<int> updatePlayerState(string userName, string userState) 
        {
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "updateUserState";
            sqlCmd.Parameters.AddWithValue("@nameUser", userName);
            sqlCmd.Parameters.AddWithValue("@statePlayer", userState);

            sqlCmd.Connection = myConnection;
            myConnection.Open();
            var updated = sqlCmd.ExecuteNonQuery();
            myConnection.Close();

            return updated;
        }

        /**
         * Metodo que se encarga de obtener la cantidad de equipos que tiene un jugador
         * @param email email del jugador a buscar
         * @return teamsXPlayer resultado con la cantidad de equipos
         */

        public async Task<int> getTeamsXPlayer(string email)
        {
            SqlDataReader reader = null;

            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "getCountTeams";
            sqlCmd.Parameters.AddWithValue("@email", email);

            sqlCmd.Connection = myConnection;
            myConnection.Open();

            reader = sqlCmd.ExecuteReader();

            int teamsXPlayer = 0;

            while (reader.Read())
            {
                teamsXPlayer = (int)reader.GetValue(0);

            }
            myConnection.Close();

            return teamsXPlayer;
        }

        //  Inicio de los metodos para la gestion de los datos de jugadores dentro de la base de datos 


        /**
         * Metodo que se encarga de crear un equipo de un jugador dentro de la base de datos
         * @param team objeto de tipo Team con los atributos a ingresar
         * @return created resultado de la operacion realizada
         */
        public async Task<int> newPlayerTeam(Team team)
        {
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "insertTeam";
            sqlCmd.Parameters.AddWithValue("@nameTeam", team.nameTeam);
            sqlCmd.Parameters.AddWithValue("@email", team.email);
            sqlCmd.Parameters.AddWithValue("@budget", team.budget);
            sqlCmd.Parameters.AddWithValue("@nameDriver1", team.nameDriver1);
            sqlCmd.Parameters.AddWithValue("@nameDriver2", team.nameDriver2);
            sqlCmd.Parameters.AddWithValue("@nameDriver3", team.nameDriver3);
            sqlCmd.Parameters.AddWithValue("@nameDriver4", team.nameDriver4);
            sqlCmd.Parameters.AddWithValue("@nameDriver5", team.nameDriver5);
            sqlCmd.Parameters.AddWithValue("@car", team.car);
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            var created = sqlCmd.ExecuteNonQuery();
            myConnection.Close();

            return created;
        }

        /**
         * Metodo que se encarga de obtener los pilotos existentes dentro de la base
         * @return drivers Objeto de tipo List<Driver> con el listado de pilotos
         */
        public async Task<IEnumerable<Driver>> getDrivers() 
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "getDrivers";
            sqlCmd.Connection = myConnection;
            myConnection.Open();

            reader = sqlCmd.ExecuteReader();

            List<Driver> drivers = new List<Driver>();

            while (reader.Read())
            {
                Driver driver = new Driver();

                driver.nameDriver = reader.GetValue(0).ToString();
                driver.price = (int)reader.GetValue(1);



                drivers.Add(driver);

            }
            myConnection.Close();

            return drivers; 

        }


        /**
         * Metodo que se encarga de obtener los automoviles existentes dentro de la base
         * @return cars Objeto de tipo List<Car> con el listado de automoviles
         */
        public async Task<IEnumerable<Car>> getCars()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = conectionString;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "getCars";
            sqlCmd.Connection = myConnection;
            myConnection.Open();

            reader = sqlCmd.ExecuteReader();

            List<Car> cars = new List<Car>();

            while (reader.Read())
            {
                Car car = new Car();

                car.nameCar = reader.GetValue(0).ToString();
                car.price = (int)reader.GetValue(1);



                cars.Add(car);

            }
            myConnection.Close();

            return cars;

        }


    }

}