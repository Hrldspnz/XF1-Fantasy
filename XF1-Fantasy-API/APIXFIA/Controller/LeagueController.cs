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
    public class LeagueController : ControllerBase
    {
        ManagementLogic managementLogic = new ManagementLogic();


        /**
         * api/league/newprivateleague
         * Metodo de tipo Post que crea una nueva liga privada
         * @return created con el resultado de la operacion
         */
        [HttpPost("newprivateleague")]
        public async Task<IActionResult> APINewPrivateLeague([FromBody]PrivateLeague privateLeague)
        {
            if (privateLeague == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementLogic.newPrivateLeague(privateLeague);

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
         * api/league/isinprivateleague
         * Metodo de tipo Get que se encarga de retornar si un usuario se encuentra en una liga privada
         * @return result entero con un 1 en caso de pertenecer y un 0 en caso de que no
         */
        [HttpGet("isinprivateleague/{email}")]
        public async Task<int> APIIsInPrivateLeague(string email)
        {
            return await managementLogic.isInPrivateLeague(email);
        }


        /**
         * api/league/insertinprivleague
         * Metodo de tipo Post que ingresa un usuario a una liga privada
         * @return created con el resultado de la operacion
         */
        [HttpPost("insertinprivleague")]
        public async Task<IActionResult> APINewPrivateLeague([FromBody] AddPrivLeague addPrivLeague)
        {
            if (addPrivLeague == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementLogic.insertInPrivateLeague(addPrivLeague);

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
         * api/league/updateprivl
         * Metodo de tipo Put que cambia la liga a la que pertenece un usuario
         * @return created con el resultado de la operacion
         */
        [HttpPut("updateprivl")]
        public async Task<IActionResult> APIUpdatePlayerState([FromBody] UserPLUpdate userPL)
        {
            if (userPL == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementLogic.updateUserPrivateLeague(userPL.email, userPL.idLeague);

            return Created("created", created);
        }


        /**
         * api/league/privatelparticipants/(email)
         * Metodo de tipo Get que devuelve los participantes en la liga privada de cierto jugador
         * @param email del jugador dentro de la liga
         * @return Listado de los participantes en la liga solicitada
         */
        [HttpGet("privatelparticipants/{email}")]
        public async Task<IEnumerable<LeagueParticipants>> APIGetPrivateParticipants(string email)
        {
            return await managementLogic.getPrivateParticipants(email);
        }


        /**
         * api/league/userprivlinfo/(email)
         * Metodo de tipo Get que obtiene la informacion de la liga en la que se encuentra en un jugador
         * @param email correo del jugador que se encuentra en la liga
         * @return league liga con los datos de la misma
         */
        [HttpGet("userprivlinfo/{email}")]
        public async Task<PrivateLeague> APIGetUserPrivLeagueInfo(string email)
        {
            return await managementLogic.getUserPrivLeagueInfo(email);
        }


        /**
         * api/league/publiclparticipants
         * Metodo de tipo Get que devuelve los participantes en la liga publica
         * @return Listado de los participantes en la liga publica
         */
        [HttpGet("publiclparticipants")]
        public async Task<IEnumerable<LeagueParticipants>> APIGetPublicParticipants() 
        {
            return await managementLogic.getPublicParticipants();
        }

    }
}
