using Marathon.Service;
using Marathon.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Marathon.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public IEnumerable<PlayerDTO> GetAll()
        {
            return _playerService.GetAllPlayers();
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerDTO> GetById(int id)
        {
            var player = _playerService.GetPlayerById(id);
            if (player == null) return NotFound();
            return player;
        }

        [HttpPost]
        public IActionResult Add(PlayerDTO playerDto)
        {
            _playerService.AddPlayer(playerDto);
            return Ok();
        }
    }
}