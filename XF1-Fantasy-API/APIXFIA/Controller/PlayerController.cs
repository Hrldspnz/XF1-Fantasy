using APIXFIA.Model;
using APIXFIA.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        DataRepository dataRepository = new DataRepository();


        /**
         * api/player/teamsxplayer
         * Metodo de tipo Get que retorna los automoviles almacenados
         * @return lista de automoviles existentes 
         */
        [HttpGet("teamsxplayer")]
        public async Task<int> APIGetTeamsXPlayer([FromBody] PlayerAcc player)
        {

            return await dataRepository.getTeamsXPlayer(player.email);
        }

        /**
         * api/player/createAcc
         * Metodo de tipo Post que ingresa una nueva cuenta de jugador
         * @return resultado de la operacion
         */
        [HttpPost("createAcc")]
        public async Task<IActionResult> APINewPlayerAccount([FromBody] PlayerAcc player)
        {
            if (player == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await dataRepository.createNewPlayerAccount(player);

            return Created("created", created);
        }


        /**
         * api/player/userstate
         * Metodo de tipo Put que cambia el estado de actividad de la cuenta del jugador
         * @return resultado de la operacion
         */
        [HttpPut("userstate")]
        public async Task<IActionResult> APIUpdatePlayerState([FromBody] PlayerState player)
        {
            if (player == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await dataRepository.updatePlayerState(player.userName, player.statePlayer);

            return Created("created", created);
        }

        

    }
}
