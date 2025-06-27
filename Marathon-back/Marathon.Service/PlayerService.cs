using Marathon.DTO;
using Marathon.Models.Models;
using Marathon.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace Marathon.Service
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }


        public int? Login(PlayerDTO dto)
        {
            var player = _playerRepository.GetByIdNumber(dto.IdNumber);
            if (player == null) return -1;

            if (player.Name != dto.Name || player.Password != dto.Password) return null;

            return player.Id;
        }

        public IEnumerable<PlayerDTO> GetAllPlayers()
        {
            return _playerRepository.GetAll().Select(p => new PlayerDTO
            {
                Name = p.Name,
                IdNumber = p.IdNumber,
                Password = p.Password,
                Region = p.Region
            });
        }

        public PlayerDTO GetPlayerById(int id)
        {
            var p = _playerRepository.GetById(id);
            if (p == null) return null;
            return new PlayerDTO
            {
                Name = p.Name,
                IdNumber = p.IdNumber,
                Password = p.Password,
                Region = p.Region
            };
        }

        public void AddPlayer(PlayerDTO playerDto)
        {
            var player = new Player
            {
                Name = playerDto.Name,
                IdNumber = playerDto.IdNumber,
                Password = playerDto.Password,
                Region = playerDto.Region
            };
            _playerRepository.Add(player);
        }
    }
}
