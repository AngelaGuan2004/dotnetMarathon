using Marathon.Repository;
using Marathon.Service;

var builder = WebApplication.CreateBuilder(args);

// ��ӿ�����
builder.Services.AddControllers();

// ��� Swagger ����
builder.Services.AddEndpointsApiExplorer();       // ���� API ˵��
builder.Services.AddSwaggerGen();                // ���� Swagger UI ҳ��

// ����ע��
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

var app = builder.Build();

app.UseSwagger();                             // ���� Swagger �м��
app.UseSwaggerUI();                           // ���� Swagger ҳ��
app.UseHttpsRedirection();

// ӳ�������
app.MapControllers();
app.Run();
