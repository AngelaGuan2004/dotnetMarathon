using System;
using System.Collections.Generic;

namespace Marathon.Models.Models;

public partial class Participate
{
    public string Role { get; set; } = null!;

    public string Number { get; set; } = null!;

    public int? PlayerId { get; set; }

    public int? EventId { get; set; }

    public virtual Event? Event { get; set; }

    public virtual Player? Player { get; set; }
}
