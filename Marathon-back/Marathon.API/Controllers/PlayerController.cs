using Marathon.DTO;
using Marathon.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Marathon.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IConfiguration _config;

        public PlayerController(IPlayerService playerService, IConfiguration config)
        {
            _playerService = playerService;
            _config = config;
        }

        [HttpPost("auth/login_player")]
        public IActionResult Login([FromBody] PlayerDTO dto)
        {
            var id = _playerService.Login(dto);
            if (id == -1) return BadRequest("未注册");
            if (id == null) return BadRequest("身份证或密码错误");

            var token = GenerateJwtToken(id.Value);
            var jwt = new JwtDTO { Id = id.Value, Token = token };
            return Ok(jwt);
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

        private string GenerateJwtToken(int userId)
        {
            var claims = new[]
            {
            new Claim("id", userId.ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}