namespace ReservationSystem.Shared.Util;

public class IdGenerator
{
    public static string GenerateId() => Guid.NewGuid().ToString("N");
}