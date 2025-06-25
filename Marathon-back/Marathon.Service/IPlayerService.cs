using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Marathon.DTO;

namespace Marathon.Service
{
    public interface IPlayerService
    {
        IEnumerable<PlayerDTO> GetAllPlayers();
        PlayerDTO GetPlayerById(int id);
        void AddPlayer(PlayerDTO playerDto);
    }
}
