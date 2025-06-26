using System;
using System.Collections.Generic;

namespace Marathon.Models.Models;

public partial class Result
{
    public int Id { get; set; }

    public int? GunResult { get; set; }

    public int? NetResult { get; set; }

    public int? PlayerId { get; set; }

    public int? EventId { get; set; }

    public int? PlayerRank { get; set; }

    public int? GenderRank { get; set; }

    public virtual Event? Event { get; set; }

    public virtual Player? Player { get; set; }
}
