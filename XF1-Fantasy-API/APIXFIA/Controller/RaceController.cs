using APIXFIA.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

/*
 * Controlador de carreras
 * @author Harold Espinoza 
 * 
 */

namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceController : ControllerBase
    {
        String cadenaConexion;
        public RaceController()
        {
            cadenaConexion = "Server=tcp:basexfia.database.windows.net,1433;Initial Catalog=BaseDeDatosXFia;Persist Security Info=False;User ID=AdminXFIA;Password=Xfia123456;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        }


        /**
         * api/race
         * Metodo de tipo get que optiene una lista de todas las carreras existentes
         * @return listado de carreras con sus respectivos atributos
         */
        [HttpGet]
        public IEnumerable<Race> GetRaces()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = cadenaConexion;

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

        // GET api/<CarreraController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        /**
         * api/race/newrace
         * Metodo de tipo Post que ingresa una nueva carrera
         * @param json de la peticion con los atributos de la carrera
         * @return resultado de la operacion
         */
        [HttpPost("newrace")]
        public async Task<IActionResult> NewRace([FromBody] Race race)
        {
            if (race == null)

                return BadRequest();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            SqlConnection myConnection = new SqlConnection();

            myConnection.ConnectionString = cadenaConexion;

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


            return Created("created", created);
        }

        // PUT api/<CarreraController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CarreraController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
