using APIXFIA.Model;
using APIXFIA.Repository;
using APIXFIA.Logic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        ManagementLogic managementLogic = new ManagementLogic();


        /**
         * api/player/teamsxplayer
         * Metodo de tipo Get que retorna los automoviles almacenados
         * @return lista de automoviles existentes 
         */
        [HttpPost("teamsxplayer")]
        public async Task<TeamCount> APIGetTeamsXPlayer([FromBody] PlayerAcc player)
        {

            return await managementLogic.getTeamsXPlayer(player.email);
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

            var created = await managementLogic.createNewPlayerAccount(player);

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
         * api/player/state/(email)
         * Metodo de tipo Get que devuelve el estado de actividad en el que se encuentra un jugador
         * @param email del jugador solicitado
         * @return state con el estado del jugador
         */
        [HttpGet("state/{email}")]
        public async Task<string> APIGetPlayerState(string email) 
        {
            return await managementLogic.getPlayerState(email);
        }


        /**
         * api/player/info/email
         * Metodo de tipo Get que devuelve la informacion de un jugador
         * @param email del jugador solicitado
         * @return player objeto con la informacion del jugador
         */
        [HttpGet("info/{email}")]
        public async Task<PlayerInfo> APIGetPlayerInfo(string email)
        {
            return await managementLogic.getPlayerInfo(email);
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

            var created = await managementLogic.updatePlayerState(player.userName, player.statePlayer);

            return Created("created", created);
        }


        /**
         * api/player/pass/{email}
         * Metodo de tipo Get que retorna el password de un jugador
         * @param email correo del jugador a encontrar
         * @return Player objeto tipo jugador con el email y la password
         */
        [HttpGet("pass/{email}")]
        public async Task<UserAcces> APIGetUserPass(string email) 
        {

            return await managementLogic.getPassUser(email);
        }


    }
}
