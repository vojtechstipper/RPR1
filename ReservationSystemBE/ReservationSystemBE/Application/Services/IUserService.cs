using Microsoft.EntityFrameworkCore;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Infrastructure.Persistence;
using BCR = BCrypt.Net.BCrypt;

namespace ReservationSystemBE.Application.Services;

public interface IUserService
{
    Task<User> ValidateAndGetUser(string userEmail, string password);
    Task<User> ValidateAndGetUserById(string userId, string password);
    Task<User> CreateUser(string email, string name, string surname, string password);
    Task SetNewPassword(User user, string newPassword);
}

public class UserService : IUserService
{
    private readonly ReservationSystemDbContext _context;

    public UserService(ReservationSystemDbContext context)
    {
        _context = context;
    }

    public async Task<User> CreateUser(string email, string name, string surname, string password)
    {
        string securedPassword = BCR.HashPassword(password, 4);
        var user = new User(name, surname, email.ToLower(), securedPassword, UserRole.User);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task SetNewPassword(User user, string newPassword)
    {
        string securedPassword = BCR.HashPassword(newPassword, 4);
        user.Password = securedPassword;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task<User> ValidateAndGetUser(string userEmail, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail);
        if (user != null && BCR.Verify(password, user.Password))
        {
            return user;
        }
        else throw new Exception("User does not exists");
    }

    public async Task<User> ValidateAndGetUserById(string userId, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
        if (user != null && BCR.Verify(password, user.Password))
        {
            return user;
        }
        else throw new Exception("User does not exists");
    }
}
