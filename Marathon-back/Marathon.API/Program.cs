using Marathon.Repository;
using Marathon.Service;
using Marathon.Models.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 通过DbContext配置MySQL连接
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<MarathonDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 添加控制器
builder.Services.AddControllers();

// 配置 Swagger
builder.Services.AddEndpointsApiExplorer();       // 配置 API 说明
builder.Services.AddSwaggerGen();                // 配置 Swagger UI 页面

// 注册依赖
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

var app = builder.Build();

app.UseSwagger();                             // 启用 Swagger 中间件
app.UseSwaggerUI();                           // 启用 Swagger 页面
app.UseHttpsRedirection();

// 映射控制器
app.MapControllers();
app.Run();
