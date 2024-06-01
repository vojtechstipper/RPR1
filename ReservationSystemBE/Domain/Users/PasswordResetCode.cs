using ReservationSystem.Shared.Entity;

namespace ReservationSystem.Domain.Users;

public class PasswordResetCode : Entity
{
    public PasswordResetCode()
    {
    }

    public string Code { get; set; }
    public DateTime ValidTill { get; set; }
    public User User { get; set; }
    public string UserId { get; set; }
}
