using AutoWrapper;
using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.Persistence;
using System.Reflection;
using System.Text.Json.Serialization;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.Development.json",
        optional: true,
        reloadOnChange: true);

builder.Services.AddDbContext<ReservationSystemDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddControllers().AddJsonOptions(opts =>
    opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());

builder.Services.AddSwaggerGen(opt => opt.CustomSchemaIds(type => type.ToString().Replace("+", ".")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000");
                      });
});

builder.Services.AddAutoMapper(config => config.AddMaps(Assembly.GetExecutingAssembly()));

var app = builder.Build();
app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions { UseApiProblemDetailsException = true });
app.UseCors(MyAllowSpecificOrigins);
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();
