using APIXFIA.Model;
using APIXFIA.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        ManagementRepository managementRepository = new ManagementRepository();


        /**
         * api/player/teamsxplayer
         * Metodo de tipo Get que retorna los automoviles almacenados
         * @return lista de automoviles existentes 
         */
        [HttpPost("teamsxplayer")]
        public async Task<TeamCount> APIGetTeamsXPlayer([FromBody] PlayerAcc player)
        {

            return await managementRepository.getTeamsXPlayer(player.email);
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

            var created = await managementRepository.createNewPlayerAccount(player);

            return Created("created", created);
        }


        [HttpGet("state/{email}")]
        public async Task<string> APIGetPlayerState(string email) 
        {
            return await managementRepository.getPlayerState(email);
        }


        [HttpGet("info/{email}")]
        public async Task<PlayerInfo> APIGetPlayerInfo(string email)
        {
            return await managementRepository.getPlayerInfo(email);
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

            var created = await managementRepository.updatePlayerState(player.userName, player.statePlayer);

            return Created("created", created);
        }


        /**
         * api/player/pass/{email}
         * Metodo de tipo Get que retorna el password de un jugador
         * @param email correo del jugador a encontrar
         * @return Player objeto tipo jugador con el email y la password
         */
        [HttpGet("pass/{email}")]
        public async Task<PlayerAcc> APIGetUserPass(string email) 
        {

            return await managementRepository.getPassUser(email);
        }


    }
}
