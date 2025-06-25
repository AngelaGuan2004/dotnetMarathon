using Marathon.Repository;
using Marathon.Service;

var builder = WebApplication.CreateBuilder(args);

// 添加控制器
builder.Services.AddControllers();

// 添加 Swagger 服务
builder.Services.AddEndpointsApiExplorer();       // 生成 API 说明
builder.Services.AddSwaggerGen();                // 生成 Swagger UI 页面

// 依赖注入
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

var app = builder.Build();

app.UseSwagger();                             // 启用 Swagger 中间件
app.UseSwaggerUI();                           // 启用 Swagger 页面
app.UseHttpsRedirection();

// 映射控制器
app.MapControllers();
app.Run();
