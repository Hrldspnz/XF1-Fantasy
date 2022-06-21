using APIXFIA.Model;
using APIXFIA.Repository;
using APIXFIA.Logic;
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
        ManagementLogic managementLogic = new ManagementLogic();
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
            
            return await managementLogic.getTournaments();
        }


        /**
         * Metodo en desuso
         */
        [HttpGet("key")]
        public async Task<string> APIKeyGen()
        {

            return KeyGen.keyGen();
        }


        /**
         * Metodo en desuso
         */
        [HttpGet("valkey")]
        public async Task<List<string>> APIKeyGenAUX()
        {

            return await managementLogic.get3YTournament();
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

            var created = await managementLogic.createNewTournament(tournament);
            return Created("created", created);
        }


        /**
         * api/team/actbudget
         * Metodo de tipo Get que devuelve el presupuesto del torneo actual
         * @return budget presupuesto del torneo actual
         */
        [HttpGet("actbudget")]
        public async Task<Number> APIGetAtualBudget() 
        {
            return await managementLogic.getActualBudget();
        }

    }
}
