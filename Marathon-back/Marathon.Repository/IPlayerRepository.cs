using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Marathon.Models.Models;

namespace Marathon.Repository
{
    public interface IPlayerRepository
    {
        IEnumerable<Player> GetAll();
        Player GetById(int id);
        void Add(Player player);
        Player GetByIdNumber(string idNumber);
        Player GetByCredentials(string idNumber, string name, string password);
    }
}
