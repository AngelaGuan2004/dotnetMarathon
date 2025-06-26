using System;
using System.Collections.Generic;

namespace Marathon.Models.Models;

public partial class Event
{
    public int Id { get; set; }

    public string Category { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public DateOnly EventDate { get; set; }

    public int Scale { get; set; }

    public virtual ICollection<Participate> Participates { get; set; } = new List<Participate>();

    public virtual ICollection<Result> Results { get; set; } = new List<Result>();

    public virtual ICollection<Weather> Weathers { get; set; } = new List<Weather>();
}
