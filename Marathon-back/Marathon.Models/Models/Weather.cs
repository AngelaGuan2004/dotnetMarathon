using System;
using System.Collections.Generic;

namespace Marathon.Models.Models;

public partial class Weather
{
    public int Id { get; set; }

    public int Time { get; set; }

    public int? Temperature { get; set; }

    public string? WeatherCondition { get; set; }

    public int? WhetherToProceed { get; set; }

    public virtual Event IdNavigation { get; set; } = null!;
}
