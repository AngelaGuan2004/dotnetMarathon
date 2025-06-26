using Marathon.Models.Models;
using Marathon.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Marathon.Repository
{
    /// <summary>
    /// 选手仓储，基于EF Core实现，数据存储于MySQL。
    /// </summary>
    public class PlayerRepository : IPlayerRepository
    {
        private readonly MarathonDbContext _context;

        public PlayerRepository(MarathonDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Player> GetAll() => _context.Players.ToList();

        public Player GetById(int id) => _context.Players.FirstOrDefault(p => p.Id == id);

        public void Add(Player player)
        {
            _context.Players.Add(player);
            _context.SaveChanges();
        }
    }
}
