using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ReservationSystemDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("Database"),
ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("Database"))));
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
