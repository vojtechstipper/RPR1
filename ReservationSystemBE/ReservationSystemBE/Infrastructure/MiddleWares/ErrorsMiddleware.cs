using Newtonsoft.Json;
using ReservationSystem.Shared.Exceptions;
using ReservationSystemBE.Infrastructure.Exceptions;

namespace ReservationSystemBE.Infrastructure.MiddleWares;

public class EntityNotFoundExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<EntityNotFoundExceptionMiddleware> _logger;

    public EntityNotFoundExceptionMiddleware(RequestDelegate next, ILogger<EntityNotFoundExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            context.Response.ContentType = "application/json";

            switch (ex.Code)
            {
                case ExceptionCodes.EntityNotFound:
                    context.Response.StatusCode = 404;
                    break;
                case ExceptionCodes.UnprocessableException:
                    context.Response.StatusCode = 422;
                    break;
                case ExceptionCodes.NotImplemented:
                    context.Response.StatusCode = 501;
                    break;
                default:
                    context.Response.StatusCode = 500;
                    break;
            }
            _logger.LogError(ex, ex.Message);


            var response = new { error = ex.Message, code = ex.Code };
            var jsonResponse = JsonConvert.SerializeObject(response);

            await context.Response.WriteAsync(jsonResponse);
        }
    }
}

public static class EntityNotFoundExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseEntityNotFoundExceptionMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<EntityNotFoundExceptionMiddleware>();
    }
}
