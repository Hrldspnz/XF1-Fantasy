using APIXFIA.Model;
using APIXFIA.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APIXFIA.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        ManagementRepository managementRepository = new ManagementRepository();


        // GET: api/<LeagueController>
        [HttpPost("newprivateleague")]
        public async Task<IActionResult> APINewPrivateLeague([FromBody]PrivateLeague privateLeague)
        {
            if (privateLeague == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementRepository.newPrivateLeague(privateLeague);

            return Created("created", created);
        }

        [HttpGet("isinprivateleague/{email}")]
        public async Task<int> APIIsInPrivateLeague(string email)
        {
            return await managementRepository.isInPrivateLeague(email);
        }


        [HttpPost("insertinprivleague")]
        public async Task<IActionResult> APINewPrivateLeague([FromBody] AddPrivLeague addPrivLeague)
        {
            if (addPrivLeague == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementRepository.insertInPrivateLeague(addPrivLeague);

            return Created("created", created);
        }



        [HttpPut("updateprivl")]
        public async Task<IActionResult> APIUpdatePlayerState([FromBody] UserPLUpdate userPL)
        {
            if (userPL == null)
                return BadRequest("null input");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await managementRepository.updateUserPrivateLeague(userPL.email, userPL.idLeague);

            return Created("created", created);
        }


        [HttpGet("privatelparticipants/{email}")]
        public async Task<IEnumerable<LeagueParticipants>> APIGetPrivateParticipants(string email)
        {
            return await managementRepository.getPrivateParticipants(email);
        }


        [HttpGet("userprivlinfo/{email}")]
        public async Task<PrivateLeague> APIGetUserPrivLeagueInfo(string email)
        {
            return await managementRepository.getUserPrivLeagueInfo(email);
        }

        [HttpGet("publiclparticipants")]
        public async Task<IEnumerable<LeagueParticipants>> APIGetPublicParticipants() 
        {
            return await managementRepository.getPublicParticipants();
        }

    }
}
