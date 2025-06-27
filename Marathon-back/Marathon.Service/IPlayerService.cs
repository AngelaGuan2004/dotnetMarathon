using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Marathon.DTO;
using Marathon.Models.Models;

namespace Marathon.Service
{
    public interface IPlayerService
    {
        int? Login(PlayerDTO playerDto); // 返回 null、-1、或者 ID
        IEnumerable<PlayerDTO> GetAllPlayers();
        PlayerDTO GetPlayerById(int id);
        void AddPlayer(PlayerDTO playerDto);
    }
}
