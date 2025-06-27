using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marathon.DTO
{
    public class PlayerDTO
    {
        public string Name { get; set; }
        public string IdNumber { get; set; }
        public string? Password { get; set; }
        public string? Region { get; set; }
    }
}
