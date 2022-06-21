using APIXFIA.Model;
using APIXFIA.Repository;
using APIXFIA.Logic;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        ManagementLogic managementRepository = new ManagementLogic();

        public RaceController()
        {

        }


        /**
         * api/race
         * Metodo de tipo get que optiene una lista de todas las carreras existentes
         * @return listado de carreras con sus respectivos atributos
         */
        [HttpGet]
        public async Task<IEnumerable<Race>> APIGetRaces()
        {
            return await managementRepository.getRaces();
        }

        /*
        // GET api/<CarreraController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        */

        /**
         * api/race/newrace
         * Metodo de tipo Post que ingresa una nueva carrera
         * @param json de la peticion con los atributos de la carrera
         * @return resultado de la operacion
         */
        [HttpPost("newrace")]
        public async Task<IActionResult> APINewRace([FromBody] Race race)
        {
            if (race == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementRepository.createNewRace(race);

            return Created("created", created);
        }


        /**
        * api/race/results
        * Metodo de tipo Post que ingresa una nueva carrera
        * @param json de la peticion con los atributos de la carrera
        * @return resultado de la operacion
        */
        [HttpPost("results")]
        public async Task<IActionResult> APIRaceResults([FromBody] List<RaceResults> results)
        {
            if (results == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementRepository.LoadRaceResults(results);
            //var created = 0;

            return Created("created", created);
        }



        /*
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
        */
    }
}
