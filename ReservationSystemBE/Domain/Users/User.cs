using ReservationSystem.Domain.Orders;
using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Users;

public class User : Entity
{
    public User()
    {
    }

    public User(string firstName, string secondName, string email, string password, UserRole role)
    {
        FirstName = firstName;
        SecondName = secondName;
        Email = email;
        Password = password;
        Role = role;
    }

    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public bool IsVerified { get; set; }
    public bool IsStudent { get; set; } = false;
    public UserRole Role { get; set; }
    public IEnumerable<Order> Orders { get; set; }

}

public enum UserRole
{
    Admin,
    User
}