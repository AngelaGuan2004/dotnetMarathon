using System;
using System.Collections.Generic;
using Marathon.Models.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Marathon.Models.Data;

public partial class MarathonDbContext : DbContext
{
    public MarathonDbContext()
    {
    }

    public MarathonDbContext(DbContextOptions<MarathonDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Participate> Participates { get; set; }

    public virtual DbSet<Player> Players { get; set; }

    public virtual DbSet<Result> Results { get; set; }

    public virtual DbSet<Weather> Weathers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // 留空，连接字符串已经写在配置里
        if (!optionsBuilder.IsConfigured)
        {
            // 留空
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("event");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Category)
                .HasMaxLength(20)
                .HasColumnName("category");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.EventDate).HasColumnName("event_date");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("name");
            entity.Property(e => e.Scale).HasColumnName("scale");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
        });

        modelBuilder.Entity<Participate>(entity =>
        {
            entity.HasKey(e => e.Number).HasName("PRIMARY");

            entity.ToTable("participate");

            entity.HasIndex(e => e.EventId, "event_id");

            entity.HasIndex(e => e.PlayerId, "player_id");

            entity.Property(e => e.Number)
                .HasMaxLength(10)
                .HasColumnName("number");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.PlayerId).HasColumnName("player_id");
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasColumnName("role");

            entity.HasOne(d => d.Event).WithMany(p => p.Participates)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("participate_ibfk_2");

            entity.HasOne(d => d.Player).WithMany(p => p.Participates)
                .HasForeignKey(d => d.PlayerId)
                .HasConstraintName("participate_ibfk_1");
        });

        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("player");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Gender)
                .HasMaxLength(2)
                .HasColumnName("gender");
            entity.Property(e => e.IdNumber)
                .HasMaxLength(18)
                .IsFixedLength()
                .HasColumnName("id_number");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.Region)
                .HasMaxLength(20)
                .HasColumnName("region");
            entity.Property(e => e.TelephoneNumber)
                .HasMaxLength(20)
                .HasColumnName("telephone_number");
        });

        modelBuilder.Entity<Result>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("result");

            entity.HasIndex(e => e.EventId, "event_id");

            entity.HasIndex(e => e.PlayerId, "player_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.GenderRank).HasColumnName("gender_rank");
            entity.Property(e => e.GunResult).HasColumnName("gun_result");
            entity.Property(e => e.NetResult).HasColumnName("net_result");
            entity.Property(e => e.PlayerId).HasColumnName("player_id");
            entity.Property(e => e.PlayerRank).HasColumnName("player_rank");

            entity.HasOne(d => d.Event).WithMany(p => p.Results)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("result_ibfk_2");

            entity.HasOne(d => d.Player).WithMany(p => p.Results)
                .HasForeignKey(d => d.PlayerId)
                .HasConstraintName("result_ibfk_1");
        });

        modelBuilder.Entity<Weather>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.Time })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("weather");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Time).HasColumnName("time");
            entity.Property(e => e.Temperature).HasColumnName("temperature");
            entity.Property(e => e.WeatherCondition)
                .HasMaxLength(20)
                .HasColumnName("weather_condition");
            entity.Property(e => e.WhetherToProceed).HasColumnName("whether_to_proceed");

            entity.HasOne(d => d.IdNavigation).WithMany(p => p.Weathers)
                .HasForeignKey(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("weather_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
