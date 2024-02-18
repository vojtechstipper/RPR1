using Microsoft.EntityFrameworkCore;
using ReservationSystemBE.Infrastructure.MiddleWares;
using ReservationSystemBE.Infrastructure.Persistence;
using ReservationSystemBE.Infrastructure.SignalRHub;
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

builder.Services.AddSignalR();

builder.Services.AddSwaggerGen(opt => opt.CustomSchemaIds(type => type.ToString().Replace("+", ".")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                      });
});

builder.Services.AddAutoMapper(config => config.AddMaps(Assembly.GetExecutingAssembly()));

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var services = serviceScope.ServiceProvider;

    var dbcontext = services.GetRequiredService<ReservationSystemDbContext>();
    dbcontext.Database.Migrate();
}

app.UseEntityNotFoundExceptionMiddleware();
app.UseCors(MyAllowSpecificOrigins);
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.MapHub<OrderHub>("/orderHub");

app.Run();
