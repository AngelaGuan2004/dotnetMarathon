using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Marathon.Models;

namespace Marathon.Repository
{
    public class PlayerRepository : IPlayerRepository
    {
        // 这里用内存模拟数据库，实际项目用EF Core等ORM
        private static List<Player> _players = new List<Player>();

        public IEnumerable<Player> GetAll() => _players;

        public Player GetById(int id) => _players.FirstOrDefault(p => p.Id == id);

        public void Add(Player player) => _players.Add(player);
    }
}
