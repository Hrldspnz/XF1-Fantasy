using APIXFIA.Model;
using APIXFIA.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
        DataRepository dataRepository = new DataRepository();
        public TournamentController() 
        {
            
        }

        /**
         * api/tournament
         * Metodo de tipo Get que retorna los torneos almacenados
         * @return lista de torneos existentes 
         */
        [HttpGet]
        public async  Task<IEnumerable<Tournament>> APIGetTournaments()
        {
            
            return await dataRepository.getTournaments();
        }

        [HttpGet("key")]
        public async Task<string> APIKeyGen()
        {

            return KeyGen.keyGen();
        }

        [HttpGet("valkey")]
        public async Task<string> APIKeyGenAUX()
        {

            return await dataRepository.createNewTournamentAUX();
        }



        /**
         * api/tournament/newtnmt
         * Metodo de tipo Post que ingresa un nuevo torneo
         * @param tournament json de la peticion con los atributos del torneo
         * @return resultado de la operacion
         */
        [HttpPost("newtnmt")]
        public async Task<IActionResult> APINewTournament([FromBody] Tournament tournament)
        {
            if (tournament == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await dataRepository.createNewTournament(tournament);
            return Created("created", created);
        }




    }
}
