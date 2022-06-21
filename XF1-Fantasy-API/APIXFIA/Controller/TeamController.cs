using APIXFIA.Model;
using APIXFIA.Repository;
using APIXFIA.Logic;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {

        ManagementLogic managementLogic = new ManagementLogic();


        /**
         * api/team/drivers
         * Metodo de tipo Get que retorna los pilotos almacenados
         * @return lista de pilotos existentes 
         */
        [HttpGet("drivers")]
        public async Task<IEnumerable<Driver>> APIGetDrivers()
        {

            return await managementLogic.getDrivers();
        }


        /**
         * api/tournament
         * Metodo de tipo Get que retorna los automoviles almacenados
         * @return lista de automoviles existentes 
         */
        [HttpGet("cars")]
        public async Task<IEnumerable<Car>> APIGetCars()
        {

            return await managementLogic.getCars();
        }


        /**
         * api/team/newscuderia
         * Metodo de tipo Post que ingresa una nueva escuderia
         * @return resultado de la operacion
         */
        [HttpPost("newscuderia")]
        public async Task<IActionResult> APINewPlayerScuderia([FromBody] Scuderia scuderia)
        {
            if (scuderia == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementLogic.newPlayerScuderia(scuderia);

            if (created != -1)
            {
                return Created("created", created);
            }
            else
            {
                return BadRequest("Problema en la validacion");
            }

        }


        /**
         * api/team/newteam
         * Metodo de tipo Post que ingresa un nuevo equipo
         * @return resultado de la operacion
         */
        [HttpPost("newteam")]
        public async Task<IActionResult> APINewPlayerTeam([FromBody] Team team)
        {
            if (team == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementLogic.newPlayerTeam(team);

            if (created != -1)
            {
                return Created("created", created);
            }
            else
            {
                return BadRequest("Problema en la validacion");
            }
        }


        /**
         * api/team/teaminfo/(email)
         * Metodo de tipo Get que devuelve los equipos de un juador con los datos de los mismos
         * @param email del jugador solicitado
         * @return teams listado de los equipos con su respectiva informacion
         */
        [HttpGet("teaminfo/{email}")]
        public async Task<IEnumerable<Team>> APIGetTeamInfo(string email)
        {

            return await managementLogic.getTeamInfo(email);
        }


        [HttpGet("getteam/{email}/{nameTeam}")]
        public async Task<Team> APIGetTeam(string nameTeam,string email)
        {

            return await managementLogic.getTeamPlayer(nameTeam,email);
        }


        /**
         * api/team/teamupdate
         * Metodo de tipo Put que cambia el estado de actividad de la cuenta del jugador
         * @return resultado de la operacion
         */
        [HttpPut("teamupdate")]
        public async Task<IActionResult> APIUpdatePlayerTeam([FromBody] Team team)
        {
            if (team == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementLogic.updatePlayerTeam(team);

            return Created("created", created);
        }



        /**
         * api/team/havescuderia/(email)
         * Metodo de tipo Get que informa si un jugador ya cuenta con una escuderia
         * @param email del jugador solicitado
         * @return exist con "Si" en caso de tener y "no" en caso de no tener
         */
        [HttpGet("havescuderia/{email}")]
        public async Task<string> APIhaveScuderia(string email)
        {

            return await managementLogic.haveScuderia(email);
        }

    }
}
