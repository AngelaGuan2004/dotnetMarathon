using Marathon.DTO;
using Marathon.Models.Models;
using Marathon.Repository;
using System.Collections.Generic;
using System.Linq;

namespace Marathon.Service
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public IEnumerable<PlayerDTO> GetAllPlayers()
        {
            return _playerRepository.GetAll().Select(p => new PlayerDTO
            {
                Id = p.Id,
                Name = p.Name,
                Age = p.Age
            });
        }

        public PlayerDTO GetPlayerById(int id)
        {
            var p = _playerRepository.GetById(id);
            if (p == null) return null;
            return new PlayerDTO
            {
                Id = p.Id,
                Name = p.Name,
                Age = p.Age
            };
        }

        public void AddPlayer(PlayerDTO playerDto)
        {
            var player = new Player
            {
                Id = playerDto.Id,
                Name = playerDto.Name,
                Age = playerDto.Age
            };
            _playerRepository.Add(player);
        }
    }
}
