﻿using APIXFIA.Model;
using APIXFIA.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {

        ManagementRepository managementRepository = new ManagementRepository();


        /**
         * api/team/drivers
         * Metodo de tipo Get que retorna los pilotos almacenados
         * @return lista de pilotos existentes 
         */
        [HttpGet("drivers")]
        public async Task<IEnumerable<Driver>> APIGetDrivers()
        {

            return await managementRepository.getDrivers();
        }


        /**
         * api/tournament
         * Metodo de tipo Get que retorna los automoviles almacenados
         * @return lista de automoviles existentes 
         */
        [HttpGet("cars")]
        public async Task<IEnumerable<Car>> APIGetCars()
        {

            return await managementRepository.getCars();
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

            var created = await managementRepository.newPlayerScuderia(scuderia);

            return Created("created", created);
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

            var created = await managementRepository.newPlayerTeam(team);

            return Created("created", created);
        }


        [HttpGet("teaminfo/{email}")]
        public async Task<IEnumerable<Team>> APIGetTeamInfo(string email)
        {

            return await managementRepository.getTeamInfo(email);
        }


        [HttpGet("havescuderia/{email}")]
        public async Task<string> APIhaveScuderia(string email)
        {

            return await managementRepository.haveScuderia(email);
        }

    }
}
