using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Infrastructure.Persistence;

namespace ReservationSystemBE.Application.Services;

public interface IUserService
{
    Task<User> ValidateAndGetUser(string userEmail, string password);
    Task CreateUser();
}

public class UserService : IUserService
{
    private readonly ReservationSystemDbContext _context;

    public UserService(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public Task CreateUser()
    {
        throw new NotImplementedException();
    }

    public async Task<User> ValidateAndGetUser(string userEmail, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail);
        if (user != null && user.Password == password)
        {
            return user;
        }
        else throw new Exception("User does not exists");
    }
}
