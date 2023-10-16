using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ReservationSystemDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("Database"),
ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("Database"))));

builder.Services.AddControllers().AddJsonOptions(opts =>
    opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());

builder.Services.AddSwaggerGen(opt => opt.CustomSchemaIds(type => type.ToString().Replace("+", ".")));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();
