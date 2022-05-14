using APIXFIA.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

/*
 * Controlador de pacientes
 * @author Harold Espinoza 
 * 
 */

namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        String cadenaConexion;
        public TournamentController() 
        {
            cadenaConexion = "Server=tcp:basexfia.database.windows.net,1433;Initial Catalog=BaseDeDatosXFia;Persist Security Info=False;User ID=AdminXFIA;Password=Xfia123456;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        }

        /**
         * api/tournament
         * Metodo de tipo Get que retorna los torneos almacenados
         * @return lista de pacientes
         */
        [HttpGet]
        public IEnumerable<Tournament> GetTournaments()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = cadenaConexion;

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

        // GET api/<CampeonatoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        /**
         * api/tournament/newtnmt
         * Metodo de tipo Post que ingresa un nuevo torneo
         * @param json de la peticion con los atributos del torneo
         * @return resultado de la operacion
         */
        [HttpPost("newtnmt")]
        public async Task<IActionResult> NewTournament([FromBody] Tournament tournament)
        {
            if (tournament == null)

                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = cadenaConexion;

            SqlCommand sqlCmd = new SqlCommand();

            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "InsertTournament";
            sqlCmd.Parameters.AddWithValue("@Id_tournament", tournament.ID_tournament);
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


            return Created("created", created);
        }

        // PUT api/<CampeonatoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CampeonatoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
