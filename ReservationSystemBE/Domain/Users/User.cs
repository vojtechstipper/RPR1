using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Users;

public class User : Entity
{
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public bool IsVerified { get; set; }
    public UserRole Role { get; set; }

}

public enum UserRole
{
    Admin,
    User
}