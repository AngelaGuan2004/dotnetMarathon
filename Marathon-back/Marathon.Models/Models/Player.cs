using System;
using System.Collections.Generic;

namespace Marathon.Models.Models;

public partial class Player
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Gender { get; set; }

    public int? Age { get; set; }

    public string IdNumber { get; set; } = null!;

    public string? Region { get; set; }

    public string? TelephoneNumber { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Participate> Participates { get; set; } = new List<Participate>();

    public virtual ICollection<Result> Results { get; set; } = new List<Result>();
}
